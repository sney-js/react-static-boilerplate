export function getByPath(object, path) {
    return path.split(/[.[\]]+/).reduce((obj, part) => obj && obj[part], object);
}

export function generateClassList(classes: Array<string>) {
    return classes
        .filter(e => e)
        .join(" ")
        .trim();
}

/**
 * detect and extract all values which should be interpolated with {{value}} syntax,
 * for example passing array of strings like ["Logged In Title {{name}} {{balance}}"] will returns ["name", "balance"]
 * @param items
 */
export function getInterpolation(items: Array<string>): Array<string> {
    let regexp = /\{\{([^}]+)\}\}/g;
    let result = items
        .map(item => {
            let matches = [];
            let match = regexp.exec(item);
            while (match != null) {
                matches.push(match[1]);
                match = regexp.exec(item);
            }
            return matches;
        })
        .filter(e => !!e);
    return [].concat.apply([], result);
}

/**
 * replace values which should be interpolated ({{value}}) with data from supplied object (if key exists),
 * for example "Logged In Title {{name}} {{balance}}" and object {name: "David"} returns "Logged In Title David {{balance}}"
 * @param text
 * @param data
 */
export function applyInterpolation(text: string, data: any) {
    const interpolations = getInterpolation([text]);

    if (!interpolations.length) return text;

    const result = interpolations.reduce((prev, item) => {
        const regexp = new RegExp("{{" + item + "}}", "g");
        return prev.replace(regexp, (data && data[item]) || "");
    }, text);

    return result;
}

export function splitIntoChunks(array: Array<any>, chunkSize: number) {
    return [].concat.apply(
        [],
        array.map(function(elem, i) {
            return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
        }),
    );
}

export function cleanWhitespaces(str) {
    return str.replace(/ /gi, "");
}
