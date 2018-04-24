

class LoginService {
  static saveUserInfo(userInfo) {
    storage.save({
      key: 'user',
      data: userInfo,
      expires: null,
    });
  }

  static saveToken(token) {
    storage.save({
      key: 'token',
      data: token,
      expires: null,
    });
  }
}

export default LoginService;
