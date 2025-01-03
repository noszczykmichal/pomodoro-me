export enum SessionTypes {
  Pomodoro = "pomodoro",
  ShortBreak = "shortBreak",
  LongBreak = "longBreak",
}

export type SessionData = {
  [key in SessionTypes]: number;
};

export interface TimersSettings {
  inputs: SessionData;
  isPomodoroSequenceOn: boolean;
}

export type DialogNavItem = "timers";
