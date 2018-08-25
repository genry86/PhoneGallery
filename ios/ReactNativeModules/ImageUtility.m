//
//  ImageUtility.m
//  PhoneGallery
//
//  Created by Genry on 4/20/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "ImageUtility.h"
#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>

@implementation ImageUtility

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(changeBluePixelsToGreen:(NSString *)imageSrc
                  resolver:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  @try {
    NSData *imgData = [NSData dataWithContentsOfFile:imageSrc];
    UIImage *image = [[UIImage alloc] initWithData:imgData];
    NSString *fileName = [imageSrc lastPathComponent];
    
    if (image) {
      CGRect imageRect = CGRectMake(0, 0, image.size.width, image.size.height);
      
      UIGraphicsBeginImageContext(image.size);
      CGContextRef context = UIGraphicsGetCurrentContext();
      CGContextSaveGState(context);
      CGContextDrawImage(context, imageRect, image.CGImage);
      
      for (int x = 0; x < image.size.width; x++) {
        for (int y = 0; y < image.size.width; y++) {
            UIColor *pixelColor = [self pixelColorInImage:image atX:x atY:y];
          
            CGFloat red, green, blue, alpha;
            CGFloat hue, saturation, brightness;
        
            [pixelColor getRed:&red green:&green blue:&blue alpha:&alpha];
            [pixelColor getHue:&hue saturation:&saturation brightness:&brightness alpha:&alpha];
            NSInteger realHue = hue * 360;
          
            if (realHue >= 180 && realHue < 300) {
              blue = blue / 2;
              green = green < 125 ? green * 2 : 210;
              
              CGContextSetRGBFillColor(context, red , green, blue , 1);
              CGContextFillRect(context, CGRectMake(x, y, 1, 1));
            }
        }
      }
      CGContextRestoreGState(context);
      UIImage *updatedImage = UIGraphicsGetImageFromCurrentImageContext();
      UIGraphicsEndImageContext();
      
      NSData *imageData = UIImageJPEGRepresentation(updatedImage, 0.5f);
      
      NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
      NSString *documentsPath = [paths objectAtIndex:0]; //Get the docs directory
      NSString *filePath = [documentsPath stringByAppendingPathComponent:fileName];
      
      if ([imageData writeToFile:filePath atomically:YES]) {
        resolve(@YES);
      }
      else {
        NSError *err = [NSError errorWithDomain:@"com.phoneGallery.app"  code:-1 userInfo:nil];
        reject(@"Image not Saved", imageSrc, err);
      }
    }
    else {
      NSError *err = [NSError errorWithDomain:@"com.phoneGallery.app"  code:-1 userInfo:nil];
      reject(@"No Image", imageSrc, err);
    }
  }
  @catch (NSException *e) {
    NSError *err = [NSError errorWithDomain:@"com.phoneGallery.app" code:-1 userInfo:e.userInfo];
    reject(@"Error", @"changeBluePixelsToGreen has failed - ", err);
  }
}

- (UIColor*)pixelColorInImage:(UIImage*)image atX:(int)x atY:(int)y
{
    CFDataRef pixelData = CGDataProviderCopyData(CGImageGetDataProvider(image.CGImage));
    const UInt8* data = CFDataGetBytePtr(pixelData);
  
    int pixelInfo = ((image.size.width * y) + x ) * 4; // 4 bytes per pixel
  
    UInt8 red   = data[pixelInfo + 0];
    UInt8 green = data[pixelInfo + 1];
    UInt8 blue  = data[pixelInfo + 2];
    UInt8 alpha = data[pixelInfo + 3];
    CFRelease(pixelData);
  
    return [UIColor colorWithRed:red  /255.0f
                           green:green/255.0f
                            blue:blue /255.0f
                           alpha:alpha/255.0f];
}

@end
