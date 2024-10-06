import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getAllAppointments} from '../../config/firebaseFunctions';
import AdminAppointmentsLayout from '../../components/AdminAppointmentsLayout';
import RatingModal from '../../components/ratingModal';

const AdminHome = () => {
  const navigation = useNavigation();
  const [appointmentList, setAppointmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [ratingModal, setRatingModal] = useState(false);

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
      <TouchableOpacity
        style={styles.ratingBtn}
        onPress={() => setRatingModal(true)}>
        <Text style={styles.ratingText}>View Appointment Form Rating</Text>
      </TouchableOpacity>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0703CD"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              backgroundColor: 'white',
            }}
          />
        ) : (
          <FlatList
            refreshing={refreshing}
            onRefresh={fetchAppointments}
            data={appointmentList}
            keyExtractor={item => item.id}
            renderItem={({item}) => <AdminAppointmentsLayout item={item} />}
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
        <RatingModal
          ratingModal={ratingModal}
          setRatingModal={setRatingModal}
        />
    </View>
  );
};

export default AdminHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    // paddingTop: 20,
  },
  ratingBtn: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'lightgrey',
    marginHorizontal: 30,
    borderRadius: 14,
    marginBottom: 10,
  },
  ratingText: {
    color: '#333',
    textAlign: 'center',
    fontWeight: '400',
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
