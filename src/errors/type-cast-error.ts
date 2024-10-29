import {format} from '@e22m4u/js-format';
import {DataType} from '../data-schema.js';
import {dataTypeFrom} from '../data-schema.js';

/**
 * Type cast error.
 */
export class TypeCastError extends Error {
  constructor(
    readonly value: unknown,
    readonly targetType: DataType,
  ) {
    const sourceType = dataTypeFrom(value);
    const message = format('Unable to cast %s to %s.', sourceType, targetType);
    super(message);
  }
}
