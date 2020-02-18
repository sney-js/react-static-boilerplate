import React from "react";
import Input, { InputType } from "../../../elements/forms/Inputs";
import Container from "../../../components/container/Container";
import FormContainer from "../../../components/form-container/FormContainer";
import Barcode from "../../../elements/barcode/Barcode";
import { SeriesFormComponent } from "../SeriesFormComponent";
import { RegistrationApi } from "../../../core/api/registrationApi";
import { getByPath } from "../../../utils/helpers";
import { SeriesInputComponent } from "../SeriesInputComponent";
import { AuthService } from "../../../core/auth/authService";
import { ReCaptchaService } from "../../../core/api/reCaptchaService";
import { UserApi } from "../../../core/api/userApi";

class RegistrationPhysical extends SeriesFormComponent {

    inProgress = false;

    public getFormInputsFields() {
        return [
            ["inputCardId", "inputActivationCode"],
            [
                "inputFirstName",
                "inputMiddleName",
                "inputLastName",
                "inputZipCode",
                "inputHouseNumber",
                "inputStreet",
                "inputCity",
            ],
            ["inputDOB", "inputEmail", "inputPassword", "inputExtraOffers"],
        ];
    }

    public getFormTextFields() {
        return ["step1Text", "step2Text", "step3Text"];
    }

    cleanFormData(json: any) {
        json.cardNumber = json.cardNumber && json.cardNumber.replace(/ /gi, "");
        if (json.dob) {
            const dobSeparator = json.dob.includes(".") ? "." : "-";
            json.dob = json.dob.split(dobSeparator).join("");
        }
    }

    componentDidMount(): void {
        super.componentDidMount();

        const cardIdFormat = getByPath(
            this.props,
            "item.fields.inputCardId.fields.inputFormatting",
        );
        if (cardIdFormat) {
            this.setCustomState({ barcodeVal: cardIdFormat.replace(/9/gi, "x") });
        }
    }

    onBlur(e, inputData, data) {
        if (inputData.lastValue === e.target.value) {
            return;
        }
        inputData.lastValue = e.target.value;
        const { lastValue: zipValue } = SeriesInputComponent.getDataItem("inputZipCode", data);
        const { lastValue: houseValue } = SeriesInputComponent.getDataItem("inputHouseNumber", data);

        if (zipValue && houseValue) {
            this.inProgress = true;
            this.forceUpdate();
            UserApi.getAddress({
                zipCode: zipValue.replace(/\s/g, ""),
                houseNumber: houseValue,
            }).then(data => {

                if (data.city && data.street) {
                    this.setInputFieldValues({
                        "inputStreet": "empty",
                        "inputCity": "empty",
                    });
                    this.setInputFieldValues({
                        "inputStreet": data.street,
                        "inputCity": data.city,
                    });
                }

                this.inProgress = false;
                this.forceUpdate();
            }).catch(err => {
                this.inProgress = false;
                this.forceUpdate();
            });
        }


    }

    private async handleFormSubmission(json) {
        super.handlerFormSubmit(json);
        this.cleanFormData(json);
        let formAction;
        switch (this.state.progress) {
            case 0:
                formAction = RegistrationApi.validateCard({
                    cardNumber: json.cardNumber,
                    activationCode: json.activationCode,
                    recaptchaToken: await ReCaptchaService.execute("validateCard"),
                });
                break;
            case 2:
                formAction = RegistrationApi.registerPhysical({
                    ...json,
                    recaptchaToken: await ReCaptchaService.execute("registration"),
                });
                break;
            default:
                formAction = new Promise(resolve => resolve());
                break;
        }

        return formAction
            .then(message => {
                if (this.isFinalFormSubmit()) {
                    AuthService.getInstance().then(instance => {
                        return instance.handleNewAuthToken(message);
                    });
                }
                this.setProgressNext();
                return message;
            })
            .catch(e => {
                this.handleFormErrors(e, [this.state.formData[this.state.progress]]);
            });
    }

    render() {
        let currIndex = this.state.progress;
        let formData = this.state.formData;

        if (!formData[currIndex]) return null;

        return (
            <Container className={"registation-form"}>
                <FormContainer
                    onPrimaryClick={json => this.handleFormSubmission(json)}
                    onSecondaryClick={() => this.setProgressPrev()}
                    {...formData[currIndex].props}
                    index={currIndex}
                    total={formData.length}
                    onChange={input => {
                        if (input.name === "cardNumber") {
                            let val = input.value || "";
                            this.setCustomState({ barcodeVal: val.padEnd(16, "x") });
                        }
                    }}
                    error={this.state.error}
                    extraInfo={
                        currIndex === 0 ? (
                            <Barcode
                                className={"registration-barcode-mobile"}
                                height={70}
                                width={1.5}
                                value={this.getCustomState("barcodeVal")}
                            />
                        ) : null
                    }
                >
                    <section>
                        <InputsRegistration
                            onBlur={(e, inputData, data) => this.onBlur(e, inputData, data)}
                            progress={currIndex}
                            inputData={formData.map(e => e.inputs)}
                            disabled={this.inProgress}
                        />
                        <>
                            {currIndex === 0 ? (
                                <Barcode
                                    className={"registration-barcode-desktop"}
                                    height={60}
                                    width={1.5}
                                    value={this.getCustomState("barcodeVal")}
                                />
                            ) : null}
                        </>
                    </section>
                </FormContainer>
            </Container>
        );
    }
}

export default RegistrationPhysical;

class InputsRegistration extends SeriesInputComponent {
    render() {
        let { progress, inputData, onBlur, disabled } = this.props;
        return (
            <React.Fragment>
                {InputsRegistration.getFieldSetCards(inputData[0], 0 === progress)}
                {InputsRegistration.getFieldSetPersonal(inputData[1], 1 === progress, onBlur, disabled)}
                {InputsRegistration.getFieldSetEmail(inputData[2], 2 === progress)}
            </React.Fragment>
        );
    }

    private static getFieldSetCards = (data, isActive) => (
        <div hidden={!isActive}>
            <input
                type="password"
                style={{ display: "none" }}
                name="fakepasswordremembered"
                autoComplete={"new-password"}
                required={false}
            />

            {
                SeriesInputComponent.getDataItem("inputCardId", data) &&
                <Input
                    type={InputType.splitText}
                    originalInputType={"tel"}
                    name={"cardNumber"}
                    {...InputsRegistration.commonProps(SeriesInputComponent.getDataItem("inputCardId", data), isActive)}
                    mask={SeriesInputComponent.getDataItem("inputCardId", data).inputFormatting || "999999 9999 9999"}
                    maskChar={""}
                />
            }

            {
                SeriesInputComponent.getDataItem("inputActivationCode", data) &&
                <Input
                    type={InputType.code}
                    name={"activationCode"}
                    singleBoxes={4}
                    {...InputsRegistration.commonProps(SeriesInputComponent.getDataItem("inputActivationCode", data), isActive)}
                />
            }
        </div>
    );

