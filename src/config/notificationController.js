import React, {Component} from 'react';
import OneSignal from 'react-native-onesignal';
import AuthStore from './store/auth';
import Store from './store';
import NavigationService from '../utils/navigation';

class NotificationController extends Component {
    constructor(props) {
        super(props);
        OneSignal.init("081e1de6-5d10-4700-abed-6e8ae76c963f");
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);

        OneSignal.configure();
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    onReceived(notification) {}

    onOpened(openResult) {
        const data = openResult.notification.payload.additionalData;

        if (data) {
            let tryCounter = 0;
            const tryInterval = setInterval(() => {
                tryCounter++;
                if (AuthStore.isLogin) {
                    clearInterval(tryInterval);
                    if (data.hasOwnProperty('gameId'))
                    {
                        Store.getGameList();
                        if (Store.route !== 'GameRoom' || Store.route !== 'AnswerPopup')
                            NavigationService.navigate('GameRoom', {id: data.gameId, viaNotification: true});
                    }
                    else if (data.hasOwnProperty('friendRequest'))
                        NavigationService.navigate('Notifications');

                    if (tryCounter > 5) clearInterval(tryInterval);
                }
            }, 700);
        }
    }

    onIds(device) {
        AuthStore.setPushId(device.userId);
    }

    render() {
        return null;
    }
}

export default NotificationController;