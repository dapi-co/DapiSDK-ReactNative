/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';

const {DapiConnectManager} = NativeModules;
const dapiConnectManagerEmitter = new NativeEventEmitter(DapiConnectManager);

import Dapi, {
  DapiConfigurations,
  DapiConnection,
  DapiEnvironment,
  IDapiConnection,
  IBankBeneficiary,
  IBankWireBeneficiary,
  DapiLineAddress,
  DapiBeneficiary,
  DapiWireBeneficiary,
} from 'connect-react-native';

var selectedConnection: IDapiConnection | null = null;

var firstBeneficiary: IBankBeneficiary | null = null;
var firstWireBeneficiary: IBankWireBeneficiary | null = null;

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
  let countries = ['AE', 'US'];
  let configurations = new DapiConfigurations(
    countries,
    DapiEnvironment.sandbox,
  );
  configurations.postSuccessfulConnectionLoadingText = 'Testtt';
  await Dapi.instance
    .start('ce15a3407b6561da87bd847e27b2f530a6a84279d29d686b3daf60ca2f570cae', 'JohnDoe', configurations)
    .then(error => {
      console.log('Dapi started successfully');
    })
    .catch(error => {
      console.log('Dapi failed to start with error: ', error);
    });
}

async function getIdentity() {
  await selectedConnection
    ?.getIdentity()
    .then(response => {
      console.log('Identity: ', response);
    })
    .catch(error => {
      console.log('Dapi#getIdentity() failed with error: ', error);
    });
}

async function getAccounts() {
  await selectedConnection
    ?.getAccounts()
    .then(response => {
      console.log('Accounts: ', response);
    })
    .catch(error => {
      console.log('Dapi#getAccounts() failed with error: ', error);
    });
}

async function getCards() {
  await selectedConnection
    ?.getCards()
    .then(response => {
      console.log('Cards: ', response);
    })
    .catch(error => {
      console.log('Dapi#getCards() failed with error: ', error);
    });
}

async function getTransactionsForAccount() {
  let transactions = await selectedConnection?.getTransactionsForAccount(
    selectedConnection.accounts[0],
    new Date(1621235963109),
    new Date(1623865763109),
  );
  console.log(transactions);
}

async function getTransactionsForCard() {
  var transactions = await selectedConnection?.getTransactionsForCard(
    selectedConnection.cards[0],
    new Date(1621235963109),
    new Date(1623865763109),
  );
  console.log(transactions);
}

async function getCachedCards() {
  console.log('cachedCards: ', selectedConnection?.cards);
}

async function getAccountsMetadata() {
  await selectedConnection
    ?.getAccountsMetadata()
    .then(response => {
      console.log('Metadata: ', response);
    })
    .catch(error => {
      console.log('Dapi#getAccountsMetadata() failed with error: ', error);
    });
}

async function getBeneficiaries() {
  await selectedConnection
    ?.getBeneficiaries()
    .then(response => {
      console.log('Beneficiaries: ', response);
      firstBeneficiary = response.beneficiaries[0];
    })
    .catch(error => {
      console.log('Dapi#getBeneficiaries() failed with error: ', error);
    });
}

async function transfer() {
  selectedConnection
    ?.createTransfer(null!, beneficiary, 0, 'test')
    .then(response => {
      console.log(`Transfer success ${response}`);
    })
    .catch(error => {
      console.log(`Transfer failed with error ${error}`);
    });
}

async function transferToExistingBeneficiary() {
  await getBeneficiaries();
  await selectedConnection
    ?.createTransferToExistingBeneficiary(
      selectedConnection?.accounts[0]!,
      firstBeneficiary!.id,
      1.43,
      'testRemark',
    )
    .then(response => {
      console.log('CreateTransferToExistingBeneficiary: ', response);
      console.log(`operationID ${response.operationID}`);
    })
    .catch(error => {
      let json = JSON.parse(error.message);
      console.log(json);
      let errorMessage = json.error;
      console.log(`operationID ${json.operationID}`);
      if (errorMessage.includes('Beneficiary will be activated')) {
        console.log('This is a coolDownPeriod error');
      }
    });
}

