import {IIdentityResponse} from 'connect-react-native';
import React, {useEffect, useState} from 'react';
import {StatusBar, View, Text, useColorScheme} from 'react-native';
import {common} from '../../App';
import styles from '../common/styles';
import SafeAreaView from 'react-native-safe-area-view';
import Snackbar from 'react-native-snackbar';

const Identity = () => {
  const [response, setResponse] = useState<IIdentityResponse | null>(null);
  async function getIdentity() {
    await common.connection
      ?.getIdentity()
      .then(response => {
        setResponse(response);
      })
      .catch(error => {
        Snackbar.show({
          text: error.message,
          duration: Snackbar.LENGTH_LONG,
        })
      });
  }
  useEffect(() => {
    getIdentity();
  }, []);

  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView style={styles.background}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{flex: 1}}>
        <Text style={{...styles.subtitle}}>
          {'Name: ' + response?.identity.name}
        </Text>
        <Text style={styles.subtitle}>
          {'Address Area: ' + response?.identity.address?.area}
        </Text>
        <Text style={styles.subtitle}>
          {'Address Building: ' + response?.identity.address?.building}
        </Text>
        <Text style={styles.subtitle}>
          {'Address City: ' + response?.identity.address?.city}
        </Text>
        <Text style={styles.subtitle}>
          {'Address Country: ' + response?.identity.address?.country}
        </Text>
        <Text style={styles.subtitle}>
          {'Address FLat: ' + response?.identity.address?.flat}
        </Text>
        <Text style={styles.subtitle}>
          {'Address Full: ' + response?.identity.address?.full}
        </Text>
        <Text style={styles.subtitle}>
          {'Address poBox: ' + response?.identity.address?.poBox}
        </Text>
        <Text style={styles.subtitle}>
          {'Address state: ' + response?.identity.address?.state}
        </Text>
        <Text style={styles.subtitle}>
          {'DateOfBirth: ' + response?.identity.dateOfBirth}
        </Text>
        <Text style={styles.subtitle}>
          {'EmailAddress: ' + response?.identity.emailAddress}
        </Text>
        <Text style={styles.subtitle}>
          {'Nationality: ' + response?.identity.nationality}
        </Text>

        <Text style={styles.subtitle}>{'More in the console...'}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Identity;
