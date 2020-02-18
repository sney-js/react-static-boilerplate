import { Component } from "react";

type SeriesInputComponentProps = { progress: number; inputData: Array<any>; disabled?: boolean; onBlur?: Function };

export class SeriesInputComponent extends Component<SeriesInputComponentProps> {
    protected static commonProps(data: any, isActive?: boolean) {
        const { name, lastValue, ...allowedProps } = data;
        let allInfo: any = {
            ...allowedProps,
            required: isActive !== undefined ? isActive : true,
            label: data.label,
            description: data.description,
            error: data.error,
            emptyError: data.errorEmpty,
            invalidError: data.errorInvalid,
            autoComplete: "off",
            isActive,
        };
        if (data.inputFormatting) allInfo.mask = data.inputFormatting;
        return allInfo;
    }

    public static getDataItem(name, data) {
        return data.find(input => {
            return input.fieldName === name;
        });
    }
}
