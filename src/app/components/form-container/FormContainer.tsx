import React, { Component } from "react";
import { generateClassList } from "../../utils/helpers";
import Form, { FormProps } from "../../elements/forms/Form";
import Button from "../../elements/button/Button";
import Container from "../container/Container";
import Link from "../../containers/link/link";

const style = require("./formcontainer.module.scss");

export enum FormCTAPosition {
    LEFT = "LEFT",
    RIGHT = "RIGHT",
    NONE = "NONE",
}

export type FormContainerProps = {
    caption?: string;
    title: string;
    description?: string;
    buttonPrimary?: string;
    buttonSecondary?: string;
    buttonSecondaryElement?: any;
    footnote?: string;
    extraInfo?: React.ReactElement;
    /**
     * replaces onSubmit
     * @param json
     */
    onSubmit?: never;
    onChange?: FormProps["onChange"];
    onPrimaryClick: (json: object) => Promise<any>;
    onSecondaryClick: () => void;
    index: number;
    total: number;
    ctaPosition: FormCTAPosition;
} & FormProps;

class FormContainer extends Component<FormContainerProps> {
    static defaultProps = {
        ctaPosition: FormCTAPosition.LEFT,
    };

    state = {
        inProgress: false,
        index: this.props.index,
    };

    getFormCTA() {
        const buttonPrimary = this.props.buttonPrimary;
        const buttonSecondary = this.props.buttonSecondary;
        const buttonSecondaryElement = Link({ item: this.props.buttonSecondaryElement });

        return (
            <div className={style.formCtaRoot}>
                {buttonSecondaryElement ? (
                    <Button
                        type="reset"
                        link={buttonSecondaryElement}
                        text={buttonSecondaryElement.props.title}
                    />
                ) : buttonSecondary ? (
                    <Button
                        type="reset"
                        onClick={this.props.onSecondaryClick}
                        disabled={this.props.index === 0 || this.state.inProgress}
                    >
                        {buttonSecondary}
                    </Button>
                ) : null}
                {buttonPrimary && (
                    <Button disabled={this.state.inProgress} type="submit">
                        {buttonPrimary}
                    </Button>
                )}
            </div>
        );
    }

    render() {
        let classNames = generateClassList(["form-container-series", style.formContainerComponent]);

        return (
            <Container maxWidth padded_y padded_x_desktop>
                <Container padded_x={true}>
                    <Form
                        className={classNames}
                        onSubmit={json => {
                            this.setState({ inProgress: true });
                            return this.props.onPrimaryClick(json).then(() => {
                                this.setState({ inProgress: false });
                            });
                        }}
                        onChange={input => {
                            this.props.onChange && this.props.onChange(input);
                        }}
                        error={!this.state.inProgress ? this.props.error : null}
                    >
                        <div className={style.formTextGroup}>
                            <h4 className={"caption"}>{this.props.caption}</h4>
                            <h1 className={"title"}>{this.props.title}</h1>
                            <div className={style.description}>{this.props.description}</div>
                        </div>

                        {/* You ask why dont we apply animation to input too?
                         its because clicking next/back changes key of parent component,
                         and react doesnt remember the input value that was entered */}
                        <div className={style.formWrapper}>
                            {this.props.children}
                            {this.props.ctaPosition === FormCTAPosition.RIGHT && this.getFormCTA()}
                        </div>
                        <div>
                            {this.props.ctaPosition === FormCTAPosition.LEFT && this.getFormCTA()}
                            {this.props.total > 1 && (
                                <div className={style.formDots}>
                                    {[...Array(this.props.total)].map((_, i) => (
                                        <i
                                            className={
                                                i === this.props.index && style.formDotsActive
                                            }
                                        />
                                    ))}
                                </div>
                            )}
                            <div className={style.terms}>
                                <small>{this.props.footnote}</small>
                            </div>
                        </div>
                    </Form>
                </Container>
                {this.props.extraInfo ? (
                    <Container padded_x_desktop className={style.formFooter}>
                        <div>{this.props.extraInfo}</div>
                    </Container>
                ) : null}
            </Container>
        );
    }
}

export default FormContainer;
