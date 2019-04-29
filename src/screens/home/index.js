import React, {Component} from 'react';
import {View, Text} from 'react-native';

class Home extends Component {
    static navigationOptions = {
        title: 'Home'
    };
    
    render() {
        const {auth, user, friends} = this.props.navigation.getParam('data');
        return (
            <View>
                <Text style={{margin: 15, fontSize: 16, textAlign: 'center'}}>Auth: {auth.toString()}</Text>
                <Text>{JSON.stringify(user)}</Text>
                <Text>Name: {user.name}</Text>
                <Text>Email: {user.email}</Text>
                <Text>Created: {user.created}</Text>
                <Text>Friends: {friends}</Text>
            </View>
        );
    }
}

export default Home;
