import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Image, Text, View, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import { COMMON_THEME_COLOR, COMMON_WHITE, DEVICE_HEIGHT, DEVICE_WIDTH } from '../constants/StyleConstants';

class WelcomePage extends React.Component {
  static navigationOptions = () => ({
    header: null,
  });

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Swiper style={style.wrapper} loop={false}>
        <View style={style.wrapper}>
          <Image style={style.slideImage} source={require('../../img/guide_01.png')} />
        </View>
        <View style={style.wrapper}>
          <Image style={style.slideImage} source={require('../../img/guide_02.png')} />
        </View>
        <View style={style.wrapper}>
          <Image style={style.slideImage} source={require('../../img/guide_03.png')} />
          <Text style={style.nextButton}
            onPress={() => {
            this.props.navigation.navigate('Tabs');
          }}
          >立即体验
          </Text>
        </View>
      </Swiper>
    );
  }
}

const style = StyleSheet.create({
  wrapper: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
  },
  slideImage: {
    flex: 1,
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    resizeMode: 'cover',
  },
  nextButton: {
    width: 70,
    height: 30,
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: COMMON_WHITE,
    backgroundColor: COMMON_THEME_COLOR,
  },
});

export default WelcomePage;