async function createBeneficiary() {
  await selectedConnection
    ?.createBeneficiary(beneficiary)
    .then(response => console.log(response))
    .catch(error => console.log(error));
}

async function getWireBeneficiaries() {
  await selectedConnection
    ?.getWireBeneficiaries()
    .then(response => {
      console.log('Beneficiaries: ', response);
      firstWireBeneficiary = response.beneficiaries[0];
    })
    .catch(error => {
      console.log('Dapi#getWireBeneficiaries() failed with error: ', error);
    });
}

async function wireTransfer() {
  dapiConnectManagerEmitter.addListener('EventDapiTransferUIDismissed', _ => {
    console.log('Transfer UI is dismissed');
  });

  dapiConnectManagerEmitter.addListener(
    'EventDapiUIWillTransfer',
    uiWillTransferResult => console.log(uiWillTransferResult),
  );

  selectedConnection
    ?.createWireTransfer(wireBeneficiary, null, 0, 'test')
    .then(response => {
      console.log(`Transfer success ${response}`);
    })
    .catch(error => {
      console.log(`Transfer failed with error ${error}`);
    });
}

async function wireTransferToExistingBeneficiary() {
  await getWireBeneficiaries();
  await selectedConnection
    ?.createWireTransferToExistingBeneficiary(
      selectedConnection?.accounts[0]!,
      firstWireBeneficiary!.id,
      1.43,
      'testRemark',
    )
    .then(transfer => {
      console.log('CreateWireTransferToExistingBeneficiary: ', transfer);
      console.log(`operationID ${transfer.operationID}`);
    })
    .catch(error => {
      let json = JSON.parse(error.message);
      console.log(json);
      let errorMessage = json.error;
      console.log(`operationID ${json.operationID}`);
      let account = json.account;
      if (errorMessage.includes('Beneficiary will be activated')) {
        console.log('This is a coolDownPeriod error');
      }
    });
}

async function createWireBeneficiary() {
  await selectedConnection
    ?.createWireBeneficiary(wireBeneficiary)
    .then(beneficiary => console.log(beneficiary))
    .catch(error => console.log(error));
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
  let response = await selectedConnection?.getParameters();
  const jsonParams = JSON.parse(response!);
  var prettyParams = JSON.stringify(jsonParams, null, 2);
  console.log('connection params:\n', prettyParams);
}

async function create() {
  if (params == null) {
    console.log('params field is null');
    return;
  }
  params.forEach(async val => {
    var connection = await DapiConnection.create(val);
    console.log(connection);
  });
}

