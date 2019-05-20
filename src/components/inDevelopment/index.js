import React, {Component} from 'react';
import {Image, Text} from 'react-native';
import {Wrapper} from "../index";
import sharedStyles from "../../utils/sharedStyles";
import {Strings} from "../../translate";

class InDevelopment extends Component {
    render() {
        return (
            <Wrapper style={sharedStyles.wrapper}>
                <Image source={require('../../assets/images/plug-icon.png')} style={{width: 180, height: 40, marginBottom: 20}} />
                <Text style={[sharedStyles.txt, {fontSize: 19, textAlign: 'center'}]}>{Strings('inDevelopment1')}</Text>
                <Text style={[sharedStyles.txt, {fontSize: 19, textAlign: 'center'}]}>{Strings('inDevelopment2')}</Text>
            </Wrapper>
        )
    }
}

export default InDevelopment;