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

const Payment = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  async function transfer() {
    var beneficiary = {
      linesAddress: {
        line1: 'baniyas road',
        line2: 'dubai',
        line3: 'united arab emirates',
      },
      accountNumber: '1623404370879825504324',
      bankName: 'STANDARD CHARTERED BANK',
      swiftCode: 'SCBLAEAD',
      iban: 'DAPIBANKAEENBD1623404370879825504324',
      country: 'AE',
      branchAddress: 'Dubai Mall',
      branchName: 'Dubai Mall',
      phoneNumber: '+971585859206',
      name: 'Name',
      nickname: 'Nickname',
    };
    await connection
      ?.createTransfer(null, beneficiary, 0, 'Remark')
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
            transfer();
          }}>
          <Text style={styles.buttonText}>{'Payment Using Dapi UI'}</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            navigation.navigate('CreateBeneficiary');
          }}>
          <Text style={styles.buttonText}>{'Create Beneficiary'}</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            navigation.navigate('Beneficiaries');
          }}>
          <Text style={styles.buttonText}>{'Beneficiaries'}</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

export default Payment;
