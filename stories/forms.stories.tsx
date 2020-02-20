import { storiesOf } from "@storybook/react";
import * as React from "react";
import Input, { InputType } from "../src/app/elements/forms/Inputs";
import Form from "../src/app/elements/forms/Form";
import Container from "../src/app/components/container/Container";
import { useState } from "react";
import Button from "../src/app/elements/button/Button";

storiesOf("Form Elements", module).add("All Elements", () => {
    const [submits, setSubmits] = useState(0);
    console.log("state changed", submits);
    return (
        <Container background={"Primary"} pad={"All"}>
            <Form
                onSubmit={data => {
                    setSubmits(submits + 1);
                    console.log("Do something with the data:");
                    console.log(data);
                    // rare case: return false to use default html fom 'action'
                    return new Promise<any>(r => setTimeout(() => r(), 1000));
                }}
                onInvalid={e => {
                    console.log("e is not valid");
                }}
            >
                <Input
                    type={InputType.text}
                    label={"Name"}
                    name={"name"}
                    placeholder={"Firstname Lastname"}
                    description={"Must not be more than 8 characters."}
                    setValidity={value => {
                        let isValid = value.trim().length > 8;
                        return { error: !!isValid, errorText: isValid && "What did I just say?" };
                    }}
                />
                <Input
                    type={InputType.password}
                    label={"Password"}
                    name={"password"}
                    required
                    emptyError={"NO NON O"}
                    error={{
                        error: submits % 2 === 1,
                        errorText: "I will show error on every other submit",
                    }}
                />
                <Input
                    type={InputType.splitText}
                    label={"Card ID"}
                    name={"card-number"}
                    mask={"9999 9999 99"}
                    emptyError={"NO NON O"}
                    description={"e.g. 1234 5678 90"}
                    maskChar={""}
                    error={{ error: true, errorText: "fill it" }}
                    setValidity={value => {
                        let isValid = value.trim().length > 0 && value.trim().length < 12;
                        return {
                            error: !!isValid,
                            errorText: isValid && "Must be in the format 9999 9999 99",
                        };
                    }}
                />
                <Input type={InputType.code} label={"Pin Code"} name={"pin"} singleBoxes={4} />
                <h3>Toggles</h3>
                <Input
                    description={"Click to receive personal offers"}
                    type={InputType.toggle}
                    label={"Personal offes"}
                    defaultChecked={true}
                    name={"personal_offer"}
                    required={true}
                />
                <Input type={InputType.toggle} label={"Newsletter"} name={"newsletter"} />
                <h3>Radio</h3>
                <div
                    style={{
                        display: "flex",
                    }}
                >
                    <Input
                        type={InputType.radio}
                        label={"Male"}
                        name={"gender"}
                        description={"some description"}
                        value={"M"}
                    />
                    <Container pad={"Horizontal"}>
                        <Input
                            type={InputType.radio}
                            label={"Female"}
                            description={"some description"}
                            name={"gender"}
                            value={"F"}
                        />
                    </Container>
                </div>

                <h3>Checkbox</h3>

                <div
                    style={{
                        display: "flex",
                    }}
                >
                    <Input
                        type={InputType.checkbox}
                        label={"Male"}
                        name={"keepLoggedIn"}
                        description={"some description"}
                    />
                </div>

                <Button type={"submit"}>Submit</Button>
            </Form>
        </Container>
    );
});

