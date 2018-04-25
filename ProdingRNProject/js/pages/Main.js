import React from 'react';
import { Text, View, FlatList, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchItemsAction, fetchItemsLoadMoreAction } from '../actions/mainActions';
import {
  COMMON_DANGER_COLOR,
  COMMON_DIVIDER_COLOR,
  COMMON_PADDING,
  COMMON_SECONDARY_FONT_COLOR,
  COMMON_WHITE,
} from '../constants/StyleConstants';
import { BASE_URL } from '../constants/ApiConstants';
import ListDividerLine from '../components/common/ListDividerLine';

class Main extends React.Component {
    static navigationOptions = {
      title: '首页',
      tabBarIcon: ({ tintColor }) => <Icon name="md-home" size={25} color={tintColor} />,
    };

    // constructor(props) {
    //   super(props);
    // }

    componentDidMount() {
      // 发送获取首页数据的Action
      this.props.getItems('21', '02', '121.526363', '38.859562');
    }

    render() {
      return (
        <View style={{ flexDirection: 'column' }}>
          <FlatList
            data={this.props.items}
            ItemSeparatorComponent={ListDividerLine}
            renderItem={({ item }) =>
                (<View style={listItemStyle.itemContainer}>
                  <Image style={listItemStyle.itemImage}
                    source={{ uri: `${BASE_URL}${item.cover}` }}
                    borderRadius={4}
                  />
                  <View style={listItemStyle.rightContainer}>
                    <Text numberOfLines={2}>{item.name}</Text>
                    <View style={listItemStyle.rightContainerBottom}>
                      <Text style={listItemStyle.itemPrice}>{`￥${item.price}`}</Text>
                      <Text style={listItemStyle.itemDistance}>{item.distance}</Text>
                    </View>
                  </View>
                </View>)
              }
            onRefresh={() => {
              this.props.getItems('21', '02', '121.526363', '38.859562');
            }}
            refreshing={this.props.isLoading || false}
            onEndReachedThreshold={0.1}
            onEndReached={() => {
              console.log('onEndReached in ------->');
              // 加载更多
              if (this.props.links && this.props.links.next) {
                this.props.getItemsLoadMore(this.props.links.next);
              }
            }}
          />
        </View>
      );
    }
}
/* =============================================================================
 UI组件style
============================================================================= */
const listItemStyle = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    height: 80,
    padding: COMMON_PADDING,
    backgroundColor: COMMON_WHITE,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: COMMON_DIVIDER_COLOR,
    borderRadius: 4,
    backgroundColor: COMMON_WHITE,
  },
  itemTitle: {

  },
  rightContainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    paddingLeft: COMMON_PADDING,
  },
  rightContainerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemPrice: {
    color: COMMON_DANGER_COLOR,
  },
  itemDistance: {
    color: COMMON_SECONDARY_FONT_COLOR,
  },
});

/* =============================================================================
 container组件定义
============================================================================= */
const mapStateToProps = state => state.main;
const mapDispatchToProps = dispatch => ({
  getItems: (province, city, longitude, latitude) => dispatch(fetchItemsAction({ province, city, longitude, latitude })),
  getItemsLoadMore: nextUrl => dispatch(fetchItemsLoadMoreAction({ nextUrl })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
