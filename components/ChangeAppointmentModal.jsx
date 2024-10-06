import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Alert, Platform, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { updateAppointment } from '../config/firebaseFunctions';

const ChangeAppointmentModal = ({ changeAppointmentModal, setChangeAppointmentModal, appointmentId, id }) => {
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle Date change
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || appointmentDate;
    setShowDatePicker(false);
    setAppointmentDate(currentDate);
  };

  // Handle Time change
  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || appointmentDate;
    setShowTimePicker(false);
    const selectedHour = moment(currentTime).hours();
    // Ensure time is between 9 AM and 5 PM
    if (selectedHour >= 9 && selectedHour <= 17) {
      setTimeSlot(moment(currentTime).format('h:mm A'));
    } else {
      Alert.alert('Please select a time between 9 AM and 5 PM.');
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!appointmentDate || !timeSlot) {
      Alert.alert('Please fill out all required fields.');
      setLoading(false);
      return;
    }
    try {
      const success = await updateAppointment(id, { appointmentDate, timeSlot });
      if (success) {
        console.log('Appointment updated successfully!');
        Alert.alert('Success', 'Appointment Updated successfully');
        setChangeAppointmentModal(false); 
      } else {
        console.log('Failed to update appointment');
      }
    } catch (error) {
      console.log('Error while updating appointment...', error);
      Alert.alert('Error', 'Failed to update appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={changeAppointmentModal}
      onRequestClose={() => setChangeAppointmentModal(false)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.heading}>Change Appointment</Text>

          <View style={styles.content}>
            <Text style={styles.label}>Date of Appointment</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.button}>
              <Text style={styles.buttonText}>{moment(appointmentDate).format('MMMM Do YYYY')}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={appointmentDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                onChange={handleDateChange}
                minimumDate={new Date()}
              />
            )}
          </View>

          <View style={styles.content}>
            <Text style={styles.label}>Time Slot</Text>
            <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.button}>
              <Text style={styles.buttonText}>{timeSlot || 'Select Time Slot'}</Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={appointmentDate}
                mode="time"
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                onChange={handleTimeChange}
              />
            )}
          </View>

          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            {loading ? (
              <ActivityIndicator size={'large'} color={'whitesmoke'} />
            ) : (
              <Text style={[styles.buttonText, { color: 'white' }]}>Submit</Text>
            )}
          </TouchableOpacity>

          {/* Close Modal Button */}
          <TouchableOpacity onPress={() => setChangeAppointmentModal(false)} style={styles.closeButton}>
            <Text style={[styles.buttonText, { color: 'red' }]}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'lightgrey',
    height: '80%',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  content: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666666',
    paddingVertical: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 15,
    paddingVertical: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#333',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#0703CD',
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 10,
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default ChangeAppointmentModal;