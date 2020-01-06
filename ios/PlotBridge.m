//
//  PlotBridge.m
//
//

#import "PlotBridge.h"
#import <React/RCTLog.h>
#import <PlotProjects/Plot.h>

@implementation PlotBridge

RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(requestContextualPage, contextualPageWithresolver: (RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  [Plot requestContextualPage:^(NSString *result) {
    resolve(result);
  }];
}

// Add the rest of segmentation property types if needed
RCT_EXPORT_METHOD(setStringSegmentationProperty:(NSString *)key location:(NSString *)value)
{
  [Plot setStringSegmentationProperty:value forKey:key];
}

RCT_EXPORT_METHOD(enable){
  [Plot enable];
}

RCT_EXPORT_METHOD(disable){
  [Plot disable];
}

RCT_REMAP_METHOD(isEnabled, isEnabledWithResolver: (RCTPromiseResolveBlock)resolve
     rejecter:(RCTPromiseRejectBlock)reject)
{
  resolve([NSNumber numberWithBool:[Plot isEnabled]]);
}

@end
