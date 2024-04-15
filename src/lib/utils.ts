import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('1234567890abcdef', 10);

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
    },
  };
  return { slice, sliceKey: id, fields, fieldsKeys };
}

export function getNormalizedFields(schema: Fields) {
  const subFields: Array<NormalizedField> = [];
  let imageItem = {};
  const data = Object.keys(schema).reduce(
    (obj: NormalizedFields, field: string) => {
      const type = schema[field].config.type;
      const id = `${schema[field].config.type}-${nanoid()}`;
      switch (type) {
        case 'gallery':
          const image = getNormalizedImage();
          imageItem = { [image.id]: image };
          obj[id] = {
            id: id,
            type: schema[field].config.type,
            name: schema[field].config.name,
            props: {
              [schema[field].config.name]: schema[field].config.placeholder,
            },
            children: [image.id],
            schema: schema[field].fields,
          };
          return obj;
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
    fields: Object.assign({}, ...subFields, imageItem, data),
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

export function getNormalizedImage() {
  const id = `image-${nanoid()}`;
  return {
    id: id,
    type: 'image-item',
    name: 'image',
    children: [],
    props: {
      src: 'https://images.prismic.io/slicemachine-blank/26d81419-4d65-46b8-853e-8ea902e160c1_groovy.png',
      alt: 'xxxxxxxx',
    },
    schema: {},
  };
}
