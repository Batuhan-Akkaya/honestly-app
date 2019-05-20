import React, {Component} from 'react';
import {View, Image} from 'react-native';
import sharedStyles from "../../utils/sharedStyles";
import {Button, Input} from "../../components";
import AuthStore from '../../config/store/auth';
import Wrapper from "../../components/wrapper";
import vars from "../../config/vars";
import {Strings} from "../../translate";

class Login extends Component {
    state = {
        email: '',
        password: '',
        loading: false
    };

    login() {
        this.setState({loading: true});
        AuthStore.login(this.state, () => {
            alert(Strings('incorrectEmailOrPassword'));
            this.setState({loading: false});
        });
    }

    render() {
        return (
            <Wrapper style={sharedStyles.wrapper}>
                <Image source={require('../../assets/images/logo.png')} style={{width: 120, height: 80, resizeMode: 'contain'}} id={'logo'} />
                <View style={{width: '90%'}}>
                    <Input
                        value={this.state.email}
                        onChange={email => this.setState({email})}
                        label={'Email'}
                        type={'email-address'}
                    />
                    <Input
                        value={this.state.password}
                        onChange={password => this.setState({password})}
                        label={Strings('password')}
                        password
                    />
                    <Button
                        title={Strings('login')}
                        onPress={() => this.login()}
                        style={{backgroundColor: vars.secondColor}}
                        loading={this.state.loading}
                    />
                </View>
            </Wrapper>
        )
    }
}

export default Login;
