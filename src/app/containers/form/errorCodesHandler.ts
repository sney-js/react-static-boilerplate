export const transformErrorCodes = function(errorCodes) {
    if (!errorCodes) return [];

    return errorCodes
        .map(e => {
            const errorSplit = e.split("#").map(e => e.trim());
            if (errorSplit.length === 2 && parseInt(errorSplit[0])) {
                return {
                    code: parseInt(errorSplit[0]),
                    error: errorSplit[1],
                };
            }
            return undefined;
        })
        .filter(e => e);
};

const errorCodesDataHandler = item => {
    if (!item) return null;

    delete item.sys;
    let errorsList = transformErrorCodes(item.fields.errorCodes);

    errorsList.push({ code: 0, error: item.fields.genericError });
    errorsList.push({ code: -1, error: item.fields.unreachableError });

    return errorsList;
};

export default errorCodesDataHandler;
