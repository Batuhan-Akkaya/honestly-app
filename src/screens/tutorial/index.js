import React, {Component} from 'react';
import {View, Text, AsyncStorage} from 'react-native';
import {Button, Wrapper} from "../../components";
import sharedStyles from "../../utils/sharedStyles";
import vars from "../../config/vars";
import {Strings} from "../../translate";

class Tutorial extends Component {
    static navigationOptions = {
        headerLeft: null
    };

    _start() {
        AsyncStorage.setItem('tutorialEnd', 'ok');
        this.props.navigation.navigate('Home');
    }

    render() {
        return (
            <Wrapper>
                <View style={sharedStyles.wrapper}>
                    <Text style={sharedStyles.txt}>
                        - {Strings('lLogin')}
                        {'\n'}
                        - {Strings('addYourFriend')}
                        {'\n'}
                        - {Strings('startGameWithYourFriend')}
                        {'\n'}
                        - {Strings('estiminate')}
                        {'\n'}{'\n'}
                        <Text style={{textAlign: 'center'}}>{Strings('enjoy')}</Text>
                    </Text>
                    <Button
                        title={Strings('start')}
                        onPress={() => this._start()}
                        style={{backgroundColor: vars.secondColor, width: '100%', marginTop: 15}}
                    />
                </View>
            </Wrapper>
        )
    }
}

export default Tutorial;