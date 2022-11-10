import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.white,
  },
  button: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  title: {
    color: Colors.black,
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  connect: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 'auto',
  },
  connectText: {
    color: '#fff',
    textAlign: 'center',
  },
  connection: {
    flexDirection: 'row',
    textAlign: 'left',
    fontSize: 15,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  connectionText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginStart: 48,
  },
  image: {
    marginStart: 8,
    width: 24,
    height: 24,
  },
  dataRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#68a0cf',
    marginHorizontal: 24,
  },
  column: {
    flexDirection: 'column',
    marginTop: 16,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default styles;
