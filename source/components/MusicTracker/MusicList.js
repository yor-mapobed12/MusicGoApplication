import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import StarRating from './StarRating';
import {useNavigation} from '@react-navigation/native';
import {MusicData} from '../../assets/Data/Data';
import {Light, Dark} from '../Theme/Colors';

import AsyncStorage from '@react-native-async-storage/async-storage';

const MusicList = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [filteredMusicData, setFilteredMusicData] = useState([]);

  const handleSongPress = (id, rating, songUrl) => {
    navigation.navigate('MusicPlayer', {id, rating, songUrl});
  };

  const GetData = async () => {
    try {
      const storedSongIDs = await AsyncStorage.getItem('songIds');
      const songIDs = storedSongIDs ? JSON.parse(storedSongIDs) : [];

      const filteredData = MusicData.filter(item =>
        songIDs.includes(item.songID),
      );
      setFilteredMusicData(filteredData);
    } catch (error) {
      console.error('Error while getting song IDs:', error);
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() => handleSongPress(item.songID, item.rating, item.song)}>
      <View style={styles.itemContainer}>
        <Text style={{marginLeft: '5%'}}>Song: {index + 1}</Text>
        <Text style={{marginLeft: '5%'}}>Date: {item.date}</Text>
        <StarRating rating={item.rating} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        backgroundColor: isDarkMode ? Dark.bg : Light.bg,
        flex: 1,
      }}>
      <FlatList
        data={filteredMusicData}
        renderItem={renderItem}
        keyExtractor={item => item.songID}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginTop: '3%',
    borderBottomWidth: 0.8, // Add a border at the bottom
    borderStyle: 'dashed',
    paddingBottom: 10, // Add some padding to separate the content from the line
    borderColor: '#000',
    width: '90%',
    alignSelf: 'center',
  },
});

export default MusicList;
