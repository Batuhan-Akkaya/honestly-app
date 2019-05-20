import React, {Component} from 'react';
import {TouchableOpacity, ActivityIndicator, Text, TouchableNativeFeedback, View} from 'react-native';
import styles from "./styles";
import sharedStyles from "../../utils/sharedStyles";
import vars from "../../config/vars";

class Button extends Component {
    render() {
        const {title, onPress, loading, style, txtStyle, float, disabled, grayed} = this.props;
        if (float) {
            return (
                <TouchableOpacity onPress={() => onPress()} style={styles.float}>
                    <Text style={styles.plus}>+</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                vars.isIos ?
                    <TouchableOpacity onPress={() => onPress()} style={[styles.btn, sharedStyles.shadow, {backgroundColor: grayed ? '#7f8c8d' : vars.baseColor}, style]} disabled={loading || disabled}>
                        {!loading ?
                            <Text style={[styles.title, txtStyle]}>{title}</Text>
                            :
                            <ActivityIndicator color={'#fff'} size={'large'} />
                        }
                    </TouchableOpacity>
                    :
                    <TouchableNativeFeedback onPress={() => onPress()} disabled={loading || disabled}>
                        <View style={[styles.btn, sharedStyles.shadow, {backgroundColor: grayed ? '#7f8c8d' : vars.baseColor}, style]}>
                            {!loading ?
                                <Text style={[styles.title, txtStyle]}>{title}</Text>
                                :
                                <ActivityIndicator color={'#fff'} size={'large'} />
                            }
                        </View>
                    </TouchableNativeFeedback>
            )
        }
    }
}

export default Button;