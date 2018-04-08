import React from "react";
import {Text, View} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

class Main extends React.Component {

    static navigationOptions = {
        title:'首页',
        tabBarIcon: ({tintColor}) => {
            return <Icon name="md-home" size={25} color={tintColor} />
        }
    };

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <View>
                <Text> Main </Text>
            </View>
        );
    };
}

export default Main;