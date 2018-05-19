import React from 'react';
import { connect } from 'react-redux';
import { FlatList, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MapView } from 'react-native-amap3d';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  COMMON_MARGIN,
  COMMON_PADDING, COMMON_PRIMARY_FONT_COLOR, COMMON_THEME_COLOR,
  COMMON_WHITE,
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from '../../../constants/StyleConstants';
import ThemeButton from '../../../components/common/ThemeButton';
import ToastUtil from '../../../util/ToastUtil';
import ListDividerLine from '../../../components/common/ListDividerLine';
import GaodeApiService from '../../../network/GaodeApiService';
import {
  selectContactAsConsignee,
  selectMapAddress,
  selectMapAddressComplete,
} from '../../../actions/address/addressActions';


class SearchInput extends React.Component {
  render() {
    return (
      <View style={titleBarStyle.searchContainer}>
        <TextInput
          style={titleBarStyle.searchInput}
          underlineColorAndroid="transparent"
          placeholder="搜索位置"
        />
      </View>

    );
  }
}

class MapSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTip: {},
      searchText: '',
      searchKeywordsHintsData: [],
      selectedPosition: 0,
      aroundPois: [],
    };
    this.isFirstIn = true;
    this.inputTimeoutId = 0;
    this.poiSearchOff = false;
    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.onMapStatusChangeComplete = this.onMapStatusChangeComplete.bind(this);
    this.onPoiListItemClick = this.onPoiListItemClick.bind(this);
  }

  static navigationOptions =({ navigation }) => {
    return {
      headerTitle: '标记位置',
    };
  };


  onSearchTextChange(text) {
    // 防止过于频繁的网络请求输入稳定后在发送网络请求
    this.setState({
      searchText: text,
    });

    if (this.inputTimeoutId) clearTimeout(this.inputTimeoutId);
    this.inputTimeoutId = setTimeout(() => {
      // 500毫秒内没有输入则发送网络请求
      GaodeApiService.getGaodeInputtips({ keywords: text }).then((ret) => {
        console.log(ret);
        this.setState({
          searchKeywordsHintsData: ret.tips,
        });
      }).catch((err) => {
        console.log(err);
      });
    }, 300);
  }

  onMapStatusChangeComplete({ nativeEvent }) {
    console.log(nativeEvent);
    if (this.poiSearchOff) {
      this.poiSearchOff = false;
      return;
    }
    this.poiSearch(nativeEvent.longitude, nativeEvent.latitude);
  }

  poiSearch(longitude, latitude) {
    // 兴趣点搜索
    console.log('兴趣点搜索');
    GaodeApiService.getGaodePoi({ longitude, latitude }).then((ret) => {
      console.log(ret);
      this.setState({
        aroundPois: ret.pois,
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  onPoiListItemClick(item, index) {
    // 兴趣点列表点击事件
    this.setState({
      selectedPosition: index,
      aroundPois: [...this.state.aroundPois],
    });

    this.poiSearchOff = true;
    const longitude = parseFloat(_.split(item.location, ',', 2)[0]);
    const latitude = parseFloat(_.split(item.location, ',', 2)[1]);

    this.mapView.animateTo({
      zoomLevel: 18,
      coordinate: {
        longitude,
        latitude,
      },
    });
  }


  render() {
    console.log('render is called');
    return (
      <View style={mapSearchStyles.container}>
        <TextInput
          ref={ref => this.searchInput = ref}
          style={titleBarStyle.searchInput}
          underlineColorAndroid="transparent"
          placeholder="搜索位置"
          onChangeText={this.onSearchTextChange}
          value={this.state.searchText}
        />
        <View style={mapSearchStyles.mapContainer}>
          <MapView
            ref={ref => this.mapView = ref}
            style={mapSearchStyles.map}
            onStatusChangeComplete={this.onMapStatusChangeComplete}
            locationEnabled
            showsLocationButton
            locationInterval={5000}
            onLocation={({ nativeEvent }) => {
                console.log(`${nativeEvent.latitude}, ${nativeEvent.longitude}`);
                if (this.isFirstIn) {
                  console.log('isFirstIn');
                  this.mapView.animateTo({
                    zoomLevel: 18,
                    coordinate: {
                      longitude: nativeEvent.longitude,
                      latitude: nativeEvent.latitude,
                    },
                  });
                  this.isFirstIn = false;
                }
              }
            }
          />
          <Icon name="ios-pin-outline" style={mapSearchStyles.pinIcon} />
          <FlatList
            style={mapSearchStyles.searchKeywordsHintList}
            data={this.state.searchKeywordsHintsData}
            ItemSeparatorComponent={ListDividerLine}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      searchTip: item,
                      searchText: item.name,
                      searchKeywordsHintsData: [],
                    });

                    const longitude = parseFloat(_.split(item.location, ',', 2)[0]);
                    const latitude = parseFloat(_.split(item.location, ',', 2)[1]);

                    this.mapView.animateTo({
                      zoomLevel: 18,
                      coordinate: {
                        longitude,
                        latitude,
                      },
                    });
                  }}
                >
                  <View style={mapSearchStyles.searchKeywordsHintListItem}>
                    <Text>{item.name ? item.name : ''}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <View style={mapSearchStyles.list}>
          <FlatList
            data={this.state.aroundPois}
            ItemSeparatorComponent={ListDividerLine}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.onPoiListItemClick(item, index);
                  }}
                >
                  <View style={mapSearchStyles.listItem}>
                    <Icon name="ios-pin-outline" style={[mapSearchStyles.listItemIcon, { color: this.state.selectedPosition === index ? COMMON_THEME_COLOR : COMMON_PRIMARY_FONT_COLOR }]} />
                    <View style={mapSearchStyles.listItemRight}>
                      <Text style={{ color: this.state.selectedPosition === index ? COMMON_THEME_COLOR : COMMON_PRIMARY_FONT_COLOR }}>{item.name}</Text>
                      <Text style={{ marginTop: 6, color: this.state.selectedPosition === index ? COMMON_THEME_COLOR : COMMON_PRIMARY_FONT_COLOR }}>{`${item.address}`}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
          <ThemeButton btnStyle={mapSearchStyles.confirmBtn}
            text="确定"
            onPress={() => {
              // 需要将选中的数据回传到上一个画面
              // 回传数据，发送地图选址成功Action，将选择的兴趣点对象作为payload数据
              this.props.selectMapAddressComplete(this.state.aroundPois[this.state.selectedPosition]);
              this.props.navigation.goBack();
            }}
          />

        </View>
      </View>

    );
  }
}


