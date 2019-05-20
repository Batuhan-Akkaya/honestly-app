import React, {Component} from 'react';
import {Text, View, FlatList, Image} from 'react-native';
import {Wrapper} from "../../components";
import Api from '../../config/api';
import sharedStyles from "../../utils/sharedStyles";
import vars from "../../config/vars";
import {Strings} from "../../translate";

class LeaderBoard extends Component {
    static navigationOptions = {
        title: Strings('leaderBoard')
    };

    state = {
        data: []
    };

    componentDidMount() {
        Api.post('/game/leaderBoard').then(res => this.setState({data: res.docs}, () => console.log(res.docs)));
    }

    render() {
        return (
            <Wrapper>
                <View style={{alignItems: 'center'}}>
                    <Image source={require('../../assets/images/king-icon.png')} style={{width: 80, height: 60}} />
                </View>
                <FlatList
                    contentContainerStyle={{marginTop: -20}}
                    data={this.state.data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) =>
                        <View style={[sharedStyles.card, {backgroundColor: index%2===0 ? vars.secondColor : vars.thirdColor, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}]}>
                            <Text style={[sharedStyles.txt, {width: 100}]}>{item.participants[0].user.name}</Text>
                            <Text style={sharedStyles.txt}>LVL {item.level}</Text>
                            <Text style={[sharedStyles.txt, {width: 100, textAlign: 'right'}]}>{item.participants[1].user.name}</Text>
                        </View>
                    }
                />
            </Wrapper>
        )
    }
}

export default LeaderBoard;