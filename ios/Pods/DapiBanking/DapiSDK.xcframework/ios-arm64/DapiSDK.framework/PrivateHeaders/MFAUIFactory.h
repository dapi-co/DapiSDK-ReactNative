//
//  MFAUIFactory.h
//  DapiConnect
//
//  Created by Mohammed Ennabah on 3/11/20.
//  Copyright © 2020 Dapi. All rights reserved.
//

#import <DapiSDK/DapiSDK-Swift.h>

NS_ASSUME_NONNULL_BEGIN

@class MFAUIFactory;

@protocol MFAUIFactoryDelegate <NSObject>

- (void)mfaUIFactory:(MFAUIFactory *)uiFactory valueChanged:(NSString *)value forMFAParameter:(MFAParameter *)mfaParam;

@end

@interface MFAUIFactory : NSObject

@property (nonatomic, weak) id<MFAUIFactoryDelegate> delegate;

@property (nonatomic, strong) DapiMFAColorScheme *colorScheme;

- (instancetype)initWithColorScheme:(DapiMFAColorScheme *)colorScheme;
- (NSArray<UIView *> *)generateMFALoginFieldsForUserInputs:(NSArray<MFAParameter *> *)userInputs forBankID:(NSString *)bankID;

@end

NS_ASSUME_NONNULL_END
