import React from "react";
import Input, { InputType } from "../../../elements/forms/Inputs";
import Container from "../../../components/container/Container";
import FormContainer from "../../../components/form-container/FormContainer";
import { SeriesFormComponent } from "../SeriesFormComponent";
import { SeriesInputComponent } from "../SeriesInputComponent";
import { getByPath } from "../../../utils/helpers";
import TextCard from "../../textCard/textCard";
import { UserApi } from "../../../core/api/userApi";

export default class extends SeriesFormComponent {
    invalidTokenComponent = null;
    token = null;
    tokenInValid = null;

    componentDidMount(): void {
        super.componentDidMount();
        if (typeof document !== "undefined") {
            let search = window.location.search;
            let params = new URLSearchParams(search);
            this.token = params.get("token");
        }

        this.setState({
            tokenInValid: true,
        });

        this.invalidTokenComponent = (
            <TextCard item={getByPath(this.props.item.fields, "tokenInvalidComponent")} />
        );

        this.checkUserToken().then(result => {
            this.tokenInValid = result;
            this.forceUpdate();
        });
    }

    public checkUserToken() {
        if (!this.token) Promise.resolve(false);
        return UserApi.validatePasswordToken({
            token: this.token,
        }).then(
            _ => {
                return true;
            },
            _ => {
                return false;
            },
        );
    }

    public getFormInputsFields() {
        return [["newPassword"]];
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

        if (this.tokenInValid === false) {
            return this.invalidTokenComponent;
        }

        if (!this.tokenInValid) {
            return null;
        }

        return (
            <Container>
                <FormContainer
                    {...props}
                    onPrimaryClick={json => this.handleFormSubmission(json)}
                    onSecondaryClick={() => this.setProgressPrev()}
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

        return UserApi.resetPassword({
            password: json.password,
            token: this.token,
        })
            .then(_ => {
                this.setProgressNext();
                return _;
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
                    SeriesInputComponent.getDataItem("newPassword", data) &&
                    <Input
                        type={InputType.password}
                        name={"password"}
                        {...InputsRegistration.commonProps(SeriesInputComponent.getDataItem("newPassword", data), isActive)}
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
