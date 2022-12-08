import React, {useState, useEffect} from 'react';
import {
  useColorScheme,
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableHighlight,
  View,
  NativeModules,
  NativeEventEmitter,
  TouchableWithoutFeedback,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {useNavigation} from '@react-navigation/native';
import {setConnection} from '../App';
import styles from './common/styles';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Snackbar from 'react-native-snackbar';
import Dapi from 'connect-react-native';

const {DapiConnectManager} = NativeModules;
const dapiConnectManagerEmitter = new NativeEventEmitter(DapiConnectManager);

async function startDapi() {
  let countries = ['AE', 'US'];
  let configurations = {
    countries: countries,
    environment: 'sandbox',
    theme: {
      enforceTheme: 'light',
      primaryColor: {
        lightMode: '#738600',
        darkMode: '#471024',
      },
    },
  };
  configurations.postSuccessfulConnectionLoadingText = 'Loading..';
  await Dapi.instance
    .start('APP_KEY', 'CLIENT_USER_ID', configurations)
    .then(error => {
      console.log('Dapi started successfully');
    })
    .catch(error => {
      console.log('Dapi failed to start with error: ', error);
    });
}

const Home = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();

  const [presentConnections, setConnections] = useState([]);

  const start = async () => {
    await startDapi()
      .then(result => {
        addConnectListeners();
      })
      .catch(error => console.error(error));

    await Dapi.instance.getConnections().then(result => {
      setConnections(result);
    });
  };

  useEffect(() => {
    start();
  }, []);

  async function addConnectListeners() {
    dapiConnectManagerEmitter.addListener(
      'EventConnectSuccessful',
      async successConnectResult => {
        await Dapi.instance.getConnections().then(result => {
          setConnections(result);
        });
      },
    );
    dapiConnectManagerEmitter.addListener(
      'EventConnectFailure',
      failureConnectResult =>
        console.log('Connection failed: ', failureConnectResult),
    );
    dapiConnectManagerEmitter.addListener('EventConnectDismissed', _ => {
      Snackbar.show({
        text: 'Connect was dismissed manually',
        duration: Snackbar.LENGTH_LONG,
      });
    });
  }

  function presentConnect() {
    Dapi.instance.presentConnect();
  }

  return (
    <SafeAreaView
      style={{flex: 1, paddingTop: 32, backgroundColor: Colors.white}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.background}>
        <Text style={styles.title}>{'Your current connections: '}</Text>

        {presentConnections.length == 0 ? (
          <Text
            style={{
              ...styles.subtitle,
              marginTop: 'auto',
              alignSelf: 'center',
            }}>
            {'Connect your bank account to see it here.'}
          </Text>
        ) : (
          <FlatList
            style={{flex: 1, marginTop: 32}}
            data={presentConnections}
            renderItem={({item}) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  setConnection(item);
                  navigation.navigate('ApiSelection');
                }}>
                <View style={styles.connection}>
                  <Image
                    source={{
                      uri: item.miniLogo,
                    }}
                    style={styles.image}
                  />
                  <Text style={styles.connectionText}>
                    {item.bankShortName}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          />
        )}

        <TouchableHighlight
          style={styles.connect}
          onPress={() => presentConnect()}>
          <Text style={styles.connectText}>{'Connect With Dapi'}</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

export default Home;
