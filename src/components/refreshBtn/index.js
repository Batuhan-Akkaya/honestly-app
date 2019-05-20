import React, {Component} from 'react';
import {TouchableOpacity, Image} from 'react-native';

class RefreshBtn extends Component {
    render() {
        return (
            <TouchableOpacity onPress={() => this.props.onPress()}>
                <Image source={require('../../assets/images/refresh-icon.png')} style={{width: 18, height: 18, marginRight: 15}} />
            </TouchableOpacity>
        )
    }
}

export default RefreshBtn;