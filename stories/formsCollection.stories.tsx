import { storiesOf } from "@storybook/react";
import * as React from "react";
import { useState } from "react";
import FormContainer from "../src/app/components/form-container/FormContainer";
import Input, { InputType } from "../src/app/elements/forms/Inputs";
import Container from "../src/app/components/container/Container";

const formListData = [
    {
        caption: "Step 1",
        title: "Share the 8 digits",
        description: "Find the number in the back of your card",
        buttonPrimary: "Next",
        buttonSecondary: "Prev",
        termsInfo: "By clicking next I acknowledge I be who i say I be",
    },
    {
        caption: "Step 2",
        title: "Add your activation code",
        description: "find that number",
        buttonPrimary: "Next",
        buttonSecondary: "Back",
        termsInfo: "By clicking next I acknowledge I be who i say I be",
    },
    {
        caption: "Step 3",
        title: "Address time",
        description: "find that number",
        buttonPrimary: "Next",
        buttonSecondary: "Back",
        termsInfo: "By clicking next I acknowledge I be who i say I be",
    },
    {
        caption: "Step 4",
        title: "Email time",
        description: "find that number",
        buttonPrimary: "Register",
        buttonSecondary: "Back",
        termsInfo: "I will register now.",
    },
];

let InputsAtProgress = ({ progress }) => {
    return (
        <section>
            <fieldset hidden={progress !== 0}>
                <Input
                    type={InputType.splitText}
                    name={"cardNumber"}
                    label={"card id"}
                    required
                    emptyError={"Input something bro"}
                    mask={"705678 9999 9999"}
                    maskChar={""}
                    setValidity={val => {
                        let isValid = val.length !== 14 + 2;
                        return {
                            error: isValid,
                            errorText: (isValid && "Not a valid card number") || "",
                        };
                    }}
                />
            </fieldset>
            <fieldset hidden={progress !== 1}>
                <Input
                    type={InputType.code}
                    singleBoxes={4}
                    required={progress === 1}
                    name={"activationCode"}
                    label={"activation Code"}
                />
            </fieldset>
            <fieldset hidden={progress !== 2}>
                <Input
                    type={InputType.text}
                    required={progress === 2}
                    name={"firstName"}
                    label={"first name"}
                />
                <Input type={InputType.text} name={"lastName"} label={"3last name"} />
                <Input
                    type={InputType.splitText}
                    mask={"**** **"}
                    name={"zipCode"}
                    label={"zip code"}
                />
                <Input type={InputType.number} name={"houseNumber"} label={"house number"} />
            </fieldset>
            <fieldset hidden={progress !== 3}>
                <Input
                    type={InputType.email}
                    name={"email"}
                    required={progress === 3}
                    label={"email"}
                />
                <Input
                    type={InputType.password}
                    name={"password"}
                    required={progress === 3}
                    label={"password"}
                />
            </fieldset>
        </section>
    );
};
storiesOf("Form Collection", module).add("Wrapper", () => {
    const [progress, setProgress] = useState(0);
    let currIndex = progress;
    return (
        <Container padded background={"yellow"} maxWidth>
            <FormContainer
                onPrimaryClick={json => {
                    console.log("primary clicked");
                    console.log(json);
                    setProgress(progress + 1);
                    return new Promise(resolve => resolve());
                }}
                onSecondaryClick={() => {
                    console.log("secondary clicked");
                    setProgress(Math.abs(progress - 1));
                }}
                {...formListData[progress]}
                index={currIndex}
                total={formListData.length}
                extraInfo={<p>You know nothing john snow</p>}
            >
                <div />
                <InputsAtProgress progress={currIndex} />
            </FormContainer>
        </Container>
    );
});
