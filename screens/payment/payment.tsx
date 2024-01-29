import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DapiBeneficiary, DapiLineAddress} from 'connect-react-native';
import React from 'react';
import {
  StatusBar,
  View,
  TouchableHighlight,
  Text,
  useColorScheme,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {common} from '../../App';
import {RootStackParamList} from '../common/RootStackParam';
import styles from '../common/styles';

type PaymentProp = StackNavigationProp<RootStackParamList, 'Payment'>;

const Payment = () => {
  const navigation = useNavigation<PaymentProp>();
  const isDarkMode = useColorScheme() === 'dark';

  async function transfer() {
    let address = new DapiLineAddress(
      'baniyas ',
      'dubai',
      'united arab emirates',
    );
    let beneficiary = new DapiBeneficiary(
      address,
      '1647518280840289401662',
      'Aashik Ahmed Mohamed Meera',
      'Emirates NBD Bank PJSC',
      'EBILAEAD',
      'DAPIBANKAEHSBC1647518280840289401662',
      '+971585859206',
      'AE',
      'Baniyas Road Deira PO Box 777 Dubai UAE',
      'Emirates NBD Bank PJSC',
      'Aashik',
    );
    await common.connection
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
