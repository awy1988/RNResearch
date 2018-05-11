import React from 'react';
import { connect } from 'react-redux';
import { Text, TextInput, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ContactsWrapper from 'react-native-contacts-wrapper';
import ListDividerLine from '../../../components/common/ListDividerLine';
import {
  COMMON_DIVIDER_COLOR, COMMON_MARGIN,
  COMMON_PADDING, COMMON_PRIMARY_FONT_COLOR,
  COMMON_THEME_COLOR,
  COMMON_WHITE,
} from '../../../constants/StyleConstants';
import ThemeButton from '../../../components/common/ThemeButton';
import { selectContactAsConsignee } from '../../../actions/address/addressActions';

class AddressEdit extends React.Component {
  constructor(props) {
    super(props);
    this.consigneeName = '';
    this.mobile = '';
  }

  componentDidMount() {
    // this.consigneeName =
  }

  componentWillReceiveProps(nextProps) {
    this.consigneeName = nextProps.name;
    this.mobile = nextProps.mobile;
  }

  onConsigneesNameChange(text) {
    this.consigneeName = text;
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
                value={this.consigneeName}
              />
            </View>
            <ListDividerLine />
            <View style={style.listItemContainer}>
              <Text style={style.listItemTitle}>手机号码：</Text>
              <TextInput
                style={style.textInput}
                underlineColorAndroid="transparent"
                value={this.mobile}
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
        <TouchableOpacity>
          <View style={style.listItemContainer}>
            <Text style={style.listItemTitle}>所在地区：</Text>
            <Text
              style={{ flex: 1, marginRight: 30 }}
              numberOfLines={1}
            >{}
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
          />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
          <ThemeButton
            btnStyle={style.saveBtn}
            text="保存"
            onPress={() => {
              console.log('保存');
            }}
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
const mapStateToProps = state => state.address.selectedAddress;

const mapDispatchToProps = dispatch => ({
  selectContact: () => dispatch(selectContactAsConsignee()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressEdit);
