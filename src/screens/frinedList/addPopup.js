import React, {Component} from 'react';
import {View, Modal, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert} from 'react-native';
import {Input, Wrapper} from "../../components";
import sharedStyles from "../../utils/sharedStyles";
import vars from "../../config/vars";
import {post} from "../../utils/helpers";
import {Strings} from "../../translate";

class AddPopup extends Component {
    state = {
        search: '',
        searched: false,
        data: [],
        loading: false
    };

    searchData() {
        this.setState({loading: true, searched: true});
        const {search} = this.state;
        if (search && search !== '.' && search !== '|' && search !== '$')
            post('/user/getByName', {search}, res => this.setState({data: res.docs, loading: false}));
        else
        {
            this.setState({loading: false});
            Alert.alert(Strings('warning'), Strings('writeName'), [{text: Strings('ok')}]);
        }
    }

    addFriend(data) {
        Alert.alert(Strings('warning'), Strings('sendFriendRequest', {name: data.name}), [
            {text: Strings('yes'), onPress: () => post('/friend/sendRequest', {friendId: data._id}, res => {
                    if (res.err) {
                        if (res.msg === 'alreadyAdded') Alert.alert(Strings('warning'), Strings('alreadyAdded'), [{text: Strings('ok')}]);
                        if (res.msg === 'alreadySent') Alert.alert(Strings('warning'), Strings('alreadySentRequest'), [{text: Strings('ok')}]);
                    }
                    else
                        Alert.alert('successful', Strings('sentFriendRequest'), [{text: Strings('ok'), onPress: () => this.props.close()}]);
                })
            },
            {text: Strings('no')}
        ]);
    }

    render() {
        return (
            <Modal visible={this.props.visible} onRequestClose={() => this.props.close()} animationType={'slide'}>
                <Wrapper>
                    <View style={{height: 100, paddingTop: 15, backgroundColor: vars.baseColor, paddingLeft: 15}}>
                        <Input
                            value={this.state.search}
                            onChange={search => this.setState({search, searched: false})}
                            label={Strings('search')}
                        />
                        <TouchableOpacity onPress={() => this.props.close()} style={{position: 'absolute', right: 15, top: 35}}>
                            <Image source={require('../../assets/images/close.png')} style={{width: 25, height: 25}} />
                        </TouchableOpacity>
                    </View>
                    {this.state.searched ?
                        this.state.loading ?
                            <View style={sharedStyles.wrapper}>
                                <ActivityIndicator size={'large'} color={'#fff'} />
                            </View>
                            :
                            <ScrollView>
                                <Text style={[sharedStyles.txt, {textAlign: 'center', marginVertical: 10}]}>{Strings('founded', {length: this.state.data.length})}</Text>
                                {this.state.data.map((user, i) =>
                                    <TouchableOpacity key={i} style={{backgroundColor: '#fff', padding: 10}} onPress={() => this.addFriend(user)}>
                                        <Text>{user.name}</Text>
                                    </TouchableOpacity>
                                )}
                            </ScrollView>
                        :
                        <View style={sharedStyles.wrapper}>
                            <TouchableOpacity onPress={() => this.searchData()} style={{alignItems: 'center'}}>
                                <Image source={require('../../assets/images/search-icon.png')} style={{height: 65, width: 65, resizeMode: 'contain', marginBottom: 15}}/>
                                <Text style={sharedStyles.txt}>{Strings('clickToSearch')}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </Wrapper>
            </Modal>
        )
    }
}

export default AddPopup;