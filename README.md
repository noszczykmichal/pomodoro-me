<div align="center">
  <img alt="Logo" src="https://raw.githubusercontent.com/noszczykmichal/pomodoro-me/main/public/web-app-manifest-192x192.png" width="100" />
</div>
<h1 align="center">
Pomodoro Me
</h1>
<p align="center">
  A Pomodoro timer app built with <a href="https://react.dev/" target="_blank">React</a> and <a href="https://www.typescriptlang.org/" target="_blank">Typescript</a>, and hosted on <a href="https://firebase.google.com/" target="_blank">Firebase</a>.
</p>
<p align="center">
  <a href="https://pomodoro-me-4ce8a.web.app/" target="_blank">Live demo</a>
</p>

![demo](https://raw.githubusercontent.com/noszczykmichal/pomodoro-me/main/images/demo.png)

## Table of Contents

- [General Info](#general-information)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Credits](#credits)
- [Contact](#contact)

## General Information

This is a timer implementing the Pomodoro technique, aimed at effective time management and promoting productivity. By default, the user can use it as a simple timer without following the Pomodoro principles — the timer resets to its initial value once the time has elapsed. When the appropriate option is enabled in the settings, the full Pomodoro sequence is activated, and the timer automatically alternates between work and break sessions.

![pomodoro sequence enabled](https://raw.githubusercontent.com/noszczykmichal/pomodoro-me/main/images/demo2.png)

After every four work sessions followed by short breaks, a long break is initiated. The number of completed work sessions is indicated by small, tomato-shaped icons displayed beneath the timer.

![a tomato-shaped icon displayed beneath the timer](https://raw.githubusercontent.com/noszczykmichal/pomodoro-me/main/images/demo3.png)

## Technologies Used

- [React](https://reactjs.org/blog/2022/03/29/react-v18.html)
- [Typescript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN](https://ui.shadcn.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Vite](https://vite.dev/)
- [ESLint](https://www.npmjs.com/package/eslint)
- [Prettier](https://www.npmjs.com/package/prettier)

## Setup

1. Clone this repository

   ```sh
   $git clone https://github.com/noszczykmichal/pomodoro-me
   ```

2. Go into the repository

   ```sh
   $cd pomodoro-me
   ```

3. Install dependencies

   ```sh
   $npm install
   ```

4. Start the development server

   ```sh
   $npm run dev
   ```

## Credits

Design inspired by https://studywithme.io/aesthetic-pomodoro-timer/.

## Contact

Created by [@noszczykmichal](https://michalnoszczyk.com/) - feel free to contact me!
