import React from 'react';
import {View, Text, StyleSheet, WebView, Dimensions, Platform, StatusBar, PanResponder} from 'react-native';
import {COMMON_DIVIDER_COLOR, COMMON_LIST_HEIGHT, COMMON_WHITE, COMMON_PAGE_TITLE_HEIGHT} from "../../constants/StyleConstants";

const CONTENT_HEIGHT = Dimensions.get('window').height - (Platform.OS === 'android' ? (StatusBar.currentHeight + COMMON_PAGE_TITLE_HEIGHT * 2) : 0);

export default class ItemDetailEvaluationSubPage extends React.Component {

  constructor(props) {
    super(props);
    this.panResponder = PanResponder.create({
      onStartShouldSetResponder: this.onStartShouldSetResponder.bind(this),
    });
  }

  onStartShouldSetResponder(event: Object, gestureState: Object) {

  }


  onLoadingFinish(event) {
    console.log('loading finished!!!');
    console.log(event);
  }

  render() {

    let HTML = `<html>
    <head>
      <meta charset="utf-8">
    </head>
    <body>
      hello world
    </body>
  </html>`

    return (
      <View style={{flex:1, height: CONTENT_HEIGHT, flexDirection: 'column'}}>
        <View style={styles.headerWrapper}>
          <Text style={styles.headerTabText}>商品详情</Text>
          <Text style={[styles.headerTabText, { borderColor: COMMON_DIVIDER_COLOR, borderLeftWidth: 1, borderRightWidth: 1 }]}>参数规格</Text>
          <Text style={styles.headerTabText}>售后保障</Text>
        </View>
        <WebView
          onLoadEnd={this.onLoadingFinish.bind(this)}
          source={{uri:"http://www.hangge.com",method: 'GET'}}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    height: COMMON_LIST_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COMMON_WHITE,
  },
  headerTabText: {
    flex: 1,
    height: 36,
    textAlign: 'center',
    textAlignVertical: 'center',
  },

});

