import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getAllAppointments} from '../../config/firebaseFunctions';
import Plus from '../../components/CustomButton/Plus';
import AppointmentsLayout from '../../components/AppointmentsLayout';

const UserHome = () => {
  const navigation = useNavigation();
  const [appointmentList, setAppointmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);
  const fetchAppointments = async () => {
    const appointments = await getAllAppointments();
    setAppointmentList(appointments);
    setLoading(false);
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0703CD"
          style={{alignItems: 'center', justifyContent: 'center', flex: 1}}
        />
      ) : (
        <FlatList
          refreshing={refreshing}
          onRefresh={fetchAppointments}
          data={appointmentList}
          keyExtractor={item => item.id}
          renderItem={({item}) => <AppointmentsLayout item={item} />}
          contentContainerStyle={styles.appointmentList}
          ListEmptyComponent={() => (
            <View style={styles.noAppointmentsContainer}>
              <Text style={styles.noAppointmentsText}>
                No Appointments Exist...
              </Text>
              <Image
                source={require('../../assets/images/notfound.png')}
                style={styles.noAppointmentsImage}
              />
            </View>
          )}
        />
      )}
      <Plus
        onPress={() => navigation.navigate('appointment', {fetchAppointments})}
      />
    </View>
  );
};

export default UserHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    paddingTop: 20,
  },
  appointmentList: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  noAppointmentsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAppointmentsText: {
    color: 'black',
    fontSize: 18,
    marginBottom: 10,
  },
  noAppointmentsImage: {
    width: 120,
    height: 120,
  },
});
