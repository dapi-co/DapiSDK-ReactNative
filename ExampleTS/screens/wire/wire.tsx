import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
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

type WireProp = StackNavigationProp<RootStackParamList, 'Payment'>;

const Wire = () => {
  const navigation = useNavigation<WireProp>();
  const isDarkMode = useColorScheme() === 'dark';

  async function wireTransfer() {
    common.connection
      ?.createWireTransfer(common.wireBeneficiary!, null, 0, 'Remark')
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
