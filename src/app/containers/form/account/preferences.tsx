import React from "react";
import Input, { InputType } from "../../../elements/forms/Inputs";
import Container from "../../../components/container/Container";
import FormContainer, { FormCTAPosition } from "../../../components/form-container/FormContainer";
import { SeriesFormComponent } from "../SeriesFormComponent";
import { SeriesInputComponent } from "../SeriesInputComponent";
import { UserService } from "../../../core/user/userService";
import { connect } from "react-redux";

export class PreferencesForm extends SeriesFormComponent {
    inProgress = false;

    public getFormInputsFields() {
        return [["inputEmailOffers"]];
    }

    public getFormTextFields() {
        return ["step1Text"];
    }

    cleanFormData(json: any) {
        json.emailOffers = json.emailOffers !== undefined && (json.emailOffers === "on" ? 1 : 0);
    }

    public getFormInputsFieldsMapping(): Array<{ fieldName: string; name: string }> | undefined {
        return [
            {
                fieldName: "inputEmailOffers",
                name: "emailOffers",
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
            let datVal = data[name];
            if (datVal) {
                data[fieldName] = datVal === 1;
            }
            delete data[name];
        });
        this.setInputFieldValues(data);
    }

    protected componentInitialised() {
        super.componentInitialised();
        this.updateFields();
    }

    onChange(input) {
        if (input.name !== "emailOffers") return;
        return UserService.getInstance()
            .then(instance => {
                this.inProgress = true;
                this.forceUpdate();
                return instance.updateUserData({ emailOffers: input.checked ? 1 : 0 });
            }).then(result => {
                this.inProgress = false;
                this.forceUpdate();
                return result;
            }, error => {
                this.inProgress = false;
                this.forceUpdate();
                this.handleFormErrors(error);
                throw error;
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
                    onChange={e => this.onChange(e)}
                    {...formData[currIndex].props}
                    index={currIndex}
                    total={formData.length}
                    error={this.state.error}>
                    <section>
                        <InputsRegistration
                            progress={currIndex}
                            inputData={formData.map(e => e.inputs)}
                            disabled={this.inProgress}
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

export default connect(mapStateToProps)(PreferencesForm);

class InputsRegistration extends SeriesInputComponent {


    private static getFieldSetAddress = (data, isActive, disabled) => {
        return (
            <div hidden={!isActive}>
                {
                    SeriesInputComponent.getDataItem("inputEmailOffers", data) &&
                    <Input
                        type={InputType.toggle}
                        name={"emailOffers"}
                        {...InputsRegistration.commonProps(SeriesInputComponent.getDataItem("inputEmailOffers", data), isActive)}
                        required={false}
                        defaultChecked={SeriesInputComponent.getDataItem("inputEmailOffers", data).value}
                        disabled={SeriesInputComponent.getDataItem("inputEmailOffers", data).disabled || disabled}
                    />
                }
            </div>
        );
    };

    render() {
        let { progress, inputData, disabled } = this.props;
        return (
            <React.Fragment>
                {InputsRegistration.getFieldSetAddress(inputData[0], 0 === progress, disabled)}
            </React.Fragment>
        );
    }
}
