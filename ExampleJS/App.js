import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';

import Dapi, {DapiConnection} from 'connect-react-native';

import {Header, Colors} from 'react-native/Libraries/NewAppScreen';

import {Picker} from '@react-native-picker/picker';

const {DapiConnectManager} = NativeModules;
const dapiConnectManagerEmitter = new NativeEventEmitter(DapiConnectManager);

var selectedConnection = null;

function addTransferListeners() {
  dapiConnectManagerEmitter.addListener('EventDapiTransferUIDismissed', _ => {
    console.log('Transfer UI is dismissed');
  });

  dapiConnectManagerEmitter.addListener(
    'EventDapiUIWillTransfer',
    uiWillTransferResult => console.log(uiWillTransferResult),
  );
}

async function startDapi() {
  let configs = {
    environment: 'sandbox',
    isExperimental: true,
    countries: ['US', 'AE'],
    postSuccessfulConnectionLoadingText: 'Verifying..',
    endPointExtraBody: {
      key1: "value1",
      key2: "value2",
    },
    endPointExtraHeaderFields: {
      key1: "value1",
      key2: "value2",
    },
  };

  await Dapi.instance
    .start(
      'ce15a3407b6561da87bd847e27b2f530a6a84279d29d686b3daf60ca2f570cae',
      'JohnDoe',
      configs,
    )
    .then(result => {
      console.log('=====\nStarted:');
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    });
}

async function getConfigurations() {
  var configurations = await Dapi.instance.configurations();
  console.log(configurations);
}

async function getIdentity() {
  var response = await selectedConnection.getIdentity();
  console.log(response.identity);
}

async function getAccounts() {
  let response = await selectedConnection.getAccounts();
  console.log(response.accounts);
}

async function getCards() {
  var response = await selectedConnection.getCards();
  console.log(response.cards);
}

async function getCachedCards() {
  var cards = await selectedConnection.cards;
  console.log(cards);
}

async function getMetadata() {
  var response = await selectedConnection.getAccountsMetadata();
  console.log(response.accountsMetadata);
}

async function transfer() {
  //Define the beneficiary to send the money to.
  var beneficiary = {
    linesAddress: {
      line1: 'baniyas road',
      line2: 'dubai',
      line3: 'united arab emirates',
    },
    accountNumber: '1647518280840289401662',
    bankName: 'STANDARD CHARTERED BANK',
    swiftCode: 'SCBLAEAD',
    iban: 'DAPIBANKAEHSBC1647518280840289401662',
    country: 'AE',
    branchAddress: 'Dubai Mall',
    branchName: 'Dubai Mall',
    phoneNumber: '+971585859206',
    name: 'Mohammed Ennabah SC',
    nickname: 'MEnnabah',
  };
  await selectedConnection
    .createTransfer(null, beneficiary, 0, 'test')
    .then(response => {
      console.log('response', response);
    })
    .catch(error => {
      let json = JSON.parse(error.message);
      let errorMessage = json.error;
      let opID = json.operationID;
      console.log(opID);
      console.log(json);
      if (errorMessage.includes('Beneficiary will be activated')) {
        console.log('This is a coolDownPeriod error');
      }
    });
}

async function transferToExistingBeneficiary() {
  var beneficiariesResponse = await selectedConnection.getBeneficiaries();
  await selectedConnection
    .createTransferToExistingBeneficiary(
      connections[0].accounts[0],
      beneficiariesResponse.beneficiaries[0].id,
      1.43,
    )
    .then(response => console.log(response))
    .catch(error => {
      let json = JSON.parse(error.message);
      let errorMessage = json.error;
      console.log(json);
      if (errorMessage.includes('Beneficiary will be activated')) {
        console.log('This is a coolDownPeriod error');
      }
    });
}

async function getBeneficiaries() {
  await selectedConnection
    .getBeneficiaries()
    .then(response => console.log(response))
    .catch(error => {
      console.log(error);
    });
}

async function createBeneficiary() {
  await selectedConnection
    .createBeneficiary(beneficiary)
    .then(response => console.log(response))
    .catch(error => {
      console.log(error);
    });
}

