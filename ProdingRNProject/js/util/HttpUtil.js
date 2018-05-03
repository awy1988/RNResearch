

export default class HttpUtil {
  static get(url, queryParams) {
    // 处理查询参数
    url = this.handleQueryParams(url, queryParams);

    const requestHeaders = {};

    if (global.token) {
      requestHeaders.Authorization = `Bearer ${global.token}`;
    }

    return fetch(url, {
      method: 'GET',
      headers: requestHeaders,
      cache: 'default',
    }).then((response) => {
      // 共通错误处理
      if (response.status >= 400) {
        return Promise.reject(response);
      }
      return Promise.resolve(response.json());
    });
  }

  static post(url, queryParams, bodyParams) {
    url = this.handleQueryParams(url, queryParams);

    // let token;
    // storage.load({
    //   key: 'token',
    // }).then((ret) => {
    //   token = ret;
    // });

    const requestHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    if (global.token) {
      requestHeaders.Authorization = `Bearer ${global.token}`;
    }

    return fetch(url, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(bodyParams),
    }).then((response) => {
      // 共通错误处理
      if (response.status >= 400) {
        return Promise.reject(response);
      }
      return Promise.resolve(response.json());
    });
  }

  static postFile(url, queryParams, file) {
    url = this.handleQueryParams(url, queryParams);
    const formData = new FormData();
    const fileName = `${(new Date()).valueOf()}.jpg`;
    const uploadFile = { uri: file.path, type: 'image/jpeg', name: fileName };
    formData.append('logo', uploadFile);

    const requestHeaders = {
      'Content-Type': 'multipart/form-data',
    };

    if (global.token) requestHeaders.Authorization = `Bearer ${global.token}`;

    return fetch(url, {
      method: 'POST',
      headers: requestHeaders,
      body: formData,
    }).then((response) => {
      // 共通错误处理
      if (response.status >= 400) {
        return Promise.reject(response);
      }
      return Promise.resolve(response.json());
    });
  }

  static put(url, queryParams, bodyParams) {
    url = this.handleQueryParams(url, queryParams);

    // let token;
    // storage.load({
    //   key: 'token',
    // }).then((ret) => {
    //   token = ret;
    // });

    const requestHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    if (global.token) {
      requestHeaders.Authorization = `Bearer ${global.token}`;
    }

    return fetch(url, {
      method: 'PUT',
      headers: requestHeaders,
      body: JSON.stringify(bodyParams),
    }).then((response) => {
      // 共通错误处理
      if (response.status >= 400) {
        return Promise.reject(response);
      }
      return Promise.resolve(response.json());
    });
  }

  static patch(url, queryParams, bodyParams) {
    url = this.handleQueryParams(url, queryParams);

    const requestHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    // token存在
    if (global.token) {
      requestHeaders.Authorization = `Bearer ${global.token}`;
    }
    return fetch(url, {
      method: 'PATCH',
      headers: requestHeaders,
      body: JSON.stringify(bodyParams),
    }).then((response) => {
      // 共通错误处理
      if (response.status >= 400) {
        return Promise.reject(response);
      }
      return Promise.resolve(response.json());
    });
  }

  static handleQueryParams(url, queryParams) {
    // 处理查询参数
    if (queryParams) {
      const paramsArray = [];
      // 拼接参数
      Object.keys(queryParams).forEach((key) => {
        // 查询参数处理
        if (typeof queryParams[key] === 'object') {
          // 如果是对象的情况下，需要进行特殊处理
          if (queryParams[key] instanceof Array) {
            // 查询参数是数组
            queryParams[key].forEach(v => paramsArray.push(`${key}[]=${v}`));
          } else {
            // 查询参数是一个普通对象
            for (const tempKey of Object.keys(queryParams[key])) {
              paramsArray.push(`${key}[${tempKey}]=${queryParams[key][tempKey]}`);
            }
          }
        } else {
          paramsArray.push(`${key}=${queryParams[key]}`);
        }
      });
      if (url.search(/\?/) === -1) {
        url += `?${paramsArray.join('&')}`;
      } else {
        url += `&${paramsArray.join('&')}`;
      }
    }
    return url;
  }
}
