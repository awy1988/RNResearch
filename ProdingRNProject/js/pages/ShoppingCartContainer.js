import React from "react";
import {Text, View} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

class ShoppingCartContainer extends React.Component {

    static navigationOptions = {
        title:'购物车',
        tabBarIcon: ({tintColor}) => {
            return <Icon name="ios-cart" size={25} color={tintColor} />
        }
    };

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <View>
                <Text> ShoppingCartContainer </Text>
            </View>
        );
    };
}

export default ShoppingCartContainer;