async function wireTransfer() {
  var wireAddress = {
    line1: '2400 bruce street UCA stadium park bld 6',
    line2: '',
    line3: '',
  };

  var wireBeneficiary = {
    linesAddress: wireAddress,
    name: 'TestAccount',
    firstName: 'Omar',
    lastName: 'Agoor',
    nickname: 'OmarChase',
    city: 'Conway',
    state: 'Arkansas',
    country: 'US',
    zipCode: '72305',
    receiverType: 'retail',
    receiverAccountType: 'checking',
    routingNumber: '953349354',
    accountNumber: '1234567654321',
  };

  await selectedConnection
    .createWireTransfer(wireBeneficiary, null, 0, 'test')
    .then(response => {
      console.log('response', response);
    })
    .catch(error => {
      let json = JSON.parse(error.message);
      let errorMessage = json.error;
      console.log(json);
      if (errorMessage.includes('Beneficiary will be activated')) {
        console.log('This is a coolDownPeriod error');
      }
    });
}

async function wireTransferToExistingBeneficiary() {
  var beneficiariesResponse = await selectedConnection.getWireBeneficiaries();
  await connections[0]
    .createWireTransferToExistingBeneficiary(
      connections[0].accounts[0],
      beneficiariesResponse.beneficiaries[0].id,
      99.0,
    )
    .then(transfer => console.log(transfer))
    .catch(error => {
      let json = JSON.parse(error.message);
      let errorMessage = json.error;
      console.log(json);
      if (errorMessage.includes('Beneficiary will be activated')) {
        console.log('This is a coolDownPeriod error');
      }
    });
}

async function getWireBeneficiaries() {
  await selectedConnection
    .getWireBeneficiaries()
    .then(response => console.log(response))
    .catch(error => {
      console.log(error);
    });
}

async function createWireBeneficiary() {
  let wireAddress = {
    line1: '2400 bruce street UCA stadium park bld 6',
    line2: '',
    line3: '',
  };

  let wireBeneficiary = {
    linesAddress: wireAddress,
    name: 'TestAccount',
    firstName: 'Omar',
    lastName: 'Agoor',
    nickname: 'OmarChase',
    city: 'Conway',
    state: 'Arkansas',
    country: 'US',
    zipCode: '72305',
    receiverType: 'retail',
    receiverAccountType: 'checking',
    routingNumber: '953349354',
    accountNumber: '1234567654321',
  };

  await selectedConnection
    .createWireBeneficiary(wireBeneficiary)
    .then(response => console.log(response))
    .catch(error => {
      console.log(error);
    });
}

async function isStarted() {
  var isStarted = await Dapi.instance.isStarted();
  console.log(isStarted);
}

async function clientUserID() {
  var clientUserID = await Dapi.instance.clientUserID();
  console.log(clientUserID);
}

async function getParameters() {
  params = await selectedConnection.getParameters();
  const jsonParams = JSON.parse(params);
  var prettyParams = JSON.stringify(jsonParams, null, 2);
  console.log('connection params:\n', prettyParams);
}

async function create() {
  if (params == null) {
    console.log('params field is null');
    return;
  }
  DapiConnection.create(params)
    .then(async newConnection => {
      console.log('=====\nCreated:');
      console.log(newConnection);
      console.log('=====');
    })
    .catch(err => {
      console.log('=====\nError:');
      console.log(err);
      console.log('=====');
    });
}

async function deleteConnections() {
  var connections = await Dapi.instance.getConnections();
  connections.forEach(c => {
    c.delete();
  });
}

async function getTransactionsForAccount() {
  var response = await selectedConnection.getTransactionsForAccount(
    selectedConnection.accounts[0],
    new Date(1621235963109),
    new Date(1623865763109),
  );
  console.log(response);
}

async function getTransactionsForCard() {
  var cardsResponse = await selectedConnection.cards;
  var transactions = await selectedConnection.getTransactionsForCard(
    cardsResponse.cards[0],
    new Date(1621235963109),
    new Date(1623865763109),
  );
  console.log(transactions[0].amount);
}

