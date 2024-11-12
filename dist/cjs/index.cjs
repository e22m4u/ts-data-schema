"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// dist/esm/index.js
var esm_exports = {};
__export(esm_exports, {
  DataType: () => DataType,
  DataTypeCaster: () => DataTypeCaster,
  DataValidator: () => DataValidator,
  TypeCastError: () => TypeCastError,
  arrayTypeValidator: () => arrayTypeValidator,
  booleanTypeValidator: () => booleanTypeValidator,
  dataTypeFrom: () => dataTypeFrom,
  isRequiredValidator: () => isRequiredValidator,
  numberTypeValidator: () => numberTypeValidator,
  objectTypeValidator: () => objectTypeValidator,
  stringTypeValidator: () => stringTypeValidator,
  typeCastToArray: () => typeCastToArray,
  typeCastToBoolean: () => typeCastToBoolean,
  typeCastToNumber: () => typeCastToNumber,
  typeCastToPlainObject: () => typeCastToPlainObject,
  typeCastToString: () => typeCastToString
});
module.exports = __toCommonJS(esm_exports);

// dist/esm/data-schema.js
var DataType;
(function(DataType2) {
  DataType2["ANY"] = "Any";
  DataType2["STRING"] = "String";
  DataType2["NUMBER"] = "Number";
  DataType2["BOOLEAN"] = "Boolean";
  DataType2["ARRAY"] = "Array";
  DataType2["OBJECT"] = "Object";
})(DataType || (DataType = {}));
function dataTypeFrom(value) {
  if (value == null)
    return void 0;
  const baseType = typeof value;
  if (baseType === "string")
    return DataType.STRING;
  if (baseType === "number")
    return DataType.NUMBER;
  if (baseType === "boolean")
    return DataType.BOOLEAN;
  if (Array.isArray(value))
    return DataType.ARRAY;
  if (baseType === "object")
    return DataType.OBJECT;
  return void 0;
}
__name(dataTypeFrom, "dataTypeFrom");

// dist/esm/errors/type-cast-error.js
var import_js_format = require("@e22m4u/js-format");
var _TypeCastError = class _TypeCastError extends Error {
  value;
  targetType;
  constructor(value, targetType) {
    const sourceType = dataTypeFrom(value);
    const message = (0, import_js_format.format)("Unable to cast %s to %s.", sourceType, targetType);
    super(message);
    this.value = value;
    this.targetType = targetType;
  }
};
__name(_TypeCastError, "TypeCastError");
var TypeCastError = _TypeCastError;

// dist/esm/data-validator.js
var import_js_format4 = require("@e22m4u/js-format");

// dist/esm/errors/validation-error.js
var import_js_format2 = require("@e22m4u/js-format");
var _ValidationError = class _ValidationError extends import_js_format2.Errorf {
};
__name(_ValidationError, "ValidationError");
var ValidationError = _ValidationError;

// dist/esm/validators/array-type-validator.js
function arrayTypeValidator(value, schema, sourcePath) {
  if (schema.type === DataType.ARRAY && !Array.isArray(value)) {
    if (sourcePath) {
      throw new ValidationError("Value of %v must be an Array, but %v given.", sourcePath, value);
    } else {
      throw new ValidationError("Value must be an Array, but %v given.", value);
    }
  }
}
__name(arrayTypeValidator, "arrayTypeValidator");

// dist/esm/validators/is-required-validator.js
function isRequiredValidator(value, schema, sourcePath) {
  if (schema.required && value == null) {
    if (sourcePath) {
      throw new ValidationError("Value of %v is required, but %v given.", sourcePath, value);
    } else {
      throw new ValidationError("Value is required, but %v given.", value);
    }
  }
}
__name(isRequiredValidator, "isRequiredValidator");

// dist/esm/validators/number-type-validator.js
function numberTypeValidator(value, schema, sourcePath) {
  if (schema.type === DataType.NUMBER && (typeof value !== "number" || isNaN(value))) {
    if (sourcePath) {
      throw new ValidationError("Value of %v must be a Number, but %v given.", sourcePath, value);
    } else {
      throw new ValidationError("Value must be a Number, but %v given.", value);
    }
  }
}
__name(numberTypeValidator, "numberTypeValidator");

