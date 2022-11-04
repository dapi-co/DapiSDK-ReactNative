import {
  DapiBeneficiary,
  DapiLineAddress,
  IBeneficiary,
  IDapiResult,
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
import SafeAreaView from 'react-native-safe-area-view';
import {common} from '../../App';
import styles from '../common/styles';
import Snackbar from 'react-native-snackbar';

const CreateBeneficiary = () => {
  const [response, setResponse] = useState<IDapiResult | null>(null);
  const [accountNumber, onChangeAccountNumber] = useState<string>('');
  const [iban, onChangeIban] = useState<string>('');
  const [name, onChangeName] = useState<string>('');
  const [bankName, onChangeBankName] = useState<string>('');
  const [swiftCode, onChangeSwiftCode] = useState<string>('');
  const [country, onChangeCountry] = useState<string>('');
  const [branchAddress, onChangeBranchAddress] = useState<string>('');
  const [branchName, onChangeBranchName] = useState<string>('');
  const [phoneNumber, onChangePhoneNumber] = useState<string>('');
  const [nickname, onChangeNickname] = useState<string>('');
  const [addressLine1, onChangeAddressLine1] = useState<string>('');
  const [addressLine2, onChangeAddressLine2] = useState<string>('');
  const [addressLine3, onChangeAddressLine3] = useState<string>('');

  async function createBeneficiary(beneficiary: IBeneficiary) {
    await common.connection
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
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeIban}
            value={iban}
            placeholder="IBAN"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeName}
            value={name}
            placeholder="Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeBankName}
            value={bankName}
            placeholder="Bank Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeSwiftCode}
            value={swiftCode}
            placeholder="Swift Code"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeCountry}
            value={country}
            placeholder="Country"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeBranchAddress}
            value={branchAddress}
            placeholder="Branch Address"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeBranchName}
            value={branchName}
            placeholder="Branch Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangePhoneNumber}
            value={phoneNumber}
            placeholder="Phone Number"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeNickname}
            value={nickname}
            placeholder="Nickname"
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
              createBeneficiary(
                new DapiBeneficiary(
                  new DapiLineAddress(addressLine1, addressLine2, addressLine3),
                  accountNumber,
                  name,
                  bankName,
                  swiftCode,
                  iban,
                  phoneNumber,
                  country,
                  branchAddress,
                  branchName,
                  nickname,
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

export default CreateBeneficiary;
