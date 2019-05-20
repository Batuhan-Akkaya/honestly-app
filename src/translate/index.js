import I18n from 'react-native-i18n';
import Store from '../config/store';

import tr from './tr';
import en from './en';

I18n.fallbacks = true;

I18n.translations = {en, tr};

// I18n.locale = Store.lang;

export function Strings(name, params = {}) {
    return I18n.t(name, {...params, locale: Store.lang});
}

export default I18n;