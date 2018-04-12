import React from "react";
import {Button, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ProfileInfoListItem from "./ProfileInfoListItem";
import {COMMON_MARGIN, COMMON_WHITE} from "../../constants/StyleConstants";
import AccountInfo from "./account/AccountInfo";
import store from 'react-native-simple-store';

class Profile extends React.Component {

    static navigationOptions = {
        title:'我的',
        headerTitleStyle: {
            flex:1,
            fontSize:18,
            textAlign:'center'
        },
        headerStyle:{
            height:40
        },
        tabBarIcon: ({tintColor}) => {
            return <Icon name="md-person" size={25} color={tintColor} />
        }
    };

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <ScrollView style={{flexDirection:'column',flex:1}}>
                {/*头部布局*/}
                <TouchableOpacity onPress={() => {
                    
                    storage.load({
                        key:'user'
                    }).then((ret) => {
                        console.log(ret);
                        this.props.navigation.navigate('AccountInfo');
                    }).catch((err) => {
                        console.log(err);
                        this.props.navigation.navigate({routeName:'Login', key:'KEY_LOGIN'});
                    });
                }}>
                    <View style={{flexDirection:'row',alignItems:'center', height:100, backgroundColor:COMMON_WHITE}}
                          >
                        <Image style={{width:70,height:70,margin:10,borderRadius:35}} source={ require('../../../spiro.jpg')}/>
                        <View style={{flexDirection:'column'}}>
                            <Text>158****1377</Text>
                            <Text>15840891377</Text>
                        </View>
                        <Icon name='ios-arrow-forward' size={20} style={{right:10,position:'absolute'}}/>
                    </View>
                </TouchableOpacity>
                {/*我的订单、我的收藏*/}
                <ProfileInfoListItem icon={'ios-paper-outline'} title={'我的订单'} marginTop={COMMON_MARGIN}/>
                <ProfileInfoListItem icon={'ios-cube-outline'} title={'我的收藏'} marginTop={1}/>
                {/*意见反馈、电话客服、设置*/}
                <ProfileInfoListItem icon={'ios-mail-open-outline'} title={'意见反馈'} marginTop={COMMON_MARGIN}/>
                <ProfileInfoListItem icon={'ios-headset-outline'} title={'电话客服'} marginTop={1}/>
                <ProfileInfoListItem icon={'ios-settings-outline'} title={'设置'} marginTop={1} onPress={() => {
                    this.props.navigation.navigate('Setting');
                }}/>

            </ScrollView>

        );
    };
}

export default Profile;