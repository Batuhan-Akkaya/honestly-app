import React, {Component} from 'react';
import {ActivityIndicator, AsyncStorage, NativeModules} from 'react-native';
import sharedStyles from "../../utils/sharedStyles";
import AuthStore from '../../config/store/auth';
import Store from '../../config/store';
import {Wrapper} from "../../components";
import vars from "../../config/vars";
import Axios from 'axios';

class Splash extends Component {
    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        // Axios.post(vars.host + '/getCount').then(res => Store.setAdCount(res.data));
        AsyncStorage.getItem('tutorialEnd').then(val => {
            if (val) AuthStore.checkToken();
            else this.props.navigation.navigate('Tutorial')
        });
        let currentLang;
        let lang = 'tr';
        AsyncStorage.getItem('lang').then(data => {
            if (data)
                currentLang = data;
            else
                currentLang = vars.isIos ? NativeModules.SettingsManager.settings.AppleLocale : NativeModules.I18nManager.localeIdentifier;

            switch (currentLang) {
                case 'en_US':
                    Store.setLang('en');
                    lang = 'en';
                    break;
                case 'tr':
                case 'tr_TR':
                    Store.setLang('tr');
                    lang = 'tr';
                    break;
                default:
                    Store.setLang('en');
                    lang = 'en';
            }
        });
    }

    render() {
        return (
            <Wrapper style={sharedStyles.center}>
                <ActivityIndicator size={'large'} color={'#fff'}/>
            </Wrapper>
        )
    }
}

export default Splash;
