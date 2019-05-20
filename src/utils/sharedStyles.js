import vars from "../config/vars";

export default {
    container: {
        flex: 1,
        backgroundColor: vars.secondColor
    },
    txt: {
        fontFamily: vars.font,
        fontSize: 16,
        color: '#fff'
    },
    header: {
        shadowOpacity: 0,
        borderBottomWidth: 0,
        elevation: 0,
        backgroundColor: vars.baseColor,
    },
    headerTitle: {
        color: '#fff',
        fontFamily: vars.font,
        fontSize: 18
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        padding: 13,
        marginHorizontal: 10,
        borderRadius: 3,
        marginTop: 15
    },
    underline: {
        textDecorationLine: 'underline'
    }
}