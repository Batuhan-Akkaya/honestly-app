import {Platform, Dimensions} from 'react-native';

export default {
    host: 'http://localhost:3100',
    baseColor: '#2B2B38',
    secondColor: '#E73C98',
    thirdColor: '#7C54E9',
    font: 'monolog',
    isIos: Platform.OS === 'ios',
    width: Dimensions.get('window').width
}
