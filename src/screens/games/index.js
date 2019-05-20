import React, {Component} from 'react';
import {View, Image, ActivityIndicator, FlatList, Text, TouchableOpacity, RefreshControl, ScrollView} from 'react-native';
import sharedStyles from "../../utils/sharedStyles";
import Store from '../../config/store';
import AuthStore from '../../config/store/auth';
import {observer} from 'mobx-react/native';
import styles from './styles';
import {AdBanner, Wrapper} from "../../components";
import vars from "../../config/vars";
import {getFirstName} from "../../utils/helpers";
import adIds from '../../config/adIds'
import {Strings} from "../../translate";
import * as MagicMove from 'react-native-magic-move';

@observer
class Games extends Component {
    static navigationOptions = {
        tabBarIcon: ({focused}) => <Image source={focused ? require('../../assets/images/active-game-icon.png') : require('../../assets/images/game-icon.png')} style={{width: 35, resizeMode: 'contain'}} />
    };

    state = {
        loading: true,
        refreshing: false
    };

    componentDidMount() {
        Store.getGameList(() => this.setState({loading: false}));
    }

    render() {
        return (
            <MagicMove.Scene style={{flex: 1}}>
                <Wrapper>
                    <AdBanner id={adIds.gameList} />
                    {this.state.loading ?
                        <View style={sharedStyles.wrapper}>
                            <ActivityIndicator size={'large'} color={'#fff'}/>
                        </View>
                        :
                        Store.gameList.length > 0 ?
                            <FlatList
                                data={Store.gameList.sort((el1,el2) =>(el1.turn._id == AuthStore.user._id ? 0 : 1) - (el2.turn._id == AuthStore.user._id ? 0 : 1))}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item, index}) =>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('GameRoom', {data: item, index})}>
                                        <MagicMove.View id={"section"+index} style={[styles.card, {backgroundColor: index%2===0 ? vars.secondColor : vars.thirdColor}]} transition={MagicMove.Transition.scale}>
                                            <Text style={[sharedStyles.txt, styles.txt]}>
                                                {getFirstName(item.participants[0].user.name || '')}
                                                {' v '}
                                                {getFirstName(item.participants[1].user.name || '')}
                                            </Text>
                                            <Text style={[sharedStyles.txt, styles.txt]}>
                                                {item.turn._id === AuthStore.user._id ? Strings('yourTurn') : Strings('turnOf', {name: item.turn.name})}
                                            </Text>
                                            <View style={styles.row}>
                                                <Image source={require('../../assets/images/level-icon.png')} style={{height: 18, width: 20, marginRight: 7, top: 5}} />
                                                <Text style={[sharedStyles.txt, styles.lvl]}>{item.level} LVL</Text>
                                            </View>
                                            {item.turn._id === AuthStore.user._id ? <Image source={require('../../assets/images/turn-icon.png')} style={styles.turnIcon} /> : null}
                                        </MagicMove.View>
                                    </TouchableOpacity>
                                }
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={() => Store.getGameList(() => this.setState({refreshing: false}))}
                                    />
                                }
                            />
                            :
                            <ScrollView
                                contentContainerStyle={{alignItems: 'center', justifyContent: 'center', flexGrow: 1}}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={() => Store.getGameList(() => this.setState({refreshing: false}))}
                                    />
                                }
                            >
                                <Image source={require('../../assets/images/sad-smile.png')} style={{width: 45, height: 45}}/>
                                <Text style={[sharedStyles.txt, {fontSize: 25}]}>{Strings('youHaveNoGame')}</Text>
                            </ScrollView>
                    }
                </Wrapper>
            </MagicMove.Scene>
        )
    }
}

export default Games;