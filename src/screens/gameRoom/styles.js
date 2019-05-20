import vars from "../../config/vars";

export default {
    txt: {
        fontSize: 18,
        fontWeight: '600'
    },
    card: {
        flex: 1,
        borderRadius: 15,
        backgroundColor: vars.thirdColor,
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popup: {
        width: '85%',
        minHeight: 145,
        backgroundColor: vars.thirdColor,
        borderRadius: 5,
        paddingTop: 20,
        paddingBottom: 0
    },
    questTxt: {
        fontSize: 17,
        marginHorizontal: 10,
        fontWeight: 'bold'
    },
    btnGroup: {
        marginTop: 27
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 5
    },
    lvl: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 25
    },
    summaryCard: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: vars.baseColor,
        paddingTop: 15,
        marginHorizontal: -5,
        marginTop: 5,
        borderRadius: 10,
        position: 'relative'
    },
    btn: {
        height: 40,
        marginTop: 0
    },
    like: {
        position: 'absolute',
        right: 15,
        bottom: 0,
        width: 30,
        height: 40,
        resizeMode: 'contain'
    },
    divider: {
        width: 55,
        height: 2,
        backgroundColor: '#fff',
        marginLeft: 10,
        marginBottom: 20,
        marginTop: 7
    }
}