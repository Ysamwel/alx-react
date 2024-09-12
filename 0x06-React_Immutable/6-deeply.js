import { Map } from 'immutable';

// Correct export default syntax for named function
export default function mergeDeeplyElements(page1, page2) {
    return Map(page1).mergeDeep(Map(page2));
}
