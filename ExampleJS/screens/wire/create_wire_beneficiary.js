import React, {useState} from 'react';
import {
  StatusBar,
  View,
  Text,
  useColorScheme,
  TextInput,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import {connection} from '../../App';
import styles from '../common/styles';
import SafeAreaView from 'react-native-safe-area-view';
import Snackbar from 'react-native-snackbar';

const CreateWireBeneficiary = () => {
  const [response, setResponse] = useState(null);
  const [name, onChangeName] = useState('');
  const [firstName, onChangeFirstName] = useState('');
  const [lastName, onChangeLastName] = useState('');
  const [nickname, onChangeNickname] = useState('');
  const [city, onChangeCity] = useState('');
  const [state, onChangeState] = useState('');
  const [country, onChangeCountry] = useState('');
  const [zipCode, onChangeZipCode] = useState('');
  const [receiverType, onChangeReceiverType] = useState('');
  const [receiverAccountType, onChangeReceiverAccountType] = useState('');
  const [routingNumber, onChangeRoutingNumber] = useState('');
  const [accountNumber, onChangeAccountNumber] = useState('');
  const [addressLine1, onChangeAddressLine1] = useState('');
  const [addressLine2, onChangeAddressLine2] = useState('');
  const [addressLine3, onChangeAddressLine3] = useState('');

  async function createWireBeneficiary(beneficiary) {
    await connection
      ?.createWireBeneficiary(beneficiary)
      .then(response => {
        setResponse(response);
        Snackbar.show({
          text: 'Added the beneficiary successfully',
          duration: Snackbar.LENGTH_LONG,
        });
      })
      .catch(error =>
        Snackbar.show({
          text: error.message,
          duration: Snackbar.LENGTH_LONG,
        }),
      );
  }

  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView style={styles.background}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{flex: 1}}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeName}
            value={name}
            placeholder="Name"
            placeholderTextColor="#000000"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeFirstName}
            value={firstName}
            placeholder="First Name"
            placeholderTextColor="#000000"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeLastName}
            value={lastName}
            placeholder="Last Name"
            placeholderTextColor="#000000"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeNickname}
            value={nickname}
            placeholder="Nick Name"
            placeholderTextColor="#000000"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeCity}
            value={city}
            placeholder="City"
            placeholderTextColor="#000000"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeState}
            value={state}
            placeholder="State"
            placeholderTextColor="#000000"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeCountry}
            value={country}
            placeholder="Country"
            placeholderTextColor="#000000"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeZipCode}
            value={zipCode}
            placeholder="Zip Code"
            placeholderTextColor="#000000"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeReceiverType}
            value={receiverType}
            placeholder="Receiver Type"
            placeholderTextColor="#000000"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeReceiverAccountType}
            value={receiverAccountType}
            placeholder="Receiver Account Type"
            placeholderTextColor="#000000"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeRoutingNumber}
            value={routingNumber}
            placeholder="Routing Number"
            placeholderTextColor="#000000"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeAccountNumber}
            value={accountNumber}
            placeholder="Account Number"
            placeholderTextColor="#000000"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeAddressLine1}
            value={addressLine1}
            placeholder="Address Line 1"
            placeholderTextColor="#000000"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeAddressLine2}
            value={addressLine2}
            placeholder="Address Line 2"
            placeholderTextColor="#000000"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeAddressLine3}
            value={addressLine3}
            placeholder="Address Line 3"
            placeholderTextColor="#000000"
          />

          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              var address = {
                line1: addressLine1,
                line2: addressLine2,
                line3: addressLine3,
              };

              var beneficiary = {
                linesAddress: address,
                name: name,
                firstName: firstName,
                lastName: lastName,
                nickname: nickname,
                city: city,
                state: state,
                country: country,
                zipCode: zipCode,
                receiverType: receiverType,
                receiverAccountType: receiverAccountType,
                routingNumber: routingNumber,
                accountNumber: accountNumber,
              };

              createWireBeneficiary(beneficiary);
            }}>
            <Text style={styles.buttonText}>{'Confirm'}</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateWireBeneficiary;
