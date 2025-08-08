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

    function renderRoster(teamId=0){
  const team = league.teams[teamId];
  const rows = team.roster
    .slice().sort((a,b)=>b.ovr-a.ovr)
    .map(p=>`<tr data-pid="${p.id}">
      <td>${p.name}</td><td>${p.pos}</td>
      <td class="num">${p.ovr}</td><td class="num">${p.age}</td>
    </tr>`).join("");
  const html = `<thead><tr><th>Name</th><th>Pos</th><th class="num">OVR</th><th class="num">Age</th></tr></thead><tbody>${rows}</tbody>`;
  const tbl = document.getElementById("rosterTable");
  tbl.classList.add("row-hover");
  tbl.innerHTML = html;
  tbl.onclick = (e)=>{
    const tr = e.target.closest("tr[data-pid]");
    if (!tr) return;
    const pid = tr.getAttribute("data-pid");
    const player = team.roster.find(x=>x.id===pid);
    openPlayerModal(player, team);
  };
}

function openPlayerModal(player, team){
  document.getElementById("pName").textContent = `${player.name} · ${player.pos} · ${team.abv}`;
  document.getElementById("pMeta").textContent = `Age ${player.age} · OVR ${player.ovr}`;
  const statRows = [
    ["Awareness", player.awr ?? rnd(50,90)],
    ["Speed", player.spd ?? rnd(50,90)],
    ["Strength", player.str ?? rnd(50,90)],
    ["Agility", player.agl ?? rnd(50,90)],
    ["Endurance", player.end ?? rnd(50,90)]
  ].map(([k,v])=>`<tr><td>${k}</td><td class="num">${v}</td></tr>`).join("");
  document.getElementById("pStats").innerHTML =
    `<thead><tr><th>Attribute</th><th class="num">Value</th></tr></thead><tbody>${statRows}</tbody>`;
  document.getElementById("playerModal").hidden = false;
}
function closePlayerModal(){ document.getElementById("playerModal").hidden = true; }
function rnd(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }
document.getElementById("playerClose").onclick = closePlayerModal;
document.getElementById("playerModal").addEventListener("click", (e)=>{
  if (e.target.id==="playerModal") closePlayerModal();
});
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
/* state */
let league = loadLeague() || null;

function seedLeague(name="My League") {
  const teams = ["BUF","KC","CIN","BAL","SF","DAL","GB","PHI"].map((abv,i)=>({
    id:i, abv, name:abv, wins:0, losses:0, roster:[]
  }));
  // toy schedule: each week next two teams play
  const schedule = [];
  for (let w=0; w<16; w++){
    const games = [];
    for (let i=0; i<teams.length; i+=2){
      games.push({home:teams[i].id, away:teams[i+1].id});
    }
    schedule.push(games);
  }
  // toy players
  teams.forEach(t=>{
    for (let i=0;i<30;i++){
      const pos = ["QB","RB","WR","TE","OL","DL","LB","CB","S"][i%9];
      const ovr = 60+Math.floor(Math.random()*30);
      t.roster.push({id:`${t.abv}-${i}`, name:`${t.abv} P${i}`, pos, ovr, age:22+(i%10)});
    }
  });
  return { name, season:2025, week:0, teams, schedule };
}

function updateTeamRecords(l, game){
  const home = l.teams[game.home], away = l.teams[game.away];
  const hs = game.homeScore, as = game.awayScore;
  if (hs > as){ home.wins++; away.losses++; } else if (as > hs){ away.wins++; home.losses++; }
}

function renderMeta(){
  const meta = document.getElementById("leagueMeta");
  if (!league){ meta.textContent = "No league yet. Create one."; return; }
  meta.innerHTML = `<div><b>${league.name}</b> · Season ${league.season} · Week ${league.week}</div>`;
  document.getElementById("weekNum").textContent = league.week;
}

function renderStandings(l=league){
  const rows = l.teams
    .slice().sort((a,b)=> (b.wins-a.wins) || (a.losses-b.losses))
    .map(t=>`<tr><td>${t.abv}</td><td class="num">${t.wins}-${t.losses}</td></tr>`).join("");
  document.getElementById("standingsTable").innerHTML =
    `<thead><tr><th>Team</th><th class="num">Record</th></tr></thead><tbody>${rows}</tbody>`;
}

function renderRoster(teamId=0){
  const team = league.teams[teamId];
  const rows = team.roster
    .slice().sort((a,b)=>b.ovr-a.ovr)
    .map(p=>`<tr><td>${p.name}</td><td>${p.pos}</td><td class="num">${p.ovr}</td><td class="num">${p.age}</td></tr>`).join("");
  document.getElementById("rosterTable").innerHTML =
    `<thead><tr><th>Name</th><th>Pos</th><th class="num">OVR</th><th class="num">Age</th></tr></thead><tbody>${rows}</tbody>`;
}

function renderSchedule(l=league){
  const w = l.week;
  const games = l.schedule[w] || [];
  const html = games.map(g=>{
    const h=l.teams[g.home], a=l.teams[g.away];
    const sc = (g.homeScore!=null) ? ` — <b>${g.homeScore}</b> : <b>${g.awayScore}</b>` : "";
    return `<div>${a.abv} @ ${h.abv}${sc}</div>`;
  }).join("");
  document.getElementById("nextWeek").innerHTML = html || "<div class='empty'>Season complete</div>";
}

async function simWeek(){
  if (!league) return;
  const games = league.schedule[league.week] || [];
  for (const g of games){
    g.homeScore = Math.floor(Math.random()*40);
    g.awayScore = Math.floor(Math.random()*40);
    updateTeamRecords(league, g);
    await new Promise(r=>setTimeout(r,0));
  }
  league.week++;
  saveLeague(league);
  renderMeta(); renderStandings(); renderSchedule(); renderRoster();
}

/* wire UI */
document.getElementById("newLeagueBtn").onclick = ()=>{
  league = seedLeague(prompt("League name?") || "My League");
  saveLeague(league);
  renderMeta(); renderStandings(); renderSchedule(); renderRoster();
};
document.getElementById("simWeekBtn").onclick = simWeek;
document.getElementById("simSeasonBtn").onclick = async ()=>{
  while(league && league.week < league.schedule.length) await simWeek();
};
document.getElementById("exportBtn").onclick = ()=> exportLeague(league);
document.getElementById("importFile").onchange = async (e)=>{
  const f = e.target.files[0]; if (!f) return;
  league = await importLeague(f);
  renderMeta(); renderStandings(); renderSchedule(); renderRoster();
};

/* boot */
if (!league){ league = seedLeague(); saveLeague(league); }
renderMeta(); renderStandings(); renderSchedule(); renderRoster();
function renderTradeUI(){
  const selA = document.getElementById("tradeTeamA");
  const selB = document.getElementById("tradeTeamB");
  selA.innerHTML = league.teams.map(t=>`<option value="${t.id}">${t.abv}</option>`).join("");
  selB.innerHTML = league.teams.map(t=>`<option value="${t.id}">${t.abv}</option>`).join("");
  selA.onchange = ()=> renderTradeLists();
  selB.onchange = ()=> renderTradeLists();
  renderTradeLists();
  document.getElementById("tradeValidate").onclick = validateTrade;
  document.getElementById("tradeExecute").onclick = executeTrade;
}

function renderTradeLists(){
  const aId = +document.getElementById("tradeTeamA").value;
  const bId = +document.getElementById("tradeTeamB").value;
  const a = league.teams[aId], b = league.teams[bId];
  document.getElementById("tradeListA").innerHTML = rosterCheckboxes(a, "A");
  document.getElementById("tradeListB").innerHTML = rosterCheckboxes(b, "B");
  document.getElementById("tradeExecute").disabled = true;
  msg("");
}
function rosterCheckboxes(team, side){
  const rows = team.roster
    .slice().sort((x,y)=>y.ovr-x.ovr)
    .map(p=>`<label style="display:flex;gap:8px;align-items:center;padding:6px 8px">
      <input type="checkbox" name="sel${side}" value="${p.id}">
      <span style="flex:1">${p.name}</span>
      <span style="opacity:.8">${p.pos}</span>
      <span class="num" style="margin-left:auto">${p.ovr}</span>
    </label>`).join("");
  return rows || "<div class='empty'>No players</div>";
}
function getSelected(side){
  return [...document.querySelectorAll(`input[name="sel${side}"]:checked`)].map(i=>i.value);
}
function validateTrade(){
  const aId = +document.getElementById("tradeTeamA").value;
  const bId = +document.getElementById("tradeTeamB").value;
  if (aId===bId){ return msg("Teams must be different"); }
  const aSel = getSelected("A"), bSel = getSelected("B");
  if (aSel.length===0 || bSel.length===0){ return msg("Both sides must include at least one player"); }

  const a = league.teams[aId], b = league.teams[bId];
  const afterA = a.roster.length - aSel.length + bSel.length;
  const afterB = b.roster.length - bSel.length + aSel.length;
  if (afterA>75 || afterB>75){ return msg("Roster size limit 75 exceeded"); }

  const aValue = sumValue(a, aSel);
  const bValue = sumValue(b, bSel);
  const ratio = aValue > bValue ? aValue/bValue : bValue/aValue;
  if (ratio > 2.5){ 
    msg("Blocked. Trade value too lopsided");
    document.getElementById("tradeExecute").disabled = true;
    return;
  }
  msg("Valid trade");
  document.getElementById("tradeExecute").disabled = false;
}
function sumValue(team, ids){
  return ids.map(id=> team.roster.find(p=>p.id===id)?.ovr || 0).reduce((a,b)=>a+b,0);
}
function executeTrade(){
  const aId = +document.getElementById("tradeTeamA").value;
  const bId = +document.getElementById("tradeTeamB").value;
  const aSel = getSelected("A"), bSel = getSelected("B");
  const A = league.teams[aId], B = league.teams[bId];

  const movingA = A.roster.filter(p=>aSel.includes(p.id));
  const movingB = B.roster.filter(p=>bSel.includes(p.id));
  A.roster = A.roster.filter(p=>!aSel.includes(p.id)).concat(movingB);
  B.roster = B.roster.filter(p=>!bSel.includes(p.id)).concat(movingA);

  saveLeague(league);
  renderRoster(aId);
  renderStandings();
  renderTradeLists();
  msg("Trade completed");
  document.getElementById("tradeExecute").disabled = true;
}
function msg(text){ document.getElementById("tradeMsg").textContent = text; }
function renderTradeUI(){
  const selA = document.getElementById("tradeTeamA");
  const selB = document.getElementById("tradeTeamB");
  selA.innerHTML = league.teams.map(t=>`<option value="${t.id}">${t.abv}</option>`).join("");
  selB.innerHTML = league.teams.map(t=>`<option value="${t.id}">${t.abv}</option>`).join("");
  selA.onchange = ()=> renderTradeLists();
  selB.onchange = ()=> renderTradeLists();
  renderTradeLists();
  document.getElementById("tradeValidate").onclick = validateTrade;
  document.getElementById("tradeExecute").onclick = executeTrade;
}

function renderTradeLists(){
  const aId = +document.getElementById("tradeTeamA").value;
  const bId = +document.getElementById("tradeTeamB").value;
  const a = league.teams[aId], b = league.teams[bId];
  document.getElementById("tradeListA").innerHTML = rosterCheckboxes(a, "A");
  document.getElementById("tradeListB").innerHTML = rosterCheckboxes(b, "B");
  document.getElementById("tradeExecute").disabled = true;
  msg("");
}
function rosterCheckboxes(team, side){
  const rows = team.roster
    .slice().sort((x,y)=>y.ovr-x.ovr)
    .map(p=>`<label style="display:flex;gap:8px;align-items:center;padding:6px 8px">
      <input type="checkbox" name="sel${side}" value="${p.id}">
      <span style="flex:1">${p.name}</span>
      <span style="opacity:.8">${p.pos}</span>
      <span class="num" style="margin-left:auto">${p.ovr}</span>
    </label>`).join("");
  return rows || "<div class='empty'>No players</div>";
}
function getSelected(side){
  return [...document.querySelectorAll(`input[name="sel${side}"]:checked`)].map(i=>i.value);
}
function validateTrade(){
  const aId = +document.getElementById("tradeTeamA").value;
  const bId = +document.getElementById("tradeTeamB").value;
  if (aId===bId){ return msg("Teams must be different"); }
  const aSel = getSelected("A"), bSel = getSelected("B");
  if (aSel.length===0 || bSel.length===0){ return msg("Both sides must include at least one player"); }
  const a = league.teams[aId], b = league.teams[bId];
  const afterA = a.roster.length - aSel.length + bSel.length;
  const afterB = b.roster.length - bSel.length + aSel.length;
  if (afterA>75 || afterB>75){ return msg("Roster size limit 75 exceeded"); }
  const aValue = sumValue(a, aSel);
  const bValue = sumValue(b, bSel);
  const ratio = aValue > bValue ? aValue/bValue : bValue/aValue;
  if (ratio > 2.5){
    msg("Blocked. Trade value too lopsided");
    document.getElementById("tradeExecute").disabled = true;
    return;
  }
  msg("Valid trade");
  document.getElementById("tradeExecute").disabled = false;
}
function sumValue(team, ids){
  return ids.map(id=> team.roster.find(p=>p.id===id)?.ovr || 0).reduce((a,b)=>a+b,0);
}
function executeTrade(){
  const aId = +document.getElementById("tradeTeamA").value;
  const bId = +document.getElementById("tradeTeamB").value;
  const aSel = getSelected("A"), bSel = getSelected("B");
  const A = league.teams[aId], B = league.teams[bId];
  const movingA = A.roster.filter(p=>aSel.includes(p.id));
  const movingB = B.roster.filter(p=>bSel.includes(p.id));
  A.roster = A.roster.filter(p=>!aSel.includes(p.id)).concat(movingB);
  B.roster = B.roster.filter(p=>!bSel.includes(p.id)).concat(movingA);
  saveLeague(league);
  renderRoster(aId);
  renderStandings();
  renderTradeLists();
  msg("Trade completed");
  document.getElementById("tradeExecute").disabled = true;
}
function msg(text){ document.getElementById("tradeMsg").textContent = text; }
