/**
 * Simulates a single offensive drive.
 * @param {object} offense - The team on offense.
 * @param {object} defense - The team on defense.
 * @param {number} startingFieldPosition - Where the drive starts (e.g., 25 for the 25-yard line).
 * @returns {string} The outcome of the drive ('touchdown', 'turnover', 'punt').
 */
function simulateDrive(offense, defense, startingFieldPosition) {
  let fieldPosition = startingFieldPosition;
  let down = 1;
  let yardsToGo = 10;

  console.log(`--- ${offense.name} start a new drive at their ${fieldPosition} yard line ---`);

  while (down <= 4) {
    console.log(`${down} and ${yardsToGo} at the ${fieldPosition}...`);
    
    // For now, we only have pass plays. You'd add logic here to decide play calls.
    const playResult = resolvePassPlay(offense, defense);

    if (playResult.outcome === 'turnover') {
      console.log(` >> TURNOVER! ${playResult.type}!`);
      return 'turnover';
    }

    if (playResult.outcome === 'complete') {
      console.log(` >> Pass complete for ${playResult.yards.toFixed(0)} yards.`);
      fieldPosition += playResult.yards;
      yardsToGo -= playResult.yards;
    } else {
      console.log(` >> Pass is incomplete.`);
    }

    // Check for a touchdown
    if (fieldPosition >= 100) {
      console.log(` >> TOUCHDOWN ${offense.name}!`);
      return 'touchdown';
    }

    // Check for a first down
    if (yardsToGo <= 0) {
      down = 1;
      yardsToGo = 10;
      console.log(` >> First down!`);
    } else {
      down++;
    }
  }
  
  // If loop finishes (4 downs are up without a 1st down or TD)
  console.log(` >> Turnover on downs.`);
  return 'turnover';
}
