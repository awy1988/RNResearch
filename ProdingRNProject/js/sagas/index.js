import { watchCaptcha, watchLogin } from './loginSaga';
import {
  watchCheckMobileAvailable,
  watchCaptchaRefresh,
  watchFetchMobileVerificationCode,
  watchGetMobileVCodeSecondStep,
} from './resetPwdSaga';


export default function* rootSaga() {
  yield [
    watchLogin(),
    watchCaptcha(),
    watchCheckMobileAvailable(),
    watchCaptchaRefresh(),
    watchFetchMobileVerificationCode(),
    watchGetMobileVCodeSecondStep(),
  ];
}
