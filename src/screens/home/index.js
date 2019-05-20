import React, {Component} from 'react';
import {Text} from 'react-native';
import sharedStyles from "../../utils/sharedStyles";
import {Button, Wrapper} from "../../components";
import vars from "../../config/vars";
import {Strings} from "../../translate";
import * as MagicMove from "react-native-magic-move";

class Home extends Component {
    static navigationOptions = {
        headerLeft: null
    };

    render() {
        return (
            <MagicMove.Scene style={{flex: 1}}>
                <Wrapper style={sharedStyles.wrapper}>
                    <Text style={[sharedStyles.txt, {fontSize: 20, marginBottom: 15}]}>{Strings('measureYourFriendship')}</Text>
                    <MagicMove.Image source={require('../../assets/images/logo.png')} style={{width: 120, height: 80, resizeMode: 'contain'}} id={'logo'} />
                    <MagicMove.View id={'loginBtn'} style={{width: '95%'}}>
                        <Button title={Strings('login')} onPress={() => this.props.navigation.navigate('Login')} style={{ marginTop: 20, backgroundColor: vars.secondColor}} />
                    </MagicMove.View>
                    <MagicMove.View id={'registerBtn'} style={{width: '95%'}}>
                        <Button title={Strings('register')} onPress={() => this.props.navigation.navigate('Register')} style={{ marginTop: 10, backgroundColor: vars.thirdColor}} />
                    </MagicMove.View>
                </Wrapper>
            </MagicMove.Scene>
        )
    }
}

export default Home;