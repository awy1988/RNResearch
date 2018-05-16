package net.proding;

import android.app.Application;
import android.content.Context;
import android.support.multidex.MultiDex;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.lynxit.contactswrapper.ContactsWrapperPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.remobile.qrcodeLocalImage.RCTQRCodeLocalImagePackage;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;
import com.umeng.commonsdk.UMConfigure;
import com.umeng.socialize.Config;
import com.umeng.socialize.PlatformConfig;

import net.proding.module.SharePackage;

import org.devio.rn.splashscreen.SplashScreenReactPackage;

import java.util.Arrays;
import java.util.List;

import cn.qiuxiang.react.amap3d.AMap3DPackage;
import cn.qiuxiang.react.geolocation.AMapGeolocationPackage;

public class MainApplication extends Application implements ReactApplication {

  /** 微信支付用 */
  public static IWXAPI wxApi;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new AMapGeolocationPackage(),
            new AMap3DPackage(),
            new RCTCameraPackage(),
            new RCTQRCodeLocalImagePackage(),
            new PickerPackage(),
            new SplashScreenReactPackage(),
            new ContactsWrapperPackage(),
            new SharePackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    // 此处配置类型，供后台分析各渠道时使用
    Config.shareType = "react native";
    // 初始化Umeng分享
    UMConfigure.init(this,"5a55818ab27b0a68a900011a","umeng", UMConfigure.DEVICE_TYPE_PHONE,"");

    // 注册微信
    wxApi = WXAPIFactory.createWXAPI(this, "wx487e4d5686f0265a");
    wxApi.registerApp("wx487e4d5686f0265a");
  }

  @Override
  protected void attachBaseContext(Context base) {
    super.attachBaseContext(base);
    MultiDex.install(this);
  }

  // 配置平台key、secret信息
  {
    PlatformConfig.setWeixin("wx487e4d5686f0265a", "cd2096f5787c0a0e31e8e2d3d2b624ea");
    PlatformConfig.setQQZone("1106675156", "6wYN4UhoMUB97UYB");
//    PlatformConfig.setSinaWeibo("微博key", "微博Secret", "www.baidu.com");
  }
}
