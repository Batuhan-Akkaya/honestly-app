import {createStackNavigator} from 'react-navigation';

import {Login, Register, Home} from '../screens';

const appNavigator = createStackNavigator({
    Login: {screen: Login},
    Register: {screen: Register},
    Home: {screen: Home}
});

export default appNavigator;
