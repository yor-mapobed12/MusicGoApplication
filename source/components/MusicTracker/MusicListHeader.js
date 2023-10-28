import {View, Text, StyleSheet, useColorScheme} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Light, Dark} from '../Theme/Colors';

const MusicListHeader = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <View style={{backgroundColor: isDarkMode ? Dark.bg : Light.bg}}>
      <View style={styles.IconContainer}>
        <FontAwesome5
          name="map-pin"
          size={60}
          color={isDarkMode ? Dark.textColor : Light.textColor}
        />
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.locationText,
              {color: isDarkMode ? Dark.textColor : Light.textColor},
            ]}>
            UQ Lake
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  IconContainer: {
    marginTop: '8%',
    marginLeft: '20%',
    flexDirection: 'row',
  },
  locationText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  textContainer: {
    justifyContent: 'center',
    marginLeft: '20%',
  },
});

export default MusicListHeader;
