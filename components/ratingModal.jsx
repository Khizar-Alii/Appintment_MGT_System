import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {getAllRatings} from '../config/firebaseFunctions'; // Assuming your Firebase function is here

const RatingModal = ({ratingModal, setRatingModal}) => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);
  console.log("new rating modal : " , ratings);
  

  // Fetch ratings when modal is opened
  useEffect(() => {
    if (ratingModal) {
      fetchRatings();
    }
  }, [ratingModal]);

  const fetchRatings = async () => {
    try {
      const allRatings = await getAllRatings();
      setRatings(allRatings);

      // Calculate the average rating
      if (allRatings.length > 0) {
        const totalRating = allRatings.reduce((acc, rating) => acc + rating.rating, 0);
        setAverageRating(totalRating / allRatings.length);
      } else {
        setAverageRating(0); // In case there are no ratings
      }
    } catch (error) {
      console.log('Error fetching ratings:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={ratingModal}
      onRequestClose={() => setRatingModal(false)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {loading ? (
            <ActivityIndicator size="large" color="blue" />
          ) : (
            <>
              <Text style={styles.heading}>Total Ratings: {ratings.length}</Text>
              <Text style={styles.subHeading}>
                Average Rating: {averageRating.toFixed(1)} / 5
              </Text>

              {/* Close Button */}
              <TouchableOpacity
                onPress={() => setRatingModal(false)}
                style={styles.closeButton}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'whitesmoke',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color : '#333'
  },
  subHeading: {
    fontSize: 18,
    marginBottom: 25,
    textAlign: 'center',
    color : '#000'
  },
  closeButton: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RatingModal;