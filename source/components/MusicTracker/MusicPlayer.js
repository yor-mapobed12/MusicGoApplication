import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import StarRating from './StarRating';
import MusicListHeader from './MusicListHeader';
import PlayerCurrentLocation from './PlayerCurrentLocation';

import {Light, Dark} from '../Theme/Colors';
import NewBottomTab from '../NewBottomTab/NewBottomTab';

const MusicPlayer = ({navigation, route}) => {
  const {id, rating, songUrl, location} = route.params;

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const playTrack = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add({
      id: '1',
      url: songUrl,
      title: 'Track Title',
      artist: 'Track Artist',
    });
    await TrackPlayer.play();
  };

  return (
    <View style={{backgroundColor: isDarkMode ? Dark.bg : Light.bg, flex: 1}}>
      <MusicListHeader />
      <View>
        <Text style={styles.songID}>Song: {id}</Text>
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            {backgroundColor: isDarkMode ? Dark.textColor : Light.textColor},
          ]}
          onPress={playTrack}>
          <Text style={styles.ButtonText}>Play Music</Text>
        </TouchableOpacity>
        <StarRating rating={rating} />
      </View>
      <View style={{flex: 1}}>
        <PlayerCurrentLocation location={location} />
      </View>

      <View style={{bottom: 0}}>
        <NewBottomTab navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: '#800080',
    width: '90%',
    height: '15%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: '8%',
  },
  songID: {
    color: '#800080',
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: '5%',
    marginLeft: '5%',
  },
});

export default MusicPlayer;
