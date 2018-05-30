/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DEVICE_WIDTH, CONTENT_HEIGHT } from '../../constants/StyleConstants';

export default class ItemDetailMainSubPage extends React.Component {
  // 构造
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>page1</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    width: '100%',
  },
  container1: {
    width: DEVICE_WIDTH,
    height: CONTENT_HEIGHT,
    backgroundColor: 'red',
  },
  container2: {
    width: DEVICE_WIDTH,
    height: CONTENT_HEIGHT,
    backgroundColor: 'blue',
    overflow: 'hidden',
  },
});
