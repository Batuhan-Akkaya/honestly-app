import React, {Component} from 'react';
import {View, FlatList, Text, Image, Alert, TouchableOpacity, RefreshControl} from 'react-native';
import AuthStore from '../../config/store/auth';
import {observer} from 'mobx-react';
import sharedStyles from "../../utils/sharedStyles";
import {Button, Wrapper} from "../../components";
import AddPopup from './addPopup';
import Api from '../../config/api';
import Store from '../../config/store';
import vars from "../../config/vars";
import {Strings} from "../../translate";

@observer
class FriendList extends Component {
    static navigationOptions = {
        tabBarIcon: ({focused}) => <Image source={focused ? require('../../assets/images/active-friend-icon.png') : require('../../assets/images/friend-icon.png')} style={{width: 35, resizeMode: 'contain'}} />
    };

    state = {
        modalVisible: false,
        refreshing: false
    };

    createGame(friend) {
        Alert.alert(Strings('warning'), Strings('doYouWantToStartWith', {friend: friend.name}), [{
            text: Strings('yes'), onPress: () => {
                const participants = [{user: AuthStore.user._id, winCount: 0}, {user: friend._id, winCount: 0}];
                Api.post('/game/create', {firstUser: {user: AuthStore.user._id}, secondUser: {user: friend._id}, participants}).then(res => {
                    if (res.err && res.msg == 'exist') {
                        Alert.alert(Strings('warning'), Strings('alreadyThereGame', {friend: friend.name}), [{text: Strings('ok')}]);
                    } else {
                        Store.getGameList();
                        this.props.navigation.navigate('Games');
                    }
                });
            }
        }, {text: Strings('no')}]);
    }

    render() {
        return (
            <Wrapper>
                {AuthStore.user.hasOwnProperty('friends') ?AuthStore.user.friends.length > 0 ?
                    <FlatList
                        data={AuthStore.user.friends}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item ,index})=>
                            <TouchableOpacity style={[sharedStyles.card, {backgroundColor: index%2===0 ? vars.secondColor : vars.thirdColor}]} onPress={() => this.createGame(item)}>
                                <Text style={sharedStyles.txt}>{item.name}</Text>
                            </TouchableOpacity>
                        }
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={() => AuthStore.checkToken(() => this.setState({refreshing: false}), true)}
                            />
                        }
                    />
                    :
                    <View style={[sharedStyles.center, {flex: 1}]}>
                        <Text style={[sharedStyles.txt, {fontSize: 20}]}>{Strings('youHaveNoFriend')}</Text>
                    </View> : null
                }
                <Button float onPress={() => this.setState({modalVisible: true})} />
                <AddPopup visible={this.state.modalVisible} close={() => this.setState({modalVisible: false})} />
            </Wrapper>
        )
    }
}

export default FriendList;