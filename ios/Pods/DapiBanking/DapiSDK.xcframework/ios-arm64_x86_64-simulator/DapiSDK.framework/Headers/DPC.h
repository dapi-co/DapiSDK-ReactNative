//
//  DPC.h
//  DapiSDK
//
//  Created by MSZ on 28/10/2022.
//

#import <Foundation/Foundation.h>
#import <DapiSDK/DPCEndpoint.h>

NS_ASSUME_NONNULL_BEGIN

@class DAPIBankConnection;
@class DAPIConfigurations;
@class DAPIBeneficiary;
@class DAPIWireBeneficiary;
@class Dapi;
@class DAPIUICustomization;
@class DAPIBankConnection;
@class DapiURLResponse;

typedef NS_ENUM(NSInteger, DAPIEnvironment);
typedef NS_ENUM(NSInteger, DAPITransactionType);


@interface DPC : NSObject

@property (nonatomic, copy) DAPIConfigurations * _Nonnull configurations
NS_SWIFT_UNAVAILABLE("Not available to be used by swift project");

@property (class, nonatomic, strong, readonly) DPC *sharedInstance
NS_SWIFT_UNAVAILABLE("Not available to be used by swift project");


@property (nonatomic, copy) NSURLRequest * _Nonnull (^ _Nullable requestInterceptionCompletion)(DAPIBankConnection * _Nullable, NSURLRequest * _Nonnull) NS_SWIFT_UNAVAILABLE("Not available to be used by swift project");

@property (nonatomic, copy) NSData * _Nullable (^ _Nullable responseInterceptionCompletion)(DAPIBankConnection * _Nullable, DapiURLResponse * _Nonnull) NS_SWIFT_UNAVAILABLE("Not available to be used by swift project");

@property (nonatomic, copy) NSArray<NSString *> * _Nonnull countries
NS_SWIFT_UNAVAILABLE("Not available to be used by swift project");

@property (nonatomic, copy) NSDictionary<DPCEndpoint, NSDictionary<NSString *, NSString *> *> * _Nonnull endpointExtraHeaderFields
NS_SWIFT_UNAVAILABLE("Not available to be used by swift project");

@property (nonatomic, copy) NSDictionary<DPCEndpoint, NSDictionary<NSString *, id> *> * _Nonnull endpointExtraBody
NS_SWIFT_UNAVAILABLE("Not available to be used by swift project");



- (DAPIUICustomization *) uiCustomization NS_SWIFT_UNAVAILABLE("Not available to be used by swift project");

- (void)setUICustomization:(DAPIUICustomization *) uiCustomization NS_SWIFT_UNAVAILABLE("Not available to be used by swift project");


- (void)startWithAppKey:(NSString * _Nonnull)appKey
            environment:(enum DAPIEnvironment )environment
           clientUserID:(NSString * _Nonnull)clientUserID
             completion:(void (^ _Nullable)(Dapi * _Nullable, NSError * _Nullable))completion
NS_SWIFT_UNAVAILABLE("Not available to be used by swift project");


- (NSArray<DAPIBankConnection *> *)getConnections
NS_SWIFT_UNAVAILABLE("Not available to be used by swift project");


- (void)createBankConnectionWithParameters:(NSDictionary<NSString *, id> * _Nonnull)parameters
                                completion:(void (^ _Nonnull)(NSDictionary<NSString *, id> * _Nullable, NSError * _Nullable))completion
NS_SWIFT_UNAVAILABLE("Not available to be used by swift project");


- (void)delinkWithBankConnection:(DAPIBankConnection * _Nonnull)bankConnection
                      completion:(void (^ _Nonnull)(NSDictionary<NSString *, id> * _Nullable, NSError * _Nullable))completion
NS_SWIFT_UNAVAILABLE("Not available to be used by swift project");


- (void)accountMetadataWithBankConnection:(DAPIBankConnection * _Nonnull)bankConnection
                               completion:(void (^ _Nonnull)(NSDictionary<NSString *, id> * _Nullable, NSError * _Nullable))completion
NS_SWIFT_UNAVAILABLE("Not available to be used by swift project");


- (void)identityWithBankConnection:(DAPIBankConnection * _Nonnull)bankConnection
                        completion:(void (^ _Nonnull)(NSDictionary<NSString *, id> * _Nullable, NSError * _Nullable))completion
NS_SWIFT_UNAVAILABLE("Not available to be used by swift project");


- (void)bankAccountsWithBankConnection:(DAPIBankConnection * _Nonnull)bankConnection
                            completion:(void (^ _Nonnull)(NSDictionary<NSString *, id> * _Nullable, NSError * _Nullable))completion
NS_SWIFT_UNAVAILABLE("Not available to be used by swift project");


- (void)bankCardsWithBankConnection:(DAPIBankConnection * _Nonnull)bankConnection
                         completion:(void (^ _Nonnull)(NSDictionary<NSString *, id> * _Nullable, NSError * _Nullable))completion
NS_SWIFT_UNAVAILABLE("Not available to be used by swift project");


- (void)cardTransactionsWithBankConnection:(DAPIBankConnection * _Nonnull)bankConnection
                                    cardID:(NSString * _Nonnull) cardID
                                      type:(enum DAPITransactionType)type
                                      from:(NSDate * _Nonnull)startDate
                                        to:(NSDate * _Nonnull)endDate
                                completion:(void (^ _Nonnull)(NSDictionary<NSString *, id> * _Nullable, NSError * _Nullable))completion
NS_SWIFT_UNAVAILABLE("Not available to be used by swift project");


- (void)accountTransactionsWithBankConnection:(DAPIBankConnection * _Nonnull)bankConnection
                                bankAccountID:(NSString * _Nonnull)bankAccountID
                                         type:(enum DAPITransactionType)type
                                         from:(NSDate * _Nonnull)startDate
                                           to:(NSDate * _Nonnull)endDate
                                   completion:(void (^ _Nonnull)(NSDictionary<NSString *, id> * _Nullable, NSError * _Nullable))completion
NS_SWIFT_UNAVAILABLE("Not available to be used by swift project");


- (void)bankBeneficiariesWithBankConnection:(DAPIBankConnection * _Nonnull)bankConnection
                                 completion:(void (^ _Nonnull)(NSDictionary<NSString *, id> * _Nullable, NSError * _Nullable))completion
NS_SWIFT_UNAVAILABLE("Not available to be used by swift project");


- (void)bankWireBeneficiariesWithBankConnection:(DAPIBankConnection * _Nonnull)bankConnection
                                     completion:(void (^ _Nonnull)(NSDictionary<NSString *, id> * _Nullable, NSError * _Nullable))completion
NS_SWIFT_UNAVAILABLE("Not available to be used by swift project");


- (void)createBeneficiaryWithBankConnection:(DAPIBankConnection * _Nonnull)bankConnection
                         beneficiaryDetails:(DAPIBeneficiary * _Nonnull)beneficiary
                                 completion:(void (^ _Nonnull)(NSDictionary<NSString *, id> * _Nullable, NSError * _Nullable))completion
NS_SWIFT_UNAVAILABLE("Not available to be used by swift project");



- (void)createWireBeneficiaryWithBankConnection:(DAPIBankConnection * _Nonnull)bankConnection
                             beneficiaryDetails:(DAPIWireBeneficiary * _Nonnull)beneficiary
                                     completion:(void (^ _Nonnull)(NSDictionary<NSString *, id> * _Nullable, NSError * _Nullable))completion
NS_SWIFT_UNAVAILABLE("Not available to be used by swift project");



- (void)createTransferToExistBeneficiaryWithBankConnection:(DAPIBankConnection * _Nonnull)bankConnection
                                       senderBankAccountID:(NSString * _Nonnull)accountID
                                     receiverBeneficiaryID:(NSString * _Nonnull)beneficiaryID
                                                    amount:(float)amount
                                                    remark:(NSString * _Nullable)remark
                                                completion:(void (^ _Nonnull)(NSDictionary<NSString *, id> * _Nullable, NSError * _Nullable))completion
NS_SWIFT_UNAVAILABLE("Not available to be used by swift project");



- (void)createWireTransferToExistBeneficiaryWithBankConnection:(DAPIBankConnection * _Nonnull)bankConnection
                                           senderBankAccountID:(NSString * _Nonnull)accountID
                                         receiverBeneficiaryID:(NSString * _Nonnull)beneficiaryID
                                                        amount:(float)amount
                                                        remark:(NSString * _Nullable)remark
                                                    completion:(void (^ _Nonnull)(NSDictionary<NSString *, id> * _Nullable, NSError * _Nullable))completion
NS_SWIFT_UNAVAILABLE("Not available to be used by swift project");


- (void)createWireTransferWithBankConnection:(DAPIBankConnection * _Nonnull)bankConnection
                         senderBankAccountID:(NSString * _Nonnull)senderBankAccountID
                         receiverBeneficiary:(DAPIWireBeneficiary * _Nullable)beneficiary
                                      amount:(float)amount
                                      remark:(NSString * _Nullable)remark
                                  completion:(void (^ _Nonnull)(NSDictionary<NSString *, id> * _Nullable, NSError * _Nullable))completion
NS_SWIFT_UNAVAILABLE("Not available to be used by swift project");


- (void)createTransferWithBankConnection:(DAPIBankConnection * _Nonnull)bankConnection
                     senderBankAccountId:(NSString * _Nonnull)senderBankAccountId
                     receiverBeneficiary:(DAPIBeneficiary * _Nullable)beneficiary
                                  amount:(float)amount
                                  remark:(NSString * _Nullable)remark
                              completion:(void (^ _Nonnull)(NSDictionary<NSString *, id> * _Nullable, NSError * _Nullable))completion
NS_SWIFT_UNAVAILABLE("Not available to be used by swift project");


- (void)createACHPullTransferWithBankConnection:(DAPIBankConnection * _Nonnull)bankConnection
                               senderBankAccountId:(NSString * _Nonnull)senderBankAccountId
                                            amount:(float)amount
                                       description:(NSString * _Nonnull)description
                                        completion:(void (^ _Nonnull)(NSDictionary<NSString *, id> * _Nullable, NSError * _Nullable))completion
NS_SWIFT_UNAVAILABLE("Not available to be used by swift project");


- (void)nymcardLoadFundsWithBankConnection:(DAPIBankConnection *)bankConnection
                            senderBankAccountId:(NSString *)senderBankAccountId
                                         amount:(float)amount
                                     token:(NSString *)token
                                completion:(void (^)(NSDictionary<NSString *,id> * _Nullable, NSError * _Nullable))completion
    NS_SWIFT_UNAVAILABLE("Not available to be used by swift project");
@end

NS_ASSUME_NONNULL_END
