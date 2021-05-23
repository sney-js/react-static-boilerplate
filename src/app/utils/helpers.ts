export function getByPath(object, path) {
  return path.split(/[.[\]]+/).reduce((obj, part) => obj && obj[part], object);
}

export function makeClass(classes: Array<string>) {
  return classes
    .filter((e) => e)
    .join(' ')
    .trim();
}

/**
 * detect and extract all values which should be interpolated with {{value}} syntax,
 * for example passing array of strings like ["Logged In Title {{name}} {{balance}}"] will returns ["name", "balance"]
 * @param items
 */
export function getInterpolation(items: Array<string>): Array<string> {
  const regexp = /\{\{([^}]+)\}\}/g;
  const result = items
    .map((item) => {
      const matches = [];
      let match = regexp.exec(item);
      while (match != null) {
        matches.push(match[1]);
        match = regexp.exec(item);
      }
      return matches;
    })
    .filter((e) => !!e);
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
    const regexp = new RegExp('{{' + item + '}}', 'g');
    return prev.replace(regexp, (data && data[item]) || '');
  }, text);

  return result;
}

export function splitIntoChunks(array: Array<any>, chunkSize: number) {
  return [].concat.apply(
    [],
    array.map(function (elem, i) {
      return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
    })
  );
}

export function cleanWhitespaces(str) {
  return str.replace(/ /gi, '');
}

export const WINDOW: any =
  (typeof self === 'object' && self.self === self && self) ||
  (typeof global === 'object' && global.global === global && global) ||
  this;

export const HAS_WINDOW: boolean =
  typeof window !== 'undefined' && typeof document !== 'undefined';

export const delay = (time = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), time);
  });
};

export type CSSVarType = {
  [key: string]: string | number | undefined;
};
export type CSSVarTypeReturn = {
  [key: string]: string | number;
};
export const setCSSVar = (obj: CSSVarType): CSSVarTypeReturn => {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (obj[key] === undefined) {
        delete obj[key];
      }
    }
  }
  return obj as CSSVarTypeReturn;
};
