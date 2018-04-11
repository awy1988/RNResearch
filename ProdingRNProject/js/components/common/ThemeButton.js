import React from "react";
import {Text, TouchableOpacity, StyleSheet} from "react-native";
import {COMMON_LIST_HEIGHT, COMMON_THEME_COLOR, COMMON_WHITE} from "../../constants/StyleConstants";

/**
 * 主题样式按钮
 * 支持按钮文言、按钮样式的自定义
 */
class ThemeButton extends React.Component {

    render() {
        return (
            <TouchableOpacity
                style={[style.btnContainer, this.props.btnStyle]}
                activeOpacity={this.props.activeOpacity}
                onPress={this.props.onPress}>
                <Text style={[style.btnText, this.props.btnTextStyle]}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

const style = StyleSheet.create({
    btnContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        height:COMMON_LIST_HEIGHT,
        marginTop:20,
        marginBottom:20,
        marginRight:10,
        marginLeft:10,
        backgroundColor:COMMON_THEME_COLOR,
        borderRadius:6,
    },
    btnText:{
        color:COMMON_WHITE,
        fontSize:16,
    }
});


export default ThemeButton;