// dist/esm/validators/object-type-validator.js
function objectTypeValidator(value, schema, sourcePath) {
  if (schema.type === DataType.OBJECT && (value === null || typeof value !== "object" || Array.isArray(value) || value.constructor !== Object)) {
    if (sourcePath) {
      throw new ValidationError("Value of %v must be a plain Object, but %v given.", sourcePath, value);
    } else {
      throw new ValidationError("Value must be a plain Object, but %v given.", value);
    }
  }
}
__name(objectTypeValidator, "objectTypeValidator");

// dist/esm/validators/string-type-validator.js
function stringTypeValidator(value, schema, sourcePath) {
  if (schema.type === DataType.STRING && typeof value !== "string") {
    if (sourcePath) {
      throw new ValidationError("Value of %v must be a String, but %v given.", sourcePath, value);
    } else {
      throw new ValidationError("Value must be a String, but %v given.", value);
    }
  }
}
__name(stringTypeValidator, "stringTypeValidator");

// dist/esm/validators/boolean-type-validator.js
function booleanTypeValidator(value, schema, sourcePath) {
  if (schema.type === DataType.BOOLEAN && typeof value !== "boolean") {
    if (sourcePath) {
      throw new ValidationError("Value of %v must be a Boolean, but %v given.", sourcePath, value);
    } else {
      throw new ValidationError("Value must be a Boolean, but %v given.", value);
    }
  }
}
__name(booleanTypeValidator, "booleanTypeValidator");

// dist/esm/debuggable-service.js
var import_js_service = require("@e22m4u/js-service");

// dist/esm/utils/to-camel-case.js
function toCamelCase(input) {
  return input.replace(/(^\w|[A-Z]|\b\w)/g, (c) => c.toUpperCase()).replace(/\W+/g, "").replace(/(^\w)/g, (c) => c.toLowerCase());
}
__name(toCamelCase, "toCamelCase");

// dist/esm/utils/create-debugger.js
var import_debug = __toESM(require("debug"), 1);
var import_js_format3 = require("@e22m4u/js-format");
function createDebugger(name) {
  const debug = (0, import_debug.default)(`tsDataSchema:${name}`);
  return function(message, ...args) {
    const interpolatedMessage = (0, import_js_format3.format)(message, ...args);
    return debug(interpolatedMessage);
  };
}
__name(createDebugger, "createDebugger");

// dist/esm/debuggable-service.js
var _DebuggableService = class _DebuggableService extends import_js_service.Service {
  /**
   * Debug.
   */
  debug;
  /**
   * Constructor.
   *
   * @param container
   */
  constructor(container) {
    super(container);
    const serviceName = toCamelCase(this.constructor.name);
    this.debug = createDebugger(serviceName);
    this.debug("%v is created.", this.constructor);
  }
};
__name(_DebuggableService, "DebuggableService");
var DebuggableService = _DebuggableService;

// dist/esm/data-validator.js
var _DataValidator = class _DataValidator extends DebuggableService {
  /**
   * Validators.
   *
   * @protected
   */
  validatorMap = /* @__PURE__ */ new Set([
    stringTypeValidator,
    numberTypeValidator,
    booleanTypeValidator,
    arrayTypeValidator,
    objectTypeValidator,
    isRequiredValidator
  ]);
  /**
   * Add validator.
   *
   * @param fn
   */
  addValidator(fn) {
    this.validatorMap.add(fn);
    this.debug("Validator %v is added.", fn.name);
    return this;
  }
  /**
   * Has validator.
   *
   * @param fn
   */
  hasValidator(fn) {
    return this.validatorMap.has(fn);
  }
  /**
   * Get validators.
   */
  getValidators() {
    return Array.from(this.validatorMap.values());
  }
  /**
   * Remove validator.
   *
   * @param fn
   */
  removeValidator(fn) {
    if (this.validatorMap.has(fn)) {
      this.validatorMap.delete(fn);
      this.debug("Validator %v is removed.", fn.name);
      return this;
    }
    throw new import_js_format4.Errorf("Unable to remove non-existent validator %v.", fn.name);
  }
  /**
   * Remove all validators.
   */
  removeAllValidators() {
    this.validatorMap.clear();
    return this;
  }
  /**
   * Validate.
   *
   * @param value
   * @param schema
   * @param sourcePath A path like 'body.user.name' from which the value.
   */
  validate(value, schema, sourcePath) {
    this.debug("Validation.");
    if (sourcePath)
      this.debug("Source path is %v.", sourcePath);
    const validators = this.getValidators();
    if (validators.length) {
      this.debug("%v global validators found.", validators.length);
      validators.forEach((fn) => fn(value, schema, sourcePath));
      this.debug("Global validators are passed.");
    } else {
      this.debug("No global validators found.");
    }
    let localValidators = [];
    if (Array.isArray(schema.validate)) {
      localValidators = schema.validate;
    } else if (typeof schema.validate === "function") {
      localValidators = [schema.validate];
    }
    if (localValidators.length) {
      this.debug("%v local validators found.", localValidators.length);
      localValidators.forEach((fn) => fn(value, schema, sourcePath));
      this.debug("Local validators are passed.");
    } else {
      this.debug("No local validators found.");
    }
    if (schema.type === DataType.ARRAY && schema.items && Array.isArray(value)) {
      this.debug("Starting array items validation.");
      const valueAsArray = value;
      for (const index in valueAsArray) {
        const elValue = valueAsArray[index];
        const elSchema = schema.items;
        const elSourcePath = sourcePath ? `${sourcePath}[${index}]` : `Array[${index}]`;
        this.validate(elValue, elSchema, elSourcePath);
      }
      this.debug("Array items validation is done.");
    }
    if (schema.type === DataType.OBJECT && schema.properties && value !== null && typeof value === "object" && !Array.isArray(value)) {
      this.debug("Starting object properties validation.");
      const valueAsObject = value;
      for (const propName in schema.properties) {
        const propSchema = schema.properties[propName];
        const propValue = valueAsObject[propName];
        const propSourcePath = sourcePath ? `${sourcePath}.${propName}` : propName;
        this.validate(propValue, propSchema, propSourcePath);
      }
      this.debug("Object properties validation is done.");
    }
    this.debug("Validation of %v is done.", sourcePath);
  }
};
__name(_DataValidator, "DataValidator");
var DataValidator = _DataValidator;

