import React from 'react';
import { Button, Text, TextInput, TouchableOpacity, View, StyleSheet, Keyboard, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COMMON_MARGIN, COMMON_WHITE, COMMON_PADDING, COMMON_THEME_COLOR } from '../../constants/StyleConstants';
import ThemeButton from '../../components/common/ThemeButton';
import ApiService from '../../network/ApiService';
import ToastUtil from '../../util/ToastUtil';
import Spinner from 'react-native-loading-spinner-overlay';

import PropTypes from 'prop-types';


class LoginBackImage extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={() => { this.props.navigationObj.goBack(); }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
          <Icon name="ios-close-outline" size={25} style={{ marginLeft: COMMON_MARGIN * 2 }} />
        </View>
      </TouchableOpacity>
    );
  }
}

const propTypes = {
  isLoading: PropTypes.bool,
  isNeedCaptcha: PropTypes.bool,
  isLoginSuccess: PropTypes.bool,
  captchaUri: PropTypes.string,
  captchaHash: PropTypes.string,
  errorMessage: PropTypes.string,
  login: PropTypes.func,
  checkCaptcha: PropTypes.func,
  exit: PropTypes.func,
};

class Login extends React.Component {
    static navigationOptions = ({ navigation }) => ({
      title: '登录',
      headerLeft: <LoginBackImage navigationObj={navigation} />,
      headerTitleStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
      },
      headerStyle: {
        height: 40,
      },
      headerRight: <View />,
    });

    constructor(props) {
      super(props);
      // this.state = {
      //     isLoading:false,
      //     isNeedCaptcha:false,
      //     captchaUri:'',
      //     captchaHash:'',
      // }
      this.userName = '';
      this.password = '';
      this.captcha = '';
      // this.captchaHash = '';
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.isLoginSuccess) {
        this.props.navigation.goBack();
      }
      if (nextProps.errorMessage) {
        ToastUtil.showToast(nextProps.errorMessage);
      }
    }

    componentWillUnmount() {
      this.props.exit();
    }


    onUserNameChange(text) {
      this.userName = text;
    }

    onPasswordChange(text) {
      this.password = text;
    }

    onCaptchaChange(text) {
      this.captcha = text;
    }

    onLoginButtonClick() {
      console.log('登录');
      // 登录操作，需要进行网络通信
      // 先使用fetch API,然后在根据具体场景封装 FetchAPI
      console.log(`userName = ${this.userName}`);
      console.log(`password = ${this.password}`);
      if (!this.userName) {
        ToastUtil.showToast('请输入用户名');
        return;
      }
      if (!this.password) {
        ToastUtil.showToast('请输入密码');
        return;
      }

      if (this.props.isNeedCaptcha && !this.captcha) {
        ToastUtil.showToast('请输入验证码');
        return;
      }

      Keyboard.dismiss();

      this.props.login(this.userName, this.password, this.captcha, this.props.captchaHash);
    }

    checkCaptcha() {
      this.props.checkCaptcha('signing-in', this.userName);
    }

    showCaptcha() {
      return (
        <View style={[style.captchaContainer, { marginTop: 1 }]}>
          <TextInput
            style={style.captchaTextInput}
            underlineColorAndroid="transparent"
            placeholder="图形验证码"
            onChangeText={(text) => {
                        this.onCaptchaChange(text);
                    }}
          />
          <View style={style.captchaImageContainer}>
            <Image style={style.captchaImage} source={{ uri: this.props.captchaUri }} resizeMode="stretch" />
            <Text
              style={style.captchaChangeText}
              onPress={() => {
                        this.checkCaptcha();
                    }}
            >换一张
            </Text>
          </View>
        </View>);
    }

    render() {
      console.log('render is called');
      const captchaComponent = this.props.isNeedCaptcha ? this.showCaptcha() : null;
      return (
        <View style={{ flexDirection: 'column' }}>
          <TextInput
            style={style.textInput}
            underlineColorAndroid="transparent"
            placeholder="手机号"
            onChangeText={(text) => {
                        this.onUserNameChange(text);
                    }}
          />
          <TextInput
            style={[style.textInput, { marginTop: 1 }]}
            underlineColorAndroid="transparent"
            placeholder="密码"
            secureTextEntry
            onChangeText={(text) => {
                        this.onPasswordChange(text);
                    }}
          />
          {captchaComponent}
          <ThemeButton text="登录" onPress={this.onLoginButtonClick.bind(this)} />
          <View style={{
flexDirection: 'row', justifyContent: 'space-between', marginLeft: COMMON_MARGIN, marginRight: COMMON_MARGIN,
}}
          >
            <Text onPress={() => {
                        console.log('忘记密码');
                        this.props.navigation.navigate('ResetPwdFirstStep');
                    }}
            >忘记密码？
            </Text>
            <Text
              onPress={() => {
                            this.props.navigation.navigate('RegisterFirstStep');
                        }}
            >注册
            </Text>
          </View>

          <Spinner visible={this.props.isLoading} textContent="加载中" textStyle={{ color: '#FFF', fontSize: 16 }} />
        </View>
      );
    }
}

const style = StyleSheet.create({
  textInput: {
    height: 40,
    backgroundColor: COMMON_WHITE,
    padding: 10,
  },
  captchaContainer: {
    flexDirection: 'row',
    backgroundColor: COMMON_WHITE,
    height: 40,
  },
  captchaTextInput: {
    flex: 1,
    height: 40,
    backgroundColor: COMMON_WHITE,
    padding: 10,
  },
  captchaImageContainer: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  captchaImage: {
    width: 75,
    height: 30,
  },
  captchaChangeText: {
    color: COMMON_THEME_COLOR,
    marginHorizontal: COMMON_MARGIN,
  },
});

Login.propTypes = propTypes;

export default Login;
