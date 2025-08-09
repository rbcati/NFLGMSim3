// You could put this in a file like `data/teams.js`

// A helper to quickly create players
const createPlayer = (name, position, ratings) => ({
  name,
  position,
  ratings,
});

// --- Sample Team A ---
export const teamA = {
  name: "Prescott Valley Pit Vipers",
  players: {
    // Offense
    QB: createPlayer("Mason Matrix", "QB", { accuracy: 85, decision: 80 }),
    RB: createPlayer("Barry Bolt", "RB", { speed: 92, power: 75 }),
    WR1: createPlayer("Jerry Jetson", "WR", { speed: 88, catching: 90 }),
    WR2: createPlayer("Chris Comet", "WR", { speed: 85, catching: 82 }),
    // Defense
    DL1: createPlayer("Reggie Rampage", "DL", { passRush: 88, runStop: 82 }),
    DB1: createPlayer("Donny Dodger", "DB", { coverage: 85, speed: 90 }),
    DB2: createPlayer("Casey Cover", "DB", { coverage: 82, speed: 88 }),
  },
};

// --- Sample Team B ---
export const teamB = {
  name: "Flagstaff Freezers",
  players: {
    // Offense
    QB: createPlayer("Phil Phaser", "QB", { accuracy: 78, decision: 75 }),
    RB: createPlayer("Ronny Rocket", "RB", { speed: 89, power: 80 }),
    WR1: createPlayer("Larry Laser", "WR", { speed: 84, catching: 88 }),
    WR2: createPlayer("Timmy Turbo", "WR", { speed: 82, catching: 80 }),
    // Defense
    DL1: createPlayer("Vince Volcano", "DL", { passRush: 80, runStop: 88 }),
    DB1: createPlayer("Nate Nova", "DB", { coverage: 88, speed: 85 }),
    DB2: createPlayer("Sam Shield", "DB", { coverage: 80, speed: 84 }),
  },
};
