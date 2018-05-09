import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchAddressListAction } from '../../../actions/address/addressActions';
import {
  COMMON_FONT_SIZE_LEVEL_3, COMMON_FONT_SIZE_LEVEL_4, COMMON_MARGIN,
  COMMON_PADDING,
  COMMON_PRIMARY_FONT_COLOR, COMMON_SECONDARY_FONT_COLOR, COMMON_THEME_COLOR,
  COMMON_WHITE,
} from '../../../constants/StyleConstants';
import ListDividerLine from '../../../components/common/ListDividerLine';


/**
 * 用户信息
 */
class AddressList extends React.Component {
  // static navigationOptions = {
  //     headerLeft: ( <Icon name={'md-home'}   /> ),
  // };


  componentDidMount() {
    this.props.fetchAddressList(this.props.user.id);
  }

  render() {
    return (
      <View>
        <FlatList
          renderItem={({ item, index }) => {
            // 第一个位置显示默认地址
            return (
              <View style={listItemStyle.container}>
                <View style={listItemStyle.headerContainer}>
                  <View style={listItemStyle.headerNameContainer}>
                    <Text style={listItemStyle.name}>{item.name}</Text>
                    <Text style={listItemStyle.mobile}>{item.mobile}</Text>
                  </View>
                  <Text style={listItemStyle.addressDetail}>{`${item.provinceName}${item.cityName}${item.districtName}${item.address}`}</Text>
                </View>
                <ListDividerLine />
                <View style={listItemStyle.bottomContainer}>
                  <TouchableWithoutFeedback
                    onPress={
                      () => {
                        console.log('hello');
                      }
                    }
                  >
                    <View style={listItemStyle.bottomLeftContainer}>
                      <Icon style={index === 0 ? listItemStyle.bottomIconSelected : listItemStyle.bottomIcon} name={index === 0 ? 'ios-checkmark-circle' : 'ios-radio-button-off'} />
                      <Text style={listItemStyle.bottomText}>{index === 0 ? '默认地址' : '设为默认'}</Text>
                    </View>
                  </TouchableWithoutFeedback>

                  <View style={listItemStyle.bottomRightContainer}>
                    <TouchableWithoutFeedback
                      onPress={
                        () => {
                          console.log('编辑');
                        }
                      }
                    >
                      <View style={listItemStyle.bottomRightContainer}>
                        <Icon name="ios-create-outline" style={listItemStyle.bottomIcon} />
                        <Text style={listItemStyle.bottomText}>编辑</Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                      onPress={
                        () => {
                          console.log('删除');
                        }
                      }
                    >
                      <View style={[listItemStyle.bottomRightContainer, { marginLeft: 8 }]}>
                        <Icon name="ios-trash-outline" style={listItemStyle.bottomIcon} />
                        <Text style={listItemStyle.bottomText}>删除</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              </View>
            );
          }}
          data={this.props.addressList}

          ItemSeparatorComponent={() => {
            return (
              <ListDividerLine style={{ height: 10 }} />
            );
          }}

        />
      </View>
    );
  }
}

const listItemStyle = StyleSheet.create({
  container: {
    backgroundColor: COMMON_WHITE,
  },
  headerContainer: {
    paddingLeft: COMMON_PADDING,
    paddingRight: 60,
    paddingTop: COMMON_PADDING,
    paddingBottom: COMMON_PADDING,
  },
  headerNameContainer: {
    flexDirection: 'row',
  },
  name: {
    width: 80,
    color: COMMON_PRIMARY_FONT_COLOR,
    fontSize: COMMON_FONT_SIZE_LEVEL_3,
  },
  mobile: {
    marginLeft: 40,
    color: COMMON_PRIMARY_FONT_COLOR,
    fontSize: COMMON_FONT_SIZE_LEVEL_3,
  },
  addressDetail: {
    marginTop: COMMON_MARGIN,
    color: COMMON_SECONDARY_FONT_COLOR,
    fontSize: COMMON_FONT_SIZE_LEVEL_4,
  },
  bottomContainer: {
    flexDirection: 'row',
    padding: COMMON_PADDING,
    justifyContent: 'space-between',
  },
  bottomLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomText: {
    marginLeft: 4,
    color: COMMON_SECONDARY_FONT_COLOR,
    fontSize: COMMON_FONT_SIZE_LEVEL_4,
  },
  bottomIconSelected: {
    color: COMMON_THEME_COLOR,
    fontSize: COMMON_FONT_SIZE_LEVEL_3,
  },
  bottomIcon: {
    fontSize: COMMON_FONT_SIZE_LEVEL_3,
  },
});


/* =============================================================================
 container组件定义
============================================================================= */
const mapStateToProps = (state) => {
  return {
    user: state.user,
    addressList: state.address.addressList,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchAddressList: userId => dispatch(fetchAddressListAction({ userId })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressList);
