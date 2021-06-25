import React from 'react';

import {
  Button,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';

const SongDetailView = ({selectedSong, onBack}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.imageView}
        source={{
          uri: selectedSong.artworkUrl100,
        }}
      />
      <View style={styles.detailView}>
        {selectedSong.artistName && (
          <Text style={styles.title}>
            Artist Name : {selectedSong.artistName}
          </Text>
        )}
        {selectedSong.collectionName && (
          <Text style={styles.title}>
            Collection Name : {selectedSong.collectionName}
          </Text>
        )}
        {selectedSong.trackName && (
          <Text style={styles.title}>
            Track Name : {selectedSong.trackName}
          </Text>
        )}
        {selectedSong.collectionCensoredName && (
          <Text style={styles.title}>
            Collection Censored Name : {selectedSong.collectionCensoredName}
          </Text>
        )}
      </View>
      <TouchableOpacity onPress={() => onBack()}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Back To List</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageView: {
    flex: 0.3,
    width: 300,
  },
  detailView: {
    flex: 0.6,
    marginTop: 16,
    marginHorizontal: 16,
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  title: {
    marginVertical: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SongDetailView;
