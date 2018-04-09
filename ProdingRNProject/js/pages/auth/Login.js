import React from "react";
import {Button, Text, TextInput, TouchableOpacity, View, StyleSheet, Keyboard} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {COMMON_MARGIN, COMMON_WHITE} from "../../constants/StyleConstants";
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
        }
        this.userName = '';
        this.password = '';
    }
    

    onUserNameChange(text) {
        this.userName = text;
    }

    onPasswordChange(text) {
        this.password = text;
    }

    onLoginButtonClick() {
        console.log('登录');
        // 登录操作，需要进行网络通信
        // 先使用fetch API,然后在根据具体场景封装 FetchAPI
        console.log('userName = ' + this.userName);
        console.log('userName = ' + !this.userName);
        console.log('password = ' + this.password);
        console.log('password = ' + !this.password);
        if (!this.userName) {
            ToastUtil.showToast('请输入用户名');
            return;
        }
        if (!this.password) {
            ToastUtil.showToast('请输入密码');
            return;
        }
        Keyboard.dismiss();
        this.setState({
            isLoading:true
        });
        ApiService.login(this.userName, this.password)
            .then((response) => {
                console.log(response);
                return response.json();
            }).then((responseBody) => {
                console.log(responseBody);
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                this.setState({
                    isLoading:false
                })
            });
    }

    

    render(){
        console.log('render is called');
        return (
            <View style={{flexDirection:'column'}}>
                <TextInput style={style.textInput} underlineColorAndroid={'transparent'} placeholder={'手机号'}
                    onChangeText={(text) => {
                        this.onUserNameChange(text);
                    }}
                />
                <TextInput style={[style.textInput,{ marginTop:1}]} underlineColorAndroid={'transparent'} placeholder={'密码'}
                    onChangeText={(text) => {
                        this.onPasswordChange(text);
                    }}
                />
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
    textInput :{
        height:40,
        backgroundColor:COMMON_WHITE,
        padding:10
    }
});


export default Login;