//
//  Localizer.h
//  DapiConnect
//
//  Created by MSZ on 04/03/2022.
//  Copyright © 2022 Dapi. All rights reserved.
//

#import <Foundation/Foundation.h>

#ifndef ENLocalizedStrings
#define ENLocalizedStrings(key) \
NSLocalizedStringFromTableInBundle(key, @"Localizable", [NSBundle bundleWithPath:[[[NSBundle bundleForClass:[DAPILocalizer class]] resourcePath] stringByAppendingPathComponent:@"ENStrings.bundle"]], nil)
#endif

#ifndef ARLocalizedStrings
#define ARLocalizedStrings(key) \
NSLocalizedStringFromTableInBundle(key, @"Localizable", [NSBundle bundleWithPath:[[[NSBundle bundleForClass:[DAPILocalizer class]] resourcePath] stringByAppendingPathComponent:@"ARStrings.bundle"]], nil)
#endif

NS_ASSUME_NONNULL_BEGIN

@interface DAPILocalizer : NSObject

+ (NSString *)getLocalizedStringByKey:(NSString *)key;
+ (NSLocale *)getLocale;
+ (NSInteger)getTextAlignment;
+ (BOOL)isArabic;

@end

NS_ASSUME_NONNULL_END