const titleBarStyle = StyleSheet.create({
  searchContainer: {
    flex: 1,
    marginRight: COMMON_MARGIN,
  },
  searchInput: {
    backgroundColor: COMMON_WHITE,
    paddingLeft: COMMON_PADDING,
    paddingRight: COMMON_PADDING,
  },
});

const mapSearchStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  pinIcon: {
    position: 'absolute',
    left: DEVICE_WIDTH / 2,
    alignSelf: 'center',
    color: COMMON_THEME_COLOR,
    fontSize: 30,
  },
  searchKeywordsHintList: {
    width: DEVICE_WIDTH,
    position: 'absolute',
    left: 0,
    top: 0,
    flex: 1,
    backgroundColor: COMMON_WHITE,
  },
  searchKeywordsHintListItem: {
    paddingLeft: COMMON_PADDING,
    paddingRight: COMMON_PADDING,
    paddingTop: 4,
    paddingBottom: 4,
  },
  mapContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  list: {
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COMMON_WHITE,
  },
  listItemRight: {
    height: 60,
    justifyContent: 'center',
  },
  listItemIcon: {
    fontSize: 20,
    marginLeft: COMMON_MARGIN,
    marginRight: COMMON_MARGIN,
    color: COMMON_THEME_COLOR,
  },
  listItemText: {

  },
  confirmBtn: {
    marginTop: 10,
    marginBottom: 10,
  },
});

/* =============================================================================
 container组件定义
============================================================================= */
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = dispatch => ({
  selectMapAddressComplete: poiAddress => dispatch(selectMapAddressComplete({ poiAddress })),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapSearch);
