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

const DATA = [
  {
    wrapperType: 'track',
    kind: 'song',
    artistId: 370992175,
    collectionId: 370992174,
    trackId: 370992217,
    artistName: 'Paul Mooney',
    collectionName: 'Race (Live)',
    trackName: 'Michael Jackson',
    collectionCensoredName: 'Race (Live)',
    trackCensoredName: 'Michael Jackson (Live)',
    artistViewUrl:
      'https://music.apple.com/us/artist/paul-mooney/370992175?uo=4',
    collectionViewUrl:
      'https://music.apple.com/us/album/michael-jackson-live/370992174?i=370992217&uo=4',
    trackViewUrl:
      'https://music.apple.com/us/album/michael-jackson-live/370992174?i=370992217&uo=4',
    previewUrl:
      'https://audio-ssl.itunes.apple.com/itunes-assets/Music/b6/08/0a/mzm.hfcmbacu.aac.p.m4a',
    artworkUrl30:
      'https://is2-ssl.mzstatic.com/image/thumb/Music/v4/d3/a4/a7/d3a4a745-5e5a-f943-0545-3d345964c7e5/source/30x30bb.jpg',
    artworkUrl60:
      'https://is2-ssl.mzstatic.com/image/thumb/Music/v4/d3/a4/a7/d3a4a745-5e5a-f943-0545-3d345964c7e5/source/60x60bb.jpg',
    artworkUrl100:
      'https://is2-ssl.mzstatic.com/image/thumb/Music/v4/d3/a4/a7/d3a4a745-5e5a-f943-0545-3d345964c7e5/source/100x100bb.jpg',
    collectionPrice: 9.99,
    trackPrice: 1.29,
    releaseDate: '1993-01-23T12:00:00Z',
    collectionExplicitness: 'explicit',
    trackExplicitness: 'explicit',
    discCount: 1,
    discNumber: 1,
    trackCount: 33,
    trackNumber: 19,
    trackTimeMillis: 70050,
    country: 'USA',
    currency: 'USD',
    primaryGenreName: 'Comedy',
    contentAdvisoryRating: 'Explicit',
    isStreamable: true,
  },
  {
    wrapperType: 'track',
    kind: 'song',
    artistId: 32940,
    collectionId: 159292399,
    trackId: 159294478,
    artistName: 'Michael Jackson',
    collectionName: 'The Essential Michael Jackson',
    trackName: 'Man In the Mirror',
    collectionCensoredName: 'The Essential Michael Jackson',
    trackCensoredName: 'Man In the Mirror',
    artistViewUrl:
      'https://music.apple.com/us/artist/michael-jackson/32940?uo=4',
    collectionViewUrl:
      'https://music.apple.com/us/album/man-in-the-mirror/159292399?i=159294478&uo=4',
    trackViewUrl:
      'https://music.apple.com/us/album/man-in-the-mirror/159292399?i=159294478&uo=4',
    previewUrl:
      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/3b/3c/a0/3b3ca094-a480-18e9-e2c8-ee3b6a5731af/mzaf_8588557206542350398.plus.aac.p.m4a',
    artworkUrl30:
      'https://is4-ssl.mzstatic.com/image/thumb/Music125/v4/9b/fe/1f/9bfe1f2d-c51e-0427-1075-21aac1f3b874/source/30x30bb.jpg',
    artworkUrl60:
      'https://is4-ssl.mzstatic.com/image/thumb/Music125/v4/9b/fe/1f/9bfe1f2d-c51e-0427-1075-21aac1f3b874/source/60x60bb.jpg',
    artworkUrl100:
      'https://is4-ssl.mzstatic.com/image/thumb/Music125/v4/9b/fe/1f/9bfe1f2d-c51e-0427-1075-21aac1f3b874/source/100x100bb.jpg',
    collectionPrice: 16.99,
    trackPrice: 1.29,
    releaseDate: '1987-08-31T07:00:00Z',
    collectionExplicitness: 'notExplicit',
    trackExplicitness: 'notExplicit',
    discCount: 2,
    discNumber: 2,
    trackCount: 17,
    trackNumber: 5,
    trackTimeMillis: 320905,
    country: 'USA',
    currency: 'USD',
    primaryGenreName: 'Pop',
    isStreamable: true,
  },
];

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
