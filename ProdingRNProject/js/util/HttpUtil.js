

export default class HttpUtil {

    static get(url, queryParams) {

        // 处理查询参数
        url = this.handleQueryParams(url, queryParams);

        return fetch(url, {
            method:'GET',
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

        return fetch(url, {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
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