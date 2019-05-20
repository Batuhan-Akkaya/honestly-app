import React, {Component} from 'react';
import {ImageBackground} from 'react-native';

class Wrapper extends Component {
    render() {
        return (
            <ImageBackground style={[{flex: 1}, this.props.style]} source={require('../../assets/images/bg.png')}>
                {this.props.children}
            </ImageBackground>
        )
    }
}

export default Wrapper;