package com.plotbridgeexample;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.plotprojects.retail.android.Plot;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "PlotBridgeExample";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Plot.init(this);
    }

}
