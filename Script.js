document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIG & CONSTANTS ---
    const NUM_TEAMS = 32;
    const ROSTER_SIZE = 22;
    const NUM_WEEKS = 18;
    const PLAYOFF_TEAMS = 14;

    // --- GAME STATE ---
    let gameState = {};
    
    // Name generation arrays and functions (copy from previous script)
    const FIRST_NAMES = ["Liam", "Noah", "Oliver", "Elijah", "James", "William", "Henry", "Lucas", "Ben", "Theo", "Leo", "Mateo", "Jack", "Levi", "Asher", "John", "Finn", "Kai", "Axel", "Ezra", "Jaxon", "Miles", "Cooper", "Caleb", "Nolan", "Ryker", "Zane"];
    const LAST_NAMES = ["Smith", "Jones", "Williams", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young"];
    const POSITIONS = ["QB", "RB", "WR", "WR", "TE", "OL", "OL", "OL", "DL", "DL", "LB", "LB", "CB", "CB", "S", "S"];
    const CITIES = ["Liberty", "Keystone", "Veridian", "Oakhaven", "Redwater", "Silvercreek", "Ironridge", "Azure", "Goldport", "Emerald", "Obsidian", "Crimson", "Granite", "Cedar", "Juniper", "Delta", "Metro", "Bay", "Port", "Summit", "Cascade", "Pinnacle", "Canyon", "River", "Springfield", "Brookside", "Fairview", "Lakewood", "Hilltop", "Bridgeport", "Westwood", "Eastwood"];
    const MASCOTS = ["Vipers", "Titans", "Wizards", "Grizzlies", "Jets", "Sharks", "Hawks", "Eagles", "Lions", "Tigers", "Bears", "Stallions", "Raptors", "Dragons", "Phantoms", "Reapers", "Giants", "Commandos", "Bulldogs", "Panthers", "Wolverines", "Rams", "Storm", "Blizzard", "Avalanche", "Hurricanes", "Volcanoes", "Earthquakes", "Comets", "Rockets", "Stars", "Galaxy"];

    const randomInt = (max) => Math.floor(Math.random() * max);
    const getRandomElement = (arr) => arr[randomInt(arr.length)];

    const generatePlayerName = () => `${getRandomElement(FIRST_NAMES)} ${getRandomElement(LAST_NAMES)}`;
    const generateTeamName = () => `${getRandomElement(CITIES)} ${getRandomElement(MASCOTS)}`;

    const generatePlayer = (ageMin = 21, ageMax = 34) => ({
        id: `p${Date.now()}${randomInt(1000)}`,
        name: generatePlayerName(),
        pos: getRandomElement(POSITIONS),
        age: ageMin + randomInt(ageMax - ageMin + 1),
        off: 30 + randomInt(50),
        def: 30 + randomInt(50),
        getOvr: function() { return Math.round((this.off + this.def) / 2); },
    });

    // --- ELEMENT SELECTORS ---
    // Caching DOM elements for performance and cleanliness
    const hubView = document.getElementById('hubView');
    const gameOverView = document.getElementById('gameOverView');
    const rosterView = document.getElementById('rosterView');
    const standingsView = document.getElementById('standingsView');
    const trainingView = document.getElementById('trainingView');
    const tradeView = document.getElementById('tradeView');
    const offseasonView = document.getElementById('offseasonView');
    const allViews = [hubView, gameOverView, rosterView, standingsView, trainingView, tradeView, offseasonView];
    // Add all other element selectors here...
    const logEl = document.getElementById('log');

    // --- CORE LOGIC (most functions are the same, paste them here) ---
    // (init, startNewGame, saveGame, simulateGame, simulateWeek, startPlayoffs, startOffseason)
    // All of the game's brainpower from the previous script goes here.
    // I am omitting them for brevity, but YOU MUST PASTE THEM IN.

    // --- UI & DISPLAY LOGIC ---
    const showView = (viewToShow) => {
        allViews.forEach(view => view.classList.add('hidden'));
        if(viewToShow) viewToShow.classList.remove('hidden');

        // Refresh data when showing a view
        if (viewToShow === rosterView) updateRosterUI();
        if (viewToShow === standingsView) updateStandingsUI();
        if (viewToShow === tradeView) updateTradeUI();
        if (viewToShow === trainingView) updateTrainingUI();
    };
    
    const logMessage = (msg) => {
        logEl.innerHTML = `<div>${new Date().toLocaleTimeString()}: ${msg}</div>` + logEl.innerHTML;
    };
    
    // ALL YOUR UPDATE UI FUNCTIONS GO HERE
    // (updateUI, updateRosterUI, updateStandingsUI, etc.)

    // --- EVENT HANDLERS (The Fix!) ---
    const handleSimWeek = () => simulateWeek();
    const handleTrainPlayer = () => {
        const playerId = document.getElementById('trainingPlayerSelect').value;
        const attribute = document.getElementById('trainingAttributeSelect').value;
        if (!playerId || gameState.playerTrainedThisWeek) return;

        const player = gameState.teams[gameState.userTeamIndex].players.find(p => p.id === playerId);
        player[attribute] = Math.min(99, player[attribute] + 1);
        
        logMessage(`💪 Trained ${player.name} in ${attribute === 'off' ? 'Offense' : 'Defense'}. New rating: ${player[attribute]}`);
        gameState.playerTrainedThisWeek = true;
        saveGame();
        updateTrainingUI();
    };

    const handleProposeTrade = () => {
        // ... same trade logic as before
        const userTeam = gameState.teams[gameState.userTeamIndex];
        const partnerId = parseInt(document.getElementById('tradePartnerSelect').value);
        const partnerTeam = gameState.teams.find(t => t.id === partnerId);
        
        const userPlayerIds = Array.from(document.getElementById('userAssets').selectedOptions).map(opt => opt.value);
        const partnerPlayerIds = Array.from(document.getElementById('partnerAssets').selectedOptions).map(opt => opt.value);

        if (userPlayerIds.length === 0 || partnerPlayerIds.length === 0) {
            alert("You must select at least one player from each team.");
            return;
        }

        const userPlayers = userPlayerIds.map(id => userTeam.players.find(p => p.id === id));
        const partnerPlayers = partnerPlayerIds.map(id => partnerTeam.players.find(p => p.id === id));
        
        const userValue = userPlayers.reduce((sum, p) => sum + p.getOvr(), 0);
        const partnerValue = partnerPlayers.reduce((sum, p) => sum + p.getOvr(), 0);

        // AI Logic: Slightly improved - they want more value in return
        if (partnerValue < userValue * 1.1) {
            alert(`Trade rejected. The ${partnerTeam.name} want more value in return.`);
            logMessage(`Trade proposal to ${partnerTeam.name} was rejected.`);
        } else {
            alert(`Trade accepted! The ${partnerTeam.name} agree to the deal.`);
            logMessage(`Trade completed with ${partnerTeam.name}.`);
            
            userTeam.players = userTeam.players.filter(p => !userPlayerIds.includes(p.id)).concat(partnerPlayers);
            partnerTeam.players = partnerTeam.players.filter(p => !partnerPlayerIds.includes(p.id)).concat(userPlayers);
            
            saveGame();
            updateTradeUI();
        }
    };
    
    // EVENT DELEGATION for dynamic content
    const handleOffseasonTableClick = (e) => {
        const target = e.target;
        if (target.matches('[data-action="sign-fa"]')) {
            const playerId = target.dataset.playerId;
            // ... sign free agent logic ...
            logMessage(`Signed FA with ID: ${playerId}`);
        }
        if (target.matches('[data-action="draft-player"]')) {
            const playerId = target.dataset.playerId;
            // ... draft player logic ...
            logMessage(`Drafted player with ID: ${playerId}`);
        }
    };


    // --- ATTACH EVENT LISTENERS ---
    const attachEventListeners = () => {
        // Main Hub buttons
        document.getElementById('simWeekBtn').addEventListener('click', handleSimWeek);
        document.getElementById('rosterBtn').addEventListener('click', () => showView(rosterView));
        document.getElementById('standingsBtn').addEventListener('click', () => showView(standingsView));
        document.getElementById('tradeBtn').addEventListener('click', () => showView(tradeView));
        document.getElementById('trainingBtn').addEventListener('click', () => showView(trainingView));
        
        // Back buttons
        document.querySelectorAll('.btn-back').forEach(btn => {
            btn.addEventListener('click', () => showView(hubView));
        });

        // Specific view actions
        document.getElementById('confirmTrainingBtn').addEventListener('click', handleTrainPlayer);
        document.getElementById('proposeTradeBtn').addEventListener('click', handleProposeTrade);
        document.getElementById('startNewGameBtn').addEventListener('click', () => startNewGame(false));

        // Event Delegation for dynamic tables
        document.getElementById('freeAgentsTable').addEventListener('click', handleOffseasonTableClick);
        document.getElementById('draftBoardTable').addEventListener('click', handleOffseasonTableClick);
    };

    // --- INITIALIZE GAME ---
    // MAKE SURE ALL YOUR HELPER AND CORE LOGIC FUNCTIONS ARE PASTED ABOVE THIS LINE
    // init() function should call attachEventListeners() at the end.
    
    // Example:
    // function init() {
    //     ... load or start new game ...
    //     updateUI();
    //     attachEventListeners();
    // }
    
    init(); // Run the game
});
