

export default class HttpUtil {

    static get(url, queryParams) {

        // 处理查询参数
        url = this.handleQueryParams(url, queryParams);
        let token;
        storage.load({
            key:'token'
        }).then((ret) => {
            token = ret;
        });

        let requestHeaders = {};
        
        if (token) {
            requestHeaders['Authorization'] = 'Bearer ' + token;
        }

        return fetch(url, {
            method:'GET',
            headers:requestHeaders,
            cache:'default'
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

        let token;
        storage.load({
            key:'token'
        }).then((ret) => {
            token = ret;
        });

        let requestHeaders = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (token) {
            requestHeaders['Authorization'] = 'Bearer ' + token;
        }

        return fetch(url, {
            method:'POST',
            headers:requestHeaders,
            body:JSON.stringify(bodyParams)
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
            let paramsArray = [];  
            //拼接参数  
            Object.keys(queryParams).forEach(key => paramsArray.push(key + '=' + queryParams[key]))  
            if (url.search(/\?/) === -1) {  
                url += '?' + paramsArray.join('&')  
            } else {  
                url += '&' + paramsArray.join('&')  
            }  
        } 
        return url;
    }
}