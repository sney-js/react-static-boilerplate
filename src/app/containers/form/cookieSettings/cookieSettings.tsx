import React from "react";
import Input, { InputType } from "../../../elements/forms/Inputs";
import Container from "../../../components/container/Container";
import FormContainer, { FormCTAPosition } from "../../../components/form-container/FormContainer";
import { SeriesFormComponent } from "../SeriesFormComponent";
import { SeriesInputComponent } from "../SeriesInputComponent";
import { Cookie } from "../../../models/Cookie";
import Cookies from "js-cookie";

export default class extends SeriesFormComponent {
    public getFormInputsFields() {
        return [["inputAnalyticsCookie", "inputTrackingCookie"]];
    }

    public getFormTextFields() {
        return ["text"];
    }

    cleanFormData(json: any) {}

    protected componentInitialised() {
        super.componentInitialised();

        const data = {
            inputAnalyticsCookie: !!Cookies.get(Cookie.ANALYTICS),
            inputTrackingCookie: !!Cookies.get(Cookie.TRACKING),
        };

        this.setInputFieldValues(data);
    }

    onChange(input) {
        const formData = this.state.formData[0].inputs.find(item => {
            return item.fieldName == input.name;
        });
        switch (input.name) {
            case "inputAnalyticsCookie":
                input.checked
                    ? Cookies.set(Cookie.ANALYTICS, "true")
                    : Cookies.remove(Cookie.ANALYTICS);
                formData.value = input.checked;
                break;
            case "inputTrackingCookie":
                input.checked
                    ? Cookies.set(Cookie.TRACKING, "true")
                    : Cookies.remove(Cookie.TRACKING);
                formData.value = input.checked;
                break;
        }

        this.forceUpdate();
    }

    render() {
        let currIndex = this.state.progress;
        let formData = this.state.formData;

        if (!formData[currIndex]) return null;

        const { ...extra } = formData[currIndex].props;

        return (
            <Container>
                <FormContainer
                    onChange={input => this.onChange(input)}
                    {...extra}
                    index={currIndex}
                    total={formData.length}
                    error={this.state.error}
                    ctaPosition={FormCTAPosition.NONE}
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
            <React.Fragment>{InputsRegistration.getFieldSet(inputData[0], true)}</React.Fragment>
        );
    }

    private static getFieldSet = (data, isActive) => {
        return (
            <div hidden={!isActive}>
                {data.map((inputData, index) => {
                    return (
                        <Input
                            key={index}
                            type={InputType.toggle}
                            name={inputData.fieldName}
                            {...InputsRegistration.commonProps(inputData, isActive)}
                            required={false}
                            checked={inputData.value}
                        />
                    );
                })}
            </div>
        );
    };
}
