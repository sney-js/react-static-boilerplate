import React, { Component } from "react";
import Input, { InputType } from "../../../elements/forms/Inputs";
import Container from "../../../components/container/Container";
import FormContainer from "../../../components/form-container/FormContainer";
import { SeriesFormComponent } from "../SeriesFormComponent";
import { UserApi } from "../../../core/api/userApi";
import { SeriesInputComponent } from "../SeriesInputComponent";

export default class extends SeriesFormComponent {
    public getFormInputsFields() {
        return [["inputCurrentPassword", "inputNewPassword"]];
    }

    public getFormTextFields() {
        return ["step1Text"];
    }

    cleanFormData(json: any) {}

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
        return UserApi.updateUserPassword({ ...json })
            .then(message => {
                this.setProgressNext();
                return message;
            })
            .catch(e => {
                this.handleFormErrors(e);
            });
    }
}

class InputsRegistration extends SeriesInputComponent {
    private static getFieldSetAddress = (data, isActive) => (
        <div hidden={!isActive}>

            {
                SeriesInputComponent.getDataItem("inputCurrentPassword", data) &&
                <Input
                    type={InputType.password}
                    name={"oldPassword"}
                    {...InputsRegistration.commonProps(SeriesInputComponent.getDataItem("inputCurrentPassword", data), isActive)}
                />
            }
            {
                SeriesInputComponent.getDataItem("inputNewPassword", data) &&
                <Input
                    type={InputType.password}
                    name={"newPassword"}
                    {...InputsRegistration.commonProps(SeriesInputComponent.getDataItem("inputNewPassword", data), isActive)}
                />
            }

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
