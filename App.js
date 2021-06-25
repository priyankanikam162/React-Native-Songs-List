/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';

import {SafeAreaView, StyleSheet, Text, FlatList, View} from 'react-native';

import SongListItem from './src/components/SongListItem';

import {getSongsList} from './src/api/middleware/APIService';
import EmptyListMessage from './src/components/EmptyListMessage';
import SongDetailScreen from './src/components/SongDetailView';

const App = () => {
  const [songsList, setSongs] = useState([]);
  const [isShowHome, setShowHome] = useState(true);
  const [selectedSong, setSelectedSong] = useState('');
  const [isError, setError] = useState(false);

  const handleItemClick = songDetails => {
    setSelectedSong(songDetails);
    setShowHome(!isShowHome);
  };

  const handleBackClick = () => {
    setShowHome(true);
  };

  const renderItem = ({item}) => (
    <SongListItem musicItem={item} onItemClicked={handleItemClick} />
  );

  const renderSeparator = () => <View style={styles.separator} />;

  useEffect(() => {
    getSongsList().then(data => {
      setSongs(data.results);
   }).catch(error => {
     setError(true);
   });
  
  }, []);

  if (isError) {
    return (
      <SafeAreaView style={styles.backgroundStyle}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}> Songs By Michael Jackson</Text>
        </View>
        <EmptyListMessage />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}> Songs By Michael Jackson</Text>
      </View>
      <View style={styles.listView}>
        {!isShowHome ? (
          <SongDetailScreen
            selectedSong={selectedSong}
            onBack={handleBackClick}
          />
        ) : (
          <FlatList
            data={songsList}
            renderItem={renderItem}
            keyExtractor={item => `${item.collectionId}${item.trackId}`}
            ListEmptyComponent={EmptyListMessage}
            ItemSeparatorComponent={renderSeparator}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    backgroundColor: '#E8E8E8',
  },
  titleView: {
    flex: 0.05,
  },
  titleText: {
    alignSelf: 'center',
    fontSize: 20,
  },
  listView: {
    flex: 0.93,
  },
  title: {
    fontSize: 32,
  },
  separator: {
    height: 0.5,
  },
});

export default App;
