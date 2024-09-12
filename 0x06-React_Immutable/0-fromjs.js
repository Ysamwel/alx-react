import { fromJS } from "./node_modules/immutable/dist/immutable";

export default getImmutableObject (object) {
  return fromJS(object);
}
