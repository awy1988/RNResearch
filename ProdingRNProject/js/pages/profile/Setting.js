import React from "react";
import {View, Text} from "react-native";
class Setting extends React.Component {

    componentDidMount() {
        // 退出登录操作
        storage.remove({
            key:'user'
        });
    }

    render() {
        return(
            <View>
                <Text>Setting</Text>
            </View>
        );
    }
}
export default Setting;