import React, {Component} from 'react';
import {View, Text, ScrollView, RefreshControl, Image, Alert} from 'react-native';
import {post} from "../../utils/helpers";
import sharedStyles from "../../utils/sharedStyles";
import AuthStore from '../../config/store/auth';
import styles from './styles';
import {Button} from "../../components";
import vars from "../../config/vars";
import Summary from "./summary";
import {getFirstName} from "../../utils/helpers";
import Store from '../../config/store';
import {observer} from 'mobx-react/native';
import {openAd} from "../../utils/interAd";
import {Strings} from "../../translate";
import * as MagicMove from 'react-native-magic-move';

@observer
class GameRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {participants: [{user: '',winCount: 0}, {user: '',winCount: 0}], turn: {_id: '', name: ''},level: 0, summary: []},
            viaNotification: this.props.navigation.getParam('viaNotification'),
            disabled: false,
            refreshing: false,
            loading: true,
        };
        this._isMounted = false;
    }


    componentDidMount() {
        const data = this.props.navigation.getParam('data');
        if (data) this.setState({data});
        if (!this._isMounted) {
            this.fetchData();
            this._isMounted = true;
        }
        if (Store.adCounter === Store.adCount) openAd();
        Store.incrementAdCounter();
    }

    fetchData(cb) {
        const game = this.props.navigation.getParam('data');
        const id = this.props.navigation.getParam('id');
        post('/game/getById', {gameId: id ? id : game._id}, res => {
            this.setState({data: res.doc, refreshing: false, loading: false, viaNotification: false});
            cb && cb();
        });
    }

    answerQuest() {
        const {turn} = this.state.data;
        if (AuthStore.user._id === turn._id)
            this.props.navigation.navigate('AnswerPopup', {data: this.state.data, id: "section"+this.props.navigation.getParam('index')});
        else
            Alert.alert(Strings('warning'), Strings('notYourTurn'), [{text: Strings('ok')}]);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const {participants, turn, level, summary} = this.state.data;
        return (
            <MagicMove.Scene style={{flex: 1}}>
                <View style={[sharedStyles.container, {backgroundColor: vars.baseColor, padding: 15}]}>
                    <MagicMove.View id={"section"+this.props.navigation.getParam('index')} useNativeDriver={false} transition={MagicMove.Transition.flip.xy} duration={900} style={styles.card}>
                        {!this.state.loading ?
                            <ScrollView
                                contentContainerStyle={{padding: 20, paddingTop: 25}}
                                showsVerticalScrollIndicator={false}
                                refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => {this.setState({refreshing: true});this.fetchData()}}/>}
                            >
                                <Text style={[sharedStyles.txt, styles.txt, styles.title]}>{getFirstName(participants[0].user.name)} v {getFirstName(participants[1].user.name)}</Text>
                                <View style={styles.lvl}>
                                    <Image source={require('../../assets/images/level-icon.png')} style={{height: 18, width: 20, marginRight: 7, top: 5}} />
                                    <Text style={[sharedStyles.txt, styles.title]}>{level} LVL</Text>
                                </View>
                                {participants.map((data, i) =>
                                    <Text style={[sharedStyles.txt, styles.txt]} key={i}>{Strings('scoreOf', {name: data.user.name, winCount: data.winCount})}</Text>
                                )}
                                <Text style={[sharedStyles.txt, styles.txt, {marginTop: 25}]}>
                                    {turn._id === AuthStore.user._id ? Strings('yourTurn') : Strings('turnOf', {name: turn.name})}
                                </Text>
                                <MagicMove.View id="answerDelay">
                                    <Button title={Strings('answerQuestion')} onPress={() => this.answerQuest()} style={{backgroundColor: vars.secondColor, marginHorizontal: -10}} />
                                </MagicMove.View>
                                <Text style={[sharedStyles.txt, styles.title, {textAlign: 'left', marginTop: 20}]}>{Strings('summary')}</Text>
                                {!this.state.loading ? <Summary data={summary} /> : null}
                            </ScrollView>
                            : null
                        }
                    </MagicMove.View>
                </View>
            </MagicMove.Scene>
        )
    }
}

export default GameRoom;