// dist/esm/data-type-caster.js
var import_js_format5 = require("@e22m4u/js-format");

// dist/esm/type-casters/type-cast-to-array.js
function typeCastToArray(value) {
  if (Array.isArray(value))
    return value;
  if (typeof value === "string") {
    value = value.trim();
    let newValue;
    try {
      newValue = JSON.parse(value);
    } catch {
    }
    if (Array.isArray(newValue))
      return newValue;
  }
  throw new TypeCastError(value, DataType.STRING);
}
__name(typeCastToArray, "typeCastToArray");

// dist/esm/type-casters/type-cast-to-string.js
function typeCastToString(value) {
  if (typeof value === "string")
    return value;
  if (typeof value === "number")
    return String(value);
  throw new TypeCastError(value, DataType.STRING);
}
__name(typeCastToString, "typeCastToString");

// dist/esm/type-casters/type-cast-to-number.js
function typeCastToNumber(value) {
  if (typeof value === "string") {
    if (value.length <= 20) {
      const newValue = Number(value);
      if (!isNaN(newValue))
        return newValue;
    }
  } else if (typeof value === "number") {
    return value;
  } else if (typeof value === "boolean") {
    return value ? 1 : 0;
  }
  throw new TypeCastError(value, DataType.NUMBER);
}
__name(typeCastToNumber, "typeCastToNumber");

// dist/esm/type-casters/type-cast-to-boolean.js
function typeCastToBoolean(value) {
  if (typeof value === "string") {
    value = value.trim();
    if (value === "1")
      return true;
    if (value === "0")
      return false;
    if (value === "true")
      return true;
    if (value === "false")
      return false;
  } else if (typeof value === "number") {
    if (value === 1)
      return true;
    if (value === 0)
      return false;
  } else if (typeof value === "boolean") {
    return value;
  }
  throw new TypeCastError(value, DataType.BOOLEAN);
}
__name(typeCastToBoolean, "typeCastToBoolean");

// dist/esm/type-casters/type-cast-to-plain-object.js
function typeCastToPlainObject(value) {
  let newValue = value;
  if (typeof value === "string") {
    value = value.trim();
    try {
      newValue = JSON.parse(value);
    } catch {
    }
  }
  if (newValue != null && typeof newValue === "object" && !Array.isArray(newValue) && newValue.constructor === Object) {
    return newValue;
  }
  throw new TypeCastError(value, DataType.OBJECT);
}
__name(typeCastToPlainObject, "typeCastToPlainObject");

