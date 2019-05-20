import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import styles from "./styles";
import AuthStore from '../../config/store/auth';
import {observer} from 'mobx-react/native';
import {shareApp} from "../../utils/helpers";
import LanguageModal from '../languageModal';
import {Strings} from "../../translate";

@observer
class SideNav extends Component {
    state = {
        modalVisible: false
    };

    openPolicy() {
        Linking.canOpenURL('https://usejavascript.com/gizlilik.html').then(supported => {
            if (supported) Linking.openURL('https://usejavascript.com/gizlilik.html');
            else alert(Strings('error'));
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {AuthStore.isLogin ?
                    <TouchableOpacity style={styles.btn} onPress={() => {}}>
                        <View><Text style={styles.txt}>{Strings('welcome')}</Text></View>
                        <Text style={styles.txt}>{AuthStore.user.name}</Text>
                    </TouchableOpacity> : null
                }
                <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('LeaderBoard')}>
                    <Text style={styles.txt}>{Strings('leaderBoard')}</Text>
                </TouchableOpacity>
                {AuthStore.isLogin ?
                    <React.Fragment>
                        <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('Profile')}>
                            <Text style={styles.txt}>{Strings('profile')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={() => AuthStore.logout()}>
                            <Text style={styles.txt}>{Strings('logout')}</Text>
                        </TouchableOpacity>
                    </React.Fragment>
                    : null
                }
                <TouchableOpacity style={styles.btn} onPress={() => shareApp()}>
                    <Text style={styles.txt}>{Strings('shareTheApp')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => this.setState({modalVisible: true})}>
                    <Text style={styles.txt}>{Strings('changeLanguage')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => this.openPolicy()}>
                    <Text style={styles.txt}>{Strings('privacyPolicy')}</Text>
                </TouchableOpacity>

                <LanguageModal visible={this.state.modalVisible} close={() => this.setState({modalVisible: false})} />
            </View>
        )
    }
}

export default SideNav;