    private static getFieldSetPersonal = (data, isActive, onBlur, disabled) => (
        <div hidden={!isActive}>
            {
                SeriesInputComponent.getDataItem("inputFirstName", data) &&
                <Input
                    type={InputType.text}
                    name={"firstName"}
                    {...InputsRegistration.commonProps(SeriesInputComponent.getDataItem("inputFirstName", data), isActive)}
                    disabled={SeriesInputComponent.getDataItem("inputFirstName", data).disabled || disabled}
                />
            }

            {
                SeriesInputComponent.getDataItem("inputMiddleName", data) &&
                <Input
                    type={InputType.text}
                    name={"middleName"}
                    {...InputsRegistration.commonProps(SeriesInputComponent.getDataItem("inputMiddleName", data), isActive)}
                    required={false}
                    disabled={SeriesInputComponent.getDataItem("inputMiddleName", data).disabled || disabled}
                />
            }

            {
                SeriesInputComponent.getDataItem("inputLastName", data) &&
                <Input
                    type={InputType.text}
                    name={"lastName"}
                    {...InputsRegistration.commonProps(SeriesInputComponent.getDataItem("inputLastName", data), isActive)}
                    disabled={SeriesInputComponent.getDataItem("inputLastName", data).disabled || disabled}
                />
            }

            {
                SeriesInputComponent.getDataItem("inputZipCode", data) &&
                <Input
                    type={InputType.splitText}
                    name={"zipCode"}
                    onBlur={e => onBlur(e, SeriesInputComponent.getDataItem("inputZipCode", data), data)}
                    mask={data.inputFormatting || "**** **"}
                    {...InputsRegistration.commonProps(SeriesInputComponent.getDataItem("inputZipCode", data), isActive)}
                    disabled={SeriesInputComponent.getDataItem("inputZipCode", data).disabled || disabled}
                />
            }

            {
                SeriesInputComponent.getDataItem("inputHouseNumber", data) &&
                <Input
                    type={InputType.text}
                    name={"houseNumber"}
                    maxLength={20}
                    onBlur={e => onBlur(e, SeriesInputComponent.getDataItem("inputHouseNumber", data), data)}
                    {...InputsRegistration.commonProps(SeriesInputComponent.getDataItem("inputHouseNumber", data), isActive)}
                    autoComplete={"street-address address-line-1"}
                    disabled={SeriesInputComponent.getDataItem("inputHouseNumber", data).disabled || disabled}
                />
            }
            {SeriesInputComponent.getDataItem("inputStreet", data) && (
                <Input
                    type={InputType.text}
                    name={"street"}
                    {...InputsRegistration.commonProps(
                        SeriesInputComponent.getDataItem("inputStreet", data),
                        isActive,
                    )}
                    required={false}
                    disabled={SeriesInputComponent.getDataItem("inputStreet", data).disabled || disabled}
                />
            )}
            {SeriesInputComponent.getDataItem("inputCity", data) && (
                <Input
                    type={InputType.text}
                    name={"city"}
                    {...InputsRegistration.commonProps(
                        SeriesInputComponent.getDataItem("inputCity", data),
                        isActive,
                    )}
                    required={false}

                    disabled={SeriesInputComponent.getDataItem("inputCity", data).disabled || disabled}
                />
            )}


        </div>
    );

    private static getFieldSetEmail = (data, isActive) => (
        <div hidden={!isActive}>
            {SeriesInputComponent.getDataItem("inputDOB", data) && (
                <Input
                    type={InputType.splitText}
                    originalInputType={"tel"}
                    name={"dob"}
                    {...InputsRegistration.commonProps(
                        SeriesInputComponent.getDataItem("inputDOB", data),
                        isActive,
                    )}
                    required={false}
                    autoComplete={"bday"}
                    setValidity={val => {
                        const dateRegex = /^\s*(3[01]|[12][0-9]|0?[1-9])(\.|-)(1[012]|0?[1-9])(\.|-)((?:19|20)\d{2})\s*$/;
                        if (val.length >= 10 && !val.match(dateRegex)) {
                            return {
                                error: true,
                                errorText: SeriesInputComponent.getDataItem("inputDOB", data)
                                    .errorInvalid,
                            };
                        }
                    }}
                />
            )}
            {
                SeriesInputComponent.getDataItem("inputEmail", data) &&
                <Input
                    type={InputType.email}
                    name={"email"}
                    {...InputsRegistration.commonProps(SeriesInputComponent.getDataItem("inputEmail", data), isActive)}
                />
            }
            {
                SeriesInputComponent.getDataItem("inputPassword", data) &&
                <Input
                    type={InputType.password}
                    name={"password"}
                    {...InputsRegistration.commonProps(SeriesInputComponent.getDataItem("inputPassword", data), isActive)}
                />
            }
            {
                SeriesInputComponent.getDataItem("inputExtraOffers", data) &&
                <Input
                    type={InputType.toggle}
                    name={"emailOffers"}
                    {...InputsRegistration.commonProps(SeriesInputComponent.getDataItem("inputExtraOffers", data), isActive)}
                    required={false}
                />
            }
        </div>
    );
}
