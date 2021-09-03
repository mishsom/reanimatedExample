import React from 'react';
import {View, StyleSheet, Platform, Dimensions} from 'react-native';
import Animated, { Extrapolate } from "react-native-reanimated";

export const PLATFORM = {
  IOS: 'ios',
  ANDROID: 'android',
};

export const getDeviceDimension = () => {
  if (Platform.OS === PLATFORM.IOS) {
    return {
      fullWidth: Dimensions.get('screen').width,
      fullHeight: Dimensions.get('screen').height,
    };
  }
  return {
    fullWidth: Dimensions.get('window').width,
    fullHeight: Dimensions.get('window').height,
  };
};

const {fullWidth} = getDeviceDimension();
const ProgressBar = props => {
  const width = Animated.interpolateNode(props.progress, {
    inputRange: [0, 1],
    outputRange: [0, (fullWidth - 24) / props.count - 8],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <View style={styles.emptyTab(props.count)}>
      <Animated.View
        style={{
          width: width,
          height: 4,
          backgroundColor: 'rgba(255,255,255,1)',
          position: 'absolute',
          borderRadius: 2,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 8,
    flexDirection: 'row',
  },
  emptyTab: count => ({
    width: (fullWidth - 24) / count - 8,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginRight: 8,
  }),
});

export default ProgressBar;
