import vars from "../../config/vars";

export default {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(43,43,56, 0.9)'
    },
    close: {
        position: 'absolute',
        top: 55,
        left: 25,
    },
    popup: {
        width: '90%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: vars.thirdColor,
        borderWidth: 5,
        borderRadius: 10,
        flexDirection: 'row'
    },
    item: {
        margin: 10
    },
    img: {
        width: 35,
        height: 20,
        resizeMode: 'stretch'
    }
}