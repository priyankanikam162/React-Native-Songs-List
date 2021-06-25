import React from 'react';

import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

const SongListItem = ({musicItem, onItemClicked}) => {
  return (
    <TouchableOpacity onPress={() => onItemClicked(musicItem)}>
      <View style={styles.container}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: musicItem.artworkUrl60,
          }}
        />
        <View style={styles.column}>
          <Text style={styles.title}>{musicItem.artistName}</Text>
          <Text style={styles.title}>{musicItem.trackName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 16,
  },
  tinyLogo: {
    flex: 0.3,
    width: 60,
    height: 60,
  },
  column: {
    flex: 0.7,
    flexDirection: 'column',
    marginHorizontal: 8,
    justifyContent: 'center',
  },
});

export default SongListItem;
