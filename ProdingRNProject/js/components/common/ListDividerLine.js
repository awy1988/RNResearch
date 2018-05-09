import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COMMON_DIVIDER_COLOR } from '../../constants/StyleConstants';
// 列表灰色分割线
class ListDividerLine extends React.Component {
  render() {
    // 如果外部定义了本组件的style，那么将外部定义的样式与默认样式合并，注意，外部样式必须是对象形式的。如果外部对象不是对象形式的，则无法通过
    const dividerStyle = this.props.style ? { ...dividerDefaultStyle, ...this.props.style } : style.divider;
    return (
      <View style={dividerStyle} />
    );
  }
}
/* =============================================================================
 UI组件style
============================================================================= */
const dividerDefaultStyle = {
  height: 1,
  backgroundColor: COMMON_DIVIDER_COLOR,
};
const style = StyleSheet.create({
  divider: dividerDefaultStyle,
});

export default ListDividerLine;
