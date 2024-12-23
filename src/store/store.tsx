import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { SessionTypes } from "@/types/types";

type SessionData = {
  [key in SessionTypes]: number;
};

interface TimerState {
  activeSession: SessionTypes;
  shortBreakCount: number;
  timerData: { minutes: number; seconds: number };
  sessionData: SessionData;
  intervalID: string;
  isCountDownOn: boolean;
  customSequence: boolean;
  setTimerData: () => void;
  setCurrentIntervalID: (id: NodeJS.Timeout) => void;
  setIsCountDownOn: (val: boolean) => void;
  clearTimer: () => void;
  setSessionType: (id: SessionTypes) => void;
}

export const useTimerStore = create<TimerState>()(
  immer((set) => ({
    activeSession: SessionTypes.Pomodoro,
    shortBreakCount: 0,
    timerData: {
      minutes: 25,
      seconds: 0,
    },
    sessionData: { pomodoro: 25, shortBreak: 5, longBreak: 15 },
    intervalID: "",
    isCountDownOn: false,
    customSequence: false,

    setTimerData: () =>
      set((state) => {
        const { minutes, seconds } = state.timerData;

        if (seconds === 0) {
          if (minutes === 0) {
            const updatedShortBreakCount =
              state.activeSession === SessionTypes.ShortBreak
                ? state.shortBreakCount + 1
                : state.shortBreakCount;

            const nextSession =
              state.activeSession === SessionTypes.Pomodoro
                ? SessionTypes.ShortBreak
                : state.activeSession !== SessionTypes.LongBreak &&
                  state.shortBreakCount !== 0 &&
                  updatedShortBreakCount % 4 === 0
                ? SessionTypes.LongBreak
                : SessionTypes.Pomodoro;

            const nextSessionMinutes = state.sessionData[nextSession];

            return {
              activeSession: nextSession,
              shortBreakCount: updatedShortBreakCount,
              timerData: {
                minutes: nextSessionMinutes,
                seconds: 0,
              },
            };
          }
          return {
            timerData: { minutes: minutes - 1, seconds: 59 },
          };
        }

        return { timerData: { minutes, seconds: seconds - 1 } };
      }),
    setCurrentIntervalID: (id) => set(() => ({ intervalID: id })),
    setIsCountDownOn: (val) => set(() => ({ isCountDownOn: val })),
    clearTimer: () =>
      set((state) => {
        clearTimeout(state.intervalID);
        return {
          timerData: { minutes: 25, seconds: 0 },
          isCountDownOn: false,
          intervalID: "",
        };
      }),
    setSessionType: (id) =>
      set((state) => {
        if (id === state.activeSession) {
          return state;
        }
        clearTimeout(state.intervalID);
        return {
          activeSession: id,
          timerData: { minutes: state.sessionData[id], seconds: 0 },
          intervalID: "",
          isCountDownOn: false,
        };
      }),
  }))
);
