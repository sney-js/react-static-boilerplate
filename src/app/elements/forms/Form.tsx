import * as React from "react";
import "./forms.scss";
import { CSSTransition } from "react-transition-group";

export type FormError = { error: boolean; errorText?: string };
export type FormProps = {
    /**
     * Return false if default HTML form behaviour is required.
     * Return true if action has been taken care of
     * @param json : data of inputs as a json
     * @param e : e.target to get Form.
     */
    onSubmit?: (json: object, e: any) => Promise<any>;
    error?: FormError;
    onChange?: (e: HTMLInputElement) => void;
} & React.FormHTMLAttributes<any>;

export const FormValidationContext = React.createContext({
    inProgress: false,
    formValid: false,
    inputsInvalid: {},
    setInputValidity: (name, val) => {},
    clearAllInputsValidity: () => {},
});

class Form extends React.Component<FormProps> {
    state = {
        inProgress: false,
        formValid: false,
        inputsInvalid: {},
        setInputValidity: this.setInputValidity.bind(this),
        clearAllInputsValidity: this.clearAllInputsValidity.bind(this),
    };

    setInputValidity(name: string, valid: boolean) {
        if (!this.state) return;
        const inputs = this.state.inputsInvalid;
        if (!(!inputs[name] || inputs[name] === valid)) {
            inputs[name] = valid;
            const invalids = Object.keys(inputs).filter((e) => inputs[e] === true);
            this.setState({
                inputsInvalid: inputs,
                formValid: invalids.length === 0,
            });
        }
    }

    clearAllInputsValidity() {
        this.setState({
            inputsInvalid: {},
            formValid: true,
        });
    }

    render() {
        return (
            <form
                {...this.props}
                onSubmit={(e) => {
                    e.preventDefault();
                    const allInputsValid = this.state.formValid;
                    const isEmpty = Object.keys(this.state.inputsInvalid).length === 0;
                    if (!isEmpty && !allInputsValid) {
                        console.error("All inputs not valid!", this.state.inputsInvalid);
                        return;
                    }
                    const jsonData = this.getJsonData(e.target);
                    this.setState({ inProgress: true });
                    this.props.onSubmit(jsonData, e).then(() => {
                        this.setState({ inProgress: false });
                    });
                }}
                onChange={(e) => {
                    const input = e.target as HTMLInputElement;
                    this.props.onChange && this.props.onChange(input);
                }}
            >
                <FormValidationContext.Provider value={this.state}>
                    {this.props.children}
                    {this.props.error && this.props.error.errorText ? (
                        <CSSTransition
                            in={true}
                            appear={true}
                            classNames="fadeup"
                            timeout={{ enter: 0 }}
                            key={this.props.error.errorText}
                        >
                            <div className="form-error-box fadeup-initial">
                                <small>{this.props.error && this.props.error.errorText}</small>
                            </div>
                        </CSSTransition>
                    ) : null}
                </FormValidationContext.Provider>
            </form>
        );
    }

    private getJsonData(form: any) {
        const formData = new FormData(form);
        const object = {};
        formData.forEach(function (value: string, key) {
            value = value.trim();
            if (object[key] !== undefined) object[key] += value;
            else object[key] = value;
        });
        return object;
    }
}

export default Form;
