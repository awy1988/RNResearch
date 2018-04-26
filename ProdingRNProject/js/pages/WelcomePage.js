import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Text, View } from 'react-native';

class WelcomePage extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
    // setTimeout(()=>{SplashScreen.hide()}, 3000, )
  }

  render() {
    return (
      <View>
        <Text>welcomePage!!!</Text>
      </View>
    );
  }
}

export default WelcomePage;