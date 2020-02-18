import React from "react";
import Input, { InputType } from "../../../elements/forms/Inputs";
import Container from "../../../components/container/Container";
import FormContainer from "../../../components/form-container/FormContainer";
import { SeriesFormComponent } from "../SeriesFormComponent";
import { SeriesInputComponent } from "../SeriesInputComponent";
import { UserService } from "../../../core/user/userService";
import { connect } from "react-redux";

const styles = require("./details.module.scss");

export class DetailsForm extends SeriesFormComponent {
    public getFormInputsFields() {
        return [
            [
                "inputFirstName",
                "inputMiddleName",
                "inputLastName",
                "inputMale",
                "inputFemale",
                "inputEmail",
                "inputDOB",
                "inputPhone",
            ],
        ];
    }

    public getFormTextFields() {
        return ["step1Text"];
    }

    public getFormInputsFieldsMapping(): Array<{ fieldName: string; name: string }> | undefined {
        return [
            {
                fieldName: "inputFirstName",
                name: "firstName",
            },
            {
                fieldName: "inputMiddleName",
                name: "middleName",
            },
            {
                fieldName: "inputLastName",
                name: "lastName",
            },
            {
                fieldName: "inputMale",
                name: "gender",
            },
            {
                fieldName: "inputFemale",
                name: "gender",
            },
            {
                fieldName: "inputEmail",
                name: "email",
            },
            {
                fieldName: "inputDOB",
                name: "dob",
            },
            {
                fieldName: "inputPhone",
                name: "phone",
            },
        ];
    }

    componentDidUpdate(prevProps, prevState, snapshot?: any): void {
        super.componentDidUpdate(prevProps, prevState, snapshot);
        if (prevProps.userData !== this.props.userData) {
            this.updateFields();
        }
    }

    updateFields() {
        const data = { ...this.props.userData };
        if (!data) return;
        const inputFieldMapping = this.getFormInputsFieldsMapping();
        const newData = {};
        inputFieldMapping.map(({ fieldName, name }) => {
            if (data[name]) newData[fieldName] = data[name];
        });
        this.setInputFieldValues(newData);
    }

    protected componentInitialised() {
        super.componentInitialised();
        this.updateFields();
    }

    cleanFormData(json: any) {
        if (json.dob) {
            const dobSeparator = json.dob.includes(".") ? "." : "-";
            json.dob = json.dob.split(dobSeparator).join("");
        }
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
                    error={this.state.error}
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

    private handleFormSubmission(json) {
        super.handlerFormSubmit(json);
        this.cleanFormData(json);
        return UserService.getInstance()
            .then(instance => {
                return instance.updateUserData({ ...json });
            })
            .then(message => {
                this.setProgressNext();
                return message;
            })
            .catch(e => {
                this.handleFormErrors(e);
            });
    }
}

const mapStateToProps = ({ userData }) => {
    return {
        userData,
    };
};

export default connect(mapStateToProps)(DetailsForm);

class InputsRegistration extends SeriesInputComponent {
    private static getFieldSetAddress = (data, isActive) => (
        <div hidden={!isActive}>
            {SeriesInputComponent.getDataItem("inputFirstName", data) && (
                <Input
                    type={InputType.text}
                    name={"firstName"}
                    {...InputsRegistration.commonProps(
                        SeriesInputComponent.getDataItem("inputFirstName", data),
                        isActive,
                    )}
                    required={true}
                />
            )}
            {SeriesInputComponent.getDataItem("inputMiddleName", data) && (
                <Input
                    type={InputType.text}
                    name={"middleName"}
                    {...InputsRegistration.commonProps(
                        SeriesInputComponent.getDataItem("inputMiddleName", data),
                        isActive,
                    )}
                    required={false}
                />
            )}
            {SeriesInputComponent.getDataItem("inputLastName", data) && (
                <Input
                    type={InputType.text}
                    name={"lastName"}
                    {...InputsRegistration.commonProps(
                        SeriesInputComponent.getDataItem("inputLastName", data),
                        isActive,
                    )}
                    required={true}
                />
            )}

            <div className={styles.radioWrapper}>
                {SeriesInputComponent.getDataItem("inputMale", data) && (
                    <Input
                        type={InputType.radio}
                        name={"gender"}
                        option={"M"}
                        {...InputsRegistration.commonProps(
                            SeriesInputComponent.getDataItem("inputMale", data),
                            isActive,
                        )}
                        required={false}
                    />
                )}
                {SeriesInputComponent.getDataItem("inputFemale", data) && (
                    <Input
                        type={InputType.radio}
                        name={"gender"}
                        option={"F"}
                        {...InputsRegistration.commonProps(
                            SeriesInputComponent.getDataItem("inputFemale", data),
                            isActive,
                        )}
                        required={false}
                    />
                )}
            </div>

            {SeriesInputComponent.getDataItem("inputEmail", data) && (
                <Input
                    type={InputType.email}
                    name={"email"}
                    {...InputsRegistration.commonProps(
                        SeriesInputComponent.getDataItem("inputEmail", data),
                        isActive,
                    )}
                    required={true}
                />
            )}
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

            {SeriesInputComponent.getDataItem("inputPhone", data) && (
                <Input
                    type={InputType.splitText}
                    originalInputType={"tel"}
                    name={"phone"}
                    {...InputsRegistration.commonProps(
                        SeriesInputComponent.getDataItem("inputPhone", data),
                        isActive,
                    )}
                    required={false}
                />
            )}
        </div>
    );

    render() {
        let { progress, inputData } = this.props;
        return (
            <React.Fragment>
                {InputsRegistration.getFieldSetAddress(inputData[0], 0 === progress)}
            </React.Fragment>
        );
    }
}
