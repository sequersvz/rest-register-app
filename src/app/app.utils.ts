import { FormValues } from './app.model';

export function convertToArray(stringToArray, separator) {
    if (stringToArray) {
        const array = stringToArray.split(separator);


        return array.map(cat => {
            return cat.trim();
        });
    }
    return null;
}

export function sanitizeVal(obj) {
    const newObj = {};

    Object.keys(obj).forEach(e => {
        if (obj[e].length > 0) {
            newObj[e] = obj[e];
        }
    });

    return newObj;
}
