import {
  DapiLineAddress,
  DapiWireBeneficiary,
  IDapiResult,
  IWireBeneficiary,
} from 'connect-react-native';
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
import {common} from '../../App';
import styles from '../common/styles';
import SafeAreaView from 'react-native-safe-area-view';
import Snackbar from 'react-native-snackbar';

const CreateWireBeneficiary = () => {
  const [response, setResponse] = useState<IDapiResult | null>(null);
  const [name, onChangeName] = useState<string>('');
  const [firstName, onChangeFirstName] = useState<string>('');
  const [lastName, onChangeLastName] = useState<string>('');
  const [nickname, onChangeNickname] = useState<string>('');
  const [city, onChangeCity] = useState<string>('');
  const [state, onChangeState] = useState<string>('');
  const [country, onChangeCountry] = useState<string>('');
  const [zipCode, onChangeZipCode] = useState<string>('');
  const [receiverType, onChangeReceiverType] = useState<string>('');
  const [receiverAccountType, onChangeReceiverAccountType] =
    useState<string>('');
  const [routingNumber, onChangeRoutingNumber] = useState<string>('');
  const [accountNumber, onChangeAccountNumber] = useState<string>('');
  const [addressLine1, onChangeAddressLine1] = useState<string>('');
  const [addressLine2, onChangeAddressLine2] = useState<string>('');
  const [addressLine3, onChangeAddressLine3] = useState<string>('');

  async function createWireBeneficiary(beneficiary: IWireBeneficiary) {
    await common.connection
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
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeFirstName}
            value={firstName}
            placeholder="First Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeLastName}
            value={lastName}
            placeholder="Last Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeNickname}
            value={nickname}
            placeholder="Nick Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeCity}
            value={city}
            placeholder="City"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeState}
            value={state}
            placeholder="State"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeCountry}
            value={country}
            placeholder="Country"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeZipCode}
            value={zipCode}
            placeholder="Zip Code"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeReceiverType}
            value={receiverType}
            placeholder="Receiver Type"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeReceiverAccountType}
            value={receiverAccountType}
            placeholder="Receiver Account Type"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeRoutingNumber}
            value={routingNumber}
            placeholder="Routing Number"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeAccountNumber}
            value={accountNumber}
            placeholder="Account Number"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeAddressLine1}
            value={addressLine1}
            placeholder="Address Line 1"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeAddressLine2}
            value={addressLine2}
            placeholder="Address Line 2"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeAddressLine3}
            value={addressLine3}
            placeholder="Address Line 3"
          />

          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              createWireBeneficiary(
                new DapiWireBeneficiary(
                  new DapiLineAddress(addressLine1, addressLine2, addressLine3),
                  name,
                  firstName,
                  lastName,
                  nickname,
                  city,
                  state,
                  country,
                  zipCode,
                  receiverType,
                  receiverAccountType,
                  routingNumber,
                  accountNumber,
                ),
              );
            }}>
            <Text style={styles.buttonText}>{'Confirm'}</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateWireBeneficiary;
