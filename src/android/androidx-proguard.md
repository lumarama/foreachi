---
title: Proguard rules for AndroidX
permalink: /android/androidx-proguard
---
# Proguard rules for AndroidX

If you recently migrated your Android app from Support Library to [AndroidX](https://developer.android.com/jetpack/androidx/), you must update your **proguard-rules.pro** file. Overwise you're going to get **ClassNotFoundException** when running release build of your app. 

This is what works for me so far. Add the following lines to your **proguard-rules.pro** file:

    -dontwarn com.google.android.material.**
    -keep class com.google.android.material.** { *; }
    
    -dontwarn androidx.**
    -keep class androidx.** { *; }
    -keep interface androidx.** { *; }

Also I still keep Proguard rules for Support Library to be on the safe side. Just in case if there is any remaining Support Library references in my code:

    -dontwarn android.support.v4.**
    -keep class android.support.v4.** { *; }
    
    -dontwarn android.support.v7.**
    -keep class android.support.v7.** { *; }
