import vars from "../../config/vars";

export default {
    btn: {
        minHeight: 41,
        backgroundColor: vars.baseColor,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginTop: 15
    },
    title: {
        color: '#fff',
        fontFamily: vars.font,
        fontWeight: '600',
        textAlign: 'center',
        fontSize: 18
    },
    plus: {
        fontSize: 30,
        color: vars.baseColor,
        lineHeight: 34,
        left: 1
    },
    float: {
        position: 'absolute',
        right: 15,
        bottom: 15,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    }
}