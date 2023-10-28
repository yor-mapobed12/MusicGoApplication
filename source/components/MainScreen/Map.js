import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  useColorScheme,
  ActivityIndicator,
  Text,
  Alert,
} from 'react-native';
import MapView, {Circle} from 'react-native-maps';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import {DarkMapStyle} from './DarkMapStyle';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from 'react-native-alert-notification';
import {useNavigation} from '@react-navigation/native';

import {MusicData} from '../../assets/Data/Data';
import StarRating from '../MusicTracker/StarRating';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {getDistance} from 'geolib';

const LATITUDE_DELTA = 0.0022;
const LONGITUDE_DELTA = 0.0221;

const Map = () => {
  const navigation = useNavigation();
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const [loading, setLoading] = useState(true);

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const normalMapStyle = [];

  const PermissionError = async () => {
    const dialogResult = await Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: 'Alert',
      textBody: 'Please Accept the location permission',
      button: 'ok',
    });
  };

  // const locationGettingError = () => {
  //   Dialog.show({
  //     type: ALERT_TYPE.DANGER,
  //     title: 'Alert',
  //     textBody: 'Failed to get location',
  //     button: 'close',
  //     autoClose: 2000,
  //   });
  // };

  const requestLocationPermission = async () => {
    try {
      const permissionResult = await check(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );

      if (permissionResult === RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            setRegion({
              latitude,
              longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            });
            setLoading(false);
          },
          error => {
            console.error(error);
            setLoading(false);
          },
          {enableHighAccuracy: true, timeout: 30000, maximumAge: 10000},
        );
      } else {
        const requestResult = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );

        if (requestResult === RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              const {latitude, longitude} = position.coords;
              setRegion({
                latitude,
                longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              });
              setLoading(false);
            },
            error => {
              console.error(error);
              setLoading(false);
            },
            {enableHighAccuracy: true, timeout: 30000, maximumAge: 10000},
          );
        } else {
          setLoading(false);
          PermissionError();
        }
      }
    } catch (err) {
      console.warn(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    requestLocationPermission();

    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;

        MusicData?.forEach(async musicItem => {
          const markerLocation = {
            latitude: parseFloat(musicItem.latitude),
            longitude: parseFloat(musicItem.longitude),
          };

          const distanceToCircleCenter = getDistance(
            {latitude, longitude},
            markerLocation,
          );

          if (distanceToCircleCenter <= 200) {
            Alert.alert(
              `Entered the location ${musicItem?.location} and found a music`,
              'Save the song and move to next screen',
              [
                {
                  text: 'Cancel',
                  onPress: () => {},
                  style: 'cancel',
                },
                {
                  text: 'Save and Play',
                  onPress: async () => {
                    navigation.navigate('MusicPlayer', {
                      id: musicItem?.id,
                      rating: musicItem?.rating,
                      songUrl: musicItem?.songUrl,
                      location: musicItem?.location,
                    }),
                      await addItemToArray('songIds', songID);
                  },
                },
              ],
              {cancelable: false},
            );
          } else {
          }
        });

        setRegion({
          latitude,
          longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });
      },
      error => {
        console.error(error);
      },
      {enableHighAccuracy: true, timeout: 30000, maximumAge: 10000},
    );

    return () => {
      // Stop watching the user's location when the component unmounts
      Geolocation.clearWatch(watchId);
    };
  }, []);

  async function addItemToArray(key, item) {
    try {
      const existingData = await AsyncStorage.getItem(key);
      let currentArray = [];

      if (existingData) {
        currentArray = JSON.parse(existingData);
      }

      currentArray.push(item);

      await AsyncStorage.setItem(key, JSON.stringify(currentArray));
    } catch (error) {
      console.error('Error adding item to array in AsyncStorage: ', error);
    }
  }

  return (
    <AlertNotificationRoot>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={isDarkMode ? '#000' : '#fff'}
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        <View style={styles.mapContainer}>
          {loading ? ( // Show the Activity Indicator while loading is true
            <ActivityIndicator
              size="large"
              color="#800080"
              style={styles.loadingIndicator}
            />
          ) : (
            <MapView
              style={styles.map}
              region={region}
              showsUserLocation={true}
              customMapStyle={isDarkMode ? DarkMapStyle : normalMapStyle}>
              {MusicData?.map((musicItem, index) => {
                const markerLocation = {
                  latitude: parseFloat(musicItem.latitude),
                  longitude: parseFloat(musicItem.longitude),
                };

                return (
                  <View key={index}>
                    <Circle
                      center={markerLocation}
                      radius={200}
                      fillColor={
                        isDarkMode == 'dark'
                          ? 'rgba(128,0,128,0.5)'
                          : 'rgba(210,169,210,0.5)'
                      }
                      strokeColor="#A42DE8"
                      strokeWidth={3}>
                      <View style={styles.circleContainer}>
                        <Text style={{textAlign: 'center'}}>
                          {musicItem.date}
                        </Text>
                        <StarRating rating={musicItem.rating} />
                      </View>
                    </Circle>
                  </View>
                );
              })}
            </MapView>
          )}
        </View>
      </View>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  customMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customMarker: {
    width: 40, // Customize the width of the marker
    height: 40, // Customize the height of the marker
  },
});

export default Map;
