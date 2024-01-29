import {IAccountResponse} from 'connect-react-native';
import React, {useEffect, useState} from 'react';
import {StatusBar, View, useColorScheme, FlatList} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {common} from '../../App';
import DataListItem from '../common/DataListItem';
import styles from '../common/styles';
import Snackbar from 'react-native-snackbar';

const Accounts = () => {
  const [response, setResponse] = useState<IAccountResponse | null>(null);
  async function getAccounts() {
    await common.connection
      ?.getAccounts()
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
    getAccounts();
  }, []);

  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView style={ styles.background}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{flex: 1}}>
        <FlatList
          data={response?.accounts}
          renderItem={({item}) => (
            <DataListItem
              topLeft={item.name}
              topRight={item.currency?.code + ' ' + item.balance?.amount}
              bottomLeft={item.iban?.substring(0, 12) + '***'}
              bottomRight={
                '***' +
                item.number?.substring(
                  item.number.length,
                  item.number.length - 4,
                )
              }></DataListItem>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Accounts;
