import React from 'react';
import {createStackNavigator, createDrawerNavigator, createBottomTabNavigator} from 'react-navigation';
import sharedStyles from "../utils/sharedStyles";
import {MenuBtn, SideNav} from "../components";
import navigatorAnimation from '../utils/navigatorAnimation';
import vars from "./vars";

import {Games, Home, Login, Splash, FriendList, Register, Notifications, GameRoom, Tutorial, LeaderBoard, AnswerPopup, Profile} from "../screens";

const tabNavigator = createBottomTabNavigator({
    Games: {screen: Games},
    FriendList: {screen: FriendList},
    Notifications: {screen: Notifications}
}, {
    tabBarOptions: {
        labelStyle: {fontSize: 13},
        style: {backgroundColor: vars.baseColor, height: 55, overflow: 'hidden'},
        showIcon: true,
        showLabel: false,
        indicatorStyle: {backgroundColor: vars.secondColor}
    }
});

const app = createStackNavigator({
    Splash: {screen: Splash},
    Tutorial: {screen: Tutorial},
    Home: {screen: Home},
    Login: {screen: Login},
    Register: {screen: Register},
    Dashboard: {screen: tabNavigator,
        navigationOptions: ({navigation}) => ({
            headerLeft: <MenuBtn navigation={navigation} />
        })
    },
    GameRoom: {screen: GameRoom},
    LeaderBoard: {screen: LeaderBoard},
    AnswerPopup: {screen: AnswerPopup},
    Profile: {screen: Profile}
}, {
    headerBackTitleVisible: false,
    headerLayoutPreset: 'center',
    transitionConfig: () => navigatorAnimation,
    navigationOptions: () => ({
        headerStyle: sharedStyles.header,
        title: 'Honestly',
        headerTitleStyle: sharedStyles.headerTitle,
        headerTintColor: '#fff'
    }),
});

const appNavigator = createDrawerNavigator({
    app: {screen: app}
}, {
    contentComponent: props => <SideNav {...props} />,
    drawerWidth: 250
});

export default appNavigator;