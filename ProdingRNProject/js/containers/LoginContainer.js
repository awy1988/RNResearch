import {connect} from 'react-redux'
import {loginAction, loginCheckCaptchaAction, loginExitAction} from '../actions'
import Login from '../pages/auth/Login';

const mapStateToProps = (state) => {
    console.log('mapStatetoProps ------>');
    console.log(state);
    return {
        isLoading: state.login.isLoading,
        isNeedCaptcha: state.login.isNeedCaptcha,
        isLoginSuccess: state.login.isLoginSuccess,
        captchaUri: state.login.captchaUri,
        captchaHash: state.login.captchaHash,
        errorMessage: state.login.errorMessage
    }
};

// 在container中，dispatch里面的逻辑一般情况下都只是一个功能：向中间件分发 Action。
const mapDispatchToProps =  dispatch => ({
    login: (username,password, captcha = '', captchaHash = '') => dispatch(loginAction({username, password, captcha, captchaHash})),
    checkCaptcha:(actionType, actionKey) => dispatch(loginCheckCaptchaAction({actionType, actionKey})),
    exit:() => dispatch(loginExitAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);