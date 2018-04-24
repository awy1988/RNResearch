import Toast from 'react-native-root-toast';

export default class TextUtil {
  static showToast(message) {
    const toast = Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  }
}
