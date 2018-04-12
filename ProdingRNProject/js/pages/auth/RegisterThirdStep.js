import React from "react";
import {Button, Text, TextInput, TouchableOpacity, View, StyleSheet} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {COMMON_MARGIN, COMMON_WHITE, COMMON_PADDING} from "../../constants/StyleConstants";
import ThemeButton from "../../components/common/ThemeButton";
import ToastUtil from "../../util/ToastUtil";
import ApiService from "../../network/ApiService";
import {NavigationActions} from 'react-navigation';

class RegisterThirdStep extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
                title:'注册',
                headerTitleStyle: {
                    flex:1,
                    fontSize:18,
                },
                headerStyle:{
                    height:40,
                },
                headerRight:<View/>
            }
    };

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

        // 验证通过，注册用户
        ApiService.register(this.mobile, this.verificationCode, this.passwordInputConfirm).then(ret => {
            console.log(ret);
            ToastUtil.showToast('注册成功');
            this.signin();
        }).catch(err => {
            console.log(err);
            err.json().then(ret => {
                if (ret.error.message) ToastUtil.showToast(ret.error.message);
            });
        });
    }

    signin() {
        // 登录
        ApiService.login(this.mobile, this.passwordInputConfirm).then(ret => {
            console.log(ret);
            // 存储用户信息
            storage.save({
                key:'user',
                data:ret.data,
                expires:null
            });
            // 单独存储token
            storage.save({
                key:'token',
                data:ret.data.accessToken,
                expires:null
            });
            // 关闭登录、注册第一步、注册第二步、还有本页面
            const backAction = NavigationActions.back({
                key:'KEY_LOGIN'
            });
            this.props.navigation.dispatch(backAction);

        }).catch(err => {
            console.log(err);
            err.json().then(ret => {
                if (ret.error.message) ToastUtil.showToast(ret.error.message);
            });
        });
    }

    render(){
        return (
            <View style={{flexDirection:'column',paddingTop:COMMON_PADDING}}>
                <TextInput style={style.textInput} underlineColorAndroid={'transparent'} placeholder={'输入密码'}
                    onChangeText={(text) => {
                        this.onPasswordInput(text);
                    }}
                    secureTextEntry={true}
                />
                <TextInput style={style.textInput} underlineColorAndroid={'transparent'} placeholder={'再次输入密码'}
                    onChangeText={(text) => {
                        this.onPasswordConfirmInput(text);
                    }}
                    secureTextEntry={true}
                />
                <ThemeButton
                    text={'完成注册'}
                    onPress={() => {
                        this.onConfirmButtonClick();
                    }}
                />
            </View>
        );
    };
}

const style = StyleSheet.create({
    textInput :{
        height:40,
        backgroundColor:COMMON_WHITE,
        marginTop:1,
        padding:10
    }
});


export default RegisterThirdStep;