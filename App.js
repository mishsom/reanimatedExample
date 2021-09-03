/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {Button, SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {useAnimation} from './src/customHook';


import ProgressBar from './src/components/progressBar';
import { Value } from "react-native-reanimated";

const App: () => Node = () => {
  const [play, setPlay, progress] = useAnimation();
  const myValue = new Value(1);
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.sectionContainer}>
        <ProgressBar count={1} progress={myValue} />
        <Button
          title={play ? 'pause' : 'play'}
          onPress={() => {
            setPlay(x => !x);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    padding: 24,
    flex: 1,
    backgroundColor: '#000',
  },
});

export default App;
