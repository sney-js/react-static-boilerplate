import React from "react";
import Input, { InputType } from "../../../elements/forms/Inputs";
import Container from "../../../components/container/Container";
import FormContainer from "../../../components/form-container/FormContainer";
import { SeriesFormComponent } from "../SeriesFormComponent";
import { SeriesInputComponent } from "../SeriesInputComponent";
import { UserService } from "../../../core/user/userService";
import { connect } from "react-redux";

export class AddressForm extends SeriesFormComponent {
    public getFormInputsFields() {
        return [["inputZipCode", "inputStreet", "inputHouseNumber", "inputFloor", "inputCity"]];
    }

    public getFormTextFields() {
        return ["step1Text"];
    }

    cleanFormData(json: any) {
    }

    public getFormInputsFieldsMapping(): Array<{ fieldName: string; name: string }> | undefined {
        return [
            {
                fieldName: "inputZipCode",
                name: "zipCode",
            },
            {
                fieldName: "inputStreet",
                name: "street",
            },
            {
                fieldName: "inputHouseNumber",
                name: "houseNumber",
            },
            {
                fieldName: "inputFloor",
                name: "houseNumberPlus",
            },
            {
                fieldName: "inputCity",
                name: "city",
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
        inputFieldMapping.map(({ fieldName, name }) => {
            if (data[name]) data[fieldName] = data[name];
            delete data[name];
        });
        this.setInputFieldValues(data);
    }

    protected componentInitialised() {
        super.componentInitialised();
        this.updateFields();
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

export default connect(mapStateToProps)(AddressForm);

class InputsRegistration extends SeriesInputComponent {
    private static getFieldSetAddress = (data, isActive) => (
        <div hidden={!isActive}>
            {SeriesInputComponent.getDataItem("inputZipCode", data) && (
                <Input
                    type={InputType.splitText}
                    name={"zipCode"}
                    {...InputsRegistration.commonProps(SeriesInputComponent.getDataItem("inputZipCode", data), isActive)}
                    required={true}
                    mask={"**** **"}
                />
            )}
            {SeriesInputComponent.getDataItem("inputStreet", data) && (
                <Input
                    type={InputType.text}
                    name={"street"}
                    {...InputsRegistration.commonProps(SeriesInputComponent.getDataItem("inputStreet", data), isActive)}
                    required={false}
                />
            )}
            {SeriesInputComponent.getDataItem("inputHouseNumber", data) && (
                <Input
                    type={InputType.text}
                    maxLength={20}
                    name={"houseNumber"}
                    {...InputsRegistration.commonProps(SeriesInputComponent.getDataItem("inputHouseNumber", data), isActive)}
                    required={true}
                />
            )}
            {SeriesInputComponent.getDataItem("inputFloor", data) && (
                <Input
                    type={InputType.text}
                    name={"houseNumberPlus"}
                    {...InputsRegistration.commonProps(SeriesInputComponent.getDataItem("inputFloor", data), isActive)}
                    required={false}
                />
            )}
            {SeriesInputComponent.getDataItem("inputCity", data) && (
                <Input
                    type={InputType.text}
                    name={"city"}
                    {...InputsRegistration.commonProps(SeriesInputComponent.getDataItem("inputCity", data), isActive)}
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
