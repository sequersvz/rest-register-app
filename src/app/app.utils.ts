import { FormValues } from './app.model';

export function convertToArray(stringToArray, separator: string) {
    if (stringToArray) {
        const array = stringToArray.split(separator);


        return array.map(cat => {
            return cat.trim();
        });
    }
    return null;
}

export function sanitizeValForAPI(obj: FormValues) {
    const newObj: {[key: string]: any} = {};

    Object.keys(obj).forEach(e => {
        if (obj[e] !== null && obj[e].length > 0 && e !== 'Direction' && e !== undefined) {
            newObj[e] = obj[e];
        }
    });

    newObj.Ubication = {
        Direction: obj.Direction
    };

    return newObj;
}
