import React from "react";
import {Button, Text, TextInput, TouchableOpacity, View, StyleSheet, Image,TouchableWithoutFeedback} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {COMMON_MARGIN, COMMON_THEME_COLOR, COMMON_WHITE, COMMON_PADDING, COMMON_DIVIDER_COLOR} from "../../constants/StyleConstants";
import ThemeButton from "../../components/common/ThemeButton";
import ToastUtil from "../../util/ToastUtil";
import ApiService from "../../network/ApiService"
import CaptchaDialog from "../../components/common/CaptchaDialog"
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {checkMobileAvailableAction} from "../../actions/auth/resetPwdActions";
  
// 组件的组织方面，我们将container组件与 UI 组件定义在一个文件中，因为画面很多的情况下，每个画面单独定义一个container，直接导致文件的倍增，而且也不利于查找。

/* =============================================================================
 UI组件 ： <ResetPwdFirstStep />
============================================================================= */

const propTypes = {
    captchaUri: PropTypes.string,
    captchaHash: PropTypes.string,
    isMobileRegistered: PropTypes.bool,
    errorMessage: PropTypes.string
};

class ResetPwdFirstStep extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
                title:'找回密码',
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
        // this.state = {
        //     captchaUri:'',
        //     captchaHash:'',
        // };
        this.mobile = '';
        this.captchaText = '';
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isMobileRegistered) {
            // 手机号已经注册的情况下，发送请求图形验证码的Action
        }

        if (nextProps.showCaptcha) {
            this.showDialog();
        }

        if (nextProps.errorMessage) {
            ToastUtil.showToast(nextProps.errorMessage);
        }
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

        this.props.checkMobile(this.mobile);
    }

    // checkMobile() {
    //
    //     // this.showDialog();
    //
    //     // 检测手机号是否可用
    //     ApiService.checkMobileAvailable(this.mobile).then((ret) => {
    //         // 手机号可用
    //         // 获取图形验证码,验证码获取成功则显示对话框
    //         console.log(ret);
    //         if (ret.data) {
    //             // 手机号已被注册,弹出提示
    //             ToastUtil.showToast('该手机号已被注册');
    //         } else {
    //             // 手机号未被注册
    //             this.refreshCaptcha();
    //         }
    //     }).catch( err => {
    //         // 手机号不可用
    //         // 提示用户
    //         err.json().then(ret => {
    //             if (ret.error.message) ToastUtil.showToast(ret.error.message);
    //         })
    //     });
    // }

    showDialog() {
        this.refs.popupDialog.show();
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
        ApiService.getMobileVerificationCode(this.mobile, this.captchaText, this.props.captchaHash).then((ret) => {
            // 获取验证码成功，迁移到第二步
            this.refs.popupDialog.dismiss();
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
                    text={'下一步'}
                    onPress={() => {
                        this.onNextButtonClick();
                    }}
                />

                <CaptchaDialog 
                    ref='popupDialog'
                    captchaUri={this.props.captchaUri}
                    onCaptchaPress={this.refreshCaptcha.bind(this)}
                    onTextInputChange={this.onCaptchaDialogInputChange.bind(this)}
                    onConfirmClick={this.onDialogConfirmButtonClick.bind(this)}/>
            </View>
        );
    };
}

ResetPwdFirstStep.propTypes = propTypes;

/* =============================================================================
 UI组件style ： <ResetPwdFirstStep />
============================================================================= */
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
});

/* =============================================================================
 container组件定义
 我们可以任意命名我们导出的组件，但是建议命名为：<FindPwdFirstStepContainer/>
============================================================================= */
const mapStateToProps = (state) => {
    return state.findPassword.resetPasswordFirstStep;
};

const mapDispatchToProps = dispatch => ({
    checkMobile: (mobile) => dispatch(checkMobileAvailableAction({mobile})),
});
// 导出container组件
export default connect(mapStateToProps, mapDispatchToProps)(ResetPwdFirstStep);