// dist/esm/data-type-caster.js
var _DataTypeCaster = class _DataTypeCaster extends DebuggableService {
  /**
   * Type caster map.
   *
   * @protected
   */
  typeCasterMap = /* @__PURE__ */ new Map([
    [DataType.STRING, typeCastToString],
    [DataType.NUMBER, typeCastToNumber],
    [DataType.BOOLEAN, typeCastToBoolean],
    [DataType.ARRAY, typeCastToArray],
    [DataType.OBJECT, typeCastToPlainObject]
  ]);
  /**
   * Set type caster.
   *
   * @param type
   * @param caster
   */
  setTypeCaster(type, caster) {
    this.typeCasterMap.set(type, caster);
    this.debug("A type caster %v is set for %s type.", caster.name, type);
    return this;
  }
  /**
   * Get type caster.
   *
   * @param type
   */
  getTypeCaster(type) {
    const typeCaster = this.typeCasterMap.get(type);
    if (typeCaster)
      return typeCaster;
    throw new import_js_format5.Errorf("No type caster found for %s type.", type);
  }
  /**
   * Cast.
   *
   * @param value
   * @param schema
   * @param options
   */
  cast(value, schema, options) {
    var _a;
    this.debug("Type casting.");
    const sourcePath = options == null ? void 0 : options.sourcePath;
    if (sourcePath)
      this.debug("Source path is %v.", sourcePath);
    const noTypeCastError = (_a = options == null ? void 0 : options.noTypeCastError) != null ? _a : false;
    if (noTypeCastError)
      this.debug("Type cast errors are disabled.");
    if (!schema.type) {
      this.debug("Data schema does not have the type definition.");
      this.debug("Type casting is skipped.");
      return value;
    }
    const targetType = schema.type;
    if (value == null) {
      if (noTypeCastError) {
        this.debug("No type casting required for %v.", value);
        this.debug("Type casting is skipped.");
        return value;
      } else {
        throw new TypeCastError(value, targetType);
      }
    }
    const sourceType = dataTypeFrom(value);
    this.debug("Source type is %s.", sourceType);
    this.debug("Target type is %s.", targetType);
    if (targetType === DataType.ANY) {
      this.debug("No type casting required for Any.");
      this.debug("Type casting is skipped.");
      return value;
    }
    let newValue = value;
    if (sourceType !== targetType) {
      const caster = this.getTypeCaster(schema.type);
      try {
        newValue = caster(value);
      } catch (error) {
        if (noTypeCastError && error instanceof TypeCastError) {
          this.debug(error.message);
          this.debug("Type casting is skipped.");
          return value;
        }
        throw error;
      }
    } else if (sourceType !== DataType.ARRAY && sourceType !== DataType.OBJECT) {
      this.debug("Source and target types are the same.");
      this.debug("Type casting is skipped.");
      return value;
    }
    if (targetType === DataType.ARRAY && schema.items && Array.isArray(newValue)) {
      this.debug("Starting type casting of array items.");
      const valueAsArray = newValue;
      for (const index in valueAsArray) {
        const elValue = valueAsArray[index];
        const elSchema = schema.items;
        const elSourcePath = sourcePath ? `${sourcePath}[${index}]` : `Array[${index}]`;
        valueAsArray[index] = this.cast(elValue, elSchema, {
          sourcePath: elSourcePath,
          noTypeCastError
        });
      }
      this.debug("Type casting of array items is done.");
    }
    if (schema.type === DataType.OBJECT && schema.properties && newValue !== null && typeof newValue === "object" && !Array.isArray(newValue)) {
      this.debug("Starting type casting of object properties.");
      const valueAsObject = newValue;
      for (const propName in schema.properties) {
        const propSchema = schema.properties[propName];
        const propValue = valueAsObject[propName];
        const propSourcePath = sourcePath ? `${sourcePath}.${propName}` : propName;
        valueAsObject[propName] = this.cast(propValue, propSchema, {
          sourcePath: propSourcePath,
          noTypeCastError
        });
      }
      this.debug("Type casting of object properties is done.");
    }
    this.debug("%s has been casted to %s.", sourceType, targetType);
    this.debug("New value is %v.", newValue);
    return newValue;
  }
};
__name(_DataTypeCaster, "DataTypeCaster");
var DataTypeCaster = _DataTypeCaster;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DataType,
  DataTypeCaster,
  DataValidator,
  TypeCastError,
  arrayTypeValidator,
  booleanTypeValidator,
  dataTypeFrom,
  isRequiredValidator,
  numberTypeValidator,
  objectTypeValidator,
  stringTypeValidator,
  typeCastToArray,
  typeCastToBoolean,
  typeCastToNumber,
  typeCastToPlainObject,
  typeCastToString
});
