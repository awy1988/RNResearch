import { watchCaptcha, watchLogin } from './loginSaga';
import {
  watchCheckMobileAvailable,
  watchCaptchaRefresh,
  watchFetchMobileVerificationCode,
  watchGetMobileVCodeSecondStep,
} from './resetPwdSaga';
import { watchFetchItemAdvertisement, watchFetchItems, watchFetchItemsLoadMore } from './mainSaga';
import { watchSystemStartup } from './systemSaga';


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
  ];
}
