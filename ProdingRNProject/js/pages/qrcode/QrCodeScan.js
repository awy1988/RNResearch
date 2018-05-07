import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {QRScannerView} from '../../../lib/ac-qrcode/index';
import ToastUtils from "../../util/ToastUtil";

class QrCodeScan extends React.Component {
  static navigationOptions = {
    title: '二维码',
    tabBarIcon: ({ tintColor }) => <Icon name="md-apps" size={25} color={tintColor} />,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (

      < QRScannerView
        style={{flex:1}}
        cornerBorderLength={80}
        cornerBorderWidth={6}
        rectWidth={280}
        rectHeight={280}
        scanBarImage={null}
        cornerOffsetSize={0}
        borderWidth={0}
        hintText={'我的二维码'}
        hintTextStyle={{
          color: '#fff',
          fontSize: 16,
          backgroundColor: '#ff0',
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 32,
          paddingRight: 32,
          borderRadius: 4,
        }}
        hintTextPosition={70}
        onScanResultReceived={this.barcodeReceived.bind(this)}
        isShowScanBar={false}
        renderTopBarView={this._renderTitleBar}
        renderBottomMenuView={() => this._renderMenu()}
      />
    );
  }

  _renderTitleBar(){
    return(
      <Text
        style={{color:'white',textAlignVertical:'center', textAlign:'center',font:20,padding:12}}
      >Here is title bar</Text>
    );
  }

  _renderMenu() {
    // return (
    //   <Text
    //     style={{color:'white',textAlignVertical:'center', textAlign:'center',font:20,padding:12}}
    //   >Here is bottom menu</Text>
    // )
  }

  barcodeReceived(e) {
    //console.log(e)
    console.log('Type:' + e.type);
    ToastUtils.showToast( '\nData: ' + e.data);
  }
}

export default QrCodeScan;
