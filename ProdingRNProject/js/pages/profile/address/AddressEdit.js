import React from 'react';
import { connect } from 'react-redux';
import { Text, TextInput, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ListDividerLine from '../../../components/common/ListDividerLine';
import {
  COMMON_BLACK,
  COMMON_DIVIDER_COLOR, COMMON_FONT_SIZE_LEVEL_2, COMMON_MARGIN,
  COMMON_PADDING, COMMON_PRIMARY_FONT_COLOR,
  COMMON_THEME_COLOR,
  COMMON_WHITE,
} from '../../../constants/StyleConstants';
import ThemeButton from '../../../components/common/ThemeButton';
import {
  addressEditExitAction, createAddressAction, deleteAddressFromEditAction, deleteAddressFromListAction,
  selectContactAsConsignee,
  selectMapAddress, updateAddressAction,
} from '../../../actions/address/addressActions';
import ToastUtil from '../../../util/ToastUtil';

class AddressEdit extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('type', 'create') === 'create' ? '新建收货地址' : '编辑收货地址',
      headerRight: (
        navigation.getParam('type', 'create') === 'create' ? null : (
          <Text
            style={{color: COMMON_BLACK, marginRight: COMMON_MARGIN, fontSize: COMMON_FONT_SIZE_LEVEL_2}}
            onPress={() => {
              // 删除地址
              Alert.alert(
                null,
                '确定删除地址吗',
                [
                  { text: '确定', onPress: () => navigation.state.params.deleteBtnPress() },
                  { text: '取消' },
                ],
              );
            }}
          >
            删除
          </Text>
        )),
    };
  };

  constructor(props) {
    super(props);
    this.consigneeId = '';
    this.consigneeName = '';
    this.mobile = '';
    this.addressDistrict = '';
    this.addressDetail = '';
    this.type = this.props.navigation.getParam('type', 'create');
    if (this.type !== 'create') {
      this.addressInfo = this.props.navigation.getParam('addressInfo', {});
      this.consigneeId = this.addressInfo.id;
      this.consigneeName = this.addressInfo.name;
      this.mobile = this.addressInfo.mobile;
      this.addressDistrict = `${this.addressInfo.provinceName}${this.addressInfo.cityName}${this.addressInfo.districtName}`;
      this.addressDetail = this.addressInfo.address;
    }
    this.isDefault = this.props.navigation.getParam('isDefault', false);
    this.isMobileEdited = false;
    this.poiAddress = {};
    this.onSelectAddressClick = this.onSelectAddressClick.bind(this);
    this.onSaveBtnClick = this.onSaveBtnClick.bind(this);
    this.onDeleteAddressClick = this.onDeleteAddressClick.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({ deleteBtnPress: this.onDeleteAddressClick });
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.shouldExitAddressEdit) {
      this.props.navigation.goBack();
      this.props.exit();
      return;
    }

    this.consigneeName = nextProps.name;
    this.mobile = nextProps.mobile;
    // 处理mobile
    this.mobile = this.mobile.replace(new RegExp(' ', 'gm'), '').replace(new RegExp('-', 'gm'), '').replace(new RegExp('\\+86', 'gm'), '');
    if (nextProps.poiAddress) {
      this.poiAddress = nextProps.poiAddress;
      this.addressDistrict = `${nextProps.poiAddress.pname}${nextProps.poiAddress.cityname}${nextProps.poiAddress.adname}`;
      this.addressDetail = `${nextProps.poiAddress.address} ${nextProps.poiAddress.name}`;
    }
  }

  componentWillUnmount() {
    this.props.exit();
  }

  onConsigneesNameChange(text) {
    this.consigneeName = text;
  }

  onSelectAddressClick() {
    this.props.selectMapAddress(this.props.navigation);
  }

  onDeleteAddressClick() {
    this.props.deleteAddress(this.props.user.id, this.consigneeId);
  }

  formCheck() {
    // 表单check
    if (!this.consigneeName) {
      ToastUtil.showToast('请填写收货人姓名');
      return false;
    }
    if (!this.mobile) {
      ToastUtil.showToast('请填写手机号码');
      return false;
    }
    if (!this.addressDistrict) {
      ToastUtil.showToast('请选择所在地区');
      return false;
    }
    if (!this.addressDetail) {
      ToastUtil.showToast('请输入详细地址，如街道，门牌号等');
      return false;
    }
    return true;
  }

  onSaveBtnClick() {
    // 保存
    if (this.formCheck()) {
      if (this.type === 'create') {
        // 新建地址
        const longitude = this.poiAddress.location.split(',')[0];
        const latitude = this.poiAddress.location.split(',')[1];
        console.log(this.mobile);
        this.props.createAddress({
          longitude,
          latitude,
          userId: this.props.user.id,
          name: this.consigneeName,
          mobile: this.mobile,
          provinceName: this.poiAddress.pname,
          cityName: this.poiAddress.cityname,
          districtName: this.poiAddress.adname,
          address: this.addressDetail,
          isDefault: this.isDefault });
      } else {
        // 编辑地址
        let longitude;
        let latitude;
        if (this.poiAddress.location) {
          // 重新选择了地址，需要发送请求获取省市区码
          longitude = this.poiAddress.location.split(',')[0];
          latitude = this.poiAddress.location.split(',')[1];
        }
        this.props.updateAddress({
          longitude,
          latitude,
          userId: this.props.user.id,
          consigneeId: this.consigneeId,
          name: this.consigneeName,
          mobile: this.isMobileEdited ? this.mobile : null,
          provinceName: this.poiAddress.pname ? this.poiAddress.pname : this.addressInfo.provinceName,
          cityName: this.poiAddress.cityname ? this.poiAddress.cityname : this.addressInfo.cityName,
          districtName: this.poiAddress.adname ? this.poiAddress.adname : this.addressInfo.districtName,
          address: this.addressDetail,
          isDefault: this.isDefault,
        });
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={style.listHeaderContainer}>
          <View style={[style.listHeaderLeft]}>
            <View style={style.listItemContainer}>
              <Text style={style.listItemTitle}>收货人：</Text>
              <TextInput
                style={style.textInput}
                underlineColorAndroid="transparent"
                onChangeText={
                  (text) => {
                    this.onConsigneesNameChange(text);
                  }
                }
                defaultValue={this.consigneeName}
              />
            </View>
            <ListDividerLine />
            <View style={style.listItemContainer}>
              <Text style={style.listItemTitle}>手机号码：</Text>
              <TextInput
                style={style.textInput}
                underlineColorAndroid="transparent"
                defaultValue={this.mobile}
                onChangeText={(text) => {
                  this.mobile = text;
                  this.isMobileEdited = true;
                }}
              />
            </View>
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              this.props.selectContact();
            }}
          >
            <View style={style.listHeaderRight}>
              <Icon name="ios-person-add-outline" style={style.listHeaderRightIcon} />
              <Text>选联系人</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <ListDividerLine />
        <TouchableOpacity
          onPress={() => {
            this.onSelectAddressClick();
          }}
        >
          <View style={style.listItemContainer}>
            <Text style={style.listItemTitle}>所在地区：</Text>
            <Text
              style={{ flex: 1, marginRight: 30 }}
              numberOfLines={1}
            >{this.addressDistrict}
            </Text>
            <Icon name="ios-arrow-forward" style={style.rightArrow} />
          </View>
        </TouchableOpacity>
        <ListDividerLine />
        <View style={style.listItemContainer}>
          <Text style={style.listItemTitle}>详细地址：</Text>
          <TextInput
            style={style.textInput}
            underlineColorAndroid="transparent"
            placeholder="街道、门牌号等"
            defaultValue={this.addressDetail}
            onChangeText={(text) => {
              this.addressDetail = text;
            }}
          />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
          <ThemeButton
            btnStyle={style.saveBtn}
            text="保存"
            onPress={this.onSaveBtnClick}
          />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  listHeaderContainer: {
    flexDirection: 'row',
    height: 81,
    backgroundColor: COMMON_WHITE,
  },
  listItemContainer: {
    flexDirection: 'row',
    height: 40,
    paddingLeft: COMMON_PADDING,
    paddingRight: COMMON_PADDING,
    alignItems: 'center',
    backgroundColor: COMMON_WHITE,
  },
  listItemTitle: {
    color: COMMON_PRIMARY_FONT_COLOR,
  },
  listHeaderLeft: {
    flex: 4,
  },
  listHeaderRight: {
    flex: 1,
    height: 81,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: COMMON_DIVIDER_COLOR,
  },
  listHeaderRightIcon: {
    fontSize: 40,
    color: COMMON_THEME_COLOR,
  },
  rightArrow: {
    position: 'absolute',
    right: COMMON_MARGIN,
    fontSize: 20,
  },
  textInput: {
    flex: 1,
    height: 40,
    padding: 0,
  },
  saveBtn: {
    width: 160,
  },
});

/* =============================================================================
 container组件定义
============================================================================= */
const mapStateToProps = (state) => {
  return {
    ...state.address.selectedAddress,
    user: state.user,
    shouldExitAddressEdit: state.address.shouldExitAddressEdit,
  };
};

const mapDispatchToProps = dispatch => ({
  selectContact: () => dispatch(selectContactAsConsignee()),
  selectMapAddress: navigation => dispatch(selectMapAddress({ navigation })),
  createAddress: ({ longitude, latitude, userId, name, mobile, province, provinceName, city, cityName, district, districtName, address, isDefault }) => dispatch(createAddressAction({ longitude, latitude, userId, name, mobile, province, provinceName, city, cityName, district, districtName, address, isDefault })),
  updateAddress: ({ longitude, latitude, userId, consigneeId, name, mobile, province, provinceName, city, cityName, district, districtName, address, isDefault }) => dispatch(updateAddressAction({ longitude, latitude, userId, consigneeId, name, mobile, province, provinceName, city, cityName, district, districtName, address, isDefault })),
  deleteAddress: (userId, consigneeId) => dispatch(deleteAddressFromEditAction({ userId, consigneeId })),
  exit: () => dispatch(addressEditExitAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressEdit);
