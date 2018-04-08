import React from "react";
import {Button, Text, TextInput, TouchableOpacity, View, StyleSheet} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {COMMON_MARGIN, COMMON_WHITE} from "../../constants/StyleConstants";
import ThemeButton from "../../components/common/ThemeButton";

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
    }

    render(){
        return (
            <View style={{flexDirection:'column'}}>
                <TextInput style={style.textInput} underlineColorAndroid={'transparent'} placeholder={'手机号'}/>
                <TextInput style={[style.textInput,{ marginTop:1}]} underlineColorAndroid={'transparent'} placeholder={'密码'}/>
                <ThemeButton text={'登录'}/>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:COMMON_MARGIN, marginRight:COMMON_MARGIN}}>
                    <Text onPress={()=>{ console.log('忘记密码')}}>忘记密码？</Text>
                    <Text
                        onPress={()=>{
                            this.props.navigation.navigate('RegisterFirstStep');
                        }}>注册</Text>
                </View>
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