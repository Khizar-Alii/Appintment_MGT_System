import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const Plus = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
      <Image
        source={require('../../assets/images/add.png')}
        style={styles.img}
      />
    </TouchableOpacity>
  );
};

export default Plus;

const styles = StyleSheet.create({
  btnContainer: {
    position: 'absolute',
    right: 20,
    bottom: 50,
    backgroundColor: '#3A5FD6',
    borderRadius: 99,
    zIndex: 999,
  },
  img: {
    width: 40,
    height: 40,
  },
});
