import firestore from '@react-native-firebase/firestore';

// Function to fetch all appointments
export const getAllAppointments = async () => {
  try {
    // Reference to the "appointments" collection
    const appointmentsCollection = firestore().collection('appointments');
    
    // Fetch all documents in the collection
    const snapshot = await appointmentsCollection.get();
    
    const appointments = [];
    snapshot.forEach(doc => {
      appointments.push({ id: doc.id, ...doc.data() });
    });
    
    return appointments;
  } catch (error) {
    console.log('Error fetching appointments:', error);
    return [];
  }
};

//function to upload the appointment

export const uploadAppointment = async ({ patientName, contactNo, appointmentDate, timeSlot, reason }) => {
  try {
    const docID = Date.now().toString(); // Create a unique document ID
    await firestore().collection('appointments').doc(docID).set({
      patientName,
      contactNo,
      appointmentDate: firestore.Timestamp.fromDate(new Date(appointmentDate)),
      timeSlot,
      reason,
      status : "pending"
    });
    return true;
  } catch (error) {
    console.log('Error uploading Appointment to Firestore:', error);
    return false;
  }
};


// Function to update an appointment
export const updateAppointment = async (id, { appointmentDate, timeSlot }) => {
  try {
    const appointmentsCollection = firestore().collection('appointments');
    
    await appointmentsCollection.doc(id).update({
      appointmentDate: firestore.Timestamp.fromDate(new Date(appointmentDate)),
      timeSlot,
    });
    
    return true;
  } catch (error) {
    console.log('Error updating appointment:', error);
    return false;
  }
};



//function to upload the rating

export const uploadrating = async ({ rating}) => {
  try {
    const docID = Date.now().toString(); // Create a unique document ID
    await firestore().collection('ratings').doc(docID).set({
      rating : rating,
    });
    return true;
  } catch (error) {
    console.log('Error uploading ratings to Firestore:', error);
    return false;
  }
};


// Function to update an appointment status which is done by the admin
export const updateAppointmentStatus = async (id, { status }) => {
  try {
    const appointmentsCollection = firestore().collection('appointments');  
    await appointmentsCollection.doc(id).update({
      status : status
    });
    return true;
  } catch (error) {
    console.log('Error updating appointment:', error);
    return false;
  }
};

// Function to get the total ratings as well as average ratings
export const getAllRatings = async () => {
  try {
    // Reference to the "ratings" collection
    const ratingsCollection = firestore().collection('ratings');
    
    // Fetch all documents in the collection
    const snapshot = await ratingsCollection.get();
    
    const ratings = [];
    snapshot.forEach(doc => {
      ratings.push({ id: doc.id, ...doc.data() });
    });
    
    return ratings;
  } catch (error) {
    console.log('Error fetching ratings:', error);
    return [];
  }
};