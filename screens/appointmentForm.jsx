import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { uploadAppointment } from '../config/firebaseFunctions';
import {useNavigation} from '@react-navigation/native';

const AppointmentForm = ({route}) => {
  const { fetchAppointments } = route.params;
  const [patientName, setPatientName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [reason, setReason] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

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

  // Form submission handler with validation
  const handleSubmit = async () => {
    setLoading(true);
    if (!patientName || !contactNo || !appointmentDate || !timeSlot || !reason) {
      Alert.alert('Please fill out all required fields.');
      setLoading(false);
      return;
    }
    try {
      const success = await uploadAppointment({
        patientName,
        contactNo,
        appointmentDate,
        timeSlot,
        reason,
      });
      if (success) {
        console.log('Appointment added successfully!');
        fetchAppointments()
        navigation.navigate('thankyou');
      } else {
        console.log('Failed to add appointment');
      }
    } catch (error) {
      console.log('Error while uploading appointment...', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Book Your Appointment</Text>
      <View style={{paddingHorizontal: 10, paddingVertical: 20}}>
        <View style={styles.content}>
          <Text style={styles.label}>Patient Name</Text>
          <TextInput
            value={patientName}
            onChangeText={setPatientName}
            style={styles.input}
            placeholder="Enter Patient Name"
            placeholderTextColor="#aaa"
            keyboardType="default"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.label}>Contact No</Text>
          <TextInput
            value={contactNo}
            onChangeText={setContactNo}
            style={styles.input}
            placeholder="e.g. +92317541224"
            placeholderTextColor="#aaa"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.label}>Date of Appointment</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(!showDatePicker)}
            style={styles.button}>
            <Text style={styles.buttonText}>
              {moment(appointmentDate).format('MMMM Do YYYY')}
            </Text>
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
          <Text style={[styles.label, {paddingTop: 10}]}>Time Slot</Text>
          <TouchableOpacity
            onPress={() => setShowTimePicker(!showTimePicker)}
            style={[styles.button, {marginBottom: 10}]}>
            <Text style={styles.buttonText}>
              {timeSlot || 'Select Time Slot'}
            </Text>
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
        <View style={styles.content}>
          <Text style={styles.label}>Reason For Appointment</Text>
          <TextInput
            value={reason}
            onChangeText={setReason}
            style={styles.input}
            placeholder="e.g health tips"
            placeholderTextColor="#aaa"
            keyboardType="default"
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
        style={[
          //   styles.button,
          {
            backgroundColor: '#0703CD',
            marginHorizontal: 10,
            borderRadius: 15,
            paddingVertical: 15,
          },
        ]}>
        {loading ? (
          <ActivityIndicator size={'large'} color={'whitesmoke'} />
        ) : (
          <Text style={[styles.buttonText, {color: 'whitesmoke'}]}>Submit</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    letterSpacing: 1,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 1,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 15,
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
    color: '#333',
  },
  button: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 15,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#333',
    textAlign: 'center',
    letterSpacing: 1,
  },
});

export default AppointmentForm;
