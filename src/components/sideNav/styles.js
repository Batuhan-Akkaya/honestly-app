import vars from "../../config/vars";

export default {
    container: {
        flex: 1,
        backgroundColor: vars.baseColor,
        justifyContent: 'center'
    },
    btn: {
        height: 55,
        borderBottomWidth: 1,
        borderBottomColor: vars.secondColor,
        justifyContent: 'center'
    },
    txt: {
        fontSize: 18,
        color: '#fff',
        fontFamily: vars.font,
        marginLeft: 15
    }
}