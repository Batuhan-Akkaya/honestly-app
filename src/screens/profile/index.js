import React, {Component} from 'react';
import {Alert, View} from 'react-native';
import {Input, Button, Wrapper} from "../../components";
import {Strings} from "../../translate";
import sharedStyles from "../../utils/sharedStyles";
import {post} from "../../utils/helpers";
import AuthStore from '../../config/store/auth';

class Profile extends Component {
    static navigationOptions = {
        title: Strings('profile')
    };

    state = {
        email: '',
        name: '',
        loading: false,
        disabled: false
    };

    componentDidMount() {
        const {email, name} = AuthStore.user;
        this.setState({email, name});
    }

    send() {
        if (this.state.name && this.state.name !== " ") {
            this.setState({disabled: true});
            post('/user/update', {name: this.state.name}, res => {
                AuthStore.setUser(res.doc);
                Alert.alert(Strings('successful'), Strings('profileUpdated'), [{text: Strings('ok'), onPress: () => this.props.navigation.goBack()}])
            });
        }
    }

    render() {
        return (
            <Wrapper style={sharedStyles.wrapper}>
                <View style={{width: '90%'}}>
                    <Input
                        value={this.state.email}
                        editable={false}
                        label={'Email'}
                    />
                    <Input
                        value={this.state.name}
                        onChange={name => this.setState({name})}
                        label={Strings('firstNameLastName')}
                    />
                    <Button title={Strings('send')} onPress={() => this.send()} grayed={this.state.name===''} disabled={this.state.name==='' || this.state.disabled} />
                </View>
            </Wrapper>
        )
    }
}

export default Profile;