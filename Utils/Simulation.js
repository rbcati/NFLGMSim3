// You could put the rest of this in a new file like `utils/simulationEngine.js`

/**
 * Resolves a single pass play between an offense and a defense.
 * @param {object} offense - The team object for the offense.
 * @param {object} defense - The team object for the defense.
 * @returns {object} An object describing the play's outcome.
 */
function resolvePassPlay(offense, defense) {
  const qb = offense.players.QB;
  const wr = offense.players.WR1; // Simplify by always targeting WR1 for now
  const db = defense.players.DB1; // Simplify by having DB1 cover WR1

  // --- Calculate Offense vs. Defense "Scores" ---
  // This is a creative step. You decide what ratings matter.
  let offenseScore = qb.ratings.accuracy + wr.ratings.catching;
  let defenseScore = db.ratings.coverage * 2; // Make coverage extra important

  // --- ADD RANDOMNESS! This is CRUCIAL to prevent the same result every time ---
  offenseScore += Math.random() * 20; // Adds a random value between 0 and 20
  defenseScore += Math.random() * 20;

  // --- Determine the Outcome ---
  const differential = offenseScore - defenseScore;

  // BIG PLAY CHANCE (e.g., a turnover)
  if (Math.random() < 0.03) { // 3% chance of an interception
    return { outcome: 'turnover', type: 'interception', yards: 0 };
  }

  if (differential > 0) {
    // Successful pass! Yards are based on how much they "won" the matchup by.
    const yardsGained = Math.ceil(differential / 5) + (Math.random() * 10);
    return { outcome: 'complete', yards: Math.min(yardsGained, 50) }; // Cap yards at 50
  } else {
    // Incomplete pass
    return { outcome: 'incomplete', yards: 0 };
  }
}
