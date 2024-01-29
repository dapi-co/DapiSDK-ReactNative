//
//  MFAViewController.h
//  DapiConnect
//
//  Created by Mohammed Ennabah on 3/10/20.
//  Copyright © 2020 Dapi. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "MFANavigationController.h"
#import <DapiSDK/DapiSDK-Swift.h>


NS_ASSUME_NONNULL_BEGIN

@interface MFAViewController : UIViewController

@property (nonatomic, copy) void (^mfaValuesSubmitted)(NSArray<MFAParameter *> *);
@property (nonatomic, copy) void (^mfaCancelled)(void);

- (instancetype)initWithUserInput:(NSArray<MFAParameter *> *)userInput colorScheme:(DapiMFAColorScheme *)colorScheme bankLogo:(NSString *)logo bankID:(NSString *)bankID;

- (void)dismissViewController;
@end

NS_ASSUME_NONNULL_END
