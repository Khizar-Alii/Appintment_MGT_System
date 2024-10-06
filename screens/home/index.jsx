import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Home = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        gap: 20,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        style={styles.butn}
        onPress={() => navigation.navigate('user')}>
        <Text style={styles.txt}>User</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.butn}
        onPress={() => navigation.navigate('admin')}>
        <Text style={styles.txt}>Admin</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  butn: {
    backgroundColor: 'lightgrey',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    width: '50%',
    alignItems: 'center',
  },
  txt: {
    color: '#333',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 1,
  },
});
