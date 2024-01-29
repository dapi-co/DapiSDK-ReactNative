import {ICardResponse} from 'connect-react-native';
import React, {useEffect, useState} from 'react';
import {StatusBar, View, useColorScheme, FlatList} from 'react-native';
import {common} from '../../App';
import DataListItem from '../common/DataListItem';
import SafeAreaView from 'react-native-safe-area-view';
import styles from '../common/styles';
import Snackbar from 'react-native-snackbar';

const Cards = () => {
  const [response, setResponse] = useState<ICardResponse | null>(null);
  async function getCards() {
    await common.connection
      ?.getCards()
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
    getCards();
  }, []);

  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView style={styles.background}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{flex: 1}}>
        <FlatList
          data={response?.cards}
          renderItem={({item}) => (
            <DataListItem
              topLeft={item.name}
              topRight={
                item.currency?.code + ' ' + item.balance?.availableBalance
              }
              bottomLeft={item.status}
              bottomRight={
                '***' +
                item.cardNumber?.substring(
                  item.cardNumber.length,
                  item.cardNumber.length - 4,
                )
              }></DataListItem>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Cards;
