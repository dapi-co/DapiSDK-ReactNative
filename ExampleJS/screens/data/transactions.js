import React, {useEffect, useState} from 'react';
import {StatusBar, View, useColorScheme, FlatList} from 'react-native';
import {connection} from '../../App';
import DataListItem from '../common/DataListItem';
import SafeAreaView from 'react-native-safe-area-view';
import styles from '../common/styles';
import Snackbar from 'react-native-snackbar';

const Transactions = ({isAccountTransactions}) => {
  const [response, setResponse] = useState(null);
  async function getTransactionsForAccount() {
    let accountID = await connection?.presentAccountSelection();
    let accountsResponse = await connection?.getAccounts();
    let account = accountsResponse.accounts.find(a => {
      if (a.id == accountID) {
        return a;
      }
    });
    await connection
      ?.getTransactionsForAccount(
        account,
        new Date(1650371076000),
        new Date(),
        'default',
      )
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

  async function getTransactionsForCard() {
    let cardsResponse = await connection?.getCards();
    await connection
      ?.getTransactionsForCard(
        cardsResponse?.cards[0],
        new Date(1650371076000),
        new Date(),
        'default',
      )
      .then(response => {
        setResponse(response);
      })
      .catch(e => {});
  }
  useEffect(() => {
    isAccountTransactions
      ? getTransactionsForAccount()
      : getTransactionsForCard();
  }, []);

  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView style={styles.background}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{flex: 1}}>
        <FlatList
          data={response?.transactions}
          renderItem={({item}) => (
            <DataListItem
              topLeft={item.date.toString()}
              topRight={item.currency?.code + ' ' + item.amount}
              bottomLeft={item.description != null ? item.description : 'NA'}
              bottomRight={
                item.reference != null ? item.reference : 'NA'
              }></DataListItem>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Transactions;
