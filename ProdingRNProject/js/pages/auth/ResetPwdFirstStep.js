import React from 'react';
import { Button, Text, TextInput, TouchableOpacity, View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { COMMON_MARGIN, COMMON_THEME_COLOR, COMMON_WHITE, COMMON_PADDING, COMMON_DIVIDER_COLOR } from '../../constants/StyleConstants';
import ThemeButton from '../../components/common/ThemeButton';
import ToastUtil from '../../util/ToastUtil';
import CaptchaDialog from '../../components/common/CaptchaDialog';

import {
  checkMobileAvailableAction,
  fetchMobileVerificationCodeAction,
  getCaptchaAction,
  toSecondStepAction,
} from '../../actions/auth/resetPwdActions';

// 组件的组织方面，我们将container组件与 UI 组件定义在一个文件中，因为画面很多的情况下，每个画面单独定义一个container，直接导致文件的倍增，而且也不利于查找。

/* =============================================================================
 UI组件 ： <ResetPwdFirstStep />
============================================================================= */

const propTypes = {
  captchaUri: PropTypes.string,
  captchaHash: PropTypes.string,
  isMobileRegistered: PropTypes.bool,
  showCaptcha: PropTypes.bool,
  fetchMobileVCodeSuccess: PropTypes.bool,
};

class ResetPwdFirstStep extends React.Component {
    static navigationOptions = ({ navigation }) => ({
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

      if (nextProps.fetchMobileVCodeSuccess) {
        this.refs.popupDialog.dismiss();
        this.props.toSecondStep();
        this.props.navigation.navigate('ResetPwdSecondStep', { mobile: this.mobile });
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

    showDialog() {
      this.refs.popupDialog.show();
    }

    refreshCaptcha() {
      // 刷新验证码
      this.props.refreshCaptcha('reset-password', this.mobile);
    }

    onCaptchaDialogInputChange(text) {
      this.captchaText = text;
    }

    getMobileVerification() {
      this.props.getVerificationCode(this.mobile, this.captchaText, this.props.captchaHash, 'resetting-password', 'sms');
    }

    onDialogConfirmButtonClick() {
      // 验证码对话框确认按钮点击逻辑
      if (!this.captchaText) {
        ToastUtil.showToast('验证码为空');
        return;
      }
      // 验证码不为空，调用接口发送短信
      this.getMobileVerification();
    }

    render() {
      return (
        <View style={{ flexDirection: 'column' }}>
          <TextInput
            style={style.textInput}
            underlineColorAndroid="transparent"
            placeholder="手机号"
            keyboardType="numeric"
            onChangeText={(text) => {
                        this.onMobileTextChange(text);
                    }}
          />
          <ThemeButton
            text="下一步"
            onPress={() => {
                        this.onNextButtonClick();
                    }}
          />

          <CaptchaDialog
            ref="popupDialog"
            captchaUri={this.props.captchaUri}
            onCaptchaPress={this.refreshCaptcha.bind(this)}
            onTextInputChange={this.onCaptchaDialogInputChange.bind(this)}
            onConfirmClick={this.onDialogConfirmButtonClick.bind(this)}
          />
        </View>
      );
    }
}

ResetPwdFirstStep.propTypes = propTypes;

/* =============================================================================
 UI组件style ： <ResetPwdFirstStep />
============================================================================= */
const style = StyleSheet.create({
  textInput: {
    height: 40,
    backgroundColor: COMMON_WHITE,
    marginTop: COMMON_MARGIN,
    padding: 10,
  },
  textAgreement: {
    color: COMMON_THEME_COLOR,
  },
});

/* =============================================================================
 container组件定义
 我们可以任意命名我们导出的组件，但是建议命名为：<ResetPwdFirstStepContainer/>
============================================================================= */
const mapStateToProps = state => state.resetPassword.resetPasswordFirstStep;

const mapDispatchToProps = dispatch => ({
  checkMobile: mobile => dispatch(checkMobileAvailableAction({ mobile })),
  refreshCaptcha: (actionType, actionKey) => dispatch(getCaptchaAction({ actionType, actionKey })),
  getVerificationCode: (mobile, captchaText, captchaHash, purpose, type) => dispatch(fetchMobileVerificationCodeAction({
    mobile, captchaText, captchaHash, purpose, type,
  })),
  toSecondStep: () => dispatch(toSecondStepAction()),
});
// 导出container组件
export default connect(mapStateToProps, mapDispatchToProps)(ResetPwdFirstStep);
