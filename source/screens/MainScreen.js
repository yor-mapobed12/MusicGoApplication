import {View, Text, Platform} from 'react-native';
import React from 'react';
import Map from '../components/MainScreen/Map';
import NewBottomTab from '../components/NewBottomTab/NewBottomTab';

const MainScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <Map />
      <View style={{bottom: 0}}>
        <NewBottomTab navigation={navigation}/>
      </View>
    </View>
  );
};

export default MainScreen;
