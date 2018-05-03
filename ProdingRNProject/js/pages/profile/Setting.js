import React from 'react';
import { View, Text } from 'react-native';

class Setting extends React.Component {
  componentDidMount() {
    // 退出登录操作
    storage.remove({
      key: 'user',
    });
    storage.remove({
      key: 'token',
    });
    global.token = '';
  }

  render() {
    return (
      <View>
        <Text>Setting</Text>
      </View>
    );
  }
}
export default Setting;
