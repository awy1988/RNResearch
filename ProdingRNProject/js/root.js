/**
 * 用户进入App之后的根组件
 */

import React from "react";
import {StackNavigator, TabBarBottom, TabNavigator} from "react-navigation";
import Main from './pages/Main'
import Profile from "./pages/profile/Profile";
import {Image, TouchableOpacity, View} from "react-native";
import Category from "./pages/Category";
import ShoppingCartContainer from "./pages/ShoppingCartContainer";
import AccountInfo from "./pages/profile/account/AccountInfo";
import Setting from "./pages/profile/Setting";
import Login from "./pages/auth/Login";
import Icon from "react-native-vector-icons/Ionicons";
import {COMMON_MARGIN} from "./constants/StyleConstants";
import RegisterFirstStep from "./pages/auth/RegisterFirstStep";
import RegisterSecondStep from "./pages/auth/RegisterSecondStep";
import RegisterThirdStep from "./pages/auth/RegisterThirdStep";

const TabContainer = TabNavigator(
    {
        Main: {screen: Main},
        Category: {screen: Category},
        ShoppingCartContainer: {screen: ShoppingCartContainer},
        Profile: {screen: Profile},
    },
    {
        // navigationOptions: {
        //     tabBarIcon: (focused, tintColor) => {
        //         return (
        //             <Image source={require('../spiro.jpg')} style={{width:15, height:15}}/>
        //         )
        //     }
        // },
        tabBarPosition: 'bottom',
        tabBarComponent: TabBarBottom,
        animationEnabled: false,
        swipeEnabled:false
    }
);



const StackContainer = StackNavigator(
    {
        Tabs:{ screen: TabContainer},
        AccountInfo:{ screen: AccountInfo},
        Setting:{ screen: Setting},
        Login:{ screen: Login },
        RegisterFirstStep:{ screen: RegisterFirstStep },
        RegisterSecondStep:{ screen: RegisterSecondStep },
        RegisterThirdStep:{ screen: RegisterThirdStep },
    },
    {
        initialRouteName: 'Tabs'
    }
);


export default class Root extends React.Component {
    render() {
        return (
            <StackContainer/>
        );
    }
}
