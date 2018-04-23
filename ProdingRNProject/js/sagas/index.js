import {watchCaptcha, watchLogin} from "./loginSaga";
import {watchCheckMobileAvailable, watchCaptchaRefresh, watchFetchMobileVerificationCode} from "./resetPwdSaga";


export default function* rootSaga() {
    yield [
        watchLogin(),
        watchCaptcha(),
        watchCheckMobileAvailable(),
        watchCaptchaRefresh(),
        watchFetchMobileVerificationCode(),
    ]
}