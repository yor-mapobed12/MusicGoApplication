import {View, Text} from 'react-native';
import React from 'react';
import MusicListHeader from '../components/MusicTracker/MusicListHeader';
import MusicList from '../components/MusicTracker/MusicList';
import NewBottomTab from '../components/NewBottomTab/NewBottomTab';

const MusicTrackerScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <MusicListHeader />
      <MusicList />
      <View style={{bottom: 0}}>
        <NewBottomTab navigation={navigation}/>
      </View>
    </View>
  );
};

export default MusicTrackerScreen;
