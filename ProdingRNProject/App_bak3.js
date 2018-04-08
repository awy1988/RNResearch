import React from 'react';
import {View, Text, Image, Button} from 'react-native';
import {TabBarBottom, TabNavigator} from 'react-navigation';

class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                <Text>Home!</Text>
                <Button
                    title={'Go to Settings'}
                    onPress={() => this.props.navigation.navigate('Settings')}
                />
            </View>
        );
    }
}

class SettingScreen extends React.Component {
    render() {
        return(
            <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                <Text>Settings!</Text>
                <Button
                    title={'Go to Home'}
                    onPress={() => this.props.navigation.navigate('Home')}
                />
            </View>
        );
    }
}

const TabNavi = TabNavigator(
    {
        Home:{screen: HomeScreen},
        Settings:{screen:SettingScreen}
    },
    {
        navigationOptions: {
            tabBarIcon:(focused, tintColor) => {
                return <Image source={require('./spiro.jpg')} style={{width:15, height:15}}/>
            }
        },
        tabBarOptions: {
            activeTintColor:'tomato',
            inactiveTintColor:'gray'
        },
        tabBarComponent: TabBarBottom,
        tabBarPosition:'bottom',
        animationEnabled:false,
        swipeEnabled:false
    }
);

export default class App extends React.Component {
    render() {
        return <TabNavi/>;
    }
}




