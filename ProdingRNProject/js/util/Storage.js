import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

const storage = new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 1000,
  // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
  // 如果不指定则数据只会保存在内存中，重启后即丢失
  storageBackend: AsyncStorage,
  // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
});

// 将storage对象加入全局变量
global.storage = storage;
// 全局token变量，在登陆时，写入global，如果
global.token = '';
storage.load({
  key: 'token',
}).then((ret) => {
  global.token = ret;
}).catch(() => {
  global.token = '';
});
