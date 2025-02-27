# @e22m4u/ts-data-schema

*English | [Русский](./README-ru.md)*

Data validation and type casting for TypeScript.

## Key Features

- **DataValidator** - Validation service with built-in type checking.
- **DataTypeCaster** - Value conversion service according to data schema.
- Extensible architecture allowing custom validators and type casters.
- Detailed debugging.

## Usage

Data validation.

```ts
import {DataType} from '@e22m4u/ts-data-schema';
import {DataValidator} from '@e22m4u/ts-data-schema';

const validator = new DataValidator();

// define a schema
const schema = {
  type: DataType.STRING,
  // additional options
};

// validate values by the schema
validator.validate('John', schema); // returns undefined
validator.validate(10, schema);     // throws ValidationError
```

Using a custom validator.

```ts
import {DataType} from '@e22m4u/ts-data-schema';
import {DataValidator} from '@e22m4u/ts-data-schema';
import {ValidationError} from '@e22m4u/ts-data-schema';

const validator = new DataValidator();

// define a custom validator
function nonEmptyString(value) {
  if (!value || typeof value !== 'string')
    throw new ValidationError('Non-empty string required.');
}

// define a schema
const schema = {
  type: DataType.STRING,
  validate: nonEmptyString, // set your validator
  // validate: [myValidator1, myValidator2, ...],
};

// validate values by the schema
validator.validate('John', schema); // returns undefined
validator.validate('', schema);     // throws ValidationError
```

Value conversion according to the schema.

```ts
import {DataType} from '@e22m4u/ts-data-schema';
import {DataTypeCaster} from '@e22m4u/ts-data-schema';

const typeCaster = new DataTypeCaster();

// define a schema
const schema = {
  type: DataType.NUMBER,
  // additional options
};

// cast type by the schema
// or throw TypeCastError
typeCaster.cast('10', schema);  // returns 10 as number
typeCaster.cast('foo', schema); // throws TypeCastError

// cast type by the schema
// or return value as is
typeCaster.cast('10', schema, {noTypeCastError: true});  // returns 10
typeCaster.cast('foo', schema, {noTypeCastError: true}); // returns "foo"
```

Using decorators to define an object schema.

```ts
import {dsNumber} from '@e22m4u/ts-data-schema';
import {dsObject} from '@e22m4u/ts-data-schema';
import {dsString} from '@e22m4u/ts-data-schema';
import {ClassToPlain} from '@e22m4u/ts-data-schema';
import {getDataSchemaFromClass} from '@e22m4u/ts-data-schema';

@dsObject()
class AuthorSchema {
  @dsNumber({required: true})
  id!: number;

  @dsString({validate: nonEmptyString})
  name?: string;
}

type Author = ClassToPlain<AuthorSchema>;
// {
//   id: string,
//   name?: string | undefined,
// }

const authorSchema = getDataSchemaFromClass(AuthorSchema);
console.log(authorSchema);
// {
//   type: "object",
//   properties: {
//     id: {
//       type: "number",
//       required: true,
//     },
//     name: {
//       type: "string",
//       validate() {...}
//     },
//   },
// }
```

Nesting object schemas using decorators.

```ts
import {dsNumber} from '@e22m4u/ts-data-schema';
import {dsObject} from '@e22m4u/ts-data-schema';
import {dsString} from '@e22m4u/ts-data-schema';
import {ClassToPlain} from '@e22m4u/ts-data-schema';
import {getDataSchemaFromClass} from '@e22m4u/ts-data-schema';

@dsObject()
class PostSchema {
  @dsNumber({required: true})
  id!: number;

  @dsString({validate: nonEmptyString})
  title?: string;

  @dsObject(() => AuthorSchema, {required: true})
  author!: Author;
  // AuthorSchema and Author
  // are defined in the example above
}

type Post = ClassToPlain<PostSchema>;
// {
//   id: string,
//   title?: string | undefined,
//   author: {
//     id: string,
//     name?: string | undefined,
//   }
// }

const postSchema = getDataSchemaFromClass(PostSchema);
console.log(postSchema);
// {
//   type: "object"
//   properties: {
//     id: {
//       type: "number",
//       required: true,
//     },
//     title: {
//       type: "string",
//       validate() {...},
//     },
//     author: {
//       type: "object",
//       required: true,
//       properties: {
//         id: {
//           type: "number",
//           required: true,
//         },
//         name: {
//           type: "string",
//           validate() {...},
//         },
//       },
//     }
//   }
// }
```

