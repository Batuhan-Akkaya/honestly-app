import {observable, action} from 'mobx';
import Api from '../../config/api';
import AuthStore from './auth';

class Store {
    @observable gameList = [];
    @observable route = '';
    @observable lang = 'tr';
    @observable adCounter = 0;
    @observable adCount = {};
    @observable inDevelopment = false;

    @action getGameList(cb) {
        Api.post('/game/getByUser', {userId: AuthStore.user._id}).then(res => {
            this.gameList = res.docs;
            cb && cb();
        });
    }
    @action addGame(data) {
        this.gameList.push(data);
    }
    @action setRoute(route) {
        this.route = route;
    }
    @action setLang(lang) {
        this.lang = lang;
    }
    @action incrementAdCounter() {
        this.adCounter += 1;
    }
    @action setAdCount(data) {
        this.adCount = data.room;
        this.inDevelopment = data.inDevelopment;
    }
    @action resetAdCounter() {
        this.adCounter = 0;
    }
}

export default new Store();