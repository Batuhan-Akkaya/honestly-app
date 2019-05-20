import React, {Component} from 'react';
import {View, ScrollView, Text, TouchableOpacity, Image, RefreshControl} from 'react-native';
import sharedStyles from "../../utils/sharedStyles";
import {post} from "../../utils/helpers";
import moment from 'moment';
import styles from "./styles";
import AuthStore from '../../config/store/auth';
import {AdBanner, Wrapper} from "../../components";
import vars from "../../config/vars";
import adIds from "../../config/adIds";
import {Strings} from "../../translate";

class Notification extends Component {
    static navigationOptions = {
        tabBarIcon: ({focused}) => <Image source={focused ? require('../../assets/images/active-notif-icon.png') : require('../../assets/images/notif-icon.png')} style={{width: 25, resizeMode: 'contain'}} />
    };

    state = {
        data: [],
        refreshing: false
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        post('/friend/getRequests', {}, res => this.setState({data: res.docs, refreshing: false}));
    }

    acceptRequest(request) {
        post('/friend/acceptRequest', {requestId: request._id}, () => {AuthStore.addFriend(request.requester); this.resetList(request)});
    }

    rejectRequest(request) {
        post('/friend/rejectRequest', {requestId: request._id}, () => this.resetList(request));
    }

    resetList(r) {
        const arr = this.state.data;
        this.setState({data: arr.filter(x => x.requester._id !== r.requester._id)});
    }

    render() {
        return (
            <Wrapper style={sharedStyles.wrapper}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this.fetchData()}
                        />
                    }
                >
                    {this.state.data.length > 0 ?
                        this.state.data.map((item, i) =>
                            <View style={[sharedStyles.card, styles.row, {backgroundColor: vars.thirdColor}]} key={i}>
                                <View>
                                    <Text style={[sharedStyles.txt, {color: '#000'}]}>{item.requester.name}</Text>
                                    <Text style={[sharedStyles.txt, {color: '#000'}]}>{moment(item.createdAt).fromNow()}</Text>
                                </View>
                                <TouchableOpacity style={[styles.btn, {backgroundColor: vars.baseColor}]} onPress={() => this.acceptRequest(item)}>
                                    <Text style={sharedStyles.txt}>{Strings('accept')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.btn, {backgroundColor: vars.secondColor}]} onPress={() => this.rejectRequest(item)}>
                                    <Text style={sharedStyles.txt}>{Strings('reject')}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                        :
                        <View style={[sharedStyles.wrapper, {paddingTop: 25}]}>
                            <Text style={sharedStyles.txt}>{Strings('youHaveNoFriendRequest')}</Text>
                        </View>
                    }
                </ScrollView>
                <AdBanner id={adIds.notifications} />
            </Wrapper>
        )
    }
}

export default Notification;