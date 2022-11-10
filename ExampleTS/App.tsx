import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/home';
import ApiSelection from './screens/api_selection';
import {RootStackParamList} from './screens/common/RootStackParam';
import {
  DapiConnection,
} from 'connect-react-native';
import Data from './screens/data/data';
import Payment from './screens/payment/payment';
import Metadata from './screens/metadata/metadata';
import Wire from './screens/wire/wire';
import Accounts from './screens/data/accounts';
import Identity from './screens/data/identity';
import Cards from './screens/data/cards';
import Transactions from './screens/data/transactions';
import Beneficiaries from './screens/payment/beneficiaries';
import WireBeneficiaries from './screens/wire/wire_beneficiaries';
import CreateBeneficiary from './screens/payment/create_beneficiary';
import CreateWireBeneficiary from './screens/wire/create_wire_beneficiary';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ApiSelection" component={ApiSelection} />
        <Stack.Screen name="Data" component={Data} />
        <Stack.Screen name="Metadata" component={Metadata} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Wire" component={Wire} />
        <Stack.Screen name="Identity" component={Identity} />
        <Stack.Screen name="Accounts" component={Accounts} />
        <Stack.Screen name="Cards" component={Cards} />
        <Stack.Screen name="AccountTransactions">
          {() => <Transactions isAccountTransactions={true} />}
        </Stack.Screen>
        <Stack.Screen name="CardTransactions">
          {() => <Transactions isAccountTransactions={false} />}
        </Stack.Screen>
        <Stack.Screen name="Beneficiaries" component={Beneficiaries} />
        <Stack.Screen name="WireBeneficiaries" component={WireBeneficiaries} />
        <Stack.Screen name="CreateBeneficiary" component={CreateBeneficiary} />
        <Stack.Screen
          name="CreateWireBeneficiary"
          component={CreateWireBeneficiary}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

class Common {
  connection: DapiConnection | undefined;
}

export const common = new Common();

export default App;
