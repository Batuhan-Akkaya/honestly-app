import React, {Component} from 'react';
import {View} from 'react-native';
import AppNavigator from './src/config/appNavigator';

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <View style={{flex: 1}}>
                <AppNavigator/>
            </View>
        );
    }
}
