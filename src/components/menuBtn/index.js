import React, {Component} from 'react';
import {TouchableOpacity, Image} from 'react-native';
import AuthStore from '../../config/store/auth';
import {observer} from 'mobx-react/native';

@observer
class League extends Component {
    render() {
        if (AuthStore.isLogin) {
            return (
                <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                    <Image source={require('../../assets/images/menu-icon.png')} style={{marginLeft: 17, width: 35, resizeMode: 'contain'}} />
                </TouchableOpacity>
            )
        } else
            return null;
    }
}

export default League;