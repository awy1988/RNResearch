import React from "react";
import {Button, Text, TextInput, TouchableOpacity, View, StyleSheet} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {COMMON_MARGIN, COMMON_THEME_COLOR, COMMON_WHITE} from "../../constants/StyleConstants";
import ThemeButton from "../../components/common/ThemeButton";

class RegisterFirstStep extends React.Component {

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
    }

    render(){
        return (
            <View style={{flexDirection:'column'}}>
                <TextInput style={style.textInput} underlineColorAndroid={'transparent'} placeholder={'手机号'}/>
                <ThemeButton
                    text={'下一步，获取验证码'}
                    onPress={() => {
                        this.props.navigation.navigate('RegisterSecondStep');
                    }}
                />
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Text>注册代表同意</Text><Text style={style.textAgreement}>《Proding用户协议》</Text>
                </View>

            </View>
        );
    };
}

const style = StyleSheet.create({
    textInput :{
        height:40,
        backgroundColor:COMMON_WHITE,
        marginTop:COMMON_MARGIN,
        padding:10
    },
    textAgreement: {
        color: COMMON_THEME_COLOR
    }
});


export default RegisterFirstStep;