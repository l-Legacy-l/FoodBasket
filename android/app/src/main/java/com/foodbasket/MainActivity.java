package com.foodbasket;
import android.os.Build;
import android.os.Bundle;
import com.foodbasket.CustomClientFactory;  // replace <app-name>
import com.facebook.react.modules.network.OkHttpClientProvider;
import okhttp3.OkHttpClient;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {

            OkHttpClientProvider.setOkHttpClientFactory(new CustomClientFactory());
        }
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "FoodBasket";
    }
    
}
