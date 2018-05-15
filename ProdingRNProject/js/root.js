/**
 * 用户进入App之后的根组件
 */

import React from 'react';
import { StackNavigator, TabBarBottom, TabNavigator } from 'react-navigation';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import WelcomePage from './pages/WelcomePage';
import Main from './pages/Main';
import Profile from './pages/profile/Profile';
import Category from './pages/Category';
import ShoppingCartContainer from './pages/ShoppingCartContainer';
import AccountInfo from './pages/profile/account/AccountInfo';
import Setting from './pages/profile/Setting';
import RegisterFirstStep from './pages/auth/RegisterFirstStep';
import RegisterSecondStep from './pages/auth/RegisterSecondStep';
import RegisterThirdStep from './pages/auth/RegisterThirdStep';
import rootReducer from './reducers';
import LoginContainer from './containers/LoginContainer';
import rootSaga from './sagas/index';
import ResetPwdFirstStep from './pages/auth/ResetPwdFirstStep';
import ResetPwdSecondStep from './pages/auth/ResetPwdSecondStep';
import ResetPwdThirdStep from './pages/auth/ResetPwdThirdStep';
import WebViewPage from './pages/WebViewPage';
import QrCodeScan from "./pages/qrcode/QrCodeScan";
import AddressList from "./pages/profile/address/AddressList";
import AddressEdit from "./pages/profile/address/AddressEdit";
import MapSearch from "./pages/profile/address/MapSearch";

const TabContainer = TabNavigator(
  {
    Main: { screen: Main },
    Category: { screen: Category },
    ShoppingCartContainer: { screen: ShoppingCartContainer },
    Profile: { screen: Profile },
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
    swipeEnabled: false,
  }
);


const StackContainer = StackNavigator(
  {
    WelcomePage: { screen: WelcomePage },
    Tabs: {
      screen: TabContainer,
      navigationOptions: {
        header: null,
      },
    },
    QrCodeScan: {
      screen: QrCodeScan,
      navigationOptions: {
        header: null,
      },
    },
    AccountInfo: { screen: AccountInfo },
    AddressList: { screen: AddressList },
    AddressEdit: { screen: AddressEdit },
    MapSearch: { screen: MapSearch },
    Setting: { screen: Setting },
    Login: { screen: LoginContainer },
    RegisterFirstStep: { screen: RegisterFirstStep },
    RegisterSecondStep: { screen: RegisterSecondStep },
    RegisterThirdStep: { screen: RegisterThirdStep },
    ResetPwdFirstStep: { screen: ResetPwdFirstStep },
    ResetPwdSecondStep: { screen: ResetPwdSecondStep },
    ResetPwdThirdStep: { screen: ResetPwdThirdStep },
    WebViewPage: { screen: WebViewPage },
  },
  {
    initialRouteName: 'WelcomePage',
  }
);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(rootSaga);

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <StackContainer />
      </Provider>
    );
  }
}
