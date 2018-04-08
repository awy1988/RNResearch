import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {COMMON_LIST_HEIGHT, COMMON_MARGIN, COMMON_PADDING, COMMON_WHITE} from "../../constants/StyleConstants";
import Icon from "react-native-vector-icons/Ionicons";


export default class ProfileInfoListItem extends React.Component {

    // TODO 1.用Props将这里面的数据动态化

    // getDefaultProps() {
    //     return {
    //         icon:'',
    //         title:'',
    //         marginTop:0,
    //     }
    // }

    render() {
        return (
            <TouchableOpacity>
                <View style={{flexDirection:'row',height:COMMON_LIST_HEIGHT, alignItems:'center',padding:COMMON_PADDING,marginTop:this.props.marginTop,backgroundColor:COMMON_WHITE}}>
                    <Icon name={this.props.icon} size={20}/>
                    <Text style={{marginLeft:COMMON_MARGIN}}>{this.props.title}</Text>
                    <Icon name={'ios-arrow-forward'} size={20} style={{right:10,position:'absolute'}}/>
                </View>
            </TouchableOpacity>
        );
    }
}