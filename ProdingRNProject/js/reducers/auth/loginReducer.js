import * as types from '../../constants/ActionTypes';

const initialState = {
    isLoading:false,
    isNeedCaptcha:false,
    isLoginSuccess:false,
    captchaUri:'',
    captchaHash:'',
    errorMessage:''
};


// reducer 中主要负责根据传入的 action 进行 state 的更新。也就是说，所有跟画面更新有关的状态变更都在 reducer 中完成
export default login = (state = initialState, action) => {
    switch(action.type) {
        case types.REQUEST_USER_LOGIN:
            // 这个分支利用了saga中间件数据流的特点，在dispatch一个Action之后，并不是先执行saga后再执行reducer，而是先执行reducer，然后才能被saga接收
            // 所以我们利用这个特点在发送登录Action时，先指定state中的isLoading为true，打开加载中遮罩
            return {
                ...state,
                isLoading:true
            };
        case types.REQUEST_USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoading:false,
                isLoginSuccess:true
            };
        case types.REQUEST_USER_LOGIN_FAILED:
            return {
                ...state,
                isLoading:false,
                isLoginSuccess:false,
                errorMessage: action.payload.errorMessage? action.payload.errorMessage : ''
            };
        case types.USER_LOGIN_SHOW_CAPTCHA:
            return {
                ...state,
                isNeedCaptcha:true,
                captchaUri: action.payload.captchaUri,
                captchaHash: action.payload.captchaHash
            };
        case types.USER_LOGIN_EXIT:
            return initialState;
    }
    return state;
}




