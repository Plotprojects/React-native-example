package com.plotbridgeexample;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.plotprojects.retail.android.Plot;
import com.plotprojects.retail.android.RequestContextualPageCallback;


public class PlotBridge extends ReactContextBaseJavaModule {
    public PlotBridge(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "PlotBridge";
    }

    @ReactMethod
    public void requestContextualPage(final Promise promise) {
        Plot.requestContextualPage(new RequestContextualPageCallback() {
            @Override
            public void handleContextualPageResponse(String s) {
                promise.resolve(s);
            }

            @Override
            public void handleContextualPageNotFound() {
                promise.resolve(null);
            }
        });
    }

    @ReactMethod
    public void setStringSegmentationProperty(String key, String value){
        Plot.setStringSegmentationProperty(key,value);
    }

    @ReactMethod
    public void enable(){
        Plot.enable();
    }

    @ReactMethod
    public void disable(){
        Plot.disable();
    }

    @ReactMethod
    public void isEnabled(){
        Plot.isEnabled();
    }
}