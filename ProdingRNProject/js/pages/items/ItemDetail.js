import React from 'react';
import { View, Text } from 'react-native';
import UShare from '../../share/share';
import SharePlatform from '../../share/SharePlatform';
import ApiService from "../../network/ApiService";


export default class ItemDetail extends React.Component {
  render() {
    return (
      <View>
        <Text>Hello world!</Text>
        <Text
          onPress={
            () => {
              console.log('分享按钮');
              UShare.share('标题', '内容', 'http://baidu.com', 'http://dev.umeng.com/images/tab2_1.png', SharePlatform.WECHAT, (message) => {
                // message:分享成功、分享失败、取消分享
                // ToastAndroid.show(message,ToastAndroid.SHORT);
              });
            }
          }
        >
          分享功能
        </Text>
        <Text
          onPress={
            () => {
              console.log('微信支付');

              ApiService.userOrderPayment('Sjzs2pDUit2S', 'UnT6SmiqA8a0').then((ret) => {
                UShare.wxPay(ret.data);
              });

              // UShare.wxPay({
              //   appid: 'wx487e4d5686f0265a',
              //   partnerid: '1496580702',
              //   prepayid: 'wx15205522269139c8eb10db0f2849684358',
              //   package: 'Sign=WXPay',
              //   noncestr: 'jzhzirlc',
              //   timestamp: '1526388922',
              //   sign: '5cb795a09252ead4111c0442ace6c035',
              // });
            }
          }
        >
          微信支付
        </Text>
      </View>
    );
  }
}
