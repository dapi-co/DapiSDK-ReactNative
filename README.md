# DapiSDK-ReactNative
This guide will show you how to integrate DapiSDK for React-Native and use its components to interact with the API.


# Dapi React-Native SDK

## Introduction

Dapi for React-Native is a prebuilt SDK that reduces the time it takes to integrate with Dapi's API and gain access to your users financial data.

The SDK provides direct access to Dapi endpoints and offers optional UI to manage users' accounts and money transfer.

## Integration

You can check out our [React-Native Integration Guide](https://docs.dapi.com/docs/react-native-sdk-installation) for detailed information about our SDK.

## Run The Example App

1. Download and install [Node, Android Studio, Xcode, VSCode](https://reactnative.dev/docs/environment-setup).
2. Clone the project `git clone https://github.com/dapi-co/DapiSDK-ReactNative.git`
3. Run `yarn` to install dependencies
4. Open the project in VSCode and navigate to `screens/home.tsx` and replace `APP_KEY` with your appKey. Can be obtained from [Dapi Dashboard](https://dashboard.dapi.com/login) 
5. Android:
    * Open `android` project folder in Android Studio and go to `Settings -> Build, Execution, Deployment ->  Build Tools -> Gradle -> Gradle JDK` and select JDK 17 if not selected.
    * Open `build.gradle` and replace applicationId value `com.dapi.app` with your Bundle ID.
    * Sync gradle
6. iOS:
    * Open the `ios` project folder on Xcode.
    * In the Project Navigator, select the project file -> General -> Identity then replace Bundle Identifier value `com.dapi.app` with your Bundle ID
7. Run the app from the IDE or run command `npx react-native run-android` to run Android or `npx react-native run-ios` to run iOS.
8. DapiSDK will start successfully with the correct `AppKey` and `BundleID`.
9. Click `Connect` to select your bank and enter credentials to login through Dapi. You can [create a sandbox bank account](https://docs.dapi.com/docs/react-native-connect#create-sandbox-user) to login in the Sandbox environment.
10. After a successful connection, a DapiConnection object is generated and used for making calls to Dapi endpoints that you can call by clicking on any of the buttons like `Get Identity` and `Create Transfer`.
