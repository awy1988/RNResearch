import React from 'react';
import {View, Text, Button, Image} from 'react-native';
import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json


class LogoTitle extends React.Component {

    render() {
        return (
            <Image
                source={require('./spiro.jpg')}
                style={{width:30, height:30}}
            />
        );
    }
}

class HomeScreen extends React.Component {

    static navigationOptions =({navigation}) => {
        // title:'Home'
        const params = navigation.state.params || {};
        return {
            headerTitle:<LogoTitle/>,
            headerRight:(
                <Button
                    onPress={() => navigation.navigate('MyModal')}
                    title="+1"
                    color="#000"
                />
            )
        }

    };

    componentWillMount() {
        this.props.navigation.setParams({increaseCount : this._increaseCount});
    }

    state = {
        count: 0,
    };

    _increaseCount = () => {
        this.setState({ count: this.state.count + 1 });
    };

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Text>{this.state.count}</Text>
                <Button
                    title='Go to Details'
                    onPress={() => this.props.navigation.navigate('Details', {
                        itemId:86,
                        otherParam:'anything you want here'
                    })}
                />
            </View>
        );
    }
}

class ModalScreen extends React.Component {
    render() {
        return (

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                <Text style={{ fontSize: 30 }}>This is a modal!</Text>
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title="Dismiss"
                />
            </View>

        );
    }
}

class DetailScreen extends React.Component {

    static navigationOptions = ({navigation, navigationOptions}) => {

        const {params} = navigation.state;

        return {
            title:params ? params.otherParam :'A Nested Details Screen',
            // headerLeft:() => navigation.goBack(),
            headerStyle: {
                backgroundColor: navigationOptions.headerTintColor,
            },
            headerTintColor: navigationOptions.headerStyle.backgroundColor,
        }
    };

    render() {

        const { params } = this.props.navigation.state;
        const itemId = params ? params.itemId : null;
        const otherParam = params ? params.otherParam : null;

        return(
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Text>Detail Screen</Text>
                <Text>itemId:{JSON.stringify(itemId)}</Text>
                <Text>otherParam:{JSON.stringify(otherParam)}</Text>
                <Button
                    title="Go to Details... again"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
                <Button
                    title="Go back"
                    onPress={() => this.props.navigation.goBack()}
                />
                <Button
                    title="update the title"
                    onPress={() => {
                        this.props.navigation.setParams({otherParam:'Updated!'})
                    }}
                />
            </View>
        );
    }
}

const MainStack = StackNavigator(
    {
        Home: {
            screen: HomeScreen,
        },
        Details: {
            screen: DetailScreen,
        },
    },
    {
        initialRouteName: 'Home',
        navigationOptions: {
            headerStyle: {
                backgroundColor:'#f4511e'
            },
            headerTintColor:'#fff',
            headerTitleStyle: {
                fontWeight:'bold',
            },
        }
    }
);



const RootStack = StackNavigator(
        {
            Main: {
                screen: MainStack,
            },
            MyModal: {
                screen: ModalScreen,
            },
        },
        {
            mode: 'modal',
            headerMode: 'none',
        }
    );

export default class App extends React.Component {
    render() {
        return <RootStack/>;
    }
};