type Player = {
  id: string
  name: string
  pos: "QB"|"RB"|"WR"|"TE"|"OL"|"DL"|"LB"|"CB"|"S"|"K"|"P"
  age: number
  teamId: string
  ovr: number
  speed: number       // 0-99
  accel: number       // 0-99
  agility: number     // 0-99
  strength: number    // 0-99
  awareness: number   // 0-99
}
