import React from "react";
import {Button, Text, TextInput, TouchableOpacity, View, StyleSheet, Image,TouchableWithoutFeedback} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {COMMON_MARGIN, COMMON_THEME_COLOR, COMMON_WHITE, COMMON_PADDING, COMMON_DIVIDER_COLOR} from "../../constants/StyleConstants";
import ThemeButton from "../../components/common/ThemeButton";
import ToastUtil from "../../util/ToastUtil";
import ApiService from "../../network/ApiService"
import PopupDialog, {
    DialogTitle,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
    FadeAnimation,
  } from 'react-native-popup-dialog';
  

class RegisterFirstStep extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
                title:'注册',
                headerTitleStyle: {
                    flex:1,
                    fontSize:18,
                    // textAlign:'center'
                },
                headerStyle:{
                    height:40,
                },
                headerRight:<View/>
            }
    };

    constructor(props) {
        super(props);
        this.state = {
            captchaUri:'',
            captchaHash:'',
        }
        this.mobile = '';
        this.captchaText = '';
    }

    onMobileTextChange(text) {
        this.mobile = text;
    }

    onNextButtonClick() {
        // 先检测手机号码
        if (!this.mobile) {
            ToastUtil.showToast('请输入手机号');
            return;
        }

        this.checkMobile();
    }

    checkMobile() {

        // this.showDialog();

        // 检测手机号是否可用
        ApiService.checkMobileAvailable(this.mobile).then((ret) => {
            // 手机号可用
            // 获取图形验证码,验证码获取成功则显示对话框
            console.log(ret);
            if (ret.data) {
                // 手机号已被注册,弹出提示
                ToastUtil.showToast('该手机号已被注册');
            } else {
                // 手机号未被注册
                this.refreshCaptcha();
            }
        }).catch( err => {
            // 手机号不可用
            // 提示用户
            err.json().then(ret => {
                if (ret.error.message) ToastUtil.showToast(ret.error.message);
            })
        });
    }

    showDialog() {
        this.popupDialog.show();
    }

    refreshCaptcha() {
        // 刷新验证码
        ApiService.getCaptcha('signing-up',this.mobile).then(ret => {
            console.log(ret);
            this.showDialog();
            this.setState({
                captchaUri:ret.data.base64,
                captchaHash:ret.data.hash
            });
        
        });
    }

    onCaptchaDialogInputChange(text) {
        this.captchaText = text;
    }

    getMobileVerification() {
        // 获取手机验证码
        ApiService.getMobileSmsVerificationCode(this.mobile, this.captchaText, this.state.captchaHash).then((ret) => {
            // 获取验证码成功，迁移到第二步
            this.popupDialog.dismiss();
            this.props.navigation.navigate('RegisterSecondStep',{ mobile:this.mobile });
            
        }).catch((err) => {
            err.json().then(ret => {
                if (ret.error.message) ToastUtil.showToast(ret.error.message);
            })
            this.refreshCaptcha();
        });
    }

    onDialogConfirmButtonClick() {
        // 验证码对话框确认按钮点击逻辑
        console.log('this.captcha = ' + this.captchaText);

        if (!this.captchaText){
            ToastUtil.showToast('验证码为空');
            return;
        }
        // 验证码不为空，调用接口发送短信
        this.getMobileVerification();
    }

    render(){
        return (
            <View style={{flexDirection:'column'}}>
                <TextInput style={style.textInput} underlineColorAndroid={'transparent'} placeholder={'手机号'} keyboardType={'numeric'}
                    onChangeText={(text) => {
                        this.onMobileTextChange(text);
                    }}
                />
                <ThemeButton
                    text={'下一步，获取验证码'}
                    onPress={() => {
                        this.onNextButtonClick();
                    }}
                />
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Text>注册代表同意</Text><Text style={style.textAgreement}>《Proding用户协议》</Text>
                </View>
                <PopupDialog
                    width={0.7}
                    height={200}
                    containerStyle={{justifyContent:'flex-start',paddingTop:40}}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}>
                    <View style={{flex:1,alignItems:'center',padding:COMMON_PADDING}}>
                        <Text>图形验证码</Text>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this.refreshCaptcha();
                            }}>
                            <View style={style.captchaImageContainer}>
                                <Image style={style.captchaImage} source={{uri:this.state.captchaUri}} resizeMode='stretch'/>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{alignItems:'center',padding:COMMON_PADDING}}>
                        <TextInput style={style.captchaDialogTextInput} placeholder={'请输入验证码'} 
                            onChangeText={(text) => {
                                this.onCaptchaDialogInputChange(text);
                            }}
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
                            onPress={() => {
                                this.onDialogConfirmButtonClick();
                            }}>
                            <Text>确定</Text>
                        </TouchableOpacity>
                    </View>
                </PopupDialog>
            </View>
        );
    };
}

const style = StyleSheet.create({
    textInput :{
        height:40,
        backgroundColor:COMMON_WHITE,
        marginTop:COMMON_MARGIN,
        padding:10
    },
    textAgreement: {
        color: COMMON_THEME_COLOR
    },
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


export default RegisterFirstStep;