package com.phonegallery.ReactNativeModules;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import java.io.FileOutputStream;

import android.graphics.Color;
import java.io.OutputStream;
import java.io.File;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;



public class ImageUtilityModule extends ReactContextBaseJavaModule {

    public ImageUtilityModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ImageUtility";
    }

    @ReactMethod
    public void changeBluePixelsToGreen(String filePath, final Promise promise) {
        try {
            Bitmap bitmap = BitmapFactory.decodeFile(filePath);
            if (bitmap == null) {
                promise.reject("Failed to decode. Path is incorrect or image is corrupted - " + filePath);
                return;
            }

            Bitmap newBitmap = bitmap.copy( Bitmap.Config.ARGB_8888 , true);

            int width = bitmap.getWidth();
            int height = bitmap.getHeight();

            for (int x = 0; x < width; x++) {
                for (int y = 0; y < height; y++) {
                    int pixel = newBitmap.getPixel(x, y);

                    float hsb[] = new float[3];
                    int redValue = Color.red(pixel);
                    int greenValue = Color.green(pixel);
                    int blueValue = Color.blue(pixel);
                    Color.RGBToHSV(redValue, greenValue, blueValue, hsb);

                    float deg = hsb[0];
                    if (deg >= 180 && deg < 300) {

                        blueValue = blueValue / 2;
                        greenValue = greenValue < 125 ? greenValue * 2 : 210;

                        int nearGreenColor = Color.argb(100, redValue, greenValue, blueValue);
                        newBitmap.setPixel(x, y, nearGreenColor);
                    }
                }
            }

            OutputStream fOut = null;
            File file = new File(filePath);
            fOut = new FileOutputStream(file);

            Boolean successful = newBitmap.compress(Bitmap.CompressFormat.JPEG, 85, fOut);
            fOut.flush();
            fOut.close();

            promise.resolve(successful);

        } catch (Exception e) {
            promise.reject(e);
        }
    }
}
