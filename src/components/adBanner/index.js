import React, {Component} from 'react';
import {View} from 'react-native';
// import {AdMobBanner} from 'react-native-admob';

class AdBanner extends Component {
    render() {
        const id = __DEV__ ? 'ca-app-pub-3940256099942544/6300978111' : this.props.id;
        return (
            <View>
                {/*<AdMobBanner*/}
                    {/*adSize="fullBanner"*/}
                    {/*adUnitID={id}*/}
                    {/*testDevices={"EMULATOR"}*/}
                    {/*onAdFailedToLoad={error => console.error(error)}*/}
                {/*/>*/}
            </View>
        )
    }
}

export default AdBanner;
