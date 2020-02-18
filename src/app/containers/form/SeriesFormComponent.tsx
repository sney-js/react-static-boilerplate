import { Component } from "react";
import { getByPath } from "../../utils/helpers";
import handleInputData from "./inputsHandler";
import { FormValidationContext } from "../../elements/forms/Form";
import RichText from "../../elements/rich-text/RichText";
import { BPLUserData } from "../../models/BPLUserData";

export class SeriesFormComponent extends Component<{
    item?: any;
    extra?: {};
    onSuccess?: () => void;
    userData?: BPLUserData;
}> {
    static contextType = FormValidationContext;
    state = {
        progress: 0,
        formData: [],
        error: { error: false },
        errorCodes: [],
        custom: {},
    };

    componentDidMount(): void {
        const cmsItem = this.props.item;
        const formDataFields = this.getFormTextFields();
        const formDataInputs = this.getFormInputsFields();

        const formData = formDataInputs.map((group, i) => ({
            props: SeriesFormComponent.getTextProps(cmsItem.fields[formDataFields[i]]),
            inputs: group
                .map(input => {
                    return SeriesFormComponent.getInputData(cmsItem.fields[input], input);
                })
                .filter(i => !!i),
        }));

        const errorCodes = getByPath(this.props, "extra.errorCodes");

        this.setState({
            formData: formData,
            errorCodes: errorCodes || [],
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot?: any): void {
        //formdata has just been populated
        if (prevState.formData.length === 0 && this.state.formData.length > 0) {
            this.componentInitialised();
        }
    }

    /**
     * Override this in your class
     */
    public getFormInputsFields() {
        return [];
    }

    /**
     * Override this in your class
     */
    public getFormTextFields() {
        return [];
    }

    /**
     * Override this in your class to do something after formData is ready
     */
    protected componentInitialised() {}

    protected handlerFormSubmit(json) {
        const formData = this.state.formData;

        formData.forEach(data => {
            data.inputs.forEach(input => {
                input.error = { error: false };
            });
        });

        this.setState({
            error: { error: false },
            formData: formData,
        });
        return json;
    }

    public isFinalFormSubmit() {
        if (
            this.state.formData.length >= 1 &&
            this.state.progress + 1 >= this.state.formData.length
        ) {
            return true;
        }
        return false;
    }

    private static getTextProps(textItem: any) {
        if (!textItem) return {};
        return {
            caption: textItem.fields.caption,
            title: textItem.fields.title,
            description: RichText({ html: textItem.fields.description }),
            buttonPrimary: textItem.fields.primaryButtonText,
            buttonSecondary: textItem.fields.secondaryButtonText,
            buttonSecondaryElement: textItem.fields.secondaryButton,
            footnote: RichText({ html: textItem.fields.footnote }),
        };
    }

    private static getInputData(inputItem: any, fieldName: string) {
        if (!inputItem) return;
        const inputData: any = handleInputData(inputItem);
        inputData.fieldName = fieldName;
        return inputData;
    }

    setProgressNext() {
        // reached success
        let nextProgress = this.state.progress + 1;
        if (this.isFinalFormSubmit()) {
            if (this.props.onSuccess) {
                this.props.onSuccess();
            } else {
                return;
            }
        }
        this.setState({
            progress: Math.min(nextProgress, this.state.formData.length - 1),
            error: { error: false },
        });

        window.scrollTo({
            top: 0,
        });
    }

    setProgressPrev() {
        this.setState(
            {
                progress: this.state.progress - 1,
                error: { error: false },
            },
            () => {
                const formValidation = this.context;
                formValidation.clearAllInputsValidity();
            },
        );
        window.scrollTo({
            top: 0,
        });
    }

    setCustomState(val) {
        const custom = this.state.custom || {};
        this.setState({
            custom: Object.assign(custom, val),
        });
    }

    getCustomState(key) {
        return this.state.custom[key];
    }

    /**
     * Given a set of key value pairs, if an input field exists a name attribute
     * with the key name, the value will be set as the input's value.
     * @param json {firstName:"xxx", lastName: "xxx"}
     */
    protected setInputFieldValues(json: any) {
        let newFormData = this.state.formData.map(fd => {
            fd.inputs.forEach(input => {
                if (json[input.fieldName]) {
                    input.value = json[input.fieldName];
                    return input;
                }
            });
            return fd;
        });

        this.setState({
            formData: newFormData,
        });
    }

    /**
     *
     * @param fieldName the name of form field
     * @param errorCode. one of errorCode
     */
    setErrorCodeOnInput(fieldName: string, errorCode?: number) {
        let newFormData = this.state.formData.map(fd => {
            fd.inputs.find(input => {
                if (input.fieldName === fieldName) {
                    let errorInfo = input.errorCodes.find(e => e.code === errorCode);
                    let errorText = errorInfo && errorInfo.error;
                    input.error = { error: true, errorText: errorText };
                    return input;
                }
            });
            return fd;
        });
        this.setState({
            formData: newFormData,
        });
    }

    /**
     *
     * @param fieldName the name of form field
     * @param customError. If undefined, the error shown will be
     * the default invalid error as provided by CMS.
     */
    findInputWithErrorCode(errorCode: number, formData?) {
        if (!formData) {
            formData = this.state.formData;
        }
        let foundInput;

        formData.forEach(fd => {
            foundInput = fd.inputs.find(input => {
                return input.errorCodes.find(err => {
                    return err.code === errorCode;
                });
            });
        });
        return foundInput;
    }

    /**
     * format of error dictated by whats returned from the api in case of error
     * @param error
     */
    setErrorOnForm(error?: any) {
        let customError;
        const unreachableError = this.state.errorCodes.find(e => e.code === -1);
        const genericError = this.state.errorCodes.find(e => e.code === 0);
        if (error.code) {
            const foundError = this.state.errorCodes.find(e => e.code === error.code);
            customError = foundError ? foundError.error : genericError.error || "Unknown Error";
        } else {
            customError = unreachableError.error || "Unknown Error";
        }
        this.setState({
            error: { error: true, errorText: customError },
        });
    }

    /**
     * This function will handle where the error states need to be set.
     * It iterates through each input to find supporting error code, otherwise
     * sets error on the form.
     * @param e = whats returned from the server.
     */
    public handleFormErrors(e, formData?) {
        let inputErrorCode;
        if (e.code) {
            console.log("error code: " + e.code);
            inputErrorCode = this.findInputWithErrorCode(e.code, formData);
            if (inputErrorCode) {
                console.log("Input supports error code: " + e.code, inputErrorCode);
                this.setErrorCodeOnInput(inputErrorCode.fieldName, e.code);
            }
        }
        if (!inputErrorCode) {
            this.setErrorOnForm(e);
        }
    }
}
