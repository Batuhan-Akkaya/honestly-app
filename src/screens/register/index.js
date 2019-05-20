import React, {Component} from 'react';
import {View, Image} from 'react-native';
import sharedStyles from "../../utils/sharedStyles";
import {Button, Input, Wrapper} from "../../components";
import AuthStore from '../../config/store/auth';
import vars from "../../config/vars";
import {Strings} from "../../translate";
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class Register extends Component {
    state = {
        email: '',
        password: '',
        name: ''
    };

    register() {
        this.setState({loading: true});
        if (validateEmail(this.state.email)) {
            AuthStore.register(this.state, err => {
                if (err.response.data.msg.code == 11000)
                    alert('Bu email adresi zaten kayıtlı!');
                alert(Strings('error'));
                this.setState({loading: false});
            });
        } else alert(Strings('enterValidEmail'));
    }

    render() {
        return (
            <Wrapper style={sharedStyles.wrapper}>
                <Image source={require('../../assets/images/logo.png')} style={{width: 120, height: 80, resizeMode: 'contain'}} id={'logo'} />
                <View style={{width: '90%'}}>
                    <Input
                        value={this.state.name}
                        onChange={name => this.setState({name})}
                        label={Strings('firstNameLastName')}
                        capitalize={'words'}
                        maxLenght={25}
                    />
                    <Input
                        value={this.state.email}
                        onChange={email => this.setState({email})}
                        label={'Email'}
                        type={'email-address'}
                        maxLenght={60}
                    />
                    <Input
                        value={this.state.password}
                        onChange={password => this.setState({password})}
                        label={Strings('password')}
                        password
                    />
                    <Button
                        title={Strings('register')}
                        onPress={() => this.register()}
                        style={{backgroundColor: vars.thirdColor}}
                    />
                </View>
            </Wrapper>
        )
    }
}

export default Register;
