import React from 'react';
import {
  StatusBar,
  View,
  TouchableHighlight,
  Text,
  useColorScheme,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './common/RootStackParam';
import styles from './common/styles';
type ApiSelectionProp = StackNavigationProp<RootStackParamList, 'ApiSelection'>;

const ApiSelection = () => {
  const navigation = useNavigation<ApiSelectionProp>();
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView style={styles.background}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{flex: 1}}>
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            navigation.navigate('Data');
          }}>
          <Text style={styles.buttonText}>{'Data'}</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            navigation.navigate('Metadata');
          }}>
          <Text style={styles.buttonText}>{'Metadata'}</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            navigation.navigate('Payment');
          }}>
          <Text style={styles.buttonText}>{'Payment'}</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            navigation.navigate('Wire');
          }}>
          <Text style={styles.buttonText}>{'Wire'}</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

export default ApiSelection;
