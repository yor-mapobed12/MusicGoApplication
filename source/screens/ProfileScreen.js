import {View, Text} from 'react-native';
import React from 'react';
import ProfileImageUpload from '../components/Profile/ProfileImageUpload';
import ProfileTitle from '../components/Profile/ProfileTitle';
import NewBottomTab from '../components/NewBottomTab/NewBottomTab';

const ProfileScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <ProfileTitle />
      <ProfileImageUpload navigation={navigation} />
    </View>
  );
};

export default ProfileScreen;
