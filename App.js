import React, {Component} from 'react';
import {View} from 'react-native';
import AppNavigator from './src/config/appNavigator';
import Navigation from './src/utils/navigation';
import {getActiveRouteName} from './src/utils/helpers';
import Store from './src/config/store';
import * as MagicMove from 'react-native-magic-move';


type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <MagicMove.Provider style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <AppNavigator
                        ref={navigatorRef => Navigation.setTopLevelNavigator(navigatorRef)}
                        onNavigationStateChange={(prevState, currentState) => {
                            const currentScreen = getActiveRouteName(currentState);
                            const prevScreen = getActiveRouteName(prevState);
                            if (prevScreen !== currentScreen) Store.setRoute(currentScreen);
                        }}
                    />
                </View>
            </MagicMove.Provider>
        );
    }
}
