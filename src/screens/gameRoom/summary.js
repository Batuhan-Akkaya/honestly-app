import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import styles from "./styles";
import sharedStyles from "../../utils/sharedStyles";
import {getFirstName} from "../../utils/helpers";

class Summary extends Component {
    render() {
        return (
            <View>
                {this.props.data.reverse().map((item, i) =>
                    <View style={styles.summaryCard} key={i}>
                        <Text style={[sharedStyles.txt, {textAlign: 'center', fontWeight: '500'}]}>{item.quest.question}</Text>
                        <View style={{marginTop: 15, paddingRight: 25, marginLeft: 25}}>
                            {item.answered.map((y, x) =>
                                <View key={x}>
                                    <Text style={[sharedStyles.txt, {textAlign: 'center', fontWeight: '400'}]} key={x}>
                                        <Text style={{fontWeight: '700'}}>{getFirstName(y.user.name)}</Text>: {item.quest.answers[y.answer]}
                                    </Text>
                                    {y.comment ?
                                        <Text style={[sharedStyles.txt, sharedStyles.underline, {fontWeight: '500', textAlign: 'center'}]}>
                                            {y.comment}
                                        </Text>: null
                                    }
                                </View>
                            )}
                        </View>
                        {item.answered[0].answer === item.answered[1].answer ?
                            <Image source={require('../../assets/images/like.png')} style={styles.like} />
                            :
                            <Image source={require('../../assets/images/dislike.png')} style={styles.like} />
                        }
                    </View>
                )}
            </View>
        )
    }
}

export default Summary;