import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import { QRScannerView } from '../../../lib/ac-qrcode/index';
import ToastUtil from '../../util/ToastUtil';
import {
  COMMON_BLACK, COMMON_FONT_SIZE_LEVEL_2,
  COMMON_FONT_SIZE_LEVEL_3, COMMON_PADDING,
  COMMON_PAGE_TITLE_HEIGHT, COMMON_THEME_COLOR,
  COMMON_WHITE,
} from '../../constants/StyleConstants';
var QRCode = require('@remobile/react-native-qrcode-local-image');
class QrCodeScan extends React.Component {
  static navigationOptions = {
    title: '二维码',
    tabBarIcon: ({ tintColor }) => <Icon name="md-apps" size={25} color={tintColor} />,
  };

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.pickFromCameraRoll = this.pickFromCameraRoll.bind(this);
    this.renderTitleBar = this.renderTitleBar.bind(this);
    this.barcodeReceived = this.barcodeReceived.bind(this);
  }

  render() {
    return (

      <QRScannerView
        cornerColor={COMMON_THEME_COLOR}
        cornerBorderLength={40}
        cornerBorderWidth={4}
        rectWidth={200}
        rectHeight={200}
        scanBarImage={null}
        cornerOffsetSize={0}
        borderWidth={2}
        borderColor={COMMON_WHITE}
        hintText="将二维码放到框内即可自动扫描"
        hintTextStyle={{
          color: '#fff',
          fontSize: 16,
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 32,
          paddingRight: 32,
        }}
        hintTextPosition={70}
        onScanResultReceived={this.barcodeReceived}
        isShowScanBar={true}
        scanBarColor={COMMON_THEME_COLOR}
        scanBarHeight={1.5}
        scanBarAnimateTime={3000}
        renderTopBarView={this.renderTitleBar}
        renderBottomMenuView={() => this.renderBottomMenu()}
      />
    );
  }

  renderTitleBar() {
    return (
      <View style={styles.titleBarContainer}>
        <TouchableOpacity
          onPress={() => {
            this.goBack();
          }}
        >
          <Text style={styles.titleBarLeft}>关闭</Text>
        </TouchableOpacity>
        <Text style={styles.titleBarMiddle}>扫一扫</Text>
        <TouchableOpacity
          onPress={() => {
            this.pickFromCameraRoll();
          }}
        >
          <Text style={styles.titleBarRight}>从相册找</Text>
        </TouchableOpacity>
      </View>

    );
  }

  renderBottomMenu() {
    // return (
    //   <Text
    //     style={{color:'white',textAlignVertical:'center', textAlign:'center',font:20,padding:12}}
    //   >Here is bottom menu</Text>
    // )
  }

  goBack() {
    console.log('goback is called');
    this.props.navigation.goBack();
  }

  pickFromCameraRoll() {
    // 从相册找
    console.log('pickFromCameraRoll is called');
    ToastUtil.showToast('从相册找');

    ImagePicker.openPicker({}).then(image => {
      console.log(image);

      // TODO 修改QRCode库，使该库可以直接解析形为：file:///storage/emulated/0/DCIM/Camera/IMG_20180508_133916.jpg 这样的URI
      QRCode.decode(image.path, (error, result) => {
        console.log(error);
        console.log(result);
        ToastUtil.showToast(result);
      });

    });
  }

  barcodeReceived(e) {
    // console.log(e)
    console.log(`Type:${e.type}`);
    ToastUtil.showToast(`\nData: ${e.data}`);
  }
}

const styles = StyleSheet.create({
  titleBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: COMMON_PAGE_TITLE_HEIGHT,
    paddingLeft: COMMON_PADDING,
    paddingRight: COMMON_PADDING,
    backgroundColor: COMMON_BLACK,
  },
  titleBarLeft: {
    width: 80,
    fontSize: COMMON_FONT_SIZE_LEVEL_3,
    color: COMMON_WHITE,
  },
  titleBarMiddle: {
    fontSize: COMMON_FONT_SIZE_LEVEL_2,
    color: COMMON_WHITE,
  },
  titleBarRight: {
    width: 80,
    textAlign: 'right',
    fontSize: COMMON_FONT_SIZE_LEVEL_3,
    color: COMMON_WHITE,
  },

});

export default QrCodeScan;
