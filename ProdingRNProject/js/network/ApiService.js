import { BASE_URL } from "../constants/ApiConstants";
import HttpUtil  from "../util/HttpUtil";
export default class ApiService {
    // 这里必须要实现的需求：
    // 1.封装网络请求的基类，实现通用的get、post、put、patch、delete请求
    // 2.在基类中处理返回数据中的 responseCode，以实现 Proding 文档中记载的规范
    // 3.在基类中定义共通的请求头、token、ua等信息
    
    // 用户登录
    static login(userName, passWord, captchaText = '', captchaHash = '') {
        let url = BASE_URL + '/authorizations';
        let bodyParams = {
            username:userName,
            password:passWord
        }

        if (captchaHash || captchaText){
            bodyParams.captcha = {};
            if (captchaText) bodyParams.captcha.text = captchaText;
            if (captchaHash) bodyParams.captcha.hash = captchaHash;
        }

        console.log('bodyParams');
        console.log(bodyParams);

        return HttpUtil.post(url, null, bodyParams);
    }

    // 获取验证码
    static getCaptcha(actionType, actionKey) {
        let url = BASE_URL + '/captcha';
        url = actionType ? url+ '/' + actionType : url;
        url = actionKey ? url + '/' + actionKey : url;
        return HttpUtil.get(url, null);
    }

    // 检查注册手机号码是否可用
    static checkMobileAvailable(mobile) {
        // 使用模板字符串
        let url = `${BASE_URL}/mobiles/${mobile}/registered`
        console.log('url = ' + url);
        return HttpUtil.get(url,null);
    }

    // 获取手机验证码
    static getMobileVerificationCode(mobile, captchaText = '', captchaHash = '', verificationPurpose='signing-up', verificationType='sms') {
        let url = `${BASE_URL}/mobiles/${mobile}/verifications`

        let queryParams = {
            type:verificationType
        }

        let bodyParams = {
            purpose:verificationPurpose,
        }

        if (captchaHash || captchaText){
            bodyParams.captcha = {};
            if (captchaText) bodyParams.captcha.text = captchaText;
            if (captchaHash) bodyParams.captcha.hash = captchaHash;
        }

        return HttpUtil.post(url, queryParams, bodyParams);
    }

    // 获取手机验证码倒计时
    static getMobileSmsCountdownSeconds(mobile) {
        let url = `${BASE_URL}/mobiles/${mobile}/countdown-seconds`
        return HttpUtil.get(url);
    }

    // 检验手机短信验证码有效性
    static checkVerificationCode(mobile, verificationCode) {
        let url = `${BASE_URL}/mobiles/${mobile}/verifications/${verificationCode}`
        return HttpUtil.get(url);
    }

    // 注册用户
    static register(mobile, verificationCode, password) {
        let url = `${BASE_URL}/users`;
        let bodyParams = {
            mobile: mobile,
            mobileVerificationCode: verificationCode,
            password: password
        }
        return HttpUtil.post(url, null, bodyParams);
    }
}