var params: Array<string> = [
  `
  {
    "accessCode" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBLZXkiOiIzZTY4MmY4ODk0ZDU3Y2MyY2Q3Y2ViYTg0ZTlhMzgwYjY5MmVjMzQxODZjZGE1ZDllMGE1M2Q2Y2Y3ZDNkMDAwIiwiZXhwIjoxNjMxMjYzMjE2LCJpYXQiOjE2MzEyNjI5MTYsImp0aSI6ImQzZmQ0NzQ3LTJlZTQtNDQ3OC1hNTZmLWRmOWU3ODFiMzlkZiIsIm90cCI6InpETko2SmJkdHR1bGVFT1VST3ZMZmhpQXA4MVdMa2hCbHlWMGl1SXQ1TFE9IiwidXVpZCI6IlNDQkxBRUFEOjJmMDkxZWVhLTU0NDAtNDE0MS04ZGMyLWIxNmY4ZDVhODgxZCJ9.hzsEt5HwbWPU8tTlAlQdpuy1eJhfz6juhsR5mncOah4",
    "fullName" : "SC",
    "name" : "SC",
    "userID" : "\/IdGN4wE6BYJYmmERUSwjkpK6GUNxhehjBqY26LNpS5pF4UfCdQCglMM4RglaocygeCzQrtYsX77dLLYEtsekg==",
    "miniLogoPng" : "https:\/\/cdn00storage.blob.core.windows.net\/banks-mini-logo\/Standard%20Chartered%20Bank.png",
    "halfLogoPng" : "https:\/\/cdn00storage.blob.core.windows.net\/banks-full-logo\/Standart%20Chartered.png",
    "color" : {
      "primaryColor" : "#055A87",
      "secondaryColor" : "#369A29"
    },
    "userSecret" : "QxvTxl2Fd55NxG9RQ43AISLtCyrjS8tmPJwavKdIP9ZY7JQ86nUD2zHoTctzOJH1NfLURFaaLWSfuKjDHKOVEkKLuobOtVc9iQlKBMqfBuHwFy3BVu5uSb2iYYg1kIM1otBdQ\/ZUIptAJdMFH3mlhXVXzRmlVNAsaJyDldVfnuZAA1nkILN9m+ir5dPzqrQEFZI3LRrdBDquhsET9m7zhgaX8+GZIOb23IYmT7OOXYbrawRsgm3UTu3AwWRCmExfkjjZdTXqefd0EgC\/dhgjXhLfwL1cZFx6ntxZO6q4RzWpCOiAOp6W08nwcuxw\/oaHKmrB9lJEOP2RmRRcz+SgSeC8xOcgLUd\/hoW4G5PdDUrLt6oQu4cI7VbgmZkAHRUq7hsz9AkLw7aprV2IhN+v6LlS9eFJ4ICYj+v3cX5viUVxBQaf9Q6G4Y0AGImpuXu5AQKPn99VmkEhDnPYb9+ug5p9DQyduV5tGlruYmNziZwqDR6DrTRfcLo1sCHAwGfgAgjcYW1xp1bYus3mlswdzoMYsUSWYS16IHDhnGtUTnBpkuqsbIVNMy9fMztDnQTI1L3gB0mkpr5kl8Lm9W8NB9Q+7KaDFfixJdVQwXiPVUNWTxWQrVa5F6mqElRLBwqiYjCC0KHVPVkvp2mHgGMY0MDo25nFAAzeHR4Mnjb6tBI=",
    "tokenID" : "d3fd4747-2ee4-4478-a56f-df9e781b39df",
    "clientUserID" : "JohnDoe",
    "fullLogoPng" : "https:\/\/cdn00storage.blob.core.windows.net\/banks-full-logo\/Standart%20Chartered.png",
    "bankId" : "SCBLAEAD",
    "connectionID" : "70fa9d9d-3ba9-4d71-836a-fc09205bac17"
  }
  `,
];

let address = new DapiLineAddress('baniyas ', 'dubai', 'united arab emirates');

let beneficiary = new DapiBeneficiary(
  address,
  '1623404370879825504324',
  'Aashik Ahmed Mohamed Meera',
  'Emirates NBD Bank PJSC',
  'EBILAEAD',
  'DAPIBANKAEENBD1623404370879825504324',
  '+971585859206',
  'AE',
  'Baniyas Road Deira PO Box 777 Dubai UAE',
  'Emirates NBD Bank PJSC',
  'Aashik',
);

let wireAddress = new DapiLineAddress(
  '2400 bruce street UCA stadium park bld 6 ',
  '',
  '',
);

let wireBeneficiary = new DapiWireBeneficiary(
  wireAddress,
  'TestAccount',
  'Omar',
  'Agoor',
  'OmarChase',
  'Conway',
  'Arkansas',
  'US',
  '72305',
  'retail',
  'checking',
  '953349354',
  '1234567654321',
);

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [selectedValue, setSelectedValue] = useState('');
  const [presentConnections, setConnections] = useState<IDapiConnection[]>([]);

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
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
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
            <Button
              title="Is started"
              onPress={() => {
                isStarted();
              }}
            />
            <Button title="Client User ID" onPress={() => clientUserID()} />
          </View>
          <View style={styles.sectionContainer}>
            <Button title="Present Connect" onPress={() => presentConnect()} />
            <Button
              title="Connection Parameters"
              onPress={() => getParameters()}
            />
            <Button title="Create Connection" onPress={() => create()} />
          </View>

          <View style={styles.sectionContainer}>
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
          </View>

          <View style={styles.sectionContainer}>
            <Button
              title="Accounts Metadata"
              onPress={() => getAccountsMetadata()}
            />
          </View>

          <View style={styles.sectionContainer}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
