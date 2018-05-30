import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import UShare from '../../share/share';
import SharePlatform from '../../share/SharePlatform';
import ApiService from '../../network/ApiService';
import ItemDetailMainSubPage from './ItemDetailMainSubPage';
import {
  COMMON_DIVIDER_COLOR,
  COMMON_FONT_SIZE_LEVEL_4,
  COMMON_PAGE_TITLE_HEIGHT,
  COMMON_THEME_COLOR,
  COMMON_WHITE,
  DEVICE_WIDTH
} from '../../constants/StyleConstants';
import ItemDetailEvaluationSubPage from "./ItemDetailEvaluationSubPage";
import ItemDetailWebSubPage from "./ItemDetailWebSubPage";


class HeaderTitle extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.state.params.onItemTabClick();
          }}
        >
          <Text
            style={titleBarStyles.tabName}
          >商品
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.state.params.onDetailTabClick();
          }}
        >
          <Text
            style={[titleBarStyles.tabName, { marginLeft: 20 }]}
          >详情
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.state.params.onEvaluationTabClick();
          }}
        >
          <Text
            style={[titleBarStyles.tabName, { marginLeft: 20 }]}
          >评价
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const titleBarStyles = StyleSheet.create({
  tabName: {
    height: COMMON_PAGE_TITLE_HEIGHT,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
  },
});

class PageFooter extends React.Component {
  render() {
    return (
      <View>
        <View style={footerStyles.container} >
          <View style={footerStyles.operationContainer}>
            <Icon name="ios-star-outline" style={footerStyles.operationIcon} />
            <Text style={footerStyles.operationText}>收藏</Text>
          </View>
          <View style={[footerStyles.operationContainer, {
            borderColor: COMMON_DIVIDER_COLOR,
            borderLeftWidth: 0.4,
            borderRightWidth: 0.4,
          }]}
          >
            <Icon name="md-share" style={footerStyles.operationIcon} />
            <Text style={footerStyles.operationText}>分享</Text>
          </View>
          <View style={footerStyles.operationContainer}>
            <Icon name="ios-cart-outline" style={footerStyles.operationIcon} />
            <Text style={footerStyles.operationText}>购物车</Text>
          </View>
          <Text style={footerStyles.addToShoppingCart}>
            加入购物车
          </Text>

        </View>
      </View>
    );
  }
}

const footerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: DEVICE_WIDTH,
    height: 44,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  operationContainer: {
    width: 60,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  operationIcon: {
    fontSize: 16,
  },
  operationText: {
    fontSize: COMMON_FONT_SIZE_LEVEL_4,
  },
  addToShoppingCart: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: COMMON_WHITE,
    backgroundColor: COMMON_THEME_COLOR,
  },
});


export default class ItemDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        height: COMMON_PAGE_TITLE_HEIGHT,
      },
      headerTitle: <HeaderTitle navigation={navigation} />,
      headerRight: <View />,
    };
  };


  constructor(props) {
    super(props);
    this.tabIndex = 0;
    this.onItemTabClick = this.onItemTabClick.bind(this);
    this.onDetailTabClick = this.onDetailTabClick.bind(this);
    this.onEvaluationTabClick = this.onEvaluationTabClick.bind(this);
    this.onMomentumScrollEnd = this.onMomentumScrollEnd.bind(this);

  }

  componentDidMount() {
    this.props.navigation.setParams({ onItemTabClick: this.onItemTabClick });
    this.props.navigation.setParams({ onDetailTabClick: this.onDetailTabClick });
    this.props.navigation.setParams({ onEvaluationTabClick: this.onEvaluationTabClick });
  }


  onItemTabClick() {
    switch(this.tabIndex) {
      case 0:
        break;
      case 1:
        this.refs.swiper.scrollBy(-1);
        break;
      case 2:
        this.refs.swiper.scrollBy(-2);
        break;
      default:
        break;
    }
    this.tabIndex = 0;
  }

  onDetailTabClick() {
    switch(this.tabIndex) {
      case 0:
        this.refs.swiper.scrollBy(1);
        break;
      case 1:
        break;
      case 2:
        this.refs.swiper.scrollBy(-1);
        break;
      default:
        break;
    }
    this.tabIndex = 1;
  }

  onEvaluationTabClick() {
    switch(this.tabIndex) {
      case 0:
        this.refs.swiper.scrollBy(2);
        break;
      case 1:
        this.refs.swiper.scrollBy(1);
        break;
      case 2:
        break;
      default:
        break;
    }
    this.tabIndex = 2;
  }

  onMomentumScrollEnd(e, state, context) {
    this.tabIndex = state.index;
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Swiper
          ref="swiper"
          style={styles.wrapper}
          loop={false}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
          showsPagination={false}
        >
          <ItemDetailMainSubPage />
          <ItemDetailWebSubPage />
          <ItemDetailEvaluationSubPage />
        </Swiper>
        <PageFooter />
      </View>

    );
  }
}


const styles = StyleSheet.create({
  wrapper: {
    width: DEVICE_WIDTH,
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
