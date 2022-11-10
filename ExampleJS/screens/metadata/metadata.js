import React, {useEffect, useState} from 'react';
import {StatusBar, View, Text, useColorScheme} from 'react-native';
import {connection} from '../../App';
import styles from '../common/styles';
import SafeAreaView from 'react-native-safe-area-view';
import Snackbar from 'react-native-snackbar';

const Metadata = () => {
  const [response, setResponse] = useState(null);
  async function getAccountsMetadata() {
    await connection
      ?.getAccountsMetadata()
      .then(response => {
        setResponse(response);
      })
      .catch(error => {
        Snackbar.show({
          text: error.message,
          duration: Snackbar.LENGTH_LONG,
        });
      });
  }

  useEffect(() => {
    getAccountsMetadata();
  }, []);

  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView style={{flex: 1, margin: 24}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{flex: 1}}>
        <Text style={styles.subtitle}>
          {'BankName: ' + response?.accountsMetadata.bankName}
        </Text>
        <Text style={styles.subtitle}>
          {'BranchAddress: ' + response?.accountsMetadata.branchAddress}
        </Text>
        <Text style={styles.subtitle}>
          {'BranchName: ' + response?.accountsMetadata.branchName}
        </Text>
        <Text style={styles.subtitle}>
          {'IsCreateBeneficiaryEndpointRequired: ' +
            response?.accountsMetadata.isCreateBeneficiaryEndpointRequired}
        </Text>
        <Text style={styles.subtitle}>
          {'SortCode: ' + response?.accountsMetadata.sortCode}
        </Text>
        <Text style={styles.subtitle}>
          {'SwiftCode: ' + response?.accountsMetadata.swiftCode}
        </Text>
        <Text style={styles.subtitle}>
          {'WillNewlyAddedBeneficiaryExistBeforeCoolDownPeriod: ' +
            response?.accountsMetadata
              .willNewlyAddedBeneficiaryExistBeforeCoolDownPeriod}
        </Text>
        <Text style={styles.subtitle}>
          {'Address Line 1: ' + response?.accountsMetadata.address.line1}
        </Text>
        <Text style={styles.subtitle}>
          {'Address Line 2: ' + response?.accountsMetadata.address.line2}
        </Text>
        <Text style={styles.subtitle}>
          {'Address Line 3: ' + response?.accountsMetadata.address.line3}
        </Text>
        <Text style={styles.subtitle}>
          {'BeneficiaryCoolDownPeriod Unit: ' +
            response?.accountsMetadata.beneficiaryCoolDownPeriod.unit}
        </Text>
        <Text style={styles.subtitle}>
          {'BeneficiaryCoolDownPeriod Value: ' +
            response?.accountsMetadata.beneficiaryCoolDownPeriod.value}
        </Text>
        <Text style={styles.subtitle}>
          {'Country Code: ' + response?.accountsMetadata.country.code}
        </Text>
        <Text style={styles.subtitle}>
          {'Country Name: ' + response?.accountsMetadata.country.name}
        </Text>
        <Text style={styles.subtitle}>
          {'TransactionRange Unit: ' +
            response?.accountsMetadata.transactionRange.unit}
        </Text>
        <Text style={styles.subtitle}>
          {'TransactionRange Value: ' +
            response?.accountsMetadata.transactionRange.value}
        </Text>
        <Text style={styles.subtitle}>{'More in the console...'}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Metadata;
