import PushNotification from 'react-native-push-notification';

// Configure PushNotification
PushNotification.configure({
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
  },
});

// Function to schedule a notification
const scheduleNotification = (appointmentDate, timeSlot) => {
  const appointmentTime = new Date(appointmentDate);
  const [hour, minute] = timeSlot.split(':');

  // Set the time for the notification
  appointmentTime.setHours(hour, minute);

  // Schedule the notification
  PushNotification.localNotificationSchedule({
    id: 'appointment-notification', // unique id
    message: `You have an appointment at ${timeSlot}`, // Notification message
    date: appointmentTime, // The time to notify
  });
};
