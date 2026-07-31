// Difficulty-layered fixed-color Cross drills. Mastery cases include examples
// from CubeZone's published fixed-color Cross study.
// https://www.cubezone.be/crossstudy.html
export const crossCases = [
  { id: 'cross-1', category: 'CROSS', number: 1, name: '十字 01', group: '起步 · 单棱回位', difficulty: 1, setup: 'U F', algorithm: "F'" },
  { id: 'cross-2', category: 'CROSS', number: 2, name: '十字 02', group: '起步 · 对棱协调', difficulty: 1, setup: "U' R L", algorithm: "L' R'" },
  { id: 'cross-3', category: 'CROSS', number: 3, name: '十字 03', group: '起步 · 邻棱协调', difficulty: 1, setup: 'U2 R F', algorithm: "F' R'" },
  { id: 'cross-4', category: 'CROSS', number: 4, name: '十字 04', group: '起步 · 三棱顺序', difficulty: 1, setup: "U R L F", algorithm: "F' L' R'" },
  { id: 'cross-5', category: 'CROSS', number: 5, name: '十字 05', group: '加速 · 三棱顺序', difficulty: 2, setup: "U' R L B", algorithm: "B' L' R'" },
  { id: 'cross-6', category: 'CROSS', number: 6, name: '十字 06', group: '加速 · 底层调整', difficulty: 2, setup: 'U2 R L D F', algorithm: "F' D' L' R'" },
  { id: 'cross-7', category: 'CROSS', number: 7, name: '十字 07', group: '加速 · 方向修正', difficulty: 2, setup: "U R L D B'", algorithm: "B D' L' R'" },
  { id: 'cross-8', category: 'CROSS', number: 8, name: '十字 08', group: '加速 · 连续规划', difficulty: 2, setup: "U' R L D R F'", algorithm: "F R' D' L' R'" },
  { id: 'cross-9', category: 'CROSS', number: 9, name: '十字 09', group: '进阶 · 连续规划', difficulty: 3, setup: 'U2 R L D R B', algorithm: "B' R' D' L' R'" },
  { id: 'cross-10', category: 'CROSS', number: 10, name: '十字 10', group: '进阶 · 六步案例', difficulty: 3, setup: "U R L D R L F'", algorithm: "F L' R' D' L' R'" },
  { id: 'cross-11', category: 'CROSS', number: 11, name: '十字 11', group: '进阶 · 六步案例', difficulty: 3, setup: "U' R L D R L' F", algorithm: "F' L R' D' L' R'" },
  { id: 'cross-12', category: 'CROSS', number: 12, name: '十字 12', group: '进阶 · 七步案例', difficulty: 3, setup: "U2 R L D R L F' B'", algorithm: "B F L' R' D' L' R'" },
  { id: 'cross-13', category: 'CROSS', number: 13, name: '十字 13', group: '精通 · 七步案例', difficulty: 4, setup: "U R L D R L U2 F'", algorithm: "F U2 L' R' D' L' R'" },
  { id: 'cross-14', category: 'CROSS', number: 14, name: '十字 14', group: '精通 · 八步案例', difficulty: 4, setup: "F' D L D2 F' B' L R", algorithm: "R' L' B F D2 L' D' F" },
  { id: 'cross-15', category: 'CROSS', number: 15, name: '十字 15', group: '精通 · 八步案例', difficulty: 4, setup: "B2 D' F2 L' D2 F L' R", algorithm: "R' L F' D2 L F2 D B2" }
];

