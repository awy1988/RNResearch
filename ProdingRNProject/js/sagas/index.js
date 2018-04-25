import { watchCaptcha, watchLogin } from './loginSaga';
import {
  watchCheckMobileAvailable,
  watchCaptchaRefresh,
  watchFetchMobileVerificationCode,
  watchGetMobileVCodeSecondStep,
} from './resetPwdSaga';
import {watchFetchItems, watchFetchItemsLoadMore} from './mainSaga';


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
  ];
}
