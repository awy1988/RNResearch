import { BASE_URL } from '../constants/ApiConstants';
import HttpUtil from '../util/HttpUtil';

export default class ApiService {
  // 这里必须要实现的需求：
  // 1.封装网络请求的基类，实现通用的get、post、put、patch、delete请求
  // 2.在基类中处理返回数据中的 responseCode，以实现 Proding 文档中记载的规范
  // 3.在基类中定义共通的请求头、token、ua等信息

  // 用户登录
  static login(userName, passWord, captchaText = '', captchaHash = '') {
    const url = `${BASE_URL}/authorizations`;
    const bodyParams = {
      username: userName,
      password: passWord,
    };

    if (captchaHash || captchaText) {
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
    let url = `${BASE_URL}/captcha`;
    url = actionType ? `${url}/${actionType}` : url;
    url = actionKey ? `${url}/${actionKey}` : url;
    return HttpUtil.get(url, null);
  }

  // 检查注册手机号码是否可用
  static checkMobileAvailable(mobile) {
    // 使用模板字符串
    const url = `${BASE_URL}/mobiles/${mobile}/registered`;
    console.log(`url = ${url}`);
    return HttpUtil.get(url, null);
  }

  // 获取手机验证码
  static getMobileVerificationCode(mobile, captchaText = '', captchaHash = '', verificationPurpose = 'signing-up', verificationType = 'sms') {
    const url = `${BASE_URL}/mobiles/${mobile}/verifications`;

    const queryParams = {
      type: verificationType,
    };

    const bodyParams = {
      purpose: verificationPurpose,
    };

    if (captchaHash || captchaText) {
      bodyParams.captcha = {};
      if (captchaText) bodyParams.captcha.text = captchaText;
      if (captchaHash) bodyParams.captcha.hash = captchaHash;
    }

    return HttpUtil.post(url, queryParams, bodyParams);
  }

  // 获取手机验证码倒计时
  static getMobileSmsCountdownSeconds(mobile) {
    const url = `${BASE_URL}/mobiles/${mobile}/countdown-seconds`;
    return HttpUtil.get(url);
  }

  // 检验手机短信验证码有效性
  static checkVerificationCode(mobile, verificationCode) {
    const url = `${BASE_URL}/mobiles/${mobile}/verifications/${verificationCode}`;
    return HttpUtil.get(url);
  }

  // 注册用户
  static register(mobile, verificationCode, password) {
    const url = `${BASE_URL}/users`;
    const bodyParams = {
      mobile,
      mobileVerificationCode: verificationCode,
      password,
    };
    return HttpUtil.post(url, null, bodyParams);
  }

  // 更新登录密码
  static updateUserPassword({ newPassword, password = '', username = '', email = '', emailVerificationCode = '', mobile = '', mobileVerificationCode = '' }) {
    const url = `${BASE_URL}/user/profile/password`;
    const bodyParams = {};
    bodyParams.newPassword = newPassword;
    if (password) bodyParams.password = password;
    if (username) bodyParams.username = username;
    if (email) bodyParams.email = email;
    if (emailVerificationCode) bodyParams.emailVerificationCode = emailVerificationCode;
    if (mobile) bodyParams.mobile = mobile;
    if (mobileVerificationCode) bodyParams.mobileVerificationCode = mobileVerificationCode;

    return HttpUtil.put(url, null, bodyParams);
  }

  // 获取商品列表
  static getItems({ name,
    priceFrom,
    priceUntil,
    packageId,
    categories,
    features,
    ageGrades,
    province,
    city,
    location,
    maxDistance,
    status,
    sort,
    page }) {
    const url = `${BASE_URL}/items`;
    const queryParams = {};

    if (name) queryParams.name = name;
    if (priceFrom) queryParams.priceFrom = priceFrom;
    if (priceUntil) queryParams.priceUntil = priceUntil;
    if (packageId) queryParams.packageId = packageId;
    if (categories) queryParams.categories = categories;
    if (features) queryParams.features = features;
    if (ageGrades) queryParams.ageGrades = ageGrades;
    if (province) queryParams.province = province;
    if (city) queryParams.city = city;
    if (location) queryParams.location = location;
    if (maxDistance) queryParams.maxDistance = maxDistance;
    if (status) queryParams.status = status;
    if (sort) queryParams.sort = sort;
    if (page) queryParams.page = page;

    return HttpUtil.get(url, queryParams);
  }

  // 获取广告
  static getAdvertisements(status, type, sort = {}) {
    const url = `${BASE_URL}/advertisements`;
    const queryParams = {
      status,
      type,
    };

    if (Object.keys(sort).length > 0) queryParams.sort = sort;

    return HttpUtil.get(url, queryParams);
  }

  // 共同加载更多
  static loadMore(nextUrl) {
    return HttpUtil.get(`${BASE_URL}${nextUrl}`);
  }

  static updateUserProfile({ logo,
    name,
    username,
    signature,
    gender,
    birthday,
  }) {
    // 更新用户信息
    const url = `${BASE_URL}/user/profile`;

    const bodyParams = {};

    if (logo) bodyParams.logo = logo;
    if (name) bodyParams.name = name;
    if (username) bodyParams.username = username;
    if (signature) bodyParams.signature = signature;
    if (gender) bodyParams.gender = gender;
    if (birthday) bodyParams.birthday = birthday;

    console.log(url);
    console.log(bodyParams);
    return HttpUtil.patch(url, null, bodyParams);
  }

  static fetchUserProfile() {
    // 获取用户信息
    const url = `${BASE_URL}/user/profile`;
    return HttpUtil.get(url);
  }

  static fetchItemCategories(parent) {
    const url = `${BASE_URL}/item-categories`;
    const queryParams = {};
    if (parent) {
      queryParams.parent = parent;
    } else {
      queryParams.parent = 'none';
    }
    return HttpUtil.get(url, queryParams);
  }

  static fetchAddressList(userId) {
    // 获取用户收货地址列表
    const url = `${BASE_URL}/users/${userId}/consignees`;
    return HttpUtil.get(url);
  }

  static uploadImage(image, purpose) {
    let url = '';
    switch (purpose) {
      case 'user-logos':
        url = `${BASE_URL}/files/user-logos`;
        return HttpUtil.postFile(url, null, image);
      case 'comment-images':
        // TODO 发表评论时上传文件
        break;
      default:
        break;
    }
  }
}