storiesOf("Form Elements", module).add("Error + Disabled", () => (
    <Container background={"Primary"} pad={"All"}>
        <Form
            onSubmit={data => {
                console.log("Do something with the data:");
                console.log(data);
                // rare case: return false to use default html fom 'action'
                return new Promise<any>(r => setTimeout(() => r(), 1000));
            }}
            onInvalid={e => {
                console.log("e is not valid");
            }}
        >
            <h3>Error</h3>
            <Input
                type={InputType.text}
                label={"Name"}
                name={"error-name"}
                value={"Done Jon"}
                // error={{ error: true, errorText: "It's not your real name!!" }}
                placeholder={"Firstname Lastname"}
                description={"This must be your legal name"}
            />
            <Input
                type={InputType.splitText}
                label={"Card ID"}
                name={"card-number"}
                required={true}
                mask={"9999 9999 99"}
                description={"e.g. 1234 5678 90"}
                maskChar={""}
                emptyError={"nop"}
            />
            <Input
                type={InputType.code}
                label={"Pin Code"}
                name={"pin"}
                singleBoxes={4}
                error={{ error: true, errorText: "Please fill" }}
            />
            <h3>Empty Error</h3>
            <Input
                type={InputType.text}
                label={"Name"}
                name={"error-name2"}
                required
                emptyError={"It's not your real name!!"}
                placeholder={"Firstname Lastname"}
                description={"This must be your legal name"}
            />
            <Input
                type={InputType.splitText}
                label={"Card ID"}
                name={"card-number1"}
                mask={"9999 9999 99"}
                description={"e.g. 1234 5678 90"}
                maskChar={""}
                required
                emptyError={"It's not your real name!!"}
            />
            <Input
                type={InputType.code}
                label={"Pin Code"}
                name={"pin3"}
                singleBoxes={4}
                required
                emptyError={"It's not your real name!!"}
            />
            <h3>Disabled</h3>
            <Input
                type={InputType.text}
                label={"Middle Name"}
                disabled={true}
                name={"middle-name"}
                placeholder={"Middlename"}
                description={"Disabled with predefined value"}
                value={"Don Jon"}
            />
            <Input
                type={InputType.text}
                label={"Middle Name"}
                disabled={true}
                description={"Disabled with no value"}
                name={"middle-name-no-value"}
            />
            <Input
                type={InputType.code}
                label={"Pin Code"}
                name={"pin4"}
                singleBoxes={4}
                disabled={true}
            />
            <Button type={"submit"}>Submit</Button>
        </Form>
    </Container>
));

storiesOf("Form Elements", module).add("Required", () => (
    <Container background={"Primary"} pad={"All"}>
        <Form
            onSubmit={data => {
                console.log("SENT");
                return new Promise<any>(r => setTimeout(() => r(), 1000));
            }}
            onInvalid={e => {
                let einput = e.target as HTMLInputElement;
                if (einput instanceof HTMLInputElement) {
                    console.error(einput.name, "is not valid");
                }
            }}
        >
            <h3>Error</h3>
            <Input
                type={InputType.text}
                label={"Name"}
                emptyError={"No bro you need text"}
                name={"error-name"}
                required={true}
                placeholder={"Firstname Lastname"}
                description={"This must be your legal name"}
            />
            <Input type={InputType.email} label={"email"} name={"email4"} required={true} />
            <Input type={InputType.password} label={"Password"} name={"password"} required={true} />
            <Input
                type={InputType.splitText}
                label={"Card ID"}
                name={"card-number"}
                emptyError={"No bro you need text"}
                required={true}
                mask={"9999 9999 99"}
                description={"e.g. 1234 5678 90"}
            />
            <Input
                type={InputType.code}
                label={"Pin Code"}
                name={"pin"}
                required={true}
                singleBoxes={4}
            />
            <Input
                type={InputType.toggle}
                label={"Required: please tick"}
                required={false}
                name={"middle-name-no-valuew"}
            />
            <Button type={"submit"}>Submit</Button>
        </Form>
    </Container>
));

storiesOf("Form Elements", module).add("Validation", () => (
    <Container background={"Primary"} pad={"All"}>
        <Form
            onSubmit={data => {
                console.log("SENT");
                return new Promise<any>(resolve => resolve());
            }}
            onInvalid={e => {
                console.log(e.target, "e is not valid");
            }}
        >
            <Input
                type={InputType.text}
                label={"Name"}
                emptyError={"No bro you need text"}
                name={"error-name"}
                required={true}
                placeholder={"Firstname Lastname"}
                description={"This must be your legal name"}
                setValidity={val => {
                    if (val.length > 4) {
                        return { error: true, errorText: "too long" };
                    }
                }}
            />
            <Button type={"submit"}>Submit</Button>
        </Form>
    </Container>
));
