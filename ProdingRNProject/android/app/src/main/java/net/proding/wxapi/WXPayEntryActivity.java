package net.proding.wxapi;


import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.tencent.mm.opensdk.constants.ConstantsAPI;
import com.tencent.mm.opensdk.modelbase.BaseReq;
import com.tencent.mm.opensdk.modelbase.BaseResp;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.IWXAPIEventHandler;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;

import net.proding.R;


/**
 * 微信支付后的回调类
 *
 * @author weiyang.an
 * @version 1.0 2018/01/12
 */
public class WXPayEntryActivity extends Activity implements IWXAPIEventHandler {
	
	private static final String TAG = "MicroMsg.SDKSample.WXPayEntryActivity";
	
    private IWXAPI api;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
		Log.d("test", "onCreate: 1111---------");
		setContentView(R.layout.pay_result);
		api = WXAPIFactory.createWXAPI(this, "wx487e4d5686f0265a");
        api.handleIntent(getIntent(), this);
    }

	@Override
	protected void onNewIntent(Intent intent) {
		super.onNewIntent(intent);
		setIntent(intent);
        api.handleIntent(intent, this);
	}

	@Override
	public void onReq(BaseReq req) {
	}

	@Override
	public void onResp(BaseResp resp) {

		if (resp.getType() == ConstantsAPI.COMMAND_PAY_BY_WX) {
			Intent intent = new Intent();
			switch (resp.errCode){
				case 0: // 成功
					// 成功之后的操作，首先一定要关闭确认支付画面。
					Toast.makeText(WXPayEntryActivity.this, "支付成功", Toast.LENGTH_SHORT).show();
//					intent.setAction(AppConstant.BROADCAST_ACTION_PAY_SUCCESS);
//					LocalBroadcastManager.getInstance(App.getContext()).sendBroadcast(intent); // 发送支付成功的广播,其他需要刷新的页面注册这个广播,然后进行相应的刷新操作
//					finish();
					break;
				case -1: // 错误  可能的原因：签名错误、未注册APPID、项目设置APPID不正确、注册的APPID与设置的不匹配、其他异常等。
					Toast.makeText(WXPayEntryActivity.this, "支付失败", Toast.LENGTH_SHORT).show();
//					intent.setAction(AppConstant.BROADCAST_ACTION_PAY_FAILED);
//					LocalBroadcastManager.getInstance(App.getContext()).sendBroadcast(intent);
////					OrderListActivity_.intent(WXPayEntryActivity.this).start();
//					finish();
					break;
				case -2: // 用户取消
					// 用户取消支付之后，回到确认支付（参照京东商城）
					Toast.makeText(WXPayEntryActivity.this, "支付取消", Toast.LENGTH_SHORT).show();
					finish();
					break;
				default:
					break;
			}

		}
	}
}