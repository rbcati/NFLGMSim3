// persistence.js (stick in Script.js for now)
const SAVE_KEY = "nflgm:league:v1";

export function saveLeague(league) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(league));
}
export function loadLeague() {
  const raw = localStorage.getItem(SAVE_KEY);
  return raw ? JSON.parse(raw) : null;
}
export function exportLeague(league) {
  const blob = new Blob([JSON.stringify(league, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `${league.name}-league.json`;
  a.click(); URL.revokeObjectURL(url);
}
export async function importLeague(file) {
  const text = await file.text();
  const league = JSON.parse(text);
  saveLeague(league); return league;
}
document.addEventListener('DOMContentLoaded', () => {
    // --- STATE & CONSTANTS ---
    let gameState = {};
    const FIRST_NAMES = ["Liam","Noah","Oliver","Elijah","James","William","Henry","Lucas","Ben","Theo","Leo","Mateo","Jack","Levi","Asher","John","Finn","Kai","Axel","Ezra","Jaxon","Miles","Cooper","Caleb","Nolan","Ryker","Zane"];
    const LAST_NAMES = ["Smith","Jones","Williams","Brown","Davis","Miller","Wilson","Moore","Taylor","Anderson","Thomas","Jackson","White","Harris","Martin","Thompson","Garcia","Martinez","Robinson","Clark","Rodriguez","Lewis","Lee","Walker","Hall","Allen","Young"];
    const COACH_LAST_NAMES = ["Belichick", "Walsh", "Landry", "Lombardi", "Shula", "Brown", "Madden", "Reid", "Parcells", "Gibbs"];
    const CITIES = ["Liberty","Keystone","Veridian","Oakhaven","Redwater","Silvercreek","Ironridge","Azure","Goldport","Emerald","Obsidian","Crimson","Granite","Cedar","Juniper","Delta","Metro","Bay","Port","Summit","Cascade","Pinnacle","Canyon","River","Springfield","Brookside","Fairview","Lakewood","Hilltop","Bridgeport","Westwood","Eastwood"];
    const MASCOTS = ["Vipers","Titans","Wizards","Grizzlies","Jets","Sharks","Hawks","Eagles","Lions","Tigers","Bears","Stallions","Raptors","Dragons","Phantoms","Reapers","Giants","Commandos","Bulldogs","Panthers","Wolverines","Rams","Storm","Blizzard","Avalanche","Hurricanes","Volcanoes","Earthquakes","Comets","Rockets","Stars","Galaxy"];
    const POSITIONS = ["QB","RB","WR","TE","OL","DL","LB","CB","S"];

    // --- DOM ELEMENTS ---
    const views = document.querySelectorAll('.view');
    const header = document.getElementById('header');
    const logEl = document.getElementById('log');

    // --- CORE GAME LOGIC ---
    const generateName = (nameList) => nameList[Math.floor(Math.random() * nameList.length)];
    const generatePlayer = () => ({ name: `${generateName(FIRST_NAMES)} ${generateName(LAST_NAMES)}`, pos: generateName(POSITIONS), ovr: 40 + Math.floor(Math.random() * 60) });
    const generateTeam = (id) => {
        const team = {
            id,
            name: `${generateName(CITIES)} ${generateName(MASCOTS)}`,
            players: Array.from({ length: 22 }, generatePlayer),
            coaches: {
                headCoach: `${generateName(FIRST_NAMES)} ${generateName(COACH_LAST_NAMES)}`,
                offCoordinator: `${generateName(FIRST_NAMES)} ${generateName(LAST_NAMES)}`,
                defCoordinator: `${generateName(FIRST_NAMES)} ${generateName(LAST_NAMES)}`,
            },
            wins: 0, losses: 0
        };
        team.ovr = Math.round(team.players.reduce((sum, p) => sum + p.ovr, 0) / team.players.length);
        return team;
    };

    function startNewGame() {
        gameState = {
            season: 1,
            week: 1,
            userTeamId: null,
            teams: Array.from({ length: 32 }, (_, i) => generateTeam(i)),
            gamePhase: 'TEAM_SELECTION', // NEW game phase manager
        };
        render();
    }

    function selectTeam(teamId) {
        gameState.userTeamId = teamId;
        gameState.gamePhase = 'REGULAR_SEASON';
        logMessage(`You have been hired as the GM of the ${gameState.teams[teamId].name}! Good luck.`);
        render();
    }

    function simulateWeek() {
        if (gameState.gamePhase !== 'REGULAR_SEASON') return;

        if (gameState.week > 18) {
            logMessage("Regular season has ended. Starting playoffs...");
            gameState.gamePhase = 'PLAYOFFS';
            // Simple playoff simulation
            logMessage(`The ${generateName(MASCOTS)} have won the championship!`);
            gameState.gamePhase = 'OFFSEASON';
            render();
            return;
        }

        // Simple sim logic
        gameState.teams.forEach(team => {
            const opponent = gameState.teams[Math.floor(Math.random() * 32)];
            if (team.id === opponent.id) return; // Can't play yourself
            
            const winChance = (team.ovr / (team.ovr + opponent.ovr)) * 100;
            if (Math.random() * 100 < winChance) {
                team.wins++;
            } else {
                team.losses++;
            }
        });

        logMessage(`Simulated Week ${gameState.week}.`);
        gameState.week++;
        render();
    }
    
    function startNewSeason() {
        gameState.season++;
        gameState.week = 1;
        gameState.teams.forEach(t => { t.wins = 0; t.losses = 0; });
        gameState.gamePhase = 'REGULAR_SEASON';
        logMessage(`Welcome to Season ${gameState.season}! A new year begins.`);
        render();
    }

    // --- RENDER FUNCTIONS (THE SECRET SAUCE) ---
    function render() {
        // Hide all views first
        views.forEach(view => view.classList.add('hidden'));

        // Show the correct view based on game phase
        if (gameState.gamePhase === 'TEAM_SELECTION') {
            document.getElementById('teamSelectView').classList.remove('hidden');
            renderTeamSelect();
        } else {
            document.getElementById('hubView').classList.remove('hidden');
            renderHub();
        }
    }

    function renderTeamSelect() {
        const teamSelectList = document.getElementById('teamSelectList');
        teamSelectList.innerHTML = '';
        gameState.teams.forEach(team => {
            const card = document.createElement('div');
            card.className = 'team-card';
            card.dataset.teamId = team.id;
            card.innerHTML = `
                <h3>${team.name}</h3>
                <p>Overall: ${team.ovr}</p>
            `;
            teamSelectList.appendChild(card);
        });
    }

    function renderHub() {
        const userTeam = gameState.teams[gameState.userTeamId];
        header.textContent = `GM: ${userTeam.name}`;
        document.getElementById('team-name-header').textContent = `${userTeam.name} Front Office`;
        document.getElementById('season-info').textContent = `Season: ${gameState.season} | Week: ${gameState.week} | Record: ${userTeam.wins}-${userTeam.losses}`;
    }

    function renderRoster(team) {
        document.getElementById('roster-header').textContent = `${team.name} Roster`;
        const coachesDiv = document.getElementById('roster-coaches');
        coachesDiv.innerHTML = `<strong>HC:</strong> ${team.coaches.headCoach} | <strong>OC:</strong> ${team.coaches.offCoordinator} | <strong>DC:</strong> ${team.coaches.defCoordinator}`;
        
        const table = document.getElementById('rosterTable');
        table.innerHTML = `<thead><tr><th>Name</th><th>Position</th><th>Overall</th></tr></thead>`;
        const tbody = document.createElement('tbody');
        team.players.sort((a,b) => b.ovr - a.ovr).forEach(p => {
            tbody.innerHTML += `<tr><td>${p.name}</td><td>${p.pos}</td><td>${p.ovr}</td></tr>`;
        });
        table.appendChild(tbody);
    }
    
    function renderLeagueView() {
        const table = document.getElementById('leagueTable');
        table.innerHTML = `<thead><tr><th>Team</th><th>Record</th><th>OVR</th><th></th></tr></thead>`;
        const tbody = document.createElement('tbody');
        gameState.teams.sort((a,b) => b.wins - a.wins).forEach(team => {
            const tr = document.createElement('tr');
            if (team.id === gameState.userTeamId) tr.className = 'user-team-row';
            tr.innerHTML = `
                <td>${team.name}</td>
                <td>${team.wins}-${team.losses}</td>
                <td>${team.ovr}</td>
                <td><button class="btn-secondary" data-action="view-roster" data-team-id="${team.id}">View Roster</button></td>
            `;
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
    }
    
    function renderOffseason() {
        const summary = document.getElementById('offseason-summary');
        const userTeam = gameState.teams[gameState.userTeamId];
        summary.innerHTML = `
            <p>The season has concluded.</p>
            <p>Your Final Record: ${userTeam.wins}-${userTeam.losses}.</p>
            <p>Get ready for the draft and free agency!</p>
        `;
        document.getElementById('offseasonView').classList.remove('hidden');
    }

    function logMessage(msg) {
        logEl.innerHTML = `<div>${msg}</div>` + logEl.innerHTML;
    }

    // --- EVENT LISTENERS ---
    function attachEventListeners() {
        const container = document.querySelector('.container');
        container.addEventListener('click', (e) => {
            const target = e.target;

            // Team Selection
            if (target.closest('.team-card')) {
                const teamId = parseInt(target.closest('.team-card').dataset.teamId, 10);
                selectTeam(teamId);
            }

            // Sim Week Button
            if (target.id === 'simWeekBtn') {
                simulateWeek();
            }
            
            // Start New Season Button
            if (target.id === 'startNewSeasonBtn') {
                startNewSeason();
            }

            // Main Hub Buttons (to switch views)
            if (target.dataset.view) {
                views.forEach(v => v.classList.add('hidden'));
                const viewToShow = document.getElementById(target.dataset.view);
                viewToShow.classList.remove('hidden');
                
                if (target.dataset.view === 'rosterView') renderRoster(gameState.teams[gameState.userTeamId]);
                if (target.dataset.view === 'leagueView') renderLeagueView();
            }

            // Back Buttons
            if (target.classList.contains('btn-back')) {
                render(); // Just re-render the main hub
            }
            
            // View Roster button inside League table
            if (target.dataset.action === 'view-roster') {
                const teamId = parseInt(target.dataset.teamId, 10);
                const team = gameState.teams.find(t => t.id === teamId);
                renderRoster(team);
                views.forEach(v => v.classList.add('hidden'));
                document.getElementById('rosterView').classList.remove('hidden');
            }
        });
    }

    // --- INITIALIZATION ---
    attachEventListeners();
    startNewGame();
});
