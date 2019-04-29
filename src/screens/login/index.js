import React, {Component} from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';
import {Input} from "../../components";

class Login extends Component {
    static navigationOptions = {
        title: 'Login'
    };
    state = {
        email: '',
        password: '',
    };

    async login() {
        const {email, password} = this.state;
        try {
            const res = await axios.post('http://localhost:3100/api/auth/login', {email, password});
            this.props.navigation.navigate('Home', {data: res.data});
        } catch (e) {
            alert(e);
        }
    }

    render() {
        return (
            <View style={{flex: 1, padding: 15, justifyContent: 'center'}}>
                <Input
                    placeholder={'Email'}
                    value={this.state.email}
                    onChangeText={email => this.setState({email})}
                />
                <Input
                    placeholder={'password'}
                    value={this.state.password}
                    onChangeText={password => this.setState({password})}
                    secureTextEntry={true}
                />
                <Text style={{fontSize: 20, textAlign: 'center', marginTop: 30}} onPress={() => this.login()}>LOGIN</Text>
                <Text style={{fontSize: 18, textAlign: 'center', marginTop: 10}} onPress={() => this.props.navigation.navigate('Register')}>Register</Text>
            </View>
        )
    }
}

export default Login;
