import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    borderRadius:8,
    borderWidth:1,
    borderColor:'green',
    padding:8,
    backgroundColor:'white'
  },
};

export default Card ;
