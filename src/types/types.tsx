export enum SessionTypes {
  Pomodoro = "pomodoro",
  ShortBreak = "shortBreak",
  LongBreak = "longBreak",
}

export type SessionData = {
  [key in SessionTypes]: number;
};

export type DialogNavItem = "general" | "timers";
