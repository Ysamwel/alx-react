import { fromJS } from 'immutable';  // Correct import statement

// Correct function declaration
export default function getImmutableObject(object) {
    return fromJS(object);  // Convert object to Immutable.js structure
}
