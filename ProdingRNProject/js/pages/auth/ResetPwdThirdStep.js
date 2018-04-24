import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { COMMON_WHITE, COMMON_PADDING } from '../../constants/StyleConstants';
import ThemeButton from '../../components/common/ThemeButton';
import ToastUtil from '../../util/ToastUtil';
import ApiService from '../../network/ApiService';


class RegisterThirdStep extends React.Component {
    static navigationOptions = () => ({
      title: '找回密码',
      headerTitleStyle: {
        flex: 1,
        fontSize: 18,
      },
      headerStyle: {
        height: 40,
      },
      headerRight: <View />,
    });

    constructor(props) {
      super(props);
      this.mobile = this.props.navigation.state.params.mobile;
      this.verificationCode = this.props.navigation.state.params.code;
      this.passwordInput = '';
      this.passwordInputConfirm = '';
    }

    onPasswordInput(text) {
      this.passwordInput = text;
    }

    onPasswordConfirmInput(text) {
      this.passwordInputConfirm = text;
    }

    onConfirmButtonClick() {
      if (!this.passwordInput || !this.passwordInputConfirm) {
        ToastUtil.showToast('密码不能为空');
        return;
      }

      if (this.passwordInput !== this.passwordInputConfirm) {
        ToastUtil.showToast('两次输入的密码不一致');
        return;
      }

      // 验证通过，修改密码
      ApiService.updateUserPassword({ newPassword: this.passwordInputConfirm, mobile: this.mobile, mobileVerificationCode: this.verificationCode }).then(() => {
        const backAction = NavigationActions.back({
          key: 'KEY_LOGIN',
        });
        ToastUtil.showToast('设置密码成功');
        this.props.navigation.dispatch(backAction);
      }).catch((err) => {
        err.json().then((ret) => {
          if (ret.error.message) ToastUtil.showToast(ret.error.message);
        });
      });
    }

    render() {
      return (
        <View style={{ flexDirection: 'column', paddingTop: COMMON_PADDING }}>
          <TextInput
            style={style.textInput}
            underlineColorAndroid="transparent"
            placeholder="输入新密码"
            onChangeText={(text) => {
                        this.onPasswordInput(text);
                    }}
            secureTextEntry
          />
          <TextInput
            style={style.textInput}
            underlineColorAndroid="transparent"
            placeholder="再次输入新密码"
            onChangeText={(text) => {
                        this.onPasswordConfirmInput(text);
                    }}
            secureTextEntry
          />
          <ThemeButton
            text="保存"
            onPress={() => {
                        this.onConfirmButtonClick();
                    }}
          />
        </View>
      );
    }
}

const style = StyleSheet.create({
  textInput: {
    height: 40,
    backgroundColor: COMMON_WHITE,
    marginTop: 1,
    padding: 10,
  },
});


export default RegisterThirdStep;
