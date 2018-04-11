import React from "react";
import {Button, Text, TextInput, TouchableOpacity, View, StyleSheet, Keyboard, Image} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {COMMON_MARGIN, COMMON_WHITE, COMMON_PADDING, COMMON_THEME_COLOR} from "../../constants/StyleConstants";
import ThemeButton from "../../components/common/ThemeButton";
import ApiService from "../../network/ApiService";
import ToastUtil from "../../util/ToastUtil";
import Spinner from 'react-native-loading-spinner-overlay';

class LoginBackImage extends React.Component {

    render() {
        return (
            <TouchableOpacity onPress={() => {this.props.navigationObj.goBack();}}>
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}} >
                    <Icon name="ios-close-outline" size={25} style={{marginLeft:COMMON_MARGIN * 2}}/>
                </View>
            </TouchableOpacity>
        );
    }
}

class Login extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
                title:'登录',
                headerLeft: <LoginBackImage navigationObj={navigation}/>,
                headerTitleStyle: {
                    flex:1,
                    fontSize:18,
                    textAlign:'center'
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
            isLoading:false,
            isNeedCaptcha:false,
            captchaUri:'',
            captchaHash:'',
        }
        this.userName = '';
        this.password = '';
        this.captcha = '';
        // this.captchaHash = '';
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
        console.log('userName = ' + this.userName);
        console.log('password = ' + this.password);
        if (!this.userName) {
            ToastUtil.showToast('请输入用户名');
            return;
        }
        if (!this.password) {
            ToastUtil.showToast('请输入密码');
            return;
        }

        if (this.state.isNeedCaptcha && !this.captcha) {
            ToastUtil.showToast('请输入验证码');
            return;
        }

        Keyboard.dismiss();
        this.setState({
            isLoading:true
        });
        ApiService.login(this.userName, this.password, this.captcha, this.state.captchaHash)
            .then((responseBody) => {
                console.log('responseBody in');
                console.log(responseBody);
                // 存储用户信息
                storage.save({
                    key:'user',
                    data:responseBody.data,
                    expires:null
                });
                // 单独存储token
                storage.save({
                    key:'token',
                    data:responseBody.data.accessToken,
                    expires:null
                });
                // 关闭本画面,并发送登录成功之后的通知
                this.props.navigation.goBack();
            }).catch((err) => {
                console.log('catch in');
                console.log(err);
                this.checkCaptcha();
                err.json().then((errorBody) => {
                        console.log('errorBody = ' + errorBody);
                        console.log( errorBody);
                        // console.log(errorBody);
                        errorBody.error.message ? ToastUtil.showToast(errorBody.error.message) : '';
                    }
                );
            }).finally(() => {
                this.setState({
                    isLoading:false
                })
            });
    }

    checkCaptcha() {
        console.log('check captcha in');
        ApiService.getCaptcha('signing-in', this.userName).then((responseBody) => {
            console.log(responseBody);
            if (responseBody.data) {
                this.setState({
                    isNeedCaptcha:true,
                    captchaUri:responseBody.data.base64,
                    captchaHash:responseBody.data.hash
                });
            }
        });
    }

    showCaptcha() {
        return ( 
            <View style={[style.captchaContainer, {marginTop:1}]}>
                <TextInput style={style.captchaTextInput} underlineColorAndroid={'transparent'} placeholder={'图形验证码'}
                    onChangeText={(text) => {
                        this.onCaptchaChange(text);
                    }}
                />
                <View style={style.captchaImageContainer}>
                    <Image style={style.captchaImage} source={{uri:this.state.captchaUri}} resizeMode='stretch'/>
                    <Text style={style.captchaChangeText}>换一张</Text>
                </View>
            </View>);
    }

    render(){
        console.log('render is called');
        let captchaComponent = this.state.isNeedCaptcha ? this.showCaptcha() : null;
        return (
            <View style={{flexDirection:'column'}}>
                <TextInput style={style.textInput} underlineColorAndroid={'transparent'} placeholder={'手机号'}
                    onChangeText={(text) => {
                        this.onUserNameChange(text);
                    }}
                />
                <TextInput style={[style.textInput,{ marginTop:1}]} underlineColorAndroid={'transparent'} placeholder={'密码'} secureTextEntry={true}
                    onChangeText={(text) => {
                        this.onPasswordChange(text);
                    }}
                />
                {captchaComponent}
                <ThemeButton text={'登录'} onPress={this.onLoginButtonClick.bind(this)}/>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:COMMON_MARGIN, marginRight:COMMON_MARGIN}}>
                    <Text onPress={()=>{ console.log('忘记密码')}}>忘记密码？</Text>
                    <Text
                        onPress={()=>{
                            this.props.navigation.navigate('RegisterFirstStep');
                        }}>注册</Text>
                </View>

                <Spinner visible={this.state.isLoading} textContent={"加载中"} textStyle={{color: '#FFF', fontSize:16}} />
            </View>
        );
    };
}

const style = StyleSheet.create({
    textInput:{
        height:40,
        backgroundColor:COMMON_WHITE,
        padding:10
    },
    captchaContainer:{
        flexDirection:'row',
        backgroundColor:COMMON_WHITE,
        height:40,
    },
    captchaTextInput:{
        flex:1,
        height:40,
        backgroundColor:COMMON_WHITE,
        padding:10
    },
    captchaImageContainer:{
        flexDirection:'row',
        height:40,
        justifyContent:'flex-end',
        alignItems:'center'
    },
    captchaImage:{
        width:75,
        height:30,
    },
    captchaChangeText:{
        color:COMMON_THEME_COLOR,
        marginHorizontal: COMMON_MARGIN,
    }
});


export default Login;