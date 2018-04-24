import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { COMMON_MARGIN, COMMON_WHITE } from '../../constants/StyleConstants';
import ThemeButton from '../../components/common/ThemeButton';
import ApiService from '../../network/ApiService';
import ToastUtil from '../../util/ToastUtil';
import CaptchaDialog from '../../components/common/CaptchaDialog';
import PropTypes from 'prop-types';
import { getMobileVCodeAction } from '../../actions/auth/resetPwdActions';


/* =============================================================================
 UI组件 ： <ResetPwdSecondStep />
============================================================================= */

// const propTypes = {
//     countdown: PropTypes.number,
//     captchaUri: PropTypes.string,
//     captchaHash: PropTypes.string,
// };

class ResetPwdSecondStep extends React.Component {
    // 业务逻辑：
    // 1.进入画面获取短信验证码倒计时
    // 2.读秒结束后，可以进行重新获取短信验证码操作
    // 3.重新获取短信验证码需要输入图形验证码
    // 4.获取语音验证码前需要输入图形验证码（此功能暂时不提供）

    static navigationOptions = () => ({
      title: '找回密码',
      headerTitleStyle: {
        flex: 1,
        fontSize: 18,
        // textAlign:'center'
      },
      headerStyle: {
        height: 40,
      },
      headerRight: <View />,
    });

    constructor(props) {
      super(props);
      // 这是一个典型例子，需要UI组件的State进行参与，
      // 倒计时操作最简单的实现方式就是在UI组件的state中单独设置一个变量
      // 每次倒计时更改组件中state的变量
      this.state = {
        countdown: 60,
        captchaUri: '',
        captchaHash: '',
      };
      this.mobile = this.props.navigation.state.params.mobile;
      this.verificationCode = '';
      this.captchaText = '';
      this.countDownId;
      this.showDialog = this.showDialog.bind(this);
      this.refreshCaptcha = this.refreshCaptcha.bind(this);
      this.onCaptchaDialogInputChange = this.onCaptchaDialogInputChange.bind(this);
      this.onDialogConfirmButtonClick = this.onDialogConfirmButtonClick.bind(this);
    }

    // componentWillReceiveProps(nextProps) {
    //   // console.log('componentWillReceiveProps resetPwdSecondStep is called');
    //   // if (nextProps.countdown > 0) {
    //   //     // 需要倒计时，进行倒计时操作
    //   //     this.setState({
    //   //         countdown:nextProps.countdown
    //   //     });
    //   //     this.startCountdown();
    //   // }
    // }

    componentDidMount() {
      // 发送网络请求获取倒计时秒数，并开始倒计时
      // 这个异步任务必须放在这里来完成，因为使用发送获取读秒的 Action 然后在 componentWillReceiveProps 方法中启动倒计时的方法，在第二次进入画面的时候，无法进行倒计时，原因暂时不明。
      ApiService.getMobileSmsCountdownSeconds(this.mobile).then((ret) => {
        this.setState({
          countdown: ret.data.countdown,
        });
        this.startCountdown();
      }).catch((err) => {
        err.json().then((ret) => {
          if (ret.error.message) ToastUtil.showToast(ret.error.message);
        });
      });
    }

    componentWillUnmount() {
      clearInterval(this.countDownId);
    }

    onVerificationCodeInputChange(text) {
      this.verificationCode = text;
    }

    showDialog() {
      if (this.state.countdown !== 0) return;
      this.popupDialog.show();
      this.refreshCaptcha();
    }

    getMobileVerification(isVoice) {
      // 发送短信或语音验证码
      // this.props.getVerificationCode(this.mobile, this.captchaText, this.props.captchaHash, 'resetting-password', isVoice?'voice':'sms');
      // return;
      ApiService.getMobileVerificationCode(this.mobile, this.captchaText, this.state.captchaHash, 'resetting-password', isVoice ? 'voice' : 'sms')
        .then((ret) => {
          this.setState({
            countdown: ret.data.countdown,
          });
          this.startCountdown();
        }).catch((err) => {
          err.json().then((ret) => {
            if (ret.error.message) ToastUtil.showToast(ret.error.message);
          });
        });
    }

    startCountdown() {
      // 每1000毫秒对countdown进行-1操作
      this.countDownId = setInterval(() => {
        this.setState((previousState) => {
          if (previousState.countdown > 0) {
            return { countdown: previousState.countdown - 1 };
          }
          clearInterval(this.countDownId);
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
      ApiService.checkVerificationCode(this.mobile, this.verificationCode).then((ret) => {
        const code = ret.data.code;
        if (code === this.verificationCode) {
          // 验证通过，进入下一步
          this.props.navigation.navigate('ResetPwdThirdStep', {
            mobile: this.mobile,
            code: this.verificationCode,
          });
        } else {
          // 未验证通过，提示
          ToastUtil.showToast('验证码错误，请重新填写！');
        }
      }).catch((err) => {
        err.json().then((ret) => {
          if (ret.error.message) ToastUtil.showToast(ret.error.message);
        });
      });
    }

    refreshCaptcha() {
      // 刷新验证码
      ApiService.getCaptcha('reset-password', this.mobile).then((ret) => {
        this.setState({
          captchaUri: ret.data.base64,
          captchaHash: ret.data.hash,
        });
      }).catch((err) => {
        console.log(err);
        err.json().then((ret) => {
          console.log(ret);
        });
      });
    }

    onCaptchaDialogInputChange(text) {
      this.captchaText = text;
    }

    onDialogConfirmButtonClick() {
      // 验证码对话框确认按钮点击逻辑
      if (!this.captchaText) {
        ToastUtil.showToast('验证码为空');
        return;
      }
      // 验证码不为空，调用接口发送短信
      this.popupDialog.dismiss();
      this.getMobileVerification(false);
    }

    render() {
      return (
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ margin: COMMON_MARGIN }}>验证码已发送至您的手机{this.mobile}</Text>
          <View style={style.codeInputContainer}>
            <TextInput
              style={style.textInput}
              underlineColorAndroid="transparent"
              placeholder="验证码"
              onChangeText={(text) => {
                            this.onVerificationCodeInputChange(text);
                        }}
            />
            <ThemeButton
              btnStyle={this.state.countdown === 0 ? style.getVCodeButtonStyleNormal : style.getVCodeButtonStyleDisable}
              text={this.state.countdown === 0 ? '重新获取' : this.state.countdown}
              activeOpacity={1}
              onPress={this.showDialog}
            />
          </View>
          <ThemeButton
            text="下一步"
            onPress={() => {
                        this.onNextStepButtonClick();
                    }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text>收不到短信？使用</Text><Text>语音验证码</Text>
          </View>

          <CaptchaDialog
            ref={(ref) => { this.popupDialog = ref; }}
            captchaUri={this.state.captchaUri}
            onCaptchaPress={this.refreshCaptcha}
            onTextInputChange={this.onCaptchaDialogInputChange}
            onConfirmClick={this.onDialogConfirmButtonClick}
          />

        </View>
      );
    }
}

// ResetPwdSecondStep.propTypes = propTypes;

/* =============================================================================
 UI组件style ： <ResetPwdSecondStep />
============================================================================= */
const style = StyleSheet.create({
  textInput: {
    flex: 1,
    height: 40,
    backgroundColor: COMMON_WHITE,
    padding: 10,
  },
  codeInputContainer: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: COMMON_WHITE,
    alignItems: 'center',
  },
  getVCodeButtonStyleNormal: {
    width: 75,
    height: 30,
    margin: 0,
  },
  getVCodeButtonStyleDisable: {
    width: 75,
    height: 30,
    margin: 0,
    backgroundColor: '#e8e8e8',
  },
});

/* =============================================================================
 container组件定义
============================================================================= */

const mapStateToProps = state => state.resetPassword.resetPasswordSecondStep;

const mapDispatchToProps = dispatch => ({
  getVerificationCode: mobile => dispatch(getMobileVCodeAction({ mobile })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPwdSecondStep);
