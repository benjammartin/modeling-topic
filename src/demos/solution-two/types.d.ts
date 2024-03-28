// Extend the field types to include a new 'headingTwo' type
type SolutionTwoFieldType = 'text' | 'headingOne' | 'headingTwo' | 'group';

// Define the base structure for a field
interface SolutionTwoBaseField {
  id: string;
  name: string;
  type: SolutionTwoFieldType;
}

// Extend the base field for specific field types
interface SolutionTwoTextField extends SolutionTwoBaseField {
  type: 'text';
  value: string;
}

interface SolutionTwoHeadingOneField extends SolutionTwoBaseField {
  type: 'headingOne';
  value: string;
}

interface SolutionTwoHeadingTwoField extends SolutionTwoBaseField {
  type: 'headingTwo';
  value: string;
}

// Define the structure for group items, now capable of including different field types
interface SolutionTwoGroupItem {
  id: string;
  type: 'group-item';
  fields: (
    | SolutionTwoTextField
    | SolutionTwoHeadingOneField
    | SolutionTwoHeadingTwoField
  )[];
}

// Define a group field, which contains a list of group items
interface SolutionTwoGroupField extends SolutionTwoBaseField {
  type: 'group';
  name: string; // Add name to group field definition
  items: SolutionTwoGroupItem[];
}

// Define the possible field types within the fields array
type SolutionTwoField =
  | SolutionTwoTextField
  | SolutionTwoHeadingOneField
  | SolutionTwoGroupField
  | SolutionTwoHeadingTwoField;

// Define the slice structure, incorporating all defined field types
interface SolutionTwoSlice {
  id: string;
  name: string;
  type: 'slice';
  fields: SolutionTwoField[]; // This array supports text, headingOne, headingTwo, and group fields
}