let params = `{
   "halfLogoPng": "https://cdn-dapi.azureedge.net/banks-horizontal-logo/Emirates%20NBD.png",
   "userID": "4wE5O2iwOygS+nQAiFPp9bbWVk2XpaYAebU8JfAFjQrgsuPx9Dr1vsBY6g2Hxrx9ZkLI5APD1TB1KZKZzSa64A==",
   "accessCode": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBLZXkiOiI3OTQ5MjMzZGQ5ZmU3YWJhNTU4YWYwZWJhZDdlNjc4MjlhNjY0NGM4N2E1NjkzNjg4YzFlZmZjNTVkYjNjMWUzIiwiZXhwIjoxNjI0MTc5NjYxLCJpYXQiOjE2MjQxNzkzNjEsImp0aSI6IjEzNDVlNTM4LTIzYzEtNGUxOS1hMjhkLWJlYzk2MzhkM2M1NyIsIm90cCI6Ii9WZUZsOFdCRzRCdmM5S0VyL0twZEF6RUsvZVd3Q2xyK2hIUEVmQWR4MUE9IiwidXVpZCI6ImVjOTQ0ODg1LTY0MDUtNGMyZi1iMWYzLTQ2ZGEzNTMxMDUxZiJ9.6k3-1BWap9nU8MMI2uJU05k4UXjMu-Lm5CBnJ2AH5kg",
   "tokenID": "1345e538-23c1-4e19-a28d-bec9638d3c57",
   "connectionID": "7d7f9892-6fef-4d70-9464-f2abe88f723c",
   "clientUserID": "JohnDoe",
   "fullLogoPng": "https://cdn-dapi.azureedge.net/banks-full-logo/Emirates%20NBD.png",
   "miniLogoPng": "https://cdn-dapi.azureedge.net/banks-mini-logo/Emirates%20NBD.png",
   "color": {
     "primaryColor": "#0A0F4E",
     "secondaryColor": "#FFC227"
   },
   "fullName": "ENBD",
   "userSecret": "iXiU+PnGGG/QyE/YnTW9TGFErluH89FZWeJXQy5jXTyt7anloq7OhcvbIy7IyT0mmDM4Q9sVoyLz2iDWbZmtVBZZA4tD8b1Oet44dsbX9kd1Y4f9QOtndPgT4LvIpYZVi4DXHUaxl5Z+3k1DZprxJVlWnrBgDblk1QKRIrryTwGWKkMsRBzjS9TTMT78Nj3t1S2163K0VbGN8OknoSIsJOjCvIt/IXgjchtZVAYyb54D7bZKzIU37o8/8ytdsqlJIIVerWeFT0atTusqTrZTKw4NfyEfn+ughfGRYnhZCZ15UwPkFFc9lBsMgmONxm0OHIgZFhUDseNmv1FBafERdXzLnD5nDSnVozVK6d24ovcb5aNHVQMgjbeaO+yUpAK8q3krs8HJhBvhMvTifGGvHZVDSOx1UVqgkmW4RqWHarNbTQH7tBpxa+KZE0C3+/2ke6qqaCUYO/T3Y3HPSmMzOvZS1HIBTkqk+Z0lkAeGhI3Uizvu1tItdnHmxvrCe7o6mHX+vPbHZpVQQJbP32vIyv0yMuzd9PmP5K3c4FCbqaeP2O+r2C3IT4y9J/0UD2ByMyDcKYfZxaUnDqebeHkp1v+pH9ALFpkliHmoLmepTP0fIHB18J20PrDUoJZ1r6oPdZ+IWegsBE5bfsFtV6BKvmApC4Zz6U6RLc9h9RAeKz8=",
   "bankId": "DAPIBANK_AE_ENBD",
   "name": "ENBD"
 }`;