## DataSchema

`DataSchema` is an object that defines the structure for data validation
and type casting. The schema provides a flexible way to describe the shape
and constraints of your data. Let's look at the schema object definition.

```ts
type DataSchema = {
  type: DataType;
  items?: DataSchema;
  properties?: {[key: string]: DataSchema};
  required?: boolean;
  validate?: CallableValidator | CallableValidator[];
};
```

#### type

Defines the value type using the constants listed below.

- `DataType.ANY` - accepts any type
- `DataType.STRING` - string values
- `DataType.NUMBER` - numeric values
- `DataType.BOOLEAN` - boolean values
- `DataType.ARRAY` - array values
- `DataType.OBJECT` - plain object values

```ts
import {DataType} from '@e22m4u/ts-data-schema';

const schema = {
  type: DataSchema.STRING,
}
```

#### items

Used for arrays to define schema of array elements.
This is a nested `DataSchema` that describes each item in the array.

```ts
const schema = {
  type: DataSchema.ARRAY,
  items: {type: DataSchema.STRING},
}
```

#### properties

Used for objects to define schema of object properties.
Each property is a key-value pair where the value is a nested
`DataSchema`.

```ts
const schema = {
  type: DataSchema.OBJECT,
  properties: {
    foo: {type: DataSchema.STRING},
    bar: {type: DataSchema.NUMBER},
  },
}
```

#### required

Indicates if the value is required. When `true`, the value cannot
be `undefined` or `null`.

```ts
const schema = {
  type: DataSchema.ANY,
  required: true,
}
```

#### validate

Custom validation function(s) to apply additional rules. Can be
a single function or an array of functions.

```ts
const schema = {
  type: DataSchema.ANY,
  validate: (value: unknown) => {
    if (typeof value !== 'string')
      throw new Error('A string required.');
  },
}
```

Multiple validators usage.

```ts
const schema = {
  type: DataSchema.ANY,
  validate: [
    myValidator1,
    myValidator2,
  ],
}
```

Validator arguments usage.

```ts
import {DataSchema} from '@e22m4u/ts-data-schema';

function noEmptyString(
  value: unknown,
  schema: DataSchema,
  sourcePath?: string,
) {
  if (!value || typeof value !== 'string') {
    if (sourcePath)
      throw new ValidationError(
        'Value of %v must be a non-empty String, but %v given.',
        sourcePath,
        value,
      );
    throw new ValidationError(
      'Value must be a non-empty String, but %v given.',
      value,
    );
  }
}
```

## Decorators

Decorators provide a convenient way to define data schemas using
TypeScript classes.

Common decorators:

- `@dataSchema` - base decorator for defining data schema
- `@dsProperty` - decorator for defining schema properties

Decorators for specific data types:

- `@dsAny` - for values of any type
- `@dsString` - for string values
- `@dsNumber` - for numeric values
- `@dsBoolean` - for boolean values
- `@dsArray` - for arrays
- `@dsObject` - for objects

#### @dsObject

The `@dsObject` decorator defines a class as an object schema. It enables
structure generation through the `getDataSchemaFromClass` utility. Combined
with property decorators, `@dsObject` forms a system for data description
and validation, which is particularly important for complex object structures
with nested types.

```ts
import {dsObject} from '@e22m4u/ts-data-schema';
import {getDataSchemaFromClass} from '@e22m4u/ts-data-schema';

@dsObject()
class PostSchema {
  // ...
}

const postSchema = getDataSchemaFromClass(PostSchema);
console.log(postSchema);
// {
//   "type": "object",
//   "properties": { ... }
// }
```

## Debugging

Enable logs by setting the `DEBUG` environment variable.

```bash
DEBUG=tsDataSchema* npm run test
```

## Tests

Run the test suite.

```bash
npm run test
```

## License

MIT
