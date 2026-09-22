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

## Backend & per-student memory

Every learner logs in with a unique name (no password). Their learning memory — mastered formulas, test results and path exam scores — is stored on the server under that name, so it survives logout, page reloads and device changes. The session is also remembered in the browser, so refreshing the page returns straight to the learner's profile.

### HTTP API

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/api/account` | Log in by name; creates the profile on first visit. With `migrate: true`, guest progress on that device is carried into a brand-new (or still empty) profile. |
| `PUT` | `/api/account` | Replace the named learner's profile with the full current state. |
| `GET` | `/api/account?name=…` | Read a profile without creating one; used to restore a remembered session after reload. Returns 404 for unknown names. |
| `GET` | `/api/health` | Liveness check; reports which storage backend is active. |

Names are trimmed and case-insensitive (`Da Ming` and `da ming` share one profile) and limited to 1–24 characters. The `data/` directory holding all profiles is never served as a static file.

### Storage

- Default: JSON file storage. Set `DATA_DIR` to relocate it (defaults to `./data/users.json`).
- Optional: Firestore. If `FIREBASE_SERVICE_ACCOUNT_JSON` or `GOOGLE_APPLICATION_CREDENTIALS` is set, profiles are stored in the `users` Firestore collection instead.

Required Firebase environment values:

- `FIREBASE_PROJECT_ID` or the `project_id` inside the service account JSON
- `FIREBASE_SERVICE_ACCOUNT_JSON` with the full service account object, or `GOOGLE_APPLICATION_CREDENTIALS` pointing to a JSON file

### Tests

```bash
npm test
```

runs two regression suites: the algorithm data check and `scripts/verify-account-api.mjs`, which boots the real server on a temporary port and verifies per-student isolation, logout/re-login persistence, guest migration and static-file protection.

## Data source

Case setup and algorithm data are based on the public algorithm sheets from [SpeedCubeDB](https://www.speedcubedb.com/).
