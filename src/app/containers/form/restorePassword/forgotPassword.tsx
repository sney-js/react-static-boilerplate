import React from "react";
import Input, { InputType } from "../../../elements/forms/Inputs";
import Container from "../../../components/container/Container";
import FormContainer, { FormCTAPosition } from "../../../components/form-container/FormContainer";
import { SeriesFormComponent } from "../SeriesFormComponent";
import { SeriesInputComponent } from "../SeriesInputComponent";
import { cleanWhitespaces, getByPath } from "../../../utils/helpers";
import { UserApi } from "../../../core/api/userApi";

export default class extends SeriesFormComponent {
    public getFormInputsFields() {
        return [["cardNumber", "email"]];
    }

    public getFormTextFields() {
        return ["text"];
    }

    cleanFormData(json: any) {}

    render() {
        let currIndex = this.state.progress;
        let formData = this.state.formData;

        if (!formData[currIndex]) return null;
        const props = formData[currIndex].props;

        return (
            <Container>
                <FormContainer
                    {...props}
                    onPrimaryClick={json => this.handleFormSubmission(json)}
                    onSecondaryClick={() => this.setProgressPrev()}
                    index={currIndex}
                    total={formData.length}
                    error={this.state.error}
                    ctaPosition={FormCTAPosition.RIGHT}
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

        const redirectLink = getByPath(this.props.item, "fields.redirectUrl");

        const path = getByPath(redirectLink, "fields.path");

        return UserApi.forgotPassword({
            cardNumber: cleanWhitespaces(json.cardNumber),
            email: json.email,
            redirectUrl: window.location.origin + path,
        })
            .then(data => {
                this.setProgressNext();
                return data;
            })
            .catch(e => {
                this.handleFormErrors(e);
            });
    }
}

class InputsRegistration extends SeriesInputComponent {
    private static getFieldSetContact = (data, isActive) => {
        return (
            <div hidden={!isActive}>
                {
                    SeriesInputComponent.getDataItem("cardNumber", data) &&
                    <Input
                        type={InputType.splitText}
                        originalInputType={"tel"}
                        name={"cardNumber"}
                        {...InputsRegistration.commonProps(SeriesInputComponent.getDataItem("cardNumber", data), isActive)}
                    />
                }
                {
                    SeriesInputComponent.getDataItem("email", data) &&
                    <Input
                        type={InputType.email}
                        name={"email"}
                        {...InputsRegistration.commonProps(SeriesInputComponent.getDataItem("email", data), isActive)}
                    />
                }


            </div>
        );
    };

    render() {
        let { progress, inputData } = this.props;
        return (
            <React.Fragment>
                {InputsRegistration.getFieldSetContact(inputData[0], 0 === progress)}
            </React.Fragment>
        );
    }
}
