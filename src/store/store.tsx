import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { SessionTypes, TimersSettings, DialogNavItem } from "@/types/types";

interface TimerState {
  /** used to specify the active session type; utilized in the SessionButton to apply
   * styles that indicate which session is currently active  */
  activeSession: SessionTypes;
  /** utilized for displaying number of completed working sessions  */
  workingSessionsCount: number;
  /** stores the current reading of the timer */
  timerData: { minutes: number; seconds: number };
  /** user settings - currently limited to timers settings; used for storing the
   * duration of each timer, and for toggling the pomodoro sequence on or off */
  settings: {
    timers: TimersSettings;
  };
  /** used for storing the id of the currently running setInterval; utilized for
   * pausing and resuming the currently running timer */
  intervalID: string;
  /** used within TimerControls to switch the button text between start/pause */
  isCountDownOn: boolean;
  currentDialogNavItem: DialogNavItem;
  isSettingsDialogOpen: boolean;
  setTimerData: () => void;
  setTimersSettings: (data: TimersSettings) => void;
  setCurrentIntervalID: (id: NodeJS.Timeout) => void;
  setIsCountDownOn: (val: boolean) => void;
  /** used within the RefreshButton to reset the current reading of the timer */
  clearTimer: () => void;
  /* used to change the session type within the SessionButton*/
  setSessionType: (id: SessionTypes) => void;
  setCurrentDialogNavItem: (id: "timers") => void;
  setIsSettingsDialogOpen: () => void;
}

export const useTimerStore = create<TimerState>()(
  immer((set) => ({
    activeSession: SessionTypes.Pomodoro,
    workingSessionsCount: 0,
    timerData: {
      minutes: 25,
      seconds: 0,
    },
    settings: {
      timers: {
        inputs: { pomodoro: 25, shortBreak: 5, longBreak: 15 },
        isPomodoroSequenceOn: false,
      },
    },
    intervalID: "",
    isCountDownOn: false,
    currentDialogNavItem: "timers",
    isSettingsDialogOpen: false,
    setTimerData: () =>
      set((state) => {
        const { minutes, seconds } = state.timerData;
        const { isPomodoroSequenceOn } = state.settings.timers;

        if (!isPomodoroSequenceOn) {
          if (seconds === 0) {
            if (minutes === 0) {
              state.clearTimer();
              return {};
            }
            return {
              timerData: { minutes: minutes - 1, seconds: 59 },
            };
          }

          return { timerData: { minutes, seconds: seconds - 1 } };
        }

        if (seconds === 0) {
          if (minutes === 0) {
            const updatedWorkingSessionCount =
              state.activeSession === SessionTypes.Pomodoro
                ? state.workingSessionsCount + 1
                : state.workingSessionsCount;

            const nextSession =
              state.activeSession === SessionTypes.Pomodoro &&
              updatedWorkingSessionCount % 4 !== 0
                ? SessionTypes.ShortBreak
                : state.activeSession !== SessionTypes.LongBreak &&
                  state.workingSessionsCount !== 0 &&
                  updatedWorkingSessionCount % 4 === 0
                ? SessionTypes.LongBreak
                : SessionTypes.Pomodoro;

            const nextSessionMinutes =
              state.settings.timers.inputs[nextSession];

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
    setTimersSettings: (data) =>
      set((state) => {
        clearTimeout(state.intervalID);
        return {
          settings: { timers: data },
          timerData: { minutes: data.inputs[state.activeSession], seconds: 0 },
          isCountDownOn: false,
          intervalID: "",
        };
      }),
    setCurrentIntervalID: (id) => set(() => ({ intervalID: id })),
    setIsCountDownOn: (val) => set(() => ({ isCountDownOn: val })),
    clearTimer: () =>
      set((state) => {
        clearTimeout(state.intervalID);
        const minutesForActiveSession =
          state.settings.timers.inputs[state.activeSession];
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
          timerData: { minutes: state.settings.timers.inputs[id], seconds: 0 },
          intervalID: "",
          isCountDownOn: false,
        };
      }),
    setCurrentDialogNavItem: (id) => set(() => ({ currentDialogNavItem: id })),
    setIsSettingsDialogOpen: () =>
      set((state) => ({ isSettingsDialogOpen: !state.isSettingsDialogOpen })),
  }))
);
