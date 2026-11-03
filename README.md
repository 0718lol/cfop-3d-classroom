# CFOP 3D Classroom

面向三阶魔方学习者与教学者的交互式 3D 教学工具。通过可旋转、可逐步回放的动画理解公式，再用分阶段练习、计时测试与复习记录巩固学习。

An interactive 3D CFOP classroom with 134 training cases, four learning paths, timed practice and persistent learner profiles.

## 案例范围与计数口径

当前公开仓库包含 **134 个训练案例**：

| 阶段 | 数量 | 训练内容 |
| --- | ---: | --- |
| Cross 十字 | 15 | 固定白底十字的观察、规划与复原练习 |
| F2L 前两层 | 41 | 角块与棱块配对及插入 |
| OLL 顶面定向 | 57 | 最后一层朝向调整 |
| PLL 顶层排列 | 21 | 最后一层位置交换 |
| **合计** | **134** | **15 个十字训练 + 119 个 F2L / OLL / PLL 案例** |

此前介绍中的 **119** 指 F2L、OLL、PLL 三类案例的小计；**134** 将 15 个十字训练一并计入。两者是统计范围不同，并非两个版本的数量差异。十字训练、学习路径与学员档案均已包含在当前公开代码中。

这里的数量指案例条目，不代表 134 套独立求解算法。教学中产生的学员数据、课程经营结果与学习效果统计，不随代码一同公开，也不能仅凭案例数量推导。

## 教学与练习流程

1. **选择学习路径**：起步、加速、进阶、精通四阶段，逐步扩展训练范围。
2. **观察与演示**：查看案例打乱状态，旋转 3D 魔方，逐步或自动播放公式；支持面转、宽层转、中层转与整体旋转记号。
3. **计时与复习**：完成单案例计时练习或路径结业测验，记录成功与待复习状态；路径测验超时案例自动加入待复习列表。
4. **持续追踪**：按学员名称保存已掌握案例、测试结果与路径测验成绩，支持退出后重新载入，以及游客进度迁移。

测试中的成功状态由学习者自行确认；当前不通过摄像头或智能魔方自动判断实体魔方是否复原。

界面支持桌面与移动端布局。学员名称用于区分学习档案，当前为免密码访问，不是带身份验证的账号系统。

## Run locally

```bash
npm install
npm start
```

Open `http://localhost:3000/`. The server binds to `0.0.0.0`; set `PORT` to change the default port of `3000`.

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

F2L, OLL and PLL case setup and algorithm data are based on the public algorithm sheets from [SpeedCubeDB](https://www.speedcubedb.com/). The Cross training set includes examples from [CubeZone's fixed-color Cross study](https://www.cubezone.be/crossstudy.html).
