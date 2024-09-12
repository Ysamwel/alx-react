import { Map } from 'immutable';
import { is } from 'immutable';

export default function areMapsEqual(map1, map2) {
    return map1.is(map2);
}
