import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { SessionTypes } from "@/types/types";

type SessionData = {
  [key in SessionTypes]: number;
};

interface TimerState {
  /** used to specify the active session type; utilized in the SessionButton to apply
   * styles that indicate which session is currently active  */
  activeSession: SessionTypes;
  /** allows tracking the count of short breaks and, consequently the number of completed
   * working sessions */
  shortBreakCount: number;
  /** stores the current reading of the timer */
  timerData: { minutes: number; seconds: number };
  /** current length settings for each session type */
  sessionData: SessionData;
  /** used for storing the id of the currently running setInterval; utilized for pausing and resuming
   * the currently running timer */
  intervalID: string;
  /** used within TimerControls to switch the button text between start/pause */
  isCountDownOn: boolean;
  customSequence: boolean;
  setTimerData: () => void;
  setCurrentIntervalID: (id: NodeJS.Timeout) => void;
  setIsCountDownOn: (val: boolean) => void;
  /** used within the RefreshButton to reset the current reading of the timer */
  clearTimer: () => void;
  /* used to change the session type within the SessionButton*/
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
        const minutesForActiveSession = state.sessionData[state.activeSession];
        return {
          timerData: { minutes: minutesForActiveSession, seconds: 0 },
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
