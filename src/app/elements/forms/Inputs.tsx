import React, { useEffect, useState } from "react";
import "./inputs.scss";
import "./toggle.scss";
import InputMask from "react-input-mask";
import { FormValidationContext } from "./Form";
import { makeClass } from "../../utils/helpers";
import SvgCheck from "../svg-elements/Check";
import Icon from "../icon/Icon";

export enum InputType {
    checkbox = "checkbox",
    text = "text",
    number = "number",
    email = "email",
    radio = "radio",
    password = "password",
    code = "code",
    splitText = "splitText",
    toggle = "toggle",
}

interface InputGroupProps {
    description?: string;
    label: string;
    iconState?: number;
    onIconStateChange?: (state: number) => void;
}

export interface InputMaskProps {
    mask?: string;
    maskChar?: string;
}

type ErrorGroup = { error: boolean; errorText?: string };

export interface InputProps
    extends InputGroupProps,
        InputMaskProps,
        React.InputHTMLAttributes<any> {
    id?: string;
    theme?: string;
    type: InputType;
    originalInputType?: string;
    name: string;
    fieldName?: string;
    singleBoxes?: number;
    inputFormatting?: string;
    errorEmpty?: any;
    errorInvalid?: any;
    errorCodes?: any;
    /**
     * use defaultChecked={bool} instead
     */
    checked?: never;
    value?: string;
    option?: string;
    emptyError?: string;
    invalidError?: string;
    isActive?: boolean;
    error?: ErrorGroup;
    setValidity?: (e: any) => ErrorGroup;
    disabled?: boolean;
}

class Input extends React.Component<InputProps> {
    private inputObj: React.RefObject<any>;
    static contextType = FormValidationContext;

    constructor(props) {
        super(props);
        this.inputObj = React.createRef();
    }

    public state = {
        error: this.props.error,
        value: this.props.value,
        propError: this.props.error,
        barcodeScannerSupported: false,
    };

    onInvalid(e) {
        e.preventDefault();
        let value = this.state.value;
        this.setInvalid({
            error: true,
            errorText:
                (this.state.error && this.state.error.errorText) ||
                (!this.checkEmptyValidity(value) && this.props.emptyError) ||
                (this.state.error && this.props.invalidError),
        });
    }

    onChange(e) {
        const target = e.target;
        let value = target.value;
        let errorItem: ErrorGroup = { error: false, errorText: undefined };

        // single box code
        if (target.id.indexOf("single-box") !== -1) {
            value = this.handleTypeCodeFocus(target, value);
        }

        // backspace to nothing should show error again
        if (!this.checkEmptyValidity(value)) {
            errorItem.error = true;
            errorItem.errorText = this.props.emptyError;
        }

        let validityOverwriteFunction = this.props.setValidity;
        if (validityOverwriteFunction !== undefined) {
            errorItem = validityOverwriteFunction(value);
        }

        target.setCustomValidity("");
        this.setInvalid(errorItem);
        if (this.state.value !== value) {
            this.setState({ value });
        }
    }

    private handleTypeCodeFocus(target, value) {
        const setCharAt = (str = "", index, chr) => {
            if (index > str.length - 1) return str;
            return str.substr(0, index) + chr + str.substr(index + 1);
        };
        const id = parseInt(target.id.split("--")[0]);
        let stateValue = this.state.value;
        if (!stateValue) {
            stateValue = [...Array(this.props.singleBoxes)].map(i => "-").join("");
        }
        if (value.length === 1) {
            const nextBoxId = (id + 1) % this.props.singleBoxes;
            let nextEl;
            if (nextBoxId) {
                nextEl = document.getElementById(
                    this.getSingleBoxID(nextBoxId),
                ) as HTMLInputElement;
            } else {
                const formFields = Array.from(
                    target.closest("form").querySelectorAll("input, button"),
                );
                nextEl = formFields
                    .slice(formFields.indexOf(target) + 1, formFields.length)
                    .find((element: HTMLElement) => {
                        return !element.closest("*[hidden]");
                    });
            }

            if (nextEl) {
                setTimeout(() => {
                    target.blur();
                    nextEl.focus();
                    if (nextEl.setSelectionRange) nextEl.setSelectionRange(0, 9999);
                }, 25);
            }
        } else if (value.length === 0) {
            value = "-";
        }
        value = setCharAt(stateValue, id, value);
        if (value.replace(/-/g, "")) {
            return value;
        }
        return null;
    }

