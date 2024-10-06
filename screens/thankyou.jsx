import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {uploadrating} from '../config/firebaseFunctions';
import { useNavigation } from '@react-navigation/native';

const ThankYou = () => {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const ratingCompleted = rating => {
    setRating(rating);
    console.log('Rating is: ' + rating);
  };

  const handlePress = async () => {
    setLoading(true);
    if (rating == 0 || rating == null) {
      Alert.alert('Please rate the Appointment form');
      setLoading(false);
      return;
    }
    try {
      const success = await uploadrating({
        rating: rating,
      });
      if (success) {
        navigation.navigate("user")
        console.log('Rating added successfully!');
        Alert.alert('Success', 'Rating Added successfully');
        // navigation.navigate('thankyou');
      } else {
        console.log('Failed to add Rating');
      }
    } catch (error) {
      console.log('Error while uploading Rating...', error);
      Alert.alert('Error', 'Failed to add Rating. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Thank You for Form Submission</Text>
      <Text style={styles.subHeading}>Rate our Appointment form</Text>
      <Rating
        type="star"
        ratingCount={5}
        imageSize={30}
        showRating
        onFinishRating={ratingCompleted}
      />
      <TouchableOpacity style={styles.btn} onPress={handlePress}>
        {loading ? (
          <ActivityIndicator size={'large'} color={'blue'} />
        ) : (
          <Text style={styles.btnText}>Submit</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ThankYou;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
    letterSpacing: 1,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 16,
    color: 'black',
    letterSpacing: 1,
    textAlign: 'center',
  },
  btn: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: 'lightgrey',
    marginVertical: 25,
    borderRadius: 15,
  },
  btnText: {
    fontSize: 14,
    color: 'black',
    letterSpacing: 2,
    fontWeight: '600',
  },
});
