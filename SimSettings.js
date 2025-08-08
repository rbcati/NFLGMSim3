async function simOneWeek(league) {
  // toy example: update each game with RNG score and recompute standings
  for (const game of league.schedule[league.week] || []) {
    game.homeScore = Math.floor(Math.random()*40);
    game.awayScore = Math.floor(Math.random()*40);
    updateTeamRecords(league, game);
    await new Promise(r => setTimeout(r, 0)); // yield
  }
  league.week += 1;
  saveLeague(league);
  renderStandings(league);
  renderSchedule(league);
}