    private checkEmptyValidity(value) {
        const hasValue = value && value.replace(/-/gi, "").trim().length !== 0;
        const isRequired = this.props.required;
        const isValid = !isRequired || (isRequired && hasValue);
        return isValid;
    }

    private setInvalid(errorItem) {
        this.setState({ error: errorItem });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.error !== prevState.propError) {
            return { propError: nextProps.error, error: nextProps.error };
        }
        if (
            nextProps.value &&
            prevState.value === undefined &&
            nextProps.value !== prevState.value
        ) {
            return { value: nextProps.value };
        }
        return null;
    }

    componentDidUpdate(
        prevProps: Readonly<InputProps>,
        prevState: Readonly<{}>,
        snapshot?: any,
    ): void {
        let hasError = this.state.error && this.state.error.error === true;
        this.setInputError(hasError);
        if (prevProps.value !== this.props.value) {
            this.setState({
                value: this.props.value,
            });
        }
    }

    private setInputError(hasError) {
        const formValidation = this.context;
        formValidation.setInputValidity(
            this.props.name,
            this.props.isActive ? hasError : undefined,
        );
    }

    async componentDidMount() {
        const initialValidity = this.checkEmptyValidity(this.props.value);
        this.setInputError(!initialValidity);
    }

    onBarcodeIconClick() {
        let validators = null;

        if (this.props.mask) {
            validators = {
                symbolCount: this.props.mask.replace(/\s/g, "").length,
            };
        }
    }

    render() {
        const {
            error,
            value,
            inputFormatting,
            isActive,
            errorEmpty,
            emptyError,
            errorInvalid,
            invalidError,
            errorCodes,
            fieldName,
            originalInputType,
            ...rest
        } = this.props;

        if (this.props.type === InputType.splitText) {
            return (
                <InputFieldGroup {...this.props} error={this.state.error}>
                    <InputMask
                        ref={this.inputObj}
                        title={""}
                        placeholder={this.props.placeholder || " "}
                        mask={this.props.mask}
                        maskChar={this.props.maskChar || ""}
                        value={this.state.value}
                        onChange={this.onChange.bind(this)}
                        onInvalid={this.onInvalid.bind(this)}
                        // onBlur={this.onChange.bind(this)}
                        {...rest}
                        aria-label={this.props.label || this.props.description || this.props.name}
                        type={originalInputType || "text"}
                        className={makeClass([!this.state.value && "placeholder-shown"])}
                    />
                </InputFieldGroup>
            );
        }
        if (this.props.type === InputType.toggle) {
            return (
                <InputFieldGroup
                    {...this.props}
                    error={this.state.error}
                    label={undefined}
                    className={"input-with-borders"}
                >
                    <div className="switch-root">
                        <label className="switch">
                            {this.props.label}
                            <input
                                key={"toggle" + this.state.value + this.props.name}
                                {...rest}
                                title={""}
                                type="checkbox"
                                name={this.props.name}
                                className={makeClass([
                                    !this.state.value && "placeholder-shown",
                                ])}
                                aria-label={
                                    this.props.label || this.props.description || this.props.name
                                }
                            />
                            <span className="slider round" />
                        </label>
                    </div>
                </InputFieldGroup>
            );
        }

        if (this.props.type === InputType.checkbox) {
            return (
                <CheckboxFieldGroup {...this.props}>
                    <input
                        title={""}
                        ref={this.inputObj}
                        key={"checkbox" + this.state.value + this.props.name}
                        onChange={this.onChange.bind(this)}
                        onInvalid={this.onInvalid.bind(this)}
                        defaultChecked={this.state.value === "on"}
                        aria-label={this.props.label || this.props.description || this.props.name}
                        {...rest}
                    />
                    <span className="checkmark">
                        <Icon className={"check-icon"} icon={<SvgCheck />} />
                    </span>
                </CheckboxFieldGroup>
            );
        }

        if (this.props.type === InputType.code) {
            return (
                <InputFieldGroup {...this.props} error={this.state.error}>
                    <fieldset
                        className={"inline-input"}
                        id={this.props.id}
                        name={this.props.name}
                        onChange={this.onChange.bind(this)}
                        onInvalid={this.onInvalid.bind(this)}
                    >
                        {[...Array(this.props.singleBoxes)].map((_, i) => {
                            return (
                                <InputMask
                                    title={""}
                                    key={i}
                                    className={makeClass([
                                        !this.state.value && "placeholder-shown",
                                        "single-box",
                                    ])}
                                    id={this.getSingleBoxID(i)}
                                    maskChar={""}
                                    value={(this.state.value && this.state.value[i]) || undefined}
                                    name={"split--" + this.props.name + "--" + i}
                                    placeholder={" "}
                                    aria-label={
                                        this.props.label ||
                                        this.props.description ||
                                        this.props.name
                                    }
                                    {...rest}
                                    type={"tel"}
                                    autoComplete="false"
                                    mask={"9"}
                                />
                            );
                        })}
                    </fieldset>
                </InputFieldGroup>
            );
        }
        if (this.props.type === InputType.radio) {
            return (
                <RadioFieldGroup {...this.props}>
                    <input
                        title={""}
                        ref={this.inputObj}
                        key={"radio" + this.state.value + this.props.name}
                        onChange={this.onChange.bind(this)}
                        onInvalid={this.onInvalid.bind(this)}
                        value={this.props.option}
                        defaultChecked={this.state.value == this.props.option}
                        aria-label={this.props.label || this.props.description || this.props.name}
                        {...rest}
                    />
                    <span className="checkmark" />
                </RadioFieldGroup>
            );
        }
        return (
            <InputFieldGroup
                {...this.props}
                error={this.state.error}
                iconState={this.state.value && this.state.value.length > 0 ? 0 : -1}
                onIconStateChange={state => {
                    if (this.props.type === "password") {
                        this.inputObj.current.type = state === 1 ? "text" : "password";
                    }
                }}
            >
                <input
                    title={""}
                    ref={this.inputObj}
                    className={makeClass([!this.state.value && "placeholder-shown"])}
                    placeholder={this.props.placeholder || " "}
                    onChange={this.onChange.bind(this)}
                    onInvalid={this.onInvalid.bind(this)}
                    value={this.state.value}
                    aria-label={this.props.label || this.props.description || this.props.name}
                    {...rest}
                />
            </InputFieldGroup>
        );
    }

    private getSingleBoxID(i) {
        return i + "--single-box--" + this.props.name;
    }
}

function CheckboxFieldGroup(props: InputProps) {
    return (
        <div className={makeClass(["d-form-checkbox", props.className])}>
            <div className={makeClass(["field s"])}>
                {!props.label && props.children}
                {props.label && (
                    <label>
                        {props.children}
                        {props.label}
                    </label>
                )}
                <div className={"field-description " + props.type}>
                    <small>{props.description}</small>
                </div>
            </div>
        </div>
    );
}

function RadioFieldGroup(props: InputProps) {
    return (
        <div className={makeClass(["d-form-radio", props.className])}>
            <div className={makeClass(["field s"])}>
                {!props.label && props.children}
                {props.label && (
                    <label>
                        {props.children}
                        {props.label}
                    </label>
                )}
                <div className={"field-description " + props.type}>
                    <small>{props.description}</small>
                </div>
            </div>
        </div>
    );
}

function InputFieldGroup(props: InputProps) {
    let hasError = props.error && props.error.error;
    // -1 initial state. 0 action, 1 action-alternate
    const [iconState, setIconState] = useState(props.iconState || -1);

    useEffect(() => {
        if (props.iconState !== iconState) {
            setIconState(props.iconState);
            props.onIconStateChange && props.onIconStateChange(props.iconState);
        }
    }, [props.iconState]);
    return (
        <div className={makeClass(["d-form-input", props.className])}>
            <div className={makeClass(["field s", hasError && "error error-input-anim"])}>
                {props.type === "password" ? (
                    <span
                        className={"input-icon"}
                        onClick={() => {
                            let newIconState = iconState !== 0 ? 0 : 1;
                            setIconState(newIconState);
                            props.onIconStateChange && props.onIconStateChange(newIconState);
                        }}
                    >
                        {iconState === 0 ? null : iconState === 1 ? null : null}
                    </span>
                ) : null}

                <div className={"field-description " + props.type}>
                    <small>{props.description}</small>
                    <div className="error-root">
                        {hasError && props.error.errorText && (
                            <small className={"error"}>{props.error.errorText}</small>
                        )}
                    </div>
                </div>
                {props.children}
                {props.label && <label htmlFor={props.name}>{props.label}</label>}
            </div>
        </div>
    );
}

export default Input;
