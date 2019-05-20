import {observable, action} from 'mobx';
import {AsyncStorage} from 'react-native';
import Api from '../api';
import Navigation from '../../utils/navigation';
import Store from './index';
import {Strings} from "../../translate";

class AuthStore {
    @observable user = {};
    @observable token = '';
    @observable isLogin = false;
    @observable pushId = '';

    @action login(data, cb) {
        Api.post('/auth/login', data).then(res => this.loginSuccess(res.user, res.token)).catch(err => cb(err));
    }
    @action register(data, cb) {
        const {email, name, password} = data;
        if (email && name && password) {
            Api.post('/auth/register', {...data, notificationToken: this.pushId})
                .then(res => this.loginSuccess(res.user, res.token))
                .catch(err => cb(err));
        } else
            alert(Strings('fillAllFields'));
    }
    @action checkToken(cb, noLocation=false) {
        AsyncStorage.getItem('token').then(token => {
            if (token) {
                Api.post('/auth/checkToken', {token}).then(res => {
                    this.loginSuccess(res, token, cb, noLocation);
                }).catch(err => this.logout());
            } else this.logout();
        });
    }

    @action logout() {
        Navigation.resetNavigate('Home');
        this.isLogin = false;
        this.user = {};
        this.token = '';
        AsyncStorage.removeItem('token');
    }
    @action loginSuccess(data, token, cb, noLocation) {
        this.user = data;
        AsyncStorage.setItem('token', token.toString());
        this.isLogin = true;
        if ((Store.route !== 'GameRoom' || Store.route !== 'Dashboard') && !noLocation)
            Navigation.resetNavigate('Dashboard');
        cb && cb();
    }
    @action setUser(user) {
        this.user = user;
    }

    @action addFriend(data) {
        this.user.friends.push(data);
    }
    @action setPushId(data) {
        this.pushId = data;
    }
}

export default new AuthStore();