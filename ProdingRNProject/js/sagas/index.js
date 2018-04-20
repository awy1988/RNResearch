import {watchCaptcha, watchLogin} from "./loginSaga";
import {watchCheckMobileAvailable, watchCaptcha as watchCaptcha2} from "./findPwdSaga";


export default function* rootSaga() {
    yield [
        watchLogin(),
        watchCaptcha(),
        watchCheckMobileAvailable(),
        watchCaptcha2()
    ]
}