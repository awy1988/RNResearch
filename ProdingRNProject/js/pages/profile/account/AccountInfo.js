import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';
import ProfileInfoListItem from '../ProfileInfoListItem';
import { COMMON_MARGIN, COMMON_PADDING, COMMON_WHITE } from '../../../constants/StyleConstants';
import ApiService from '../../../network/ApiService';
import ToastUtil from '../../../util/ToastUtil';
import { connect } from 'react-redux';
import { BASE_URL } from '../../../constants/ApiConstants';
import {fetchUserInfoAction} from "../../../actions/SystemActions";

/**
 * 用户信息
 */
class AccountInfo extends React.Component {
  // static navigationOptions = {
  //     headerLeft: ( <Icon name={'md-home'}   /> ),
  // };


  componentDidMount() {
    // 获取用户信息 TODO 修改将用户信息存储在state中。
  }

  uploadUserLogo(image) {
    ApiService.uploadImage(image, 'user-logos').then((ret) => {
      // 上传成功，修改用户头像
      ApiService.updateUserProfile({ logo: ret.data.id })
        .then((response) => {
          console.log(response);
          ToastUtil.showToast('头像更改成功');
          // 更新用户信息
          this.props.fetchUserInfo();
        }).catch((e) => {
          console.log(e);
          e.json().then((err) => {
            ToastUtil.showToast(err.error.message);
          });
        });
    });
  }


  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => {
          this.ActionSheet.show();
        }}
        >
          <View style={style.avatarContainer}>
            <Text>头像</Text>
            <Image
              style={style.avatar}
              source={{ uri: `${BASE_URL}${this.props.user.logo}` }}
            />
          </View>
        </TouchableOpacity>
        <ProfileInfoListItem title="姓名" message={this.props.user.name} marginTop={1} />
        <ProfileInfoListItem title="性别"
          message={this.props.user.gender ? (this.props.user.gender === 'male' ? '男' : '女') : ''}
          marginTop={1}
        />
        <ProfileInfoListItem title="地址管理" marginTop={1} onPress={() => {
          this.props.navigation.navigate('AddressList');
        }} />
        <ProfileInfoListItem title="密码" marginTop={COMMON_MARGIN} />
        <ProfileInfoListItem title="手机" message={this.props.user.mobile} marginTop={1} hideArrow />
        <ProfileInfoListItem title="个性签名" message={this.props.user.signature} marginTop={1} />

        <ActionSheet
          ref={actionSheet => this.ActionSheet = actionSheet}
          title="方式选择"
          options={['拍照', '从相册选择', '取消']}
          cancelButtonIndex={2}
          onPress={(index) => {
            switch (index) {
              case 0:
                // 拍照
                ImagePicker.openCamera({
                  width: 300,
                  height: 400,
                  cropping: true,
                }).then((image) => {
                  console.log(image);
                  this.uploadUserLogo(image);
                });
                break;
              case 1:
                // 从相册选择
                ImagePicker.openPicker({
                  width: 300,
                  height: 300,
                  cropping: true,
                }).then((image) => {
                  // 上传图片
                  console.log(image);
                  this.uploadUserLogo(image);
                });
                break;
              default:
                break;
            }
          }}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: COMMON_PADDING,
    backgroundColor: COMMON_WHITE,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
});


/* =============================================================================
 container组件定义
============================================================================= */
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchUserInfo: () => dispatch(fetchUserInfoAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);
