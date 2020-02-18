import { transformErrorCodes } from "./errorCodesHandler";
import { IFormInputFields } from "../../../contentful/@types/contentful";
/**
 * @param inputData as received from contentful
 */
export const handleInputData = inputData => {
    if (!inputData && !inputData.fields) return {};

    let newVar: IFormInputFields = {
        ...inputData.fields,
        errorCodes: transformErrorCodes(inputData.fields.errorCodes),
    };
    return newVar;
};

export default handleInputData;
