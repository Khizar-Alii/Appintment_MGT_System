import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {updateAppointmentStatus} from '../config/firebaseFunctions';

const AdminChangeStatusModal = ({
  changeStatusModal,
  setChangeStatusModal,
  id,
}) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('Approve'); 

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const success = await updateAppointmentStatus(id, {status});
      if (success) {
        console.log('Appointment status updated successfully!');
        Alert.alert('Success', 'Appointment status Updated successfully');
        setChangeStatusModal(false);
      } else {
        console.log('Failed to update appointment status');
      }
    } catch (error) {
      console.log('Error while updating appointment status...', error);
      Alert.alert(
        'Error',
        'Failed to update appointment status. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={changeStatusModal}
      onRequestClose={() => setChangeStatusModal(false)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.heading}>Change Appointment Status</Text>

          <View style={styles.content}>
            <Text style={styles.label}>Select Status</Text>
            {/* Picker for selecting status */}
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={status}
                onValueChange={(itemValue) => setStatus(itemValue)}
                style={styles.picker}>
                <Picker.Item label="Approve" value="Approve" />
                <Picker.Item label="Cancel" value="Cancel" />
              </Picker>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            {loading ? (
              <ActivityIndicator size={'large'} color={'whitesmoke'} />
            ) : (
              <Text style={[styles.buttonText, {color: 'white'}]}>Submit</Text>
            )}
          </TouchableOpacity>

          {/* Close Modal Button */}
          <TouchableOpacity
            onPress={() => setChangeStatusModal(false)}
            style={styles.closeButton}>
            <Text style={[styles.buttonText, {color: 'red'}]}>Close</Text>
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
  pickerWrapper: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 15,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
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

export default AdminChangeStatusModal;