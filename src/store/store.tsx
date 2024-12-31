import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { SessionTypes, SessionData, DialogNavItem } from "@/types/types";

interface TimerState {
  /** used to specify the active session type; utilized in the SessionButton to apply
   * styles that indicate which session is currently active  */
  activeSession: SessionTypes;
  /** utilized for displaying number of completed working sessions  */
  workingSessionsCount: number;
  /** stores the current reading of the timer */
  timerData: { minutes: number; seconds: number };
  /** current length settings for each session type */
  sessionData: SessionData;
  /** used for storing the id of the currently running setInterval; utilized for pausing and resuming
   * the currently running timer */
  intervalID: string;
  /** used within TimerControls to switch the button text between start/pause */
  isCountDownOn: boolean;
  currentDialogNavItem: DialogNavItem;
  customSequence: boolean;
  setTimerData: () => void;
  setCurrentIntervalID: (id: NodeJS.Timeout) => void;
  setIsCountDownOn: (val: boolean) => void;
  /** used within the RefreshButton to reset the current reading of the timer */
  clearTimer: () => void;
  /* used to change the session type within the SessionButton*/
  setSessionType: (id: SessionTypes) => void;
  setCurrentDialogNavItem: (id: "general" | "timers") => void;
}

export const useTimerStore = create<TimerState>()(
  immer((set) => ({
    activeSession: SessionTypes.Pomodoro,
    workingSessionsCount: 0,
    timerData: {
      minutes: 25,
      seconds: 0,
    },
    sessionData: { pomodoro: 25, shortBreak: 5, longBreak: 15 },
    intervalID: "",
    isCountDownOn: false,
    currentDialogNavItem: "timers",
    customSequence: false,

    setTimerData: () =>
      set((state) => {
        const { minutes, seconds } = state.timerData;

        if (seconds === 0) {
          if (minutes === 0) {
            const updatedWorkingSessionCount =
              state.activeSession === SessionTypes.Pomodoro
                ? state.workingSessionsCount + 1
                : state.workingSessionsCount;

            const nextSession =
              state.activeSession === SessionTypes.Pomodoro
                ? SessionTypes.ShortBreak
                : state.activeSession !== SessionTypes.LongBreak &&
                  state.workingSessionsCount !== 0 &&
                  updatedWorkingSessionCount % 4 === 0
                ? SessionTypes.LongBreak
                : SessionTypes.Pomodoro;

            const nextSessionMinutes = state.sessionData[nextSession];

            return {
              activeSession: nextSession,
              workingSessionsCount: updatedWorkingSessionCount,
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
    setCurrentDialogNavItem: (id) => set(() => ({ currentDialogNavItem: id })),
  }))
);
