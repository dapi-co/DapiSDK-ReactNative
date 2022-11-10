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
import SafeAreaView from 'react-native-safe-area-view';
import {connection} from '../../App';
import styles from '../common/styles';
import Snackbar from 'react-native-snackbar';

const CreateBeneficiary = () => {
  const [response, setResponse] = useState(null);
  const [accountNumber, onChangeAccountNumber] = useState('');
  const [iban, onChangeIban] = useState('');
  const [name, onChangeName] = useState('');
  const [bankName, onChangeBankName] = useState('');
  const [swiftCode, onChangeSwiftCode] = useState('');
  const [country, onChangeCountry] = useState('');
  const [branchAddress, onChangeBranchAddress] = useState('');
  const [branchName, onChangeBranchName] = useState('');
  const [phoneNumber, onChangePhoneNumber] = useState('');
  const [nickname, onChangeNickname] = useState('');
  const [addressLine1, onChangeAddressLine1] = useState('');
  const [addressLine2, onChangeAddressLine2] = useState('');
  const [addressLine3, onChangeAddressLine3] = useState('');

  async function createBeneficiary(beneficiary) {
    await connection
      ?.createBeneficiary(beneficiary)
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
            onChangeText={onChangeAccountNumber}
            value={accountNumber}
            placeholder="Account Number"
            placeholderTextColor="#000000"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeIban}
            value={iban}
            placeholder="IBAN"
            placeholderTextColor="#000000"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeName}
            value={name}
            placeholder="Name"
            placeholderTextColor="#000000"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeBankName}
            value={bankName}
            placeholder="Bank Name"
            placeholderTextColor="#000000"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeSwiftCode}
            value={swiftCode}
            placeholder="Swift Code"
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
            onChangeText={onChangeBranchAddress}
            value={branchAddress}
            placeholder="Branch Address"
            placeholderTextColor="#000000"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeBranchName}
            value={branchName}
            placeholder="Branch Name"
            placeholderTextColor="#000000"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangePhoneNumber}
            value={phoneNumber}
            placeholder="Phone Number"
            placeholderTextColor="#000000"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeNickname}
            value={nickname}
            placeholder="Nickname"
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
              var beneficiary = {
                linesAddress: {
                  line1: addressLine1,
                  line2: addressLine2,
                  line3: addressLine3,
                },
                accountNumber: accountNumber,
                bankName: bankName,
                swiftCode: swiftCode,
                iban: iban,
                country: country,
                branchAddress: branchAddress,
                branchName: branchName,
                phoneNumber: phoneNumber,
                name: name,
                nickname: nickname,
              };
              createBeneficiary(beneficiary);
            }}>
            <Text style={styles.buttonText}>{'Confirm'}</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateBeneficiary;
