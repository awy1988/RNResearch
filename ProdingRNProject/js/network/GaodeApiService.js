import HttpUtil from '../util/HttpUtil';
import { BASE_URL_GAODE_API } from '../constants/ApiConstants';
import { APP_KEY_GAODE_WEB_SERVICE } from '../constants/AppConstants';


export default class GaodeApiService {

  static getGaodeInputtips({ keywords }) {
    const url = `${BASE_URL_GAODE_API}/assistant/inputtips`;
    const queryParams = {
      key: APP_KEY_GAODE_WEB_SERVICE,
      keywords,
    };
    return HttpUtil.get(url, queryParams);
  }

  static getGaodePoi({ longitude, latitude }) {
    const url = `${BASE_URL_GAODE_API}/place/around`;
    const queryParams = {
      key: APP_KEY_GAODE_WEB_SERVICE,
      location: `${longitude},${latitude}`,
      types: '餐饮服务|生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|交通设施服务|金融保险服务|公司企业',
    };
    return HttpUtil.get(url, queryParams);
  }
}
