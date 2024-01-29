//
//  DPCTheme.h
//  DapiConnect
//
//  Created by Mohammed Ennabah on 3/21/20.
//  Copyright © 2020 Dapi. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface DPCTheme : NSObject

@property (nonatomic, strong, readonly, class) UIColor *subTitleColor;
@property (nonatomic, strong, readonly, class) UIColor *titleColor;
@property (nonatomic, strong, readonly, class) UIColor *backgroundColor;
@property (nonatomic, strong, readonly, class) UIColor *primaryColor;
@property (nonatomic, strong, readonly, class) NSString *primaryColorHexa;
@property (nonatomic, strong, readonly, class) UIColor *errorViewBackgroundColor;
@property (nonatomic, strong, readonly, class) UIColor *warningColor;

@end

NS_ASSUME_NONNULL_END
