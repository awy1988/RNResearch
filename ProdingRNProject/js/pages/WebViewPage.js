import React from 'react';
import {View, WebView} from 'react-native';

class WebViewPage extends React.Component {
  static navigationOptions = () => ({
    title: 'Proding',
    headerTitleStyle: {
      flex: 1,
      fontSize: 18,
      // textAlign:'center'
    },
    headerStyle: {
      height: 40,
    },
    headerRight: <View />,
  });

  constructor(props) {
    super(props);
    this.url = this.props.navigation.state.params.url;
  }

  render() {
    return (
      <WebView
        source={{ uri: this.url }}
      />
    );
  }
}

export default WebViewPage;
