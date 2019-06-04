package com.foodbasket; // replace app-name

import com.facebook.react.modules.network.OkHttpClientFactory;
import com.facebook.react.modules.network.OkHttpClientProvider;
import com.facebook.react.modules.network.ReactCookieJarContainer;

import java.util.Collections;
import java.util.concurrent.TimeUnit;
import java.net.*;
import java.io.*;
import okhttp3.OkHttpClient;
import okhttp3.*;
import java.util.List;
import java.util.ArrayList;

public class CustomClientFactory implements OkHttpClientFactory {

        @Override
        public OkHttpClient createNewNetworkModuleClient() {
                ConnectionSpec spec = new ConnectionSpec.Builder(ConnectionSpec.MODERN_TLS)
                                .tlsVersions(TlsVersion.TLS_1_2)
                                .cipherSuites(CipherSuite.TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,
                                                CipherSuite.TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,
                                                CipherSuite.TLS_DHE_RSA_WITH_AES_128_GCM_SHA256,
                                                CipherSuite.TLS_ECDHE_PSK_WITH_AES_128_CBC_SHA,
                                                CipherSuite.TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256)
                                .build();

                List<ConnectionSpec> specs = new ArrayList<>();
                specs.add(spec);
                specs.add(ConnectionSpec.COMPATIBLE_TLS);
                specs.add(ConnectionSpec.CLEARTEXT);
                OkHttpClient.Builder client = new OkHttpClient.Builder().connectionSpecs(specs)
                                .connectTimeout(0, TimeUnit.MILLISECONDS).readTimeout(0, TimeUnit.MILLISECONDS)
                                .writeTimeout(0, TimeUnit.MILLISECONDS).cookieJar(new ReactCookieJarContainer());
                return OkHttpClientProvider.enableTls12OnPreLollipop(client).build();
        }
}