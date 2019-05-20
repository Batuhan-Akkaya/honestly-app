import React, {Component} from 'react';
import {View, Text, Vibration, KeyboardAvoidingView} from 'react-native';
import {AdBanner, Button, Input, Wrapper} from "../../components";
import styles from "./styles";
import sharedStyles from "../../utils/sharedStyles";
import vars from "../../config/vars";
import * as Animatable from 'react-native-animatable';
import {getFirstName, post} from "../../utils/helpers";
import adIds from "../../config/adIds";
import AuthStore from '../../config/store/auth';
import {openAd} from "../../utils/interAd";
import Store from '../../config/store';
import {Strings} from "../../translate";
import * as MagicMove from "react-native-magic-move";

class AnswerPopup extends Component {
    static navigationOptions = {
        headerLeft: null
    };

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.navigation.getParam('data'),
            disabled: false,
            comment: '',
            msg: '',
            msgScreen: false,
            selectedButton: 0,
            showComment: false,
            borderColor: 'transparent'
        };
        this.helperFunc = () => {};
        console.log(this.props.navigation.getParam('data'));
    }

    answerRequest(answer, question, type) {
        const {disabled, data, comment} = this.state;
        if (!disabled) {
            this.setState({disabled: true});
            const questionId = type === 'guess' ? question.quest._id : question._id;
            post('/game/answer', {gameId: data._id, answer, questionId, type, comment}, res => {
                this.helperFunc = () => {this.setState(state => ({data: {...state.data, newQuestions: res.doc.newQuestions}, disabled: false, msgScreen: false}));};
                if (type === 'guess') {
                    Vibration.vibrate(800);
                    const cmt = question.answered[0].comment ? '\n\n' + Strings('friendsComment') + question.answered[0].comment : '';
                    if (answer === question.answered[0].answer)
                        this.setState({msg: Strings('youKnow')+cmt, borderColor: '#2ecc71'});
                    else
                    {
                        let cmtMsg = cmt+'\n'+Strings('friendsAnswer')+question.quest.answers[question.answered[0].answer];
                        this.setState({msg: Strings('couldNotKnow') + cmtMsg, borderColor: '#c0392b'});
                    }
                    this.setState({msgScreen: true, comment: '', showComment: false, selectedButton: 0});
                } else {
                    this.props.navigation.pop(2);
                    Store.getGameList();
                    if (Store.adCount.answer && Math.random() >= 0.5) openAd();
                }
            });
        }
    }

    componentDidMount() {
        this.setState({friend: getFirstName(this.state.data.participants.filter(x => x.user._id !== AuthStore.user._id)[0].user.name)});
    }

    render() {
        const {data: {newQuestions, lastQuestions, participants}, selectedButton, showComment, comment, msg, msgScreen, disabled, borderColor, friend} = this.state;
        return (
            <MagicMove.Scene style={{flex: 1}}>

                <Wrapper>
                    <KeyboardAvoidingView behavior={'padding'} style={styles.overlay}>
                    <Text style={[sharedStyles.txt, {position: 'absolute', top: 30, textAlign: 'center', fontSize: 20}]}>
                        {getFirstName(participants[0].user.name) + ' v ' + getFirstName(participants[1].user.name)}
                    </Text>
                    <MagicMove.View useNativeDriver={false} transition={MagicMove.Transition.shrinkAndGrow} duration={500} id={"answerDelay"} style={[styles.popup, {borderColor, borderWidth: 4}]}>
                        {!msgScreen ?
                            newQuestions ?
                                <React.Fragment>
                                    <Text style={[sharedStyles.txt, styles.questTxt, {fontSize: 15, textAlign: 'left'}]}>{Strings('answerQuestion')}</Text>
                                    <View style={styles.divider} />
                                    <Text style={[sharedStyles.txt, styles.questTxt, {fontFamily: 'Arial'}]}>{newQuestions[0].question}</Text>
                                    {!showComment ?
                                        <View style={styles.btnGroup}>
                                            {newQuestions[0].answers.map((answer, i) =>
                                                <Button title={answer} onPress={() => this.setState({selectedButton: i, showComment: true})} style={[styles.btn, {backgroundColor: i%2!==0?vars.baseColor:vars.secondColor, minHeight: 43}]} key={i}/>)
                                            }
                                        </View>
                                        :
                                        <Animatable.View animation={'zoomIn'}>
                                            <Text style={[sharedStyles.txt, {textAlign: 'center', marginTop: 15, fontWeight: '700', fontSize: 17}]}>{newQuestions[0].answers[selectedButton]}</Text>
                                            <Input value={comment} onChange={comment => this.setState({comment})} label={Strings('yourComment')} containerStyle={{paddingHorizontal: 15}} maxLenght={150} />
                                            <Button title={Strings('send')} onPress={() => this.answerRequest(selectedButton, newQuestions[0], 'real')} style={[styles.btn, {backgroundColor: vars.secondColor}]} disabled={disabled} loading={disabled} />
                                        </Animatable.View>
                                    }
                                </React.Fragment>
                                : lastQuestions ? <React.Fragment>
                                    <Text style={[sharedStyles.txt, styles.questTxt, {fontSize: 16, fontWeight: '600'}]}>{Strings('guessFriendAnswer')}</Text>
                                    <View style={styles.divider} />
                                    <Text style={[sharedStyles.txt, styles.questTxt, {fontFamily: 'Arial'}]}>{lastQuestions[0].quest.question}</Text>
                                    {!showComment ?
                                        <View style={styles.btnGroup}>
                                            {lastQuestions[0].quest.answers.map((answer, i) =>
                                                <Button title={friend+': '+answer} onPress={() => this.setState({selectedButton: i, showComment: true})} style={[styles.btn, {backgroundColor: i%2!==0?vars.baseColor:vars.secondColor, alignItems: 'flex-start'}]} key={i} txtStyle={{textAlign: 'left'}} />)
                                            }
                                        </View>
                                        :
                                        <Animatable.View animation={'zoomIn'}>
                                            <Text style={[sharedStyles.txt, {textAlign: 'center', marginTop: 10, fontWeight: '700'}]}>{lastQuestions[0].quest.answers[selectedButton]}</Text>
                                            <Input value={comment} onChange={comment => this.setState({comment})} label={Strings('yourComment')} containerStyle={{paddingHorizontal: 15}} maxLenght={150} />
                                            <Button title={Strings('send')} onPress={() => this.answerRequest(selectedButton, lastQuestions[0], 'guess')} style={[styles.btn, {backgroundColor: vars.secondColor, minHeight: 43}]} disabled={disabled} loading={disabled} />
                                        </Animatable.View>
                                    }
                                </React.Fragment> : null
                            :
                            <Animatable.View animation={'fadeIn'} duration={1000}>
                                <Text style={[sharedStyles.txt, styles.questTxt]}>{msg}</Text>
                                <Button title={Strings('answerYourQuestion')} onPress={() => this.helperFunc()} />
                            </Animatable.View>
                        }
                    </MagicMove.View>
                    <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
                        <AdBanner id={adIds.gameRoom} />
                    </View>
                </KeyboardAvoidingView>
                </Wrapper>
            </MagicMove.Scene>
        )
    }
}

export default AnswerPopup;