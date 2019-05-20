import React, {Component} from 'react';
import {View, Modal, Image, AsyncStorage, TouchableOpacity} from 'react-native';
import styles from "./styles";
import Store from '../../config/store';

class LanguageModal extends Component {
    state = {
        languages: [{lang: 'tr', img: require('../../assets/images/tr-flag.png')}, {lang: 'en', img: require('../../assets/images/en-flag.png')}]
    };

    setLang(lang) {
        Store.setLang(lang);
        AsyncStorage.setItem('lang', lang);
        this.props.close();
    }

    render() {
        return (
            <Modal visible={this.props.visible} onRequestClose={() => this.props.close()} animationType={'fade'} transparent={true}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => this.props.close()} style={styles.close}>
                        <Image source={require('../../assets/images/close.png')} style={{width: 30, height: 30}} />
                    </TouchableOpacity>
                    <View style={styles.popup}>
                        {this.state.languages.map((item, i) =>
                            <TouchableOpacity key={i} onPress={() => this.setLang(item.lang)} style={styles.item}>
                                <Image source={item.img} style={styles.img} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </Modal>
        )
    }
}

export default LanguageModal;