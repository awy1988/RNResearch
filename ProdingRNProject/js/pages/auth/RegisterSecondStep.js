import React from "react";
import {Button, Text, TextInput, TouchableOpacity, View, StyleSheet} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {COMMON_MARGIN, COMMON_WHITE} from "../../constants/StyleConstants";
import ThemeButton from "../../components/common/ThemeButton";

class RegisterSecondStep extends React.Component {

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
                    text={'下一步，设置密码'}
                    onPress={() => {
                        this.props.navigation.navigate('RegisterThirdStep');
                    }}
                />
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Text>注册代表同意</Text><Text>《Proding用户协议》</Text>
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
    }
});


export default RegisterSecondStep;