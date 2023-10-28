package com.musicgoapplication;


import com.facebook.react.ReactActivity;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.ContentResolver;
import android.media.AudioAttributes;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import androidx.core.app.NotificationCompat;

import com.zoontek.rnbootsplash.RNBootSplash;
import android.content.Intent;


public class MainActivity extends ReactActivity {



  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected void onCreate(Bundle savedInstanceState){

    super.onCreate((savedInstanceState));
    RNBootSplash.init(R.drawable.bootsplash, MainActivity.this);


  }
  
  @Override
public void onNewIntent(Intent intent) {
  super.onNewIntent(intent);
  setIntent(intent);
}

  @Override
  protected String getMainComponentName() {
    return "musicgoapplication";
  }
}