// Generated from SpeedCubeDB public algorithm sheets.
export const algorithms = [
  {
    "id": "f2l-1",
    "category": "F2L",
    "number": 2,
    "name": "F2L 1",
    "group": "Free Pairs",
    "setup": "F R' F' R",
    "algorithm": "U R U' R'"
  },
  {
    "id": "f2l-2",
    "category": "F2L",
    "number": 2,
    "name": "F2L 2",
    "group": "Free Pairs",
    "setup": "R' F R F'",
    "algorithm": "F R' F' R"
  },
  {
    "id": "f2l-3",
    "category": "F2L",
    "number": 2,
    "name": "F2L 3",
    "group": "Free Pairs",
    "setup": "F' U F",
    "algorithm": "F' U' F"
  },
  {
    "id": "f2l-4",
    "category": "F2L",
    "number": 2,
    "name": "F2L 4",
    "group": "Free Pairs",
    "setup": "R U' R'",
    "algorithm": "R U R'"
  },
  {
    "id": "f2l-5",
    "category": "F2L",
    "number": 2,
    "name": "F2L 5",
    "group": "Disconnected Pairs",
    "setup": "R U R' U2 R U' R' U",
    "algorithm": "U' R U R' U2 R U' R'"
  },
  {
    "id": "f2l-6",
    "category": "F2L",
    "number": 2,
    "name": "F2L 6",
    "group": "Disconnected Pairs",
    "setup": "F' U' F U2 F' U F U'",
    "algorithm": "U' r U' R' U R U r'"
  },
  {
    "id": "f2l-7",
    "category": "F2L",
    "number": 2,
    "name": "F2L 7",
    "group": "Disconnected Pairs",
    "setup": "R U R' U2 R U2 R' U",
    "algorithm": "U' R U2 R' U' R U2 R'"
  },
  {
    "id": "f2l-8",
    "category": "F2L",
    "number": 2,
    "name": "F2L 8",
    "group": "Disconnected Pairs",
    "setup": "r' U' R2 U' R2 U2 r",
    "algorithm": "d R' U2 R U R' U2 R"
  },
  {
    "id": "f2l-9",
    "category": "F2L",
    "number": 2,
    "name": "F2L 9",
    "group": "Disconnected Pairs",
    "setup": "F' U F U' R U R' U",
    "algorithm": "U' R U' R' U F' U' F"
  },
  {
    "id": "f2l-10",
    "category": "F2L",
    "number": 2,
    "name": "F2L 10",
    "group": "Disconnected Pairs",
    "setup": "R U' R' U' R U' R' U",
    "algorithm": "U' R U R' U R U R'"
  },
  {
    "id": "f2l-11",
    "category": "F2L",
    "number": 2,
    "name": "F2L 11",
    "group": "Connected Pairs",
    "setup": "F' U F U' R U2 R' U",
    "algorithm": "U' R U2 R' U F' U' F"
  },
  {
    "id": "f2l-12",
    "category": "F2L",
    "number": 2,
    "name": "F2L 12",
    "group": "Connected Pairs",
    "setup": "R U R' U2 R U R' U' R U R'",
    "algorithm": "R U' R' U R U' R' U2 R U' R'"
  },
  {
    "id": "f2l-13",
    "category": "F2L",
    "number": 2,
    "name": "F2L 13",
    "group": "Connected Pairs",
    "setup": "r U2 R' U R U' R' U M",
    "algorithm": "y' U R' U R U' R' U' R"
  },
  {
    "id": "f2l-14",
    "category": "F2L",
    "number": 2,
    "name": "F2L 14",
    "group": "Connected Pairs",
    "setup": "R U' R' U' R U R' U",
    "algorithm": "U' R U' R' U R U R'"
  },
  {
    "id": "f2l-15",
    "category": "F2L",
    "number": 2,
    "name": "F2L 15",
    "group": "Connected Pairs",
    "setup": "R U R' U' R U R' U2 R U' R'",
    "algorithm": "R' D' R U' R' D R U R U' R'"
  },
  {
    "id": "f2l-16",
    "category": "F2L",
    "number": 2,
    "name": "F2L 16",
    "group": "Connected Pairs",
    "setup": "F' U F U2 R U R'",
    "algorithm": "R U' R' U2 F' U' F"
  },
  {
    "id": "f2l-17",
    "category": "F2L",
    "number": 2,
    "name": "F2L 17",
    "group": "Connected Pairs",
    "setup": "R U' R' U R U2 R'",
    "algorithm": "R U2 R' U' R U R'"
  },
  {
    "id": "f2l-18",
    "category": "F2L",
    "number": 2,
    "name": "F2L 18",
    "group": "Connected Pairs",
    "setup": "R U R' U' R U R' F R' F' R",
    "algorithm": "y' R' U2 R U R' U' R"
  },
  {
    "id": "f2l-19",
    "category": "F2L",
    "number": 2,
    "name": "F2L 19",
    "group": "Disconnected Pairs",
    "setup": "R U R' U' R U2 R' U'",
    "algorithm": "U R U2 R' U R U' R'"
  },
  {
    "id": "f2l-20",
    "category": "F2L",
    "number": 2,
    "name": "F2L 20",
    "group": "Disconnected Pairs",
    "setup": "R U R' F R' F' R2 U R' U",
    "algorithm": "y' U' R' U2 R U' R' U R"
  },
  {
    "id": "f2l-21",
    "category": "F2L",
    "number": 2,
    "name": "F2L 21",
    "group": "Disconnected Pairs",
    "setup": "R U' R' U2 R U R'",
    "algorithm": "U2 R U R' U R U' R'"
  },
  {
    "id": "f2l-22",
    "category": "F2L",
    "number": 2,
    "name": "F2L 22",
    "group": "Disconnected Pairs",
    "setup": "F' L' U2 L F",
    "algorithm": "r U' r' U2 r U r'"
  },
  {
    "id": "f2l-23",
    "category": "F2L",
    "number": 2,
    "name": "F2L 23",
    "group": "Connected Pairs",
    "setup": "R U' R' U R U' R' U2 R U' R'",
    "algorithm": "U R U' R' U' R U' R' U R U' R'"
  },
  {
    "id": "f2l-24",
    "category": "F2L",
    "number": 2,
    "name": "F2L 24",
    "group": "Connected Pairs",
    "setup": "R U R' F R U R' U' F'",
    "algorithm": "F U R U' R' F' R U' R'"
  },
  {
    "id": "f2l-25",
    "category": "F2L",
    "number": 2,
    "name": "F2L 25",
    "group": "Corner In Slot",
    "setup": "F' R U R' U' R' F R",
    "algorithm": "U' R' F R F' R U R'"
  },
  {
    "id": "f2l-26",
    "category": "F2L",
    "number": 2,
    "name": "F2L 26",
    "group": "Corner In Slot",
    "setup": "F' U' F U R U R' U'",
    "algorithm": "U R U' R' F R' F' R"
  },
  {
    "id": "f2l-27",
    "category": "F2L",
    "number": 2,
    "name": "F2L 27",
    "group": "Corner In Slot",
    "setup": "R U R' U' R U R'",
    "algorithm": "R U' R' U R U' R'"
  },
  {
    "id": "f2l-28",
    "category": "F2L",
    "number": 2,
    "name": "F2L 28",
    "group": "Corner In Slot",
    "setup": "R' F R F' U R U' R'",
    "algorithm": "R U R' U' F R' F' R"
  },
  {
    "id": "f2l-29",
    "category": "F2L",
    "number": 2,
    "name": "F2L 29",
    "group": "Corner In Slot",
    "setup": "F R' F' R F R' F' R",
    "algorithm": "R' F R F' U R U' R'"
  },
  {
    "id": "f2l-30",
    "category": "F2L",
    "number": 2,
    "name": "F2L 30",
    "group": "Corner In Slot",
    "setup": "R U' R' U R U' R'",
    "algorithm": "R U R' U' R U R'"
  },
  {
    "id": "f2l-31",
    "category": "F2L",
    "number": 2,
    "name": "F2L 31",
    "group": "Edge In Slot",
    "setup": "R U R' F R' F' R U",
    "algorithm": "U' R' F R F' R U' R'"
  },
  {
    "id": "f2l-32",
    "category": "F2L",
    "number": 2,
    "name": "F2L 32",
    "group": "Edge In Slot",
    "setup": "R U' R' U R U' R' U R U' R'",
    "algorithm": "U R U' R' U R U' R' U R U' R'"
  },
  {
    "id": "f2l-33",
    "category": "F2L",
    "number": 2,
    "name": "F2L 33",
    "group": "Edge In Slot",
    "setup": "R U R' U2 R U R' U",
    "algorithm": "U' R U' R' U2 R U' R'"
  },
  {
    "id": "f2l-34",
    "category": "F2L",
    "number": 2,
    "name": "F2L 34",
    "group": "Edge In Slot",
    "setup": "R U' R' U2 R U' R' U'",
    "algorithm": "U R U R' U2 R U R'"
  },
  {
    "id": "f2l-35",
    "category": "F2L",
    "number": 2,
    "name": "F2L 35",
    "group": "Edge In Slot",
    "setup": "F' U F U' R U' R' U",
    "algorithm": "U' R U R' U F' U' F"
  },
  {
    "id": "f2l-36",
    "category": "F2L",
    "number": 2,
    "name": "F2L 36",
    "group": "Edge In Slot",
    "setup": "R U' R' U2 F R' F' R U2",
    "algorithm": "U F' U' F U' R U R'"
  },
  {
    "id": "f2l-37",
    "category": "F2L",
    "number": 2,
    "name": "F2L 37",
    "group": "Pieces In Slot",
    "setup": "R U' R U2 F R2 F' U2 R2",
    "algorithm": "R2 U2 F R2 F' U2 R' U R'"
  },
  {
    "id": "f2l-38",
    "category": "F2L",
    "number": 2,
    "name": "F2L 38",
    "group": "Pieces In Slot",
    "setup": "R U' R' U R U2 R' U R U' R'",
    "algorithm": "R U' R' U' R U R' U2 R U' R'"
  },
  {
    "id": "f2l-39",
    "category": "F2L",
    "number": 2,
    "name": "F2L 39",
    "group": "Pieces In Slot",
    "setup": "R U' R' U' R U R' U2 R U' R'",
    "algorithm": "R U' R' U R U2 R' U R U' R'"
  },
  {
    "id": "f2l-40",
    "category": "F2L",
    "number": 2,
    "name": "F2L 40",
    "group": "Pieces In Slot",
    "setup": "R U R' F U R U' R' F' R U R'",
    "algorithm": "r U' r' U2 r U r' R U R'"
  },
  {
    "id": "f2l-41",
    "category": "F2L",
    "number": 2,
    "name": "F2L 41",
    "group": "Pieces In Slot",
    "setup": "R F U R U' R' F' U' R'",
    "algorithm": "R U' R' r U' r' U2 r U r'"
  },
  {
    "id": "oll-1",
    "category": "OLL",
    "number": 1,
    "name": "OLL 1",
    "group": "Dot Case",
    "setup": "F R' F' R U2 F R' F' R2 U2 R'",
    "algorithm": "R U2 R2 F R F' U2 R' F R F'"
  },
  {
    "id": "oll-2",
    "category": "OLL",
    "number": 2,
    "name": "OLL 2",
    "group": "Dot Case",
    "setup": "f U R U' R' f' F U R U' R' F'",
    "algorithm": "y' R U' R2 D' r U r' D R2 U R'"
  },
  {
    "id": "oll-3",
    "category": "OLL",
    "number": 3,
    "name": "OLL 3",
    "group": "Dot Case",
    "setup": "F U R U' R' F' U f U R U' R' f' y",
    "algorithm": "y' f R U R' U' f' U' F R U R' U' F'"
  },
  {
    "id": "oll-4",
    "category": "OLL",
    "number": 4,
    "name": "OLL 4",
    "group": "Dot Case",
    "setup": "F U R U' R' F' U' f U R U' R' f' y",
    "algorithm": "y' R' F2 R2 U2 R' F' R U2 R2 F2 R"
  },
  {
    "id": "oll-5",
    "category": "OLL",
    "number": 5,
    "name": "OLL 5",
    "group": "Square Shapes",
    "setup": "r' U' R U' R' U2 r",
    "algorithm": "r' U2 R U R' U r"
  },
  {
    "id": "oll-6",
    "category": "OLL",
    "number": 6,
    "name": "OLL 6",
    "group": "Square Shapes",
    "setup": "r U R' U R U2 r'",
    "algorithm": "r U2 R' U' R U' r'"
  },
  {
    "id": "oll-7",
    "category": "OLL",
    "number": 7,
    "name": "OLL 7",
    "group": "Lightning Shapes",
    "setup": "r U2 R' U' R U' r'",
    "algorithm": "r U R' U R U2 r'"
  },
  {
    "id": "oll-8",
    "category": "OLL",
    "number": 8,
    "name": "OLL 8",
    "group": "Lightning Shapes",
    "setup": "r' U2 R U R' U r y2",
    "algorithm": "y2 r' U' R U' R' U2 r"
  },
  {
    "id": "oll-9",
    "category": "OLL",
    "number": 9,
    "name": "OLL 9",
    "group": "Fish Shapes",
    "setup": "F U R U' R2 F' R U R U' R' y'",
    "algorithm": "y R U R' U' R' F R2 U R' U' F'"
  },
  {
    "id": "oll-10",
    "category": "OLL",
    "number": 10,
    "name": "OLL 10",
    "group": "Fish Shapes",
    "setup": "R U2 R' F R' F' R U' R U' R'",
    "algorithm": "R U R' U R' F R F' R U2 R'"
  },
  {
    "id": "oll-11",
    "category": "OLL",
    "number": 11,
    "name": "OLL 11",
    "group": "Lightning Shapes",
    "setup": "M U' R U2 R' U' R U' R2 r",
    "algorithm": "r' R2 U R' U R U2 R' U M'"
  },
  {
    "id": "oll-12",
    "category": "OLL",
    "number": 12,
    "name": "OLL 12",
    "group": "Lightning Shapes",
    "setup": "F U R U' R' F' U' F U R U' R' F'",
    "algorithm": "y' M' R' U' R U' R' U2 R U' M"
  },
  {
    "id": "oll-13",
    "category": "OLL",
    "number": 13,
    "name": "OLL 13",
    "group": "Knight Move Shapes",
    "setup": "F' U' F r U' r' U r U r'",
    "algorithm": "F U R U2 R' U' R U R' F'"
  },
  {
    "id": "oll-14",
    "category": "OLL",
    "number": 14,
    "name": "OLL 14",
    "group": "Knight Move Shapes",
    "setup": "F U F' R' F R U' R' F' R",
    "algorithm": "R' F R U R' F' R F U' F'"
  },
  {
    "id": "oll-15",
    "category": "OLL",
    "number": 15,
    "name": "OLL 15",
    "group": "Knight Move Shapes",
    "setup": "r' U' r U' R' U R r' U r",
    "algorithm": "r' U' r R' U' R U r' U r"
  },
  {
    "id": "oll-16",
    "category": "OLL",
    "number": 16,
    "name": "OLL 16",
    "group": "Knight Move Shapes",
    "setup": "r U r' U R U' R' r U' r'",
    "algorithm": "r U r' R U R' U' r U' r'"
  },
  {
    "id": "oll-17",
    "category": "OLL",
    "number": 17,
    "name": "OLL 17",
    "group": "Dot Case",
    "setup": "F R' F' R U2 F R' F' R U' R U' R'",
    "algorithm": "R U R' U R' F R F' U2 R' F R F'"
  },
  {
    "id": "oll-18",
    "category": "OLL",
    "number": 18,
    "name": "OLL 18",
    "group": "Dot Case",
    "setup": "r' U2 R U R' U r2 U2 R' U' R U' r'",
    "algorithm": "y R U2 R2 F R F' U2 M' U R U' r'"
  },
  {
    "id": "oll-19",
    "category": "OLL",
    "number": 19,
    "name": "OLL 19",
    "group": "Dot Case",
    "setup": "F R' F' R M U R U' R' U' M'",
    "algorithm": "y S' R U R' S U' R' F R F'"
  },
  {
    "id": "oll-20",
    "category": "OLL",
    "number": 20,
    "name": "OLL 20",
    "group": "Dot Case",
    "setup": "r U R' U' M2 U R U' R' U' M'",
    "algorithm": "r U R' U' M2 U R U' R' U' M'"
  },
  {
    "id": "oll-21",
    "category": "OLL",
    "number": 21,
    "name": "OLL 21",
    "group": "OCLL",
    "setup": "R U R' U R U' R' U R U2 R' y'",
    "algorithm": "R U R' U R U' R' U R U2 R'"
  },
  {
    "id": "oll-22",
    "category": "OLL",
    "number": 22,
    "name": "OLL 22",
    "group": "OCLL",
    "setup": "R' U2 R2 U R2 U R2 U2 R'",
    "algorithm": "R U2 R2 U' R2 U' R2 U2 R"
  },
  {
    "id": "oll-23",
    "category": "OLL",
    "number": 23,
    "name": "OLL 23",
    "group": "OCLL",
    "setup": "R U2 R D R' U2 R D' R2",
    "algorithm": "R2 D R' U2 R D' R' U2 R'"
  },
  {
    "id": "oll-24",
    "category": "OLL",
    "number": 24,
    "name": "OLL 24",
    "group": "OCLL",
    "setup": "F R' F' r U R U' r'",
    "algorithm": "r U R' U' r' F R F'"
  },
  {
    "id": "oll-25",
    "category": "OLL",
    "number": 25,
    "name": "OLL 25",
    "group": "OCLL",
    "setup": "R' F' r U R U' r' F y'",
    "algorithm": "R U2 R D R' U2 R D' R2"
  },
  {
    "id": "oll-26",
    "category": "OLL",
    "number": 26,
    "name": "OLL 26",
    "group": "OCLL",
    "setup": "R U R' U R U2 R' y'",
    "algorithm": "y R U2 R' U' R U' R'"
  },
  {
    "id": "oll-27",
    "category": "OLL",
    "number": 27,
    "name": "OLL 27",
    "group": "OCLL",
    "setup": "R U2 R' U' R U' R'",
    "algorithm": "R U R' U R U2 R'"
  },
  {
    "id": "oll-28",
    "category": "OLL",
    "number": 28,
    "name": "OLL 28",
    "group": "All Corners Oriented",
    "setup": "R U R' U' M' U R U' r'",
    "algorithm": "r U R' U' M U R U' R'"
  },
  {
    "id": "oll-29",
    "category": "OLL",
    "number": 29,
    "name": "OLL 29",
    "group": "Awkward Shapes",
    "setup": "M F R' F' R U R U' R' U' M'",
    "algorithm": "r2 D' r U r' D r2 U' r' U' r"
  },
  {
    "id": "oll-30",
    "category": "OLL",
    "number": 30,
    "name": "OLL 30",
    "group": "Awkward Shapes",
    "setup": "F U R U2 R' U R U2 R' U' F' y2",
    "algorithm": "y' r' D' r U' r' D r2 U' r' U r U r'"
  },
  {
    "id": "oll-31",
    "category": "OLL",
    "number": 31,
    "name": "OLL 31",
    "group": "P Shapes",
    "setup": "R' F R U R' U' F' U R",
    "algorithm": "R' U' F U R U' R' F' R"
  },
  {
    "id": "oll-32",
    "category": "OLL",
    "number": 32,
    "name": "OLL 32",
    "group": "P Shapes",
    "setup": "f R' F' R U R U' R' S'",
    "algorithm": "S R U R' U' R' F R f'"
  },
  {
    "id": "oll-33",
    "category": "OLL",
    "number": 33,
    "name": "OLL 33",
    "group": "T Shapes",
    "setup": "F R' F' R U R U' R'",
    "algorithm": "R U R' U' R' F R F'"
  },
  {
    "id": "oll-34",
    "category": "OLL",
    "number": 34,
    "name": "OLL 34",
    "group": "C Shapes",
    "setup": "F U R' U' R' F' R U R2 U' R' y2",
    "algorithm": "y f R f' U' r' U' R U M'"
  },
  {
    "id": "oll-35",
    "category": "OLL",
    "number": 35,
    "name": "OLL 35",
    "group": "Fish Shapes",
    "setup": "R U2 R' F R' F' R2 U2 R'",
    "algorithm": "R U2 R2 F R F' R U2 R'"
  },
  {
    "id": "oll-36",
    "category": "OLL",
    "number": 36,
    "name": "OLL 36",
    "group": "W Shapes",
    "setup": "F' L F L' U' L' U' L U L' U L y2",
    "algorithm": "y R U R2 F' U' F U R2 U2 R'"
  },
  {
    "id": "oll-37",
    "category": "OLL",
    "number": 37,
    "name": "OLL 37",
    "group": "Fish Shapes",
    "setup": "F R U' R' U R U R' F'",
    "algorithm": "F R' F' R U R U' R'"
  },
  {
    "id": "oll-38",
    "category": "OLL",
    "number": 38,
    "name": "OLL 38",
    "group": "W Shapes",
    "setup": "F R' F' R U R U R' U' R U' R'",
    "algorithm": "R U R' U R U' R' U' R' F R F'"
  },
  {
    "id": "oll-39",
    "category": "OLL",
    "number": 39,
    "name": "OLL 39",
    "group": "Lightning Shapes",
    "setup": "L U F' U' L' U L F L' y'",
    "algorithm": "y' f' r U r' U' r' F r S"
  },
  {
    "id": "oll-40",
    "category": "OLL",
    "number": 40,
    "name": "OLL 40",
    "group": "Lightning Shapes",
    "setup": "R' U' F U R U' R' F' R y'",
    "algorithm": "y R' F R U R' U' F' U R"
  },
  {
    "id": "oll-41",
    "category": "OLL",
    "number": 41,
    "name": "OLL 41",
    "group": "Awkward Shapes",
    "setup": "F U R U' R' F' R U2 R' U' R U' R' y2",
    "algorithm": "y2 R U R' U R U2 R' F R U R' U' F'"
  },
  {
    "id": "oll-42",
    "category": "OLL",
    "number": 42,
    "name": "OLL 42",
    "group": "Awkward Shapes",
    "setup": "F U R U' R' F' R' U2 R U R' U R",
    "algorithm": "R' U' R U' R' U2 R F R U R' U' F'"
  },
  {
    "id": "oll-43",
    "category": "OLL",
    "number": 43,
    "name": "OLL 43",
    "group": "P Shapes",
    "setup": "f' U' L' U L f",
    "algorithm": "y R' U' F' U F R"
  },
  {
    "id": "oll-44",
    "category": "OLL",
    "number": 44,
    "name": "OLL 44",
    "group": "P Shapes",
    "setup": "f U R U' R' f'",
    "algorithm": "f R U R' U' f'"
  },
  {
    "id": "oll-45",
    "category": "OLL",
    "number": 45,
    "name": "OLL 45",
    "group": "T Shapes",
    "setup": "F U R U' R' F'",
    "algorithm": "F R U R' U' F'"
  },
  {
    "id": "oll-46",
    "category": "OLL",
    "number": 46,
    "name": "OLL 46",
    "group": "C Shapes",
    "setup": "R' U' F R' F' R U R",
    "algorithm": "R' U' R' F R F' U R"
  },
  {
    "id": "oll-47",
    "category": "OLL",
    "number": 47,
    "name": "OLL 47",
    "group": "L Shapes",
    "setup": "F' U' L' U L U' L' U L F",
    "algorithm": "y' F R' F' R U2 R U' R' U R U2 R'"
  },
  {
    "id": "oll-48",
    "category": "OLL",
    "number": 48,
    "name": "OLL 48",
    "group": "L Shapes",
    "setup": "F U R U' R' U R U' R' F'",
    "algorithm": "F R U R' U' R U R' U' F'"
  },
  {
    "id": "oll-49",
    "category": "OLL",
    "number": 49,
    "name": "OLL 49",
    "group": "L Shapes",
    "setup": "r' U r2 U' r2 U' r2 U r' y2",
    "algorithm": "y2 r U' r2 U r2 U r2 U' r"
  },
  {
    "id": "oll-50",
    "category": "OLL",
    "number": 50,
    "name": "OLL 50",
    "group": "L Shapes",
    "setup": "r U' r2 U r2 U r2 U' r",
    "algorithm": "r' U r2 U' r2 U' r2 U r'"
  },
  {
    "id": "oll-51",
    "category": "OLL",
    "number": 51,
    "name": "OLL 51",
    "group": "Line Shapes",
    "setup": "f U R U' R' U R U' R' f'",
    "algorithm": "y2 F U R U' R' U R U' R' F'"
  },
  {
    "id": "oll-52",
    "category": "OLL",
    "number": 52,
    "name": "OLL 52",
    "group": "Line Shapes",
    "setup": "F R U R' d R' U' R U' R'",
    "algorithm": "y2 R' F' U' F U' R U R' U R"
  },
  {
    "id": "oll-53",
    "category": "OLL",
    "number": 53,
    "name": "OLL 53",
    "group": "L Shapes",
    "setup": "r' U2 R U R' U' R U R' U r",
    "algorithm": "r' U' R U' R' U R U' R' U2 r"
  },
  {
    "id": "oll-54",
    "category": "OLL",
    "number": 54,
    "name": "OLL 54",
    "group": "L Shapes",
    "setup": "r U2 R' U' R U R' U' R U' r'",
    "algorithm": "r U R' U R U' R' U R U2 r'"
  },
  {
    "id": "oll-55",
    "category": "OLL",
    "number": 55,
    "name": "OLL 55",
    "group": "Line Shapes",
    "setup": "F R' F' U2 R U R' U R2 U2 R'",
    "algorithm": "y R' F U R U' R2 F' R2 U R' U' R"
  },
  {
    "id": "oll-56",
    "category": "OLL",
    "number": 56,
    "name": "OLL 56",
    "group": "Line Shapes",
    "setup": "r U r' R U R' U' R U R' U' r U' r'",
    "algorithm": "r U r' U R U' R' U R U' R' r U' r'"
  },
  {
    "id": "oll-57",
    "category": "OLL",
    "number": 57,
    "name": "OLL 57",
    "group": "All Corners Oriented",
    "setup": "r U R' U' M U R U' R'",
    "algorithm": "R U R' U' M' U R U' r'"
  },
  {
    "id": "aa",
    "category": "PLL",
    "number": 1,
    "name": "Aa",
    "group": "Adj Swap",
    "setup": "x R2 D2 R U R' D2 R U' R x'",
    "algorithm": "x R' U R' D2 R U' R' D2 R2 x'"
  },
  {
    "id": "ab",
    "category": "PLL",
    "number": 2,
    "name": "Ab",
    "group": "Adj Swap",
    "setup": "x R' U R' D2 R U' R' D2 R2 x'",
    "algorithm": "x R2 D2 R U R' D2 R U' R x'"
  },
  {
    "id": "e",
    "category": "PLL",
    "number": 3,
    "name": "E",
    "group": "Opp Swap",
    "setup": "x' D R U R' D' R U' R' D R U' R' D' R U R' x y'",
    "algorithm": "y x' R U' R' D R U R' D' R U R' D R U' R' D' x"
  },
  {
    "id": "f",
    "category": "PLL",
    "number": 4,
    "name": "F",
    "group": "Adj Swap",
    "setup": "R' U' R U' R' U R U R2 F' R U R U' R' F U R y'",
    "algorithm": "y R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R"
  },
  {
    "id": "ga",
    "category": "PLL",
    "number": 5,
    "name": "Ga",
    "group": "Adj Swap",
    "setup": "R' U' R D' U R2 U R' U R U' R U' R2 D",
    "algorithm": "R2 U R' U R' U' R U' R2 D U' R' U R D'"
  },
  {
    "id": "gb",
    "category": "PLL",
    "number": 6,
    "name": "Gb",
    "group": "Adj Swap",
    "setup": "R2 U R' U R' U' R U' R2 D U' R' U R D'",
    "algorithm": "D R' U' R U D' R2 U R' U R U' R U' R2"
  },
  {
    "id": "gc",
    "category": "PLL",
    "number": 7,
    "name": "Gc",
    "group": "Adj Swap",
    "setup": "D' R U R' U' D R2 U' R U' R' U R' U R2",
    "algorithm": "R2 U' R U' R U R' U R2 D' U R U' R' D"
  },
  {
    "id": "gd",
    "category": "PLL",
    "number": 8,
    "name": "Gd",
    "group": "Adj Swap",
    "setup": "R2 U' R U' R U R' U R2 D' U R U' R' D",
    "algorithm": "R U R' U' D R2 U' R U' R' U R' U R2 D'"
  },
  {
    "id": "h",
    "category": "PLL",
    "number": 9,
    "name": "H",
    "group": "EPLL",
    "setup": "M2 U' M2 U2 M2 U' M2",
    "algorithm": "M2 U' M2 U2 M2 U' M2"
  },
  {
    "id": "ja",
    "category": "PLL",
    "number": 10,
    "name": "Ja",
    "group": "Adj Swap",
    "setup": "L' R' U2 R U R' U2 L U' R y'",
    "algorithm": "y2 x R2 F R F' R U2 r' U r U2 x'"
  },
  {
    "id": "jb",
    "category": "PLL",
    "number": 11,
    "name": "Jb",
    "group": "Adj Swap",
    "setup": "R U R2 F' R U R U' R' F R U' R'",
    "algorithm": "R U R' F' R U R' U' R' F R2 U' R'"
  },
  {
    "id": "na",
    "category": "PLL",
    "number": 12,
    "name": "Na",
    "group": "Opp Swap",
    "setup": "R U R' U2 R U R2 F' R U R U' R' F R U' R' U' R U' R'",
    "algorithm": "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'"
  },
  {
    "id": "nb",
    "category": "PLL",
    "number": 13,
    "name": "Nb",
    "group": "Opp Swap",
    "setup": "F r' F' r U r U' r2 D' F r U r' F' D r",
    "algorithm": "R' U R U' R' F' U' F R U R' F R' F' R U' R"
  },
  {
    "id": "ra",
    "category": "PLL",
    "number": 14,
    "name": "Ra",
    "group": "Adj Swap",
    "setup": "R U2 R D R' U R D' R' U' R' U R U R' y'",
    "algorithm": "y R U' R' U' R U R D R' U' R D' R' U2 R'"
  },
  {
    "id": "rb",
    "category": "PLL",
    "number": 15,
    "name": "Rb",
    "group": "Adj Swap",
    "setup": "R' U R U R' U' R' D' R U R' D R U2 R",
    "algorithm": "R' U2 R U2 R' F R U R' U' R' F' R2"
  },
  {
    "id": "t",
    "category": "PLL",
    "number": 16,
    "name": "T",
    "group": "Adj Swap",
    "setup": "F R U' R' U R U R2 F' R U R U' R'",
    "algorithm": "R U R' U' R' F R2 U' R' U' R U R' F'"
  },
  {
    "id": "ua",
    "category": "PLL",
    "number": 17,
    "name": "Ua",
    "group": "EPLL",
    "setup": "M2 U' M' U2 M U' M2",
    "algorithm": "y2 M2 U M U2 M' U M2"
  },
  {
    "id": "ub",
    "category": "PLL",
    "number": 18,
    "name": "Ub",
    "group": "EPLL",
    "setup": "M2 U M' U2 M U M2",
    "algorithm": "y2 M2 U' M U2 M' U' M2"
  },
  {
    "id": "v",
    "category": "PLL",
    "number": 19,
    "name": "V",
    "group": "Opp Swap",
    "setup": "D2 R' U R D' R2 U' R' U R' U R' D' R U2 R'",
    "algorithm": "R' U R' U' R D' R' D R' U D' R2 U' R2 D R2"
  },
  {
    "id": "y",
    "category": "PLL",
    "number": 20,
    "name": "Y",
    "group": "Opp Swap",
    "setup": "F R' F' R U R U' R' F R U' R' U R U R' F'",
    "algorithm": "F R U' R' U' R U R' F' R U R' U' R' F R F'"
  },
  {
    "id": "z",
    "category": "PLL",
    "number": 21,
    "name": "Z",
    "group": "EPLL",
    "setup": "M U2 M2 U2 M U' M2 U' M2",
    "algorithm": "M' U' M2 U' M2 U' M' U2 M2"
  }
];
