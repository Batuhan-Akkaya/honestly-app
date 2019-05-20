import {Share} from 'react-native';
import AuthStore from '../config/store/auth';
import Api from '../config/api';
import Store from '../config/store';
import {Strings} from "../translate";
import vars from "../config/vars";

export function post(url, data, success, error) {
    Api.post(url, {userId: AuthStore.user._id, lang: Store.lang, ...data}).then(res => success && success(res)).catch(err => error && error(err));
}

export function getActiveRouteName(navigationState) {
    if (!navigationState) return null;
    const route = navigationState.routes[navigationState.index];
    if (route.routes) return getActiveRouteName(route);
    return route.routeName;
}

export function getFirstName(str) {
    if (str.split(' ').length > 1)
        return str.substr(0, str.indexOf(' '));
    else
        return str;
}

export function shareApp() {
    const appStore = 'https://itunes.apple.com/us/app/honestly/id1447775146?l=tr&ls=1&mt=8';
    const playStore = 'https://play.google.com/store/apps/details?id=com.batuhanakkaya.honestly';
    const msg =`\nIOS url: ${appStore}\nAndroid url: ${playStore}`;
    Share.share({
        message: Strings('share') + msg,
        // url: vars.isIos ? appStore : playStore,
        title: Strings('enjoyWithHonestly')
    }, {
        // Android only:
        dialogTitle: Strings('shareTheApp')
    })
}