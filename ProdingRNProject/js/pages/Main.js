import React from 'react';
import { Text, View, FlatList, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import {
  fetchItemsAction,
  fetchItemsAdvertisementAction,
  fetchItemsCategoriesAction,
  fetchItemsLoadMoreAction,
} from '../actions/mainActions';
import {
  COMMON_DANGER_COLOR,
  COMMON_DIVIDER_COLOR,
  COMMON_FONT_SIZE_LEVEL_1,
  COMMON_FONT_SIZE_LEVEL_2,
  COMMON_FONT_SIZE_LEVEL_3,
  COMMON_FONT_SIZE_LEVEL_4,
  COMMON_MARGIN,
  COMMON_PADDING,
  COMMON_PRIMARY_FONT_COLOR,
  COMMON_SECONDARY_FONT_COLOR,
  COMMON_WHITE,
  DEVICE_WIDTH,
} from '../constants/StyleConstants';
import { BASE_URL } from '../constants/ApiConstants';
import ListDividerLine from '../components/common/ListDividerLine';
import ToastUtil from "../util/ToastUtil";
var QRCode = require('@remobile/react-native-qrcode-local-image');

class ListHeader extends React.Component {
  constructor(props) {
    super(props);
    console.log('liestHeader');
    console.log(props);
  }

  renderBanner = (imageUri, link) => {
    return (
      <TouchableWithoutFeedback style={listHeaderStyle.container}
        onPress={() => {
          // 迁移到webView画面，加载link
          this.props.navigation.navigate('WebViewPage', {
            url: link,
          });
        }}
      >
        <Image style={listHeaderStyle.headerImage} source={{ uri: `${BASE_URL}${imageUri}` }} />
      </TouchableWithoutFeedback>
    );
    // return this.props.advertisements.map((value) => {
    //   return (
    //     <View style={listHeaderStyle.container}>
    //       <Image style={listHeaderStyle.headerImage} source={{ uri: `${BASE_URL}${value.cover}` }} />
    //     </View>
    //   );
    // });
  };

  renderGridItem = () => {
    return (
      <View style={{ width: 100, height: 40 }}>
        <Text>helloworld</Text>
      </View>
    );
  };

  render() {
    return (
      <View>
        <Swiper style={listHeaderStyle.container}>

          {
            this.props.advertisements.map((value) => {
              return this.renderBanner(value.coverLarge, value.link);
            })
          }
        </Swiper>
        <FlatList
          data={this.props.categories}
          renderItem={({ item }) => (
            <View style={listHeaderStyle.headerCategoryItemContainer}>
              <Image
                style={listHeaderStyle.headerCategoryItemLogo}
                source={{ uri: `${BASE_URL}${item.logo}` }}
              />
              <Text style={listHeaderStyle.headerCategoryItemText}>{item.text}</Text>
            </View>
          )}
          horizontal={false}
          numColumns={4}
        />
      </View>
    );
  }
}

class Main extends React.Component {
    static navigationOptions = {
      title: '首页',
      tabBarIcon: ({ tintColor }) => <Icon name="md-home" size={25} color={tintColor} />,
    };

    constructor(props) {
      super(props);
      this.renderHeader = this.renderHeader.bind(this);
      this.renderFooter = this.renderFooter.bind(this);
    }

    renderHeader() {
      return (
        <ListHeader advertisements={this.props.advertisements} navigation={this.props.navigation} categories={this.props.categories} />
      );
    }

    renderFooter() {
      return (
        <View style={listFooterStyle.container}>
          <Text style={listFooterStyle.text}>{this.props.links.next ? '加载中...' : '没有更多数据'}</Text>
        </View>
      );
    }

    componentDidMount() {
      // 发送获取首页数据的Action
      this.props.getItems('21', '02', '121.526363', '38.859562');
      this.props.getAdvertisements('normal', 'item');
      this.props.getItemCategories();
    }

    render() {
      return (
        <View style={{ flexDirection: 'column' }}>
          <FlatList
            data={this.props.items}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            ItemSeparatorComponent={ListDividerLine}
            renderItem={({ item }) =>
                (
                  <TouchableWithoutFeedback
                    onPress={
                      () => {
                        this.props.navigation.navigate('ItemDetail');
                      }
                    }
                  >
                    <View style={listItemStyle.itemContainer}>
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
                    </View>
                  </TouchableWithoutFeedback>)
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
          <View style={titleBarStyle.container}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={titleBarStyle.addressText}>大连</Text>
              <Icon name="ios-arrow-down" style={titleBarStyle.addressTextArrowDown} />
            </TouchableOpacity>
            <TouchableWithoutFeedback>
              <View style={titleBarStyle.searchContainer}>
                <Icon name="ios-search-outline" style={titleBarStyle.searchIcon} />
                <Text style={titleBarStyle.searchHint}>商品名称</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('QrCodeScan');
            }}>
              <Icon name="ios-qr-scanner-outline" style={titleBarStyle.scanIcon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              QRCode.decode('https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1761723146,2435534986&fm=58&bpow=380&bpoh=380', (error, result) => {
                console.log(error);
                console.log(result);
                ToastUtil.showToast(result);
              });
            }}>
              <Icon name="ios-notifications-outline" style={titleBarStyle.scanIcon} />
            </TouchableOpacity>

          </View>
        </View>
      );
    }
}
/* =============================================================================
 UI组件style
============================================================================= */

const styles = StyleSheet.create({
  wrapper: {
    height: DEVICE_WIDTH / 2.3,
  },
  slideImage: {
    flex: 1,
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

const titleBarStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: DEVICE_WIDTH,
    height: 40,
    paddingLeft: COMMON_PADDING,
    paddingRight: COMMON_PADDING,
    position: 'absolute',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  addressText: {
    color: COMMON_WHITE,
    fontSize: COMMON_FONT_SIZE_LEVEL_3,
  },
  addressTextArrowDown: {
    color: COMMON_WHITE,
    fontSize: COMMON_FONT_SIZE_LEVEL_3,
    marginLeft: 2,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 24,
    alignItems: 'center',
    backgroundColor: COMMON_WHITE,
    marginLeft: COMMON_MARGIN,
    borderRadius: 10,
  },
  searchIcon: {
    color: COMMON_SECONDARY_FONT_COLOR,
    fontSize: COMMON_FONT_SIZE_LEVEL_2,
    marginLeft: 6,
  },
  searchHint: {
    color: COMMON_SECONDARY_FONT_COLOR,
    fontSize: COMMON_FONT_SIZE_LEVEL_3,
    marginLeft: 6,
  },
  scanIcon: {
    color: COMMON_WHITE,
    fontSize: COMMON_FONT_SIZE_LEVEL_1,
    marginLeft: COMMON_MARGIN,
  },
});

const listHeaderStyle = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH,
    height: DEVICE_WIDTH / 2.3,
  },
  headerImage: {
    width: DEVICE_WIDTH,
    height: DEVICE_WIDTH / 2.3,
    resizeMode: 'cover',
  },

  headerCategoryContainer: {
    height: 180,
  },
  headerCategoryItemContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
    backgroundColor: COMMON_WHITE,
  },
  headerCategoryItemLogo: {
    width: 40,
    height: 40,
  },
  headerCategoryItemText: {
    marginTop: 6,
    color: COMMON_PRIMARY_FONT_COLOR,
    fontSize: COMMON_FONT_SIZE_LEVEL_4,
  },

});

const listFooterStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COMMON_WHITE,
  },
  text: {
    color: COMMON_SECONDARY_FONT_COLOR,
  },
});

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
  getAdvertisements: (status, type) => dispatch(fetchItemsAdvertisementAction({ status, type })),
  getItemCategories: () => dispatch(fetchItemsCategoriesAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
