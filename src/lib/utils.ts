import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('1234567890abcdef', 10);

import democonfig from '@/slices/hereo.config.json';

export function getNormalizedSlice(schema: Schema) {
  const id = `slice-${nanoid()}`;
  const { fieldsKeys, fields } = getNormalizedFields(schema.fields);
  const slice = {
    [id]: {
      id: id,
      type: schema.type,
      name: schema.name,
      children: fieldsKeys,
      schema: schema.fields,
      display: schema.display,
    },
  };
  return { slice, sliceKey: id, fields, fieldsKeys };
}

export function getNormalizedFields(schema: Fields) {
  const subFields: Array<NormalizedField> = [];
  const data = Object.keys(schema).reduce(
    (obj: NormalizedFields, field: string) => {
      const type = schema[field].config.type;
      const id = `field-${nanoid()}`;
      switch (type) {
        case 'array':
          {
            const { item, fields, itemKey } = getNormalizedItem(
              schema[field].fields as Fields,
            );
            subFields.push(Object.assign({}, item, fields));

            obj[id] = {
              id: id,
              type: schema[field].config.type,
              name: schema[field].config.name,
              props: {
                [schema[field].config.name]: schema[field].config.placeholder,
              },
              children: [itemKey],
              schema: schema[field].fields,
            };
          }

          return obj;
        default: {
          obj[id] = {
            id: id,
            type: schema[field].config.type,
            name: schema[field].config.name,
            format: schema[field].config.format,
            props: {
              [schema[field].config.name]: schema[field].config.placeholder,
            },
            children: [],
            schema: {
              [field]: {
                config: schema[field].config,
              },
            },
          };

          return obj;
        }
      }
    },
    {},
  );
  return {
    fields: Object.assign({}, ...subFields, data),
    fieldsKeys: Object.keys(data),
  };
}

/**
 * Generates a normalized item with a unique ID and normalized fields.
 *
 * @param {Fields} fields - The fields to normalize.
 */
export function getNormalizedItem(fields: Fields) {
  const id = `item-${nanoid()}`;
  const { fields: normalized, fieldsKeys } = getNormalizedFields(fields);
  return {
    fields: normalized,
    itemKey: id,
    item: {
      [id]: {
        id: id,
        type: 'group-item',
        name: 'item',
        children: fieldsKeys,
        props: {},
        schema: fields,
      },
    },
  };
}

/**REWORK */

const demo = {
  id: 'feature_twin',
  type: 'SharedSlice',
  name: 'FeatureTwin',
  display: 'default',
  description: 'FeatureTwin',
  fields: {
    title: {
      type: 'StructuredText',
      config: {
        label: 'title',
        placeholder: '',
        allowTargetBlank: true,
        single:
          'paragraph,preformatted,heading1,heading2,heading3,heading4,heading5,heading6,strong,em,hyperlink,image,embed,list-item,o-list-item,rtl',
      },
    },
    description: {
      type: 'StructuredText',
      config: {
        label: 'description',
        placeholder: '',
        allowTargetBlank: true,
        single:
          'paragraph,preformatted,heading1,heading2,heading3,heading4,heading5,heading6,strong,em,hyperlink,image,embed,list-item,o-list-item,rtl',
      },
    },
    buttons: {
      type: 'Group',
      config: {
        label: 'buttons',
        repeat: 'true',
        fields: {
          title: {
            config: {
              type: 'text',
              name: 'Label',
              placeholder: 'Contact',
            },
          },
          kind: {
            config: {
              type: 'text',
              name: 'Kind',
              placeholder: 'Primary',
            },
          },
        },
      },
    },
  },
};

interface SliceFromSchemaProps {
  name: string;
  id: string;
  type: string;
}

class Slice implements SliceFromSchemaProps {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly children: Array<string>;
  constructor(schema: SliceFromSchemaProps) {
    this.id = `${schema.type}-${nanoid()}`;
    this.name = schema.name;
    this.type = schema.type;
    this.children = [];
  }
}

interface FieldFromSchemaProps {
  type: string;
}

class StructuredTextField {
  readonly id: string;
  readonly type: string;
  constructor(schema: FieldFromSchemaProps) {
    this.id = `${schema.type}-${nanoid()}`;
    this.type = schema.type;
  }
}

interface GroupFieldFromSchemaProps {
  type: string;
  config: {
    fields: Record<string, FieldFromSchemaProps>;
  };
}

class GroupField {
  readonly id: string;
  readonly type: string;
  readonly children: Array<string>;
  constructor(schema: GroupFieldFromSchemaProps) {
    this.id = `${schema.type}-${nanoid()}`;
    this.type = schema.type;
    this.children = Object.keys(map(schema.config.fields));
  }
}

const slice = new Slice(demo);

function create(schema: any) {
  switch (schema.type) {
    case 'Group':
      return new GroupField(schema);
    default:
      return new StructuredTextField(schema);
  }
}

function map(fields: Record<string, any>) {
  return Object.values(fields).reduce((acc, schema) => {
    const field = create(schema);
    return {
      ...acc,
      [field.id]: field,
    };
  }, {});
}

console.log(map(demo.fields));

console.log(slice);

/**  buttons: {
      type: 'Group',
      config: {
        label: 'buttons',
        repeat: 'true',
        fields: {
          title: {
            config: {
              type: 'text',
              name: 'Label',
              placeholder: 'Contact',
            },
          },
          kind: {
            config: {
              type: 'text',
              name: 'Kind',
              placeholder: 'Primary',
            },
          },
        },
      },
    }, */

/** */
