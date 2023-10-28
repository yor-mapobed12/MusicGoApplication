import React from 'react';
import {View} from 'react-native';
import {Rating} from '@rneui/themed';
import {Text} from 'react-native';

const StarRating = ({rating}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: '5%',
      }}>
      <Text>
        <Rating imageSize={20} readonly startingValue={rating} />
      </Text>
    </View>
  );
};

export default StarRating;
