import React from 'react';
import {Text, Dimensions, Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

const NewBottomTab = ({navigation}) => {
  return (
    <LinearGradient
      style={{
        padding: 10,
        width: Dimensions.get('screen').width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#5A3180', '#8C4BE9', '#2B39DA']}>
      <Pressable
        style={{
          padding: 10,
        }}
        onPress={() => {
          navigation.navigate('MainScreen');
        }}>
        <MaterialCommunityIcons name="map-outline" size={28} color={'white'} />
      </Pressable>
      <Pressable>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontSize: 16,
            lineHeight: 28,
          }}>
          SongTrax {`\n`}
          There's Music Nearby
        </Text>
      </Pressable>

      <Pressable
        style={{
          padding: 10,
        }}
        onPress={() => {
          navigation.navigate('ProfileScreen');
        }}>
        <Feather name="user" size={28} color={'white'} />
      </Pressable>
    </LinearGradient>
  );
};

export default NewBottomTab;
