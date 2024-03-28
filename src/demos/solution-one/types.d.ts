// Correcting the field type reference in the SolutionOneField interface
type SolutionOneFieldType = 'text' | 'group-item' | 'headingOne' | 'headingTwo';
type SolutionOneRepeatableType = 'repeatable';

interface SolutionOneField {
  id: string;
  name: string;
  type: SolutionOneFieldType; // Use the specific type alias defined for field types
}

interface SolutionOneTextField extends SolutionOneField {
  type: 'text';
  value: string;
}

interface SolutionOneHeadingOneField extends SolutionOneField {
  type: 'headingOne';
  value: string;
}

interface SolutionOneHeadingTwoField extends SolutionOneField {
  type: 'headingTwo';
  value: string;
}

// Adjusting the fields array to support mixed field types within group items and slices
interface SolutionOneGroupItem {
  id: string;
  type: 'group-item';
  fields: Array<
    | SolutionOneTextField
    | SolutionOneHeadingOneField
    | SolutionOneHeadingTwoField
  >; // Support an array of mixed field types
}

interface SolutionOneRepeatable {
  id: string;
  name: string;
  type: SolutionOneRepeatableType;
  items: SolutionOneGroupItem[];
}

interface SolutionOneSlice {
  id: string;
  name: string;
  type: 'slice';
  fields: Array<
    | SolutionOneTextField
    | SolutionOneHeadingOneField
    | SolutionOneHeadingTwoField
  >; // Support an array of mixed field types
  repeatables: SolutionOneRepeatable[]; // Array of repeatable structures
}
