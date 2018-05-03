import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, TouchableOpacity, View } from 'react-native';
import { COMMON_LIST_HEIGHT, COMMON_MARGIN, COMMON_PADDING, COMMON_WHITE } from '../../constants/StyleConstants';



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
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={{
 flexDirection: 'row', height: COMMON_LIST_HEIGHT, alignItems: 'center', padding: COMMON_PADDING, marginTop: this.props.marginTop, backgroundColor: COMMON_WHITE,
}}
        >
          { this.props.icon ? <Icon name={this.props.icon} size={20} /> : null }
          <Text style={{ marginLeft: this.props.icon ? COMMON_MARGIN : 0 }}>{this.props.title}</Text>
          <View style={{ flexDirection: 'row', right: 10, position: 'absolute' }}>
            <Text style={{ marginRight: this.props.hideArrow ? 0 : COMMON_MARGIN }}>{this.props.message}</Text>
            { this.props.hideArrow ? null : <Icon name="ios-arrow-forward" size={20} /> }
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
