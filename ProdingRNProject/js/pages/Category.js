import React from "react";
import {Text, View} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

class Category extends React.Component {

    static navigationOptions = {
        title:'分类',
        tabBarIcon: ({tintColor}) => {
            return <Icon name="md-apps" size={25} color={tintColor} />
        }
    };

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <View>
                <Text> Category </Text>
            </View>
        );
    };
}

export default Category;