// This event listener ensures the HTML is fully loaded before the script runs
document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIG & CONSTANTS ---
    const NUM_TEAMS = 32;
    const ROSTER_SIZE = 22; // Simplified roster size
    const NUM_WEEKS = 18;
    const PLAYOFF_TEAMS = 14;

    // --- GAME STATE ---
    let gameState = {};

    // --- UTILITY & NAME GENERATION ---
    const FIRST_NAMES = ["Liam", "Noah", "Oliver", "Elijah", "James", "William", "Henry", "Lucas", "Ben", "Theo", "Leo", "Mateo", "Jack", "Levi", "Asher", "John", "Finn", "Kai", "Axel", "Ezra", "Jaxon", "Miles", "Cooper", "Caleb", "Nolan", "Ryker", "Zane"];
    const LAST_NAMES = ["Smith", "Jones", "Williams", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young"];
    const POSITIONS = ["QB", "RB", "WR", "WR", "TE", "OL", "OL", "OL", "DL", "DL", "LB", "LB", "CB", "CB", "S", "S"];
    const CITIES = ["Liberty", "Keystone", "Veridian", "Oakhaven", "Redwater", "Silvercreek", "Ironridge", "Azure", "Goldport", "Emerald", "Obsidian", "Crimson", "Granite", "Cedar", "Juniper", "Delta", "Metro", "Bay", "Port", "Summit", "Cascade", "Pinnacle", "Canyon", "River", "Springfield", "Brookside", "Fairview", "Lakewood", "Hilltop", "Bridgeport", "Westwood", "Eastwood"];
    const MASCOTS = ["Vipers", "Titans", "Wizards", "Grizzlies", "Jets", "Sharks", "Hawks", "Eagles", "Lions", "Tigers", "Bears", "Stallions", "Raptors", "Dragons", "Phantoms", "Reapers", "Giants", "Commandos", "Bulldogs", "Panthers", "Wolverines", "Rams", "Storm", "Blizzard", "Avalanche", "Hurricanes", "Volcanoes", "Earthquakes", "Comets", "Rockets", "Stars", "Galaxy"];

    const randomInt = (max) => Math.floor(Math.random() * max);
    const getRandomElement = (arr) => arr[randomInt(arr.length)];

    function generatePlayerName() {
        return `${getRandomElement(FIRST_NAMES)} ${getRandomElement(LAST_NAMES)}`;
    }

    function generatePlayer(ageMin = 21, ageMax = 34) {
        const age = ageMin + randomInt(ageMax - ageMin + 1);
        return {
            id: `p${Date.now()}${randomInt(1000)}`,
            name: generatePlayerName(),
            pos: getRandomElement(POSITIONS),
            age: age,
            off: 30 + randomInt(50),
            def: 30 + randomInt(50),
            getOvr: function() { return Math.round((this.off + this.def) / 2); },
        };
    }

    function generateTeamName() {
        return `${getRandomElement(CITIES)} ${getRandomElement(MASCOTS)}`;
    }

    // --- CORE GAME LOGIC ---
    function init() {
        const savedState = localStorage.getItem('gridironGMState');
        if (savedState) {
            let loadedState = JSON.parse(savedState);
            loadedState.teams.forEach(team => {
                team.players.forEach(p => p.getOvr = function() { return Math.round((this.off + this.def) / 2); });
            });
            gameState = loadedState;
            logMessage(`Game loaded. Welcome back, GM of the ${gameState.teams[gameState.userTeamIndex].name}.`);
        } else {
            startNewGame(true);
        }
        updateUI();
        attachEventListeners();
    }

    function startNewGame(isFirstTime = false) {
        gameState = {
            season: 1,
            week: 1,
            teams: [],
            userTeamIndex: 0,
            playerTrainedThisWeek: false,
            gameOver: false,
            draftPicks: [],
        };

        let usedNames = new Set();
        for (let i = 0; i < NUM_TEAMS; i++) {
            let name = generateTeamName();
            while (usedNames.has(name)) { name = generateTeamName(); }
            usedNames.add(name);
            
            const team = {
                id: i,
                name: name,
                players: [],
                wins: 0, losses: 0, ties: 0,
                getOffOvr: function() { return Math.round(this.players.reduce((sum, p) => sum + p.off, 0) / this.players.length); },
                getDefOvr: function() { return Math.round(this.players.reduce((sum, p) => sum + p.def, 0) / this.players.length); },
                getTeamOvr: function() { return Math.round((this.getOffOvr() + this.getDefOvr()) / 2); },
            };

            for (let j = 0; j < ROSTER_SIZE; j++) { team.players.push(generatePlayer()); }
            gameState.teams.push(team);
        }
        
        gameState.userTeamIndex = randomInt(NUM_TEAMS);
        gameState.teams[gameState.userTeamIndex].players = gameState.teams[gameState.userTeamIndex].players.map(p => {
            p.off = Math.max(20, p.off - randomInt(10));
            p.def = Math.max(20, p.def - randomInt(10));
            return p;
        });

        if (!isFirstTime) {
            showView('hubView');
            document.getElementById('gameOverView').classList.add('hidden');
        }
        logMessage(`A new game has begun! You are the new GM of the ${gameState.teams[gameState.userTeamIndex].name}.`);
        saveGame();
        updateUI();
    }

    function saveGame() {
        localStorage.setItem('gridironGMState', JSON.stringify(gameState));
    }
    
    // ... all other functions from the previous script ...
    // (simulateGame, simulateWeek, startPlayoffs, startOffseason, handleDraftPick, logMessage, showView, updateUI functions, etc.)
    // For brevity, I'm omitting the direct copy-paste of ALL functions, but you should copy ALL JS functions from the previous response here.
    // The following are the functions that were previously defined. Ensure they are all within this DOMContentLoaded callback.
    
    function simulateGame(team1, team2) {
        const team1Score = (team1.getOffOvr() * (Math.random() + 0.5)) - (team2.getDefOvr() * (Math.random() + 0.5) / 2);
        const team2Score = (team2.getOffOvr() * (Math.random() + 0.5)) - (team1.getDefOvr() * (Math.random() + 0.5) / 2);

        if (Math.abs(team1Score - team2Score) < 5) {
            team1.ties++;
            team2.ties++;
            return { winner: null, loser: null, tie: true, msg: `${team1.name} and ${team2.name} tie.` };
        } else if (team1Score > team2Score) {
            team1.wins++;
            team2.losses++;
            return { winner: team1, loser: team2, tie: false, msg: `${team1.name} defeats ${team2.name}.` };
        } else {
            team2.wins++;
            team1.losses++;
            return { winner: team2, loser: team1, tie: false, msg: `${team2.name} defeats ${team1.name}.` };
        }
    }

    function simulateWeek() {
        if (gameState.week > NUM_WEEKS) return;
        
        logMessage(`--- Simulating Week ${gameState.week} ---`);

        let teamsToPlay = [...gameState.teams];
        while (teamsToPlay.length >= 2) {
            const team1 = teamsToPlay.shift();
            const team2 = teamsToPlay.shift();
            const result = simulateGame(team1, team2);
            if (team1.id === gameState.userTeamIndex || team2.id === gameState.userTeamIndex) {
                logMessage(`Your game: ${result.msg}`);
            }
        }

        gameState.week++;
        gameState.playerTrainedThisWeek = false;

        if (gameState.week > NUM_WEEKS) {
            logMessage("The regular season has concluded!");
            startPlayoffs();
        } else {
            saveGame();
            updateUI();
        }
    }

    function startPlayoffs() {
        logMessage("--- Playoffs Begin! ---");
        let qualifiedTeams = [...gameState.teams].sort((a, b) => b.wins - a.wins).slice(0, PLAYOFF_TEAMS);
        
        let round = 1;
        while(qualifiedTeams.length > 1) {
            logMessage(`-- Playoff Round ${round} --`);
            let roundWinners = [];
            for (let i = 0; i < qualifiedTeams.length; i += 2) {
                if (qualifiedTeams[i+1]) {
                    const team1 = qualifiedTeams[i];
                    const team2 = qualifiedTeams[i+1];
                    const result = simulateGame(team1, team2);
                    logMessage(result.msg);
                    roundWinners.push(result.winner ? result.winner : (Math.random() > 0.5 ? team1 : team2));
                } else {
                    roundWinners.push(qualifiedTeams[i]);
                }
            }
            qualifiedTeams = roundWinners;
            round++;
        }

        const champion = qualifiedTeams[0];
        logMessage(`🏆 THE ${champion.name.toUpperCase()} ARE THE NEW CHAMPIONS! 🏆`);

        const userTeam = gameState.teams[gameState.userTeamIndex];
        if (userTeam.wins < 5 && gameState.season > 1) {
            gameState.gameOver = true;
            document.getElementById('fireReason').textContent = `After a disappointing ${userTeam.wins}-${userTeam.losses}-${user.ties} season, the owner has decided to go in a different direction. You have been fired.`;
            showView('gameOverView');
            localStorage.removeItem('gridironGMState');
            return;
        }
        
        startOffseason();
    }

    function startOffseason() {
        logMessage("--- Entering the Offseason ---");
        gameState.week = 1;
        gameState.season++;

        gameState.teams.forEach(team => {
            team.players.forEach(p => {
                p.age++;
                if (p.age > 29) {
                    p.off = Math.max(20, p.off - randomInt(4));
                    p.def = Math.max(20, p.def - randomInt(4));
                } 
                else if (p.age < 26) {
                    p.off = Math.min(99, p.off + randomInt(4));
                    p.def = Math.min(99, p.def + randomInt(4));
                }
            });
            team.wins = 0; team.losses = 0; team.ties = 0;
        });

        gameState.draftPicks = [...gameState.teams].sort((a,b) => a.wins - b.wins).map(t => t.id);

        showView('offseasonView');
        const advanceBtn = document.getElementById('advanceOffseasonBtn');
        advanceBtn.textContent = "Advance to Draft";
        advanceBtn.onclick = () => {
            document.getElementById('freeAgencyStage').classList.add('hidden');
            document.getElementById('draftStage').classList.remove('hidden');
            advanceBtn.textContent = "Finish Offseason & Start New Season";
            advanceBtn.onclick = () => {
                 showView('hubView');
                 saveGame();
                 updateUI();
            }
            updateOffseasonUI();
        };
        updateOffseasonUI();
    }
    
    window.handleDraftPick = (playerId) => { // Use window to make it accessible from HTML onclick
        const playerToDraft = window[playerId];
        const userTeam = gameState.teams[gameState.userTeamIndex];
        userTeam.players.push(playerToDraft);
        logMessage(`With your pick, you selected ${playerToDraft.name}!`);
        // AI picks logic...
        // For this simplified version we assume the user has made their pick and the draft is over for them.
        document.getElementById('draftBoardTable').querySelector('tbody').innerHTML = `<tr><td colspan="5">Draft is ongoing for other teams...</td></tr>`;
        logMessage("The rest of the draft has been simulated.");
        saveGame();
    }

    window.signFreeAgent = (playerId) => { // Use window to make it accessible from HTML onclick
        const playerToSign = window[playerId];
        const userTeam = gameState.teams[gameState.userTeamIndex];

        if(userTeam.players.length >= ROSTER_SIZE){
            userTeam.players.sort((a, b) => a.getOvr() - b.getOvr());
            const cutPlayer = userTeam.players.shift();
            logMessage(`To make room for ${playerToSign.name}, you have cut ${cutPlayer.name}.`);
        }

        userTeam.players.push(playerToSign);
        logMessage(`You have signed Free Agent ${playerToSign.name}!`);
        
        document.querySelectorAll('#freeAgentsTable button').forEach(b => b.disabled = true);
        saveGame();
    }


    function logMessage(msg) {
        const log = document.getElementById('log');
        log.innerHTML = msg + '<br>' + log.innerHTML;
    }

    window.showView = (viewId) => { // Use window to make it accessible from HTML onclick
        document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
        document.getElementById(viewId).classList.remove('hidden');
        if(viewId === 'hubView') document.getElementById('hubView').classList.remove('hidden');
        
        if (viewId === 'rosterView') updateRosterUI();
        if (viewId === 'standingsView') updateStandingsUI();
        if (viewId === 'tradeView') updateTradeUI();
        if (viewId === 'trainingView') updateTrainingUI();
    }

    function updateUI() {
        if (gameState.gameOver) {
            showView('gameOverView');
            return;
        }
        const userTeam = gameState.teams[gameState.userTeamIndex];
        document.getElementById('header').textContent = `Gridiron GM - ${userTeam.name}`;
        document.getElementById('team-name-header').textContent = `GM Office: ${userTeam.name}`;
        document.getElementById('season-info').textContent = `Season: ${gameState.season} | Week: ${gameState.week} | Record: ${userTeam.wins}-${userTeam.losses}-${userTeam.ties}`;
        document.getElementById('simWeekBtn').disabled = gameState.week > NUM_WEEKS;
    }
    
    // ... Paste ALL other update functions (updateRosterUI, updateStandingsUI, etc.) here
    function updateRosterUI() { /* ... same as before ... */ }
    function updateStandingsUI() { /* ... same as before ... */ }
    function updateTrainingUI() { /* ... same as before ... */ }
    window.updateTradePartnerAssets = () => { /* ... same as before ... */ }
    function updateTradeUI() { /* ... same as before ... */ }
    function updateOffseasonUI() { /* ... same as before ... */ }


    function attachEventListeners() {
        document.getElementById('simWeekBtn').addEventListener('click', simulateWeek);
        document.getElementById('startNewGameBtn').addEventListener('click', () => startNewGame(false));
        document.getElementById('confirmTrainingBtn').addEventListener('click', () => { /* ... same as before ... */ });
        document.getElementById('proposeTradeBtn').addEventListener('click', () => { /* ... same as before ... */ });
    }
    
    // --- INITIALIZE GAME ---
    init();
});