const App: () => React$Node = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [presentConnections, setConnections] = useState([]);

  const start = async () => {
    await startDapi()
      .then(result => {
        console.log('startDapi', result);
      })
      .catch(error => console.error(error));

    await Dapi.instance.getConnections().then(result => {
      setConnections(result);
    });

    addConnectListeners();
    addTransferListeners();
  };

  const renderPresentConnections = () => {
    return presentConnections.map(presentConnection => {
      return (
        <Picker.Item
          key={presentConnection.userID}
          label={presentConnection.bankShortName}
          value={presentConnection.userID}
        />
      );
    });
  };

  useEffect(() => {
    start();
  }, []);

  async function addConnectListeners() {
    dapiConnectManagerEmitter.addListener(
      'EventConnectSuccessful',
      async successConnectResult => {
        console.log('EventConnectSuccessful', successConnectResult);
        await Dapi.instance.getConnections().then(result => {
          console.log('getConnections', result);
          setConnections(result);
        });
      },
    );
    dapiConnectManagerEmitter.addListener(
      'EventConnectFailure',
      failureConnectResult => console.log(failureConnectResult),
    );
    dapiConnectManagerEmitter.addListener('EventConnectDismissed', _ => {
      console.log('Connect is dismissed');
    });

    dapiConnectManagerEmitter.addListener(
      'EventConnectBankRequest',
      bankRequestResult => console.log(bankRequestResult),
    );
  }

  function presentConnect() {
    Dapi.instance.presentConnect();
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <Header />
        {global.HermesInternal == null ? null : (
          <View style={styles.engine}>
            <Text style={styles.footer}>Engine: Hermes</Text>
          </View>
        )}
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedValue(itemValue);
                presentConnections.filter(connection => {
                  if (connection.userID === itemValue) {
                    selectedConnection = connection;
                  }
                });
              }}>
              {renderPresentConnections()}
            </Picker>
            <Text style={styles.sectionTitle}>Dapi</Text>
            <Button
              title="Is started"
              onPress={() => {
                isStarted();
              }}
            />
            <Button title="Client User ID" onPress={() => clientUserID()} />
            <Button title="Get Configs" onPress={() => getConfigurations()} />
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Connect</Text>
            <Button title="Present Connect" onPress={() => presentConnect()} />
            <Button
              title="Connection Parameters"
              onPress={() => getParameters()}
            />
            <Button title="Create Connection" onPress={() => create()} />
            <Button
              title="Delete Connections"
              onPress={() => deleteConnections()}
            />
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Data</Text>
            <Button title="Identity" onPress={() => getIdentity()} />
            <Button title="Accounts" onPress={() => getAccounts()} />
            <Button title="Get Cards" onPress={() => getCards()} />
            <Button title="Get Cached Cards" onPress={() => getCachedCards()} />
            <Button
              title="Get Transactions For Account"
              onPress={() => getTransactionsForAccount()}
            />
            <Button
              title="Get Transactions For Card"
              onPress={() => getTransactionsForCard()}
            />
            <Button
              title="Create Beneficiary"
              onPress={() => createBeneficiary()}
            />
            <Button title="Beneficiaries" onPress={() => getBeneficiaries()} />
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Metadata</Text>
            <Button title="Accounts Metadata" onPress={() => getMetadata()} />
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Payment</Text>
            <Button
              title="Get Beneficiaries"
              onPress={() => getBeneficiaries()}
            />
            <Button title="Create Transfer" onPress={() => transfer()} />
            <Button
              title="Create Transfer To Existing Beneficiary"
              onPress={() => transferToExistingBeneficiary()}
            />
            <Button
              title="Create Beneficiary"
              onPress={() => createBeneficiary()}
            />
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Wire</Text>
            <Button
              title="Get Wire Beneficiaries"
              onPress={() => getWireBeneficiaries()}
            />
            <Button
              title="Create Wire Transfer"
              onPress={() => wireTransfer()}
            />
            <Button
              title="Create Wire Transfer To Existing Beneficiary"
              onPress={() => wireTransferToExistingBeneficiary()}
            />
            <Button
              title="Create Wire Beneficiary"
              onPress={() => createWireBeneficiary()}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
