//
//  DPCEndPiont.h
//  DapiSDK
//
//  Created by MSZ on 04/11/2022.
//

#ifndef DPCEndpoint_h
#define DPCEndpoint_h


typedef NSString *DPCEndpoint NS_TYPED_EXTENSIBLE_ENUM;

extern DPCEndpoint const DPCEndpointExchangeToken;
extern DPCEndpoint const DPCEndpointGetIdentity;
extern DPCEndpoint const DPCEndpointGetAccounts;
extern DPCEndpoint const DPCEndpointGetAccountMetadata;
extern DPCEndpoint const DPCEndpointGetTransactions;
extern DPCEndpoint const DPCEndpointGetCategorizedTransactions;
extern DPCEndpoint const DPCEndpointGetEnrichedTransactions;
extern DPCEndpoint const DPCEndpointGetBeneficiaries;
extern DPCEndpoint const DPCEndpointGetWireBeneficiaries;
extern DPCEndpoint const DPCEndpointCreateWireBeneficiaries;
extern DPCEndpoint const DPCEndpointCreateWireTransfer;
extern DPCEndpoint const DPCEndpointCreateWireTransferToExistingBeneficiary;
extern DPCEndpoint const DPCEndpointCreateBeneficiary;
extern DPCEndpoint const DPCEndpointCreateTransfer;
extern DPCEndpoint const DPCEndpointCreateTransferToExistingBeneficiary;
extern DPCEndpoint const DPCEndpointDelinkUser;
extern DPCEndpoint const DPCEndpointGetCards;
extern DPCEndpoint const DPCEndpointAll;
extern DPCEndpoint const DPCEndpointCreateACHPullTransfer;
extern DPCEndpoint const DPCEndpointNymCardLoadFunds;


#endif /* DPCEndPiont_h */
