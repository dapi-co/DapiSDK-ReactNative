import React from 'react';
import {
  StatusBar,
  View,
  TouchableHighlight,
  Text,
  useColorScheme,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import styles from '../common/styles';


const Data = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView style={styles.background}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{flex: 1}}>
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            navigation.navigate('Identity');
          }}>
          <Text style={styles.buttonText}>{'Identity'}</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            navigation.navigate('Accounts');
          }}>
          <Text style={styles.buttonText}>{'Accounts'}</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            navigation.navigate('Cards');
          }}>
          <Text style={styles.buttonText}>{'Cards'}</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            navigation.navigate('AccountTransactions');
          }}>
          <Text style={styles.buttonText}>{'Account Transactions'}</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            navigation.navigate('CardTransactions');
          }}>
          <Text style={styles.buttonText}>{'Card Transactions'}</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

export default Data;
