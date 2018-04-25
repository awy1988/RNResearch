import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COMMON_DIVIDER_COLOR } from '../../constants/StyleConstants';
// 列表灰色分割线
class ListDividerLine extends React.Component {
  render() {
    return (
      <View style={style.divider} />
    );
  }
}
/* =============================================================================
 UI组件style
============================================================================= */
const style = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: COMMON_DIVIDER_COLOR,
  },
});

export default ListDividerLine;
