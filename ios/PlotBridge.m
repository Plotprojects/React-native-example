//
//  PlotBridge.m
//
//

#import "PlotBridge.h"
#import <React/RCTLog.h>
#import <PlotProjects/Plot.h>

@implementation PlotBridge

RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(requestContextualPage, resolver: (RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  [Plot requestContextualPage:^(NSString *result) {
    resolve(result);
  }];
}

RCT_EXPORT_METHOD(setStringSegmentationProperty:(NSString *)key location:(NSString *)value)
{
  [Plot setStringSegmentationProperty:value forKey:key];
}

// Add the rest of segmentation property types if needed



@end
