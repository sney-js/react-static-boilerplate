import React from "react";
import Input, { InputType } from "../../../elements/forms/Inputs";
import Container from "../../../components/container/Container";
import FormContainer, { FormCTAPosition } from "../../../components/form-container/FormContainer";
import { SeriesFormComponent } from "../SeriesFormComponent";
import { SeriesInputComponent } from "../SeriesInputComponent";
import { AuthService } from "../../../core/auth/authService";
import { environment } from "../../../environments/environment";

const styles = require("./login.module.scss");

const localStorageUserKey = environment.localStorageKey + "-u";

export default class extends SeriesFormComponent {
    public getFormInputsFields() {
        return [["cardNumber", "inputPassword", "checkboxRememberMe"]];
    }

    public getFormTextFields() {
        return ["text"];
    }

    cleanFormData(json: any) {
    }

    updateFields() {
        if (this.state.formData[0].inputs.length < 3) {
            localStorage.removeItem(localStorageUserKey);
        }

        const cardNumber = this.getCardNumber();
        const data = {
            cardNumber: cardNumber,
            password: "",
            checkboxRememberMe: cardNumber && "on",
        };
        this.setInputFieldValues(data);
    }

    getCardNumber() {
        const item = localStorage.getItem(localStorageUserKey);
        if (!item) return null;
        let cardNumber = null;
        try {
            cardNumber = atob(item);
        } catch (e) {
            console.error(e);
        }
        return cardNumber;
    }

    componentDidMount(): void {
        super.componentDidMount();
        setTimeout(_ => {
            this.updateFields();
        });
    }

    private handleFormSubmission(json) {
        super.handlerFormSubmit(json);
        this.cleanFormData(json);

        const credentials = {
            cardNumber: json.cardNumber.replace(/ /gi, ""),
            password: json.password,
        };

        return AuthService.getInstance()
            .then(instance => {
                return instance.login(credentials);
            })
            .then(data => {
                if (json.rememberMe) {
                    const cardNumberEncoded = btoa(credentials.cardNumber);
                    localStorage.setItem(localStorageUserKey, cardNumberEncoded);
                } else {
                    localStorage.removeItem(localStorageUserKey);
                }

                if (this.props.onSuccess) {
                    this.props.onSuccess();
                }
                return data;
            })
            .catch(e => {
                this.handleFormErrors(e);
            });
    }

    render() {
        let currIndex = this.state.progress;
        let formData = this.state.formData;

        if (!formData[currIndex]) return null;

        const { description, ...extra } = formData[currIndex].props;

        return (
            <Container className={styles.login}>
                <FormContainer
                    onPrimaryClick={json => this.handleFormSubmission(json)}
                    onSecondaryClick={() => this.setProgressPrev()}
                    {...extra}
                    index={currIndex}
                    total={formData.length}
                    error={this.state.error}
                    ctaPosition={FormCTAPosition.RIGHT}
                    description={
                        description && (
                            <div className={styles.descriptionDesktop}>{description}</div>
                        )
                    }
                    extraInfo={
                        description && <div className={styles.descriptionMobile}>{description}</div>
                    }
                >
                    <section>
                        <InputsRegistration
                            progress={currIndex}
                            inputData={formData.map(e => e.inputs)}
                        />
                    </section>
                </FormContainer>
            </Container>
        );
    }
}

class InputsRegistration extends SeriesInputComponent {
    render() {
        let { progress, inputData } = this.props;
        return (
            <React.Fragment>
                {InputsRegistration.getFieldSetCredentials(inputData[0], true)}
            </React.Fragment>
        );
    }

    private static getFieldSetCredentials = (data, isActive) => {
        return (
            <div hidden={!isActive}>
                {
                    SeriesInputComponent.getDataItem("cardNumber", data) &&
                    <Input
                        type={InputType.splitText}
                        originalInputType={"tel"}
                        barcodeScanner
                        name={"cardNumber"}
                        {...InputsRegistration.commonProps(SeriesInputComponent.getDataItem("cardNumber", data), isActive)}
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
                    SeriesInputComponent.getDataItem("checkboxRememberMe", data) &&
                    <div className={styles.rememberMe}>
                        <Input
                            type={InputType.checkbox}
                            name={"rememberMe"}
                            {...InputsRegistration.commonProps(SeriesInputComponent.getDataItem("checkboxRememberMe", data), isActive)}
                            required={false}
                        />
                    </div>
                }
            </div>
        );
    };
}
