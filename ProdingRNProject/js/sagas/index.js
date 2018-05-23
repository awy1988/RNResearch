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
import {
  watchCreateAddress, watchDeleteAddressFromEdit, watchDeleteAddressFromList,
  watchFetchAddressList,
  watchSelectContactAsConsignee,
  watchSelectMapAddress,
  watchSetDefaultAddress, watchUpdateAddress
} from './addressSaga';


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
    watchFetchAddressList(),
    watchSetDefaultAddress(),
    watchSelectContactAsConsignee(),
    watchSelectMapAddress(),
    watchCreateAddress(),
    watchUpdateAddress(),
    watchDeleteAddressFromList(),
    watchDeleteAddressFromEdit(),
  ];
}
