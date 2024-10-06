import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import AdminChangeStatusModal from './AdminChangeStatusModal';

const AdminAppointmentsLayout = ({item}) => {

  const [changeStatusModal, setChangeStatusModal] = useState(false);

  // Function to format Firebase Timestamp to a readable date string
  const formatDate = timestamp => {
    if (timestamp && timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
    return 'Invalid Date';
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Text style={styles.label}>Patient Name:</Text>
        <Text style={styles.value}>{item.patientName}</Text>

        <Text style={styles.label}>Appointment Date:</Text>
        <Text style={styles.value}>{formatDate(item.appointmentDate)}</Text>

        <Text style={styles.label}>Appointment Time:</Text>
        <Text style={styles.value}>{item.timeSlot}</Text>

        <Text style={styles.label}>Reason:</Text>
        <Text style={styles.value}>{item.reason}</Text>
        {/* Status */}
        <Text style={styles.label}>Status:</Text>
        <Text
          style={
            item?.status == 'pending' ? styles.penStatus : styles.appStatus
          }>
          {item?.status}
        </Text>
      </View>

      {/* open change appointment modal if clicks*/}
      <TouchableOpacity
        style={styles.appointmentDateStyles}
        onPress={() => setChangeStatusModal(true)}>
        <Image
          source={require('../assets/images/change.png')}
          style={{width: 20, height: 20}}
          resizeMode="contain"
        />
        <Text style={{color: '#333'}}>Update Appointment Status</Text>
      </TouchableOpacity>
      <AdminChangeStatusModal
        changeStatusModal={changeStatusModal}
        setChangeStatusModal={setChangeStatusModal}
        id={item?.id}
      />
    </View>
  );
};

export default AdminAppointmentsLayout;

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  card: {
    width: '90%',
    maxWidth: 400,
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  appointmentDateStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    backgroundColor: 'lightgrey',
    marginVertical: 15,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  penStatus: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
  },
  appStatus: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
  },
});
