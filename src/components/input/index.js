import React, {Component} from 'react';
import {View} from 'react-native';
import { TextField } from 'react-native-material-textfield';

class Input extends Component {
    render() {
        const {value, label, onChange, password, containerStyle, multiline, capitalize, editable, style, type, maxLenght} = this.props;
        return (
            <View style={containerStyle}>
                <TextField
                    label={label}
                    value={value}
                    onChangeText={txt => onChange(txt)}
                    baseColor={'#fff'}
                    secureTextEntry={password}
                    tintColor={'#fff'}
                    multiline={multiline}
                    lineWidth={1}
                    autoCapitalize={capitalize ? capitalize : 'none'}
                    editable={editable}
                    inputContainerStyle={style}
                    textColor={'#fff'}
                    keyboardType={type}
                    maxLenght={maxLenght}
                />
            </View>
        )
    }
}

export default Input;