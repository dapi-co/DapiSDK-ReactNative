# DapiSDK-ReactNative
This guide will show you how to integrate DapiSDK for React-Native and use its components to interact with the API.


# Dapi React-Native SDK

## Introduction

Dapi for React-Native is a prebuilt SDK that reduces the time it takes to integrate with Dapi's API and gain access to your users financial data.

The SDK provides direct access to Dapi endpoints and offers optional UI to manage users' accounts and money transfer.

## Integration

You can check out our [React-Native Integration Guide](https://docs.dapi.com/docs/react-native-sdk-installation) for detailed information about our SDK.

## Run The Example App

1. Clone and open the project on your preferred ide.
2. Open `App.js` if you're using ExampleJS or `App.tsx` if you're using ExampleTS and replace `APP_KEY` with your appKey. Can be obtained from [Dapi Dashboard](https://dashboard.cf.dapi.co/)
3. For Android, open build.gradle and replace applicationId value `com.dapi.app` with your Bundle ID.
4. For iOS, open the iOS project on xcode and replace Bundle Identifier value `com.dapi.app` with your Bundle ID.
5. Sync the project files and run the app. Run command `react-native run-android` to run Android or `react-native run-ios` to run iOS.
6. Click `Start` to initialize DapiSDK.
7. Click `Connect` button to select your bank and enter credentials to login through Dapi.
8. After a successful connection, a DapiConnection object is generated and used for making calls to Dapi endpoints that you can call by clicking on any of the buttons like `Get Identity` and `Create Transfer`.
