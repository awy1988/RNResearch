import { watchCaptcha, watchLogin } from './loginSaga';
import {
  watchCheckMobileAvailable,
  watchCaptchaRefresh,
  watchFetchMobileVerificationCode,
  watchGetMobileVCodeSecondStep,
} from './resetPwdSaga';
import {
  watchFetchItemAdvertisement,
  watchFetchItemCategories,
  watchFetchItems,
  watchFetchItemsLoadMore,
} from './mainSaga';
import { watchSystemStartup, watchFetchUserInfo } from './systemSaga';


export default function* rootSaga() {
  yield [
    watchLogin(),
    watchCaptcha(),
    watchCheckMobileAvailable(),
    watchCaptchaRefresh(),
    watchFetchMobileVerificationCode(),
    watchGetMobileVCodeSecondStep(),
    watchFetchItems(),
    watchFetchItemsLoadMore(),
    watchFetchItemAdvertisement(),
    watchSystemStartup(),
    watchFetchUserInfo(),
    watchFetchItemCategories(),
  ];
}
