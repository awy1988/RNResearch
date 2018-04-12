import React from "react";
import {Button, Text, TextInput, TouchableOpacity, View, StyleSheet} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {COMMON_MARGIN, COMMON_WHITE} from "../../constants/StyleConstants";
import ThemeButton from "../../components/common/ThemeButton";
import ApiService from "../../network/ApiService";
import ToastUtil from "../../util/ToastUtil";
import CaptchaDialog from "../../components/common/CaptchaDialog"

class RegisterSecondStep extends React.Component {

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
            countdown:60,
            captchaUri:'',
            captchaHash:'',
        }
        this.mobile = this.props.navigation.state.params.mobile;
        this.verificationCode = '';
        this.captchaText = '';

    }

    componentDidMount() {
        // 发送网络请求获取倒计时秒数
        ApiService.getMobileSmsCountdownSeconds(this.mobile).then(ret => {
            console.log(ret);
            let countdown = ret.data.countdown;
            this.setState({
                countdown: ret.data.countdown
            });
            this.startCountdown();
        }).catch(err => {
            err.json().then(ret => {
                if (ret.error.message) ToastUtil.showToast(ret.error.message);
            });
        });
    }

    onVerificationCodeInputChange(text) {
        console.log('onVerificationCodeInputChange in text = ' + text);
        this.verificationCode = text;
    }

    showDialog() {
        if (this.state.countdown !== 0) return;
        this.refs.popupDialog.show();
        this.refreshCaptcha();
    }

    getMobileVerification(isVoice) {
        // 发送短信或语音验证码
        ApiService.getMobileVerificationCode(this.mobile,  this.captchaText, this.state.captchaHash, 'signing-up', isVoice?'voice':'sms')
            .then(ret => {
                this.setState({
                    countdown:ret.data.countdown
                });
                this.startCountdown();
            }).catch(err => {
                err.json().then(ret => {
                    if (ret.error.message) ToastUtil.showToast(ret.error.message);
                });
            });
    }

    startCountdown() {
        // 每1000毫秒对countdown进行-1操作
        let countDownId = setInterval(() => {
            console.log(this.state.countdown);
            this.setState(previousState => {
                if (previousState.countdown > 0) {
                    return { countdown: previousState.countdown - 1 };
                } else {
                    clearInterval(countDownId);
                }
            });
        }, 1000);
    }

    onNextStepButtonClick() {
        // 下一步按钮点击
        if (!this.verificationCode) {
            ToastUtil.showToast('验证码不能为空');
            return;
        }
        // 检验验证码的有效性
        ApiService.checkVerificationCode(this.mobile, this.verificationCode).then( ret => {
            let code = ret.data.code;
            if(code === this.verificationCode) {
                // 验证通过，进入下一步
                this.props.navigation.navigate('RegisterThirdStep',{
                    mobile: this.mobile,
                    code: this.verificationCode
                });
            } else {
                // 未验证通过，提示
                ToastUtil.showToast('验证码错误，请重新填写！');
            }
        }).catch(err => {
            err.json().then(ret => {
                if (ret.error.message) ToastUtil.showToast(ret.error.message);
            });
        });
        
    }

    refreshCaptcha() {
        // 刷新验证码
        ApiService.getCaptcha('signing-up',this.mobile).then(ret => {
            console.log(ret);
            // this.showDialog();
            this.setState({
                captchaUri:ret.data.base64,
                captchaHash:ret.data.hash
            });
        
        });
    }
    
    onCaptchaDialogInputChange(text) {
        this.captchaText = text;
    }

    onDialogConfirmButtonClick() {
        // 验证码对话框确认按钮点击逻辑
        if (!this.captchaText){
            ToastUtil.showToast('验证码为空');
            return;
        }
        // 验证码不为空，调用接口发送短信
        this.refs.popupDialog.dismiss();
        this.getMobileVerification(false);
    }
    
    render(){
        return (
            <View style={{flexDirection:'column'}}>
                <Text style={{margin:COMMON_MARGIN}}>验证码已发送至您的手机{this.mobile}</Text>
                <View style={style.codeInputContainer}>
                    <TextInput style={style.textInput} underlineColorAndroid={'transparent'} placeholder={'验证码'}
                        onChangeText={(text) => {
                            this.onVerificationCodeInputChange(text);
                        }}
                    />
                    <ThemeButton
                        btnStyle={this.state.countdown === 0? style.getVCodeButtonStyleNormal: style.getVCodeButtonStyleDisable} 
                        text={this.state.countdown === 0? '重新获取': this.state.countdown} 
                        activeOpacity={1} 
                        onPress={this.showDialog.bind(this)}/>
                </View>
                <ThemeButton
                    text={'下一步，设置密码'}
                    onPress={() => {
                        this.onNextStepButtonClick();
                    }}
                />
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Text>收不到短信？使用</Text><Text>语音验证码</Text>
                </View>

                <CaptchaDialog 
                    ref='popupDialog'
                    captchaUri={this.state.captchaUri} 
                    onCaptchaPress={this.refreshCaptcha.bind(this)}
                    onTextInputChange={this.onCaptchaDialogInputChange.bind(this)}
                    onConfirmClick={this.onDialogConfirmButtonClick.bind(this)}/>

            </View>
        );
    };
}

const style = StyleSheet.create({
    textInput :{
        flex:1,
        height:40,
        backgroundColor:COMMON_WHITE,
        padding:10
    },
    codeInputContainer:{
        flexDirection:'row',
        height:40,
        backgroundColor:COMMON_WHITE,
        alignItems: 'center',
    },
    getVCodeButtonStyleNormal:{
        width:75,
        height:30,
        margin:0
    },
    getVCodeButtonStyleDisable:{
        width:75,
        height:30,
        margin:0,
        backgroundColor:'#e8e8e8',
    }
});


export default RegisterSecondStep;