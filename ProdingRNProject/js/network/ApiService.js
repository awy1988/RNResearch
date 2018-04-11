import { BASE_URL } from "../constants/ApiConstants";
import HttpUtil  from "../util/HttpUtil";
export default class ApiService {
    // 这里必须要实现的需求：
    // 1.封装网络请求的基类，实现通用的get、post、put、patch、delete请求
    // 2.在基类中处理返回数据中的 responseCode，以实现 Proding 文档中记载的规范
    // 3.在基类中定义共通的请求头、token、ua等信息
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

    static getCaptcha(actionType, actionKey) {
        let url = BASE_URL + '/captcha';
        url = actionType ? url+ '/' + actionType : url;
        url = actionKey ? url + '/' + actionKey : url;
        return HttpUtil.get(url, null);
    }

    static checkMobileAvailable(mobile) {
        // 使用模板字符串
        let url = `${BASE_URL}/mobiles/${mobile}/registered`
        console.log('url = ' + url);
        return HttpUtil.get(url,null);
    }

    static getMobileSmsVerificationCode(mobile, captchaText = '', captchaHash = '') {
        // 使用模板字符串
        let url = `${BASE_URL}/mobiles/${mobile}/verifications`

        let queryParams = {
            type:'sms'
        }

        let bodyParams = {
            purpose:'signing-up',
        }

        if (captchaHash || captchaText){
            bodyParams.captcha = {};
            if (captchaText) bodyParams.captcha.text = captchaText;
            if (captchaHash) bodyParams.captcha.hash = captchaHash;
        }

        return HttpUtil.post(url, queryParams, bodyParams);
    }
}