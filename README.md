# CFOP 3D Classroom

An interactive 3D teaching tool for learning the CFOP method on a 3x3 Rubik's Cube.

## Contents

- 41 standard F2L cases
- 57 OLL algorithms
- 21 PLL algorithms
- Step-by-step and automatic playback
- Support for face, wide, slice, and cube rotation notation
- Responsive desktop and mobile layout

## Run locally

```bash
npm install
npm start
```

The app listens on `0.0.0.0:$PORT`.

## Firebase backend

If `FIREBASE_SERVICE_ACCOUNT_JSON` or `GOOGLE_APPLICATION_CREDENTIALS` is set, the server uses Firebase Admin and stores user profiles in Firestore.

Required environment values:

- `FIREBASE_PROJECT_ID` or the `project_id` inside the service account JSON
- `FIREBASE_SERVICE_ACCOUNT_JSON` with the full service account object, or `GOOGLE_APPLICATION_CREDENTIALS` pointing to a JSON file

Without those values, the app falls back to local JSON storage in `data/users.json`.

## Data source

Case setup and algorithm data are based on the public algorithm sheets from [SpeedCubeDB](https://www.speedcubedb.com/).
