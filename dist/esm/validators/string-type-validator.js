import { DataType } from '../data-schema.js';
import { ValidationError } from '../errors/validation-error.js';
/**
 * String type validator.
 *
 * @param value
 * @param schema
 * @param sourcePath
 */
export function stringTypeValidator(value, schema, sourcePath) {
    if (schema.type === DataType.STRING && typeof value !== 'string') {
        if (sourcePath) {
            throw new ValidationError('Value of %v must be a String, but %v given.', sourcePath, value);
        }
        else {
            throw new ValidationError('Value must be a String, but %v given.', value);
        }
    }
}