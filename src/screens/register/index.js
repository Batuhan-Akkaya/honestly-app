import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Input} from "../../components";
import axios from 'axios';

class Register extends Component {
    static navigationOptions = {
        title: 'Register'
    };

    state = {
        email: '',
        password: '',
        name: ''
    };

    async register() {
        const {email, password, name} = this.state;
        try {
            const res = await axios.post('http://localhost:3100/api/auth/register', {email, password, name});
            alert(res);
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
                    placeholder={'Name'}
                    value={this.state.name}
                    onChangeText={name => this.setState({name})}
                />
                <Input
                    placeholder={'password'}
                    value={this.state.password}
                    onChangeText={password => this.setState({password})}
                    secureTextEntry={true}
                />
                <Text style={{fontSize: 20, textAlign: 'center', marginTop: 30}} onPress={() => this.register()}>Register</Text>
                <Text style={{fontSize: 18, textAlign: 'center', marginTop: 10}} onPress={() => this.props.navigation.goBack()}>Login</Text>
            </View>
        )
    }
}

export default Register;
