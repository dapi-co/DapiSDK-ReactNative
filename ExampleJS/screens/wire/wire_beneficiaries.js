import React, {useEffect, useState} from 'react';
import {StatusBar, View, useColorScheme, FlatList} from 'react-native';
import {connection} from '../../App';
import DataListItem from '../common/DataListItem';
import SafeAreaView from 'react-native-safe-area-view';
import styles from '../common/styles';
import Snackbar from 'react-native-snackbar';

const WireBeneficiaries = () => {
  const [response, setResponse] = useState(null);
  async function getBeneficiaries() {
    await connection
      ?.getWireBeneficiaries()
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
    getBeneficiaries();
  }, []);

  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView style={styles.background}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{flex: 1}}>
        <FlatList
          data={response?.beneficiaries}
          renderItem={({item}) => (
            <DataListItem
              topLeft={item.name}
              topRight={item.type}
              bottomLeft={item.routingNumbers}
              bottomRight={
                '***' +
                item.accountNumber?.substring(
                  item.accountNumber.length,
                  item.accountNumber.length - 4,
                )
              }></DataListItem>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default WireBeneficiaries;
