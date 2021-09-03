import {useState, useRef} from 'react';
import {
  and,
  block,
  Clock,
  clockRunning,
  cond,
  EasingNode,
  eq,
  not,
  proc,
  set,
  startClock,
  stopClock,
  timing,
  useCode,
  Value,
} from 'react-native-reanimated';

const runTiming = proc((clock, clockValue, isPlaying) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    frameTime: new Value(0),
    time: new Value(0),
  };
  const config = {
    toValue: new Value(1),
    duration: 5000,
    easing: EasingNode.inOut(EasingNode.linear),
  };
  return block([
    cond(not(isPlaying), [set(state.time, 0)], timing(clock, state, config)),
    cond(eq(state.finished, 1), [
      set(state.finished, 0),
      set(state.frameTime, 0),
      set(state.time, 0),
      set(config.toValue, not(state.position)),
    ]),
    state.position,
  ]);
});

export const useAnimation = () => {
  const [play, setPlay] = useState(true);
  const clock = useRef(new Clock()).current;
  const progress = useRef(new Value(0)).current;
  const isPlaying = useRef(new Value(0)).current;
  const clockValue = useRef(new Value(0)).current;
  useCode(() => [set(isPlaying, play ? 1 : 0)], [play]);
  useCode(
    () => [
      cond(and(isPlaying, not(clockRunning(clock))), [startClock(clock)]),
      cond(and(not(isPlaying), clockRunning(clock)), [stopClock(clock)]),
      set(progress, runTiming(clock, clockValue, isPlaying)),
    ],
    [],
  );
  return [play, setPlay, progress];
};
