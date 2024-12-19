import { create } from "zustand";

interface TimerState {
  currentTime: { minutes: number; seconds: number };
  intervalID: NodeJS.Timeout | string;
  isCountDownOn: boolean;
  setCurrentTime: () => void;
  setCurrentIntervalID: (id: NodeJS.Timeout) => void;
  setIsCountDownOn: (val: boolean) => void;
  clearTimer: () => void;
}

export const useTimerStore = create<TimerState>()((set) => ({
  currentTime: {
    minutes: 25,
    seconds: 0,
  },
  intervalID: "",
  isCountDownOn: false,

  setCurrentTime: () =>
    set((state) => {
      const { minutes, seconds } = state.currentTime;
      if (seconds === 0) {
        if (minutes === 0) {
          clearTimeout(state.intervalID);
          return { ...state, currentTime: { ...state.currentTime } };
        }
        return { ...state, currentTime: { minutes: minutes - 1, seconds: 59 } };
      }

      return { ...state, currentTime: { minutes, seconds: seconds - 1 } };
    }),
  setCurrentIntervalID: (id) => set((state) => ({ ...state, intervalID: id })),
  setIsCountDownOn: (val) => set((state) => ({ ...state, isCountDownOn: val })),
  clearTimer: () =>
    set((state) => {
      clearTimeout(state.intervalID);
      return {
        ...state,
        currentTime: { minutes: 25, seconds: 0 },
        isCountDownOn: false,
        intervalID: "",
      };
    }),
}));
