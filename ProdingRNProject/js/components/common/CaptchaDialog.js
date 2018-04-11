import React from 'react';
import {View, Text, TouchableWithoutFeedback, Image, TouchableOpacity, StyleSheet,TextInput} from 'react-native';
import {COMMON_MARGIN, COMMON_THEME_COLOR, COMMON_WHITE, COMMON_PADDING, COMMON_DIVIDER_COLOR} from "../../constants/StyleConstants";
import PopupDialog, {
    DialogTitle,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
    FadeAnimation,
  } from 'react-native-popup-dialog';

class CaptchaDialog extends React.Component {
// TODO 完善验证码弹出对话框组件，然后用于需要验证码的画面
    constructor(props) {
        super(props);
    }

    show() {
        this.popupDialog.show();
    }

    dismiss() {
        this.popupDialog.dismiss();
    }
    
    render() {
        return(
            <PopupDialog
                width={0.7}
                height={200}
                containerStyle={{justifyContent:'flex-start',paddingTop:40}}
                ref={(popupDialog) => { this.popupDialog = popupDialog; }}>
                <View style={{flex:1,alignItems:'center',padding:COMMON_PADDING}}>
                    <Text>图形验证码</Text>
                    <TouchableWithoutFeedback
                        onPress={this.props.onCaptchaPress}>
                        <View style={style.captchaImageContainer}>
                            <Image style={style.captchaImage} source={{uri:this.props.captchaUri}} resizeMode='stretch'/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={{alignItems:'center',padding:COMMON_PADDING}}>
                    <TextInput style={style.captchaDialogTextInput} placeholder={'请输入验证码'} 
                        onChangeText={this.props.onTextInputChange}
                    />
                </View>
                <View style={style.captchaDialogDivider}/>
                <View style={style.captchaDialogBottomContainer}>
                    <TouchableOpacity style={style.captchaDialogBottomButton}
                        onPress={() => {
                            this.popupDialog.dismiss();
                        }}>
                        <Text>取消</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.captchaDialogBottomButton}
                        onPress={this.props.onConfirmClick}>
                        <Text>确定</Text>
                    </TouchableOpacity>
                </View>
            </PopupDialog>
        );
    }
}

const style = StyleSheet.create({
    captchaImageContainer:{
        width:75,
        height:30,
        marginTop:COMMON_MARGIN
    },
    captchaImage:{
        width:75,
        height:30,
    },
    captchaDialogTextInput :{
        width:150,
        height:40,
        backgroundColor:COMMON_WHITE,
        marginHorizontal: 10,
    },
    captchaDialogDivider :{
        height:1,
        backgroundColor:COMMON_DIVIDER_COLOR,
    },
    captchaDialogBottomContainer :{
        flexDirection:'row',
        height:40,
        backgroundColor:COMMON_WHITE,
    },
    captchaDialogBottomButton :{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:COMMON_WHITE,
    },
});

export default CaptchaDialog;