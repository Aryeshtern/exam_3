// interfase for player
interface Player {
    playerName?: string;
    position: string;
    twoPercent: number;
    threePercent: number;
    points: number;
}

const table = document.getElementById('resuts-table') as HTMLTableElement;


//get data from API
async function fetchData(Requirements:Player): Promise<(Player[] | null)>{
    try{
        const response = await fetch('https://nbaserver-q21u.onrender.com/api/filter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Requirements),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json() as Player[];
        console.log(data);
        return data;
    }catch (error){
        console.error(error);
        return null;
    }
};

async function fillTable(data: Player[]) {
    data.forEach((player) => {

        let row = table.insertRow();
        row.insertCell(0).textContent = player.playerName || "null";
        row.insertCell(1).textContent = player.position;
        row.insertCell(2).textContent = player.points.toString();
        row.insertCell(3).textContent = player.twoPercent.toFixed(2) + "%";
        row.insertCell(4).textContent = player.threePercent.toFixed(2) + "%";
        let button = document.createElement("button");
        button.textContent = `Add ${player.playerName} to Current Team`;
        button.className = "adding-player-button";
        button.onclick = () => addPlayer(player);
        row.insertCell(5).appendChild(button);
    });
}

async function createTable(){
    let header = document.createElement("tr");
        header.id = "table-header";
        let cell0 = document.createElement("th")
        cell0.textContent = "Player";
        let cell1 = document.createElement("th");
        cell1.textContent = "Position";
        let cell2 = document.createElement("th")
        cell2.textContent = "Points";
        let cell3 = document.createElement("th")
        cell3.textContent = "FG%";
        let cell4 = document.createElement("th")
        cell4.textContent = "3P%";
        let cell5 = document.createElement("th")
        cell5.textContent = "Action";
        header.appendChild(cell0);
        header.appendChild(cell1);
        header.appendChild(cell2);
        header.appendChild(cell3);
        header.appendChild(cell4);
        header.appendChild(cell5);
        table.appendChild(header);
}

document.getElementById("search-button")?.addEventListener("click", async () => {
    const position = (document.getElementById("player-position") as HTMLSelectElement).value;
    const twoPercent = (document.getElementById("two-percent-input") as HTMLInputElement).valueAsNumber;
    const threePercent = (document.getElementById("three-percent-input") as HTMLInputElement).valueAsNumber;
    const points = (document.getElementById("points") as HTMLInputElement).valueAsNumber;

    const requirements: Player = {
        position,
        twoPercent,
        threePercent,
        points,
    };
    console.log("requirements: " + requirements.points);
    const data = await fetchData(requirements);
    console.log("data: " + data);
    if (data){
        await fillTable(data);
    }
    
});

function addPlayer(player: Player):void {

    let team: string | null = localStorage.getItem("team");
    if (team === null) {

        let players: Player[] = [];
        players.push(player);
        localStorage.setItem("team", JSON.stringify(players) );
    }else{
        let teamList: Player[] = JSON.parse(team);
        teamList.push(player);
        localStorage.setItem("team", JSON.stringify(teamList));
    }
    insertPlayersInCards();
}

// insert exsits playwer in team cards

let team: string | null = localStorage.getItem("team");


function insertPlayersInCards():void{
    if (team){
        let teamList:Player[] = JSON.parse(team);
        teamList.forEach(player => {
            if(player){
                let name = document.querySelector(`.member-card #${player.position}`);
                name !== null?name.textContent = player.playerName || "": "";
                
                let position = document.querySelector(`#${player.position} .name`) as HTMLDivElement;
                position!== null? position.textContent= player.position: "";
                let points = document.querySelector(`#${player.position} .points`) as HTMLDivElement;
                points!== null? points.textContent= "points: " + player.points.toString(): "";
                let twoPercent = document.querySelector(`#${player.position} .Two-precents`) as HTMLDivElement;
                twoPercent!== null? twoPercent.textContent= "Two-precents: " + player.twoPercent.toFixed(2) + "%": "";
                let threePercent = document.querySelector(`#${player.position} .tree-precents`) as HTMLDivElement;
                threePercent!== null? threePercent.textContent= "Three-precents: " + player.threePercent.toFixed(2) + "%": "";
            }
            
        })
    }
}
//initial page load
insertPlayersInCards();
createTable();

