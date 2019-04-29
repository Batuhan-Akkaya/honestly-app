import React, {Component} from 'react';
import {TextInput} from 'react-native';

class Input extends Component {
    render() {
        return(
            <TextInput
                {...this.props}
                style={{padding: 15, marginTop: 5, borderBottomColor: '#333', borderBottomWidth: 1}}
            />
        )
    }
}

export default Input;
