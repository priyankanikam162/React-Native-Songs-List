import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {EMPTY_LIST_MESSAGE} from '../constants/Constants';

const EmptyListMessage = () => {
  return <Text style={styles.emptyListStyle}>{EMPTY_LIST_MESSAGE}</Text>;
};

const styles = StyleSheet.create({
  emptyListStyle: {
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default EmptyListMessage;
