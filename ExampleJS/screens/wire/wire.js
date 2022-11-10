import React from 'react';
import {
  StatusBar,
  View,
  TouchableHighlight,
  Text,
  useColorScheme,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {connection} from '../../App';
import styles from '../common/styles';

const Wire = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  async function wireTransfer() {
    var address = {
      line1: '2400 bruce street UCA stadium park bld 6',
      line2: '',
      line3: '',
    };

    var wireBeneficiary = {
      linesAddress: address,
      name: 'TestAccount',
      firstName: 'Omar',
      lastName: 'Agoor',
      nickname: 'OmarChase',
      city: 'Conway',
      state: 'Arkansas',
      country: 'US',
      zipCode: '72305',
      receiverType: 'retail',
      receiverAccountType: 'checking',
      routingNumber: '953349354',
      accountNumber: '1234567654321',
    };

    await connection
      ?.createWireTransfer(wireBeneficiary, null, 0, 'Remark')
      .then(response => {})
      .catch(error => {});
  }

  return (
    <SafeAreaView style={styles.background}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{flex: 1}}>
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            wireTransfer();
          }}>
          <Text style={styles.buttonText}>{'Wire Payment Using Dapi UI'}</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            navigation.navigate('CreateWireBeneficiary');
          }}>
          <Text style={styles.buttonText}>{'Create Wire Beneficiary'}</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            navigation.navigate('WireBeneficiaries');
          }}>
          <Text style={styles.buttonText}>{'Wire Beneficiaries'}</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

export default Wire;
