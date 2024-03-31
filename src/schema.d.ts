type NormalizedFields = {
  [key: string]: NormalizedField;
};

type NormalizedField = {
  id: string;
  name: string;
  type: string;
  props: Record<string, any>;
  children: string[];
  schema?: Fields;
};

/** SCHEMA */
interface Config {
  type: string;
  name: string;
  placeholder: unknown;
}

interface Field {
  config: Config;
  fields?: Record<string, Field>;
}

interface Schema {
  id: string;
  name: string;
  type: string;
  fields: Record<string, Field>;
}

type Fields = Record<string, Field>;

/** APP */
interface AppState {
  selected: string;
  builder: NormalizedFields;
  anchors: Record<string, React.RefObject<HTMLDivElement>>;
}
