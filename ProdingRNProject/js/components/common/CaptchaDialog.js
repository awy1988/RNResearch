import React from 'react';

export default class CaptchaDialog extends React.Component {
// TODO 完善验证码弹出对话框组件，然后用于需要验证码的画面
    render() {
        return(
            <PopupDialog
                width={0.7}
                height={200}
                containerStyle={{justifyContent:'flex-start',paddingTop:40}}
                ref={(popupDialog) => { this.popupDialog = popupDialog; }}>
                <View>
                <Text>Hello</Text>
                </View>
            </PopupDialog>
        );
    }
}