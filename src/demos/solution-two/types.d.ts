// Define the field types
type SolutionTwoFieldType = 'text' | 'headingOne' | 'group';

// Define the base structure for a field
interface SolutionTwoBaseField {
  id: string;
  name: string;
  type: SolutionTwoFieldType;
}

// Extend the base field for specific types
interface SolutionTwoTextField extends SolutionTwoBaseField {
  type: 'text';
  value: string;
}

interface SolutionTwoHeadingOneField extends SolutionTwoBaseField {
  type: 'headingOne';
  value: string;
}

// Group items within groups, containing their own fields
interface SolutionTwoGroupItem {
  id: string;
  type: 'group-item'; // Specify this type to indicate it's an item within a group
  fields: SolutionTwoTextField[]; // Assuming group items can only contain text fields for simplicity
}

// Define a group field, which contains a list of group items
interface SolutionTwoGroupField extends SolutionTwoBaseField {
  type: 'group';
  items: SolutionTwoGroupItem[];
}

// Allow fields to be of any of the defined types
type SolutionTwoField =
  | SolutionTwoTextField
  | SolutionTwoHeadingOneField
  | SolutionTwoGroupField;

// Define the slice structure, which includes a diverse array of fields
interface SolutionTwoSlice {
  id: string;
  name: string;
  type: 'slice';
  fields: SolutionTwoField[]; // This array now supports text, headingOne, and group fields
}
