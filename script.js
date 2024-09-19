var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
var _this = this;
var table = document.getElementById('resuts-table');
//get data from API
function fetchData(Requirements) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('https://nbaserver-q21u.onrender.com/api/filter', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(Requirements),
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    console.log(data);
                    return [2 /*return*/, data];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
;
function fillTable(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            data.forEach(function (player) {
                var row = table.insertRow();
                row.insertCell(0).textContent = player.playerName || "null";
                row.insertCell(1).textContent = player.position;
                row.insertCell(2).textContent = player.points.toString();
                row.insertCell(3).textContent = player.twoPercent.toFixed(2) + "%";
                row.insertCell(4).textContent = player.threePercent.toFixed(2) + "%";
                var button = document.createElement("button");
                button.textContent = "Add ".concat(player.playerName, " to Current Team");
                button.className = "adding-player-button";
                button.onclick = function () { return addPlayer(player); };
                row.insertCell(5).appendChild(button);
            });
            return [2 /*return*/];
        });
    });
}
function createTable() {
    return __awaiter(this, void 0, void 0, function () {
        var header, cell0, cell1, cell2, cell3, cell4, cell5;
        return __generator(this, function (_a) {
            header = document.createElement("tr");
            header.id = "table-header";
            cell0 = document.createElement("th");
            cell0.textContent = "Player";
            cell1 = document.createElement("th");
            cell1.textContent = "Position";
            cell2 = document.createElement("th");
            cell2.textContent = "Points";
            cell3 = document.createElement("th");
            cell3.textContent = "FG%";
            cell4 = document.createElement("th");
            cell4.textContent = "3P%";
            cell5 = document.createElement("th");
            cell5.textContent = "Action";
            header.appendChild(cell0);
            header.appendChild(cell1);
            header.appendChild(cell2);
            header.appendChild(cell3);
            header.appendChild(cell4);
            header.appendChild(cell5);
            table.appendChild(header);
            return [2 /*return*/];
        });
    });
}
(_a = document.getElementById("search-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
    var position, twoPercent, threePercent, points, requirements, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                position = document.getElementById("player-position").value;
                twoPercent = document.getElementById("two-percent-input").valueAsNumber;
                threePercent = document.getElementById("three-percent-input").valueAsNumber;
                points = document.getElementById("points").valueAsNumber;
                requirements = {
                    position: position,
                    twoPercent: twoPercent,
                    threePercent: threePercent,
                    points: points,
                };
                console.log("requirements: " + requirements.points);
                return [4 /*yield*/, fetchData(requirements)];
            case 1:
                data = _a.sent();
                console.log("data: " + data);
                if (!data) return [3 /*break*/, 3];
                return [4 /*yield*/, fillTable(data)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
function addPlayer(player) {
    var team = localStorage.getItem("team");
    if (team === null) {
        var players = [];
        players.push(player);
        localStorage.setItem("team", JSON.stringify(players));
    }
    else {
        var teamList = JSON.parse(team);
        teamList.push(player);
        localStorage.setItem("team", JSON.stringify(teamList));
    }
    insertPlayersInCards();
}
// insert exsits playwer in team cards
var team = localStorage.getItem("team");
function insertPlayersInCards() {
    if (team) {
        var teamList = JSON.parse(team);
        teamList.forEach(function (player) {
            if (player) {
                var name_1 = document.querySelector(".member-card #".concat(player.position));
                name_1 !== null ? name_1.textContent = player.playerName || "" : "";
                var position = document.querySelector("#".concat(player.position, " .name"));
                position !== null ? position.textContent = player.position : "";
                var points = document.querySelector("#".concat(player.position, " .points"));
                points !== null ? points.textContent = "points: " + player.points.toString() : "";
                var twoPercent = document.querySelector("#".concat(player.position, " .Two-precents"));
                twoPercent !== null ? twoPercent.textContent = "Two-precents: " + player.twoPercent.toFixed(2) + "%" : "";
                var threePercent = document.querySelector("#".concat(player.position, " .tree-precents"));
                threePercent !== null ? threePercent.textContent = "Three-precents: " + player.threePercent.toFixed(2) + "%" : "";
            }
        });
    }
}
//initial page load
insertPlayersInCards();
createTable();
