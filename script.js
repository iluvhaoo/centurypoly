const tokens = [
  '<img src="img/asci.png" width="60">',
  '<img src="img/sovalye.png" width="60">',
  '<img src="img/filozof.png" width="60">',
  '<img src="img/cadi.png" width="60">',
  '<img src="img/padisah.png" width="60">',
  '<img src="img/kralice.png" width="60">'
];

let players = [];
let currentPlayer = 0;
let isSpinning = false;
let usedIndexes = [];
let totalRotation = 0;

function startGameFlow() {
  document.getElementById("mainMenu").style.display = "none";
  document.getElementById("gameSection").style.display = "block";
}

function startDiceFlow() {
  document.getElementById("mainMenu").style.display = "none";
  document.getElementById("diceSection").style.display = "block";
}

function showNameInputs() {
  const playerCount = parseInt(document.getElementById("playerCount").value);
  const inputsContainer = document.getElementById("inputsContainer");
  inputsContainer.innerHTML = "";

  for (let i = 0; i < playerCount; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = `Oyuncu ${i + 1} adı`;
    input.id = `player${i}`;
    inputsContainer.appendChild(input);
    inputsContainer.appendChild(document.createElement("br"));
  }

  document.getElementById("nameInputs").style.display = "block";
}

function startGame() {
  const playerCount = parseInt(document.getElementById("playerCount").value);
  players = [];

  for (let i = 0; i < playerCount; i++) {
    const name = document.getElementById(`player${i}`).value.trim();
    players.push(name === "" ? `Oyuncu ${i + 1}` : name);
  }

  currentPlayer = 0;
  usedIndexes = [];
  document.getElementById("wheel-container").style.display = "block";
  document.getElementById("nameInputs").style.display = "none";
  document.getElementById("result").innerText = `${players[currentPlayer]} için çevir!`;
  document.getElementById("spin-btn").disabled = false;
}

function spin() {
  if (isSpinning) return;
  isSpinning = true;

  let availableIndexes = tokens
    .map((_, i) => i)
    .filter(i => !usedIndexes.includes(i));

  if (availableIndexes.length === 0) {
    document.getElementById("result").innerText = "Tüm piyonlar dağıtıldı!";
    return;
  }

  const spinAngle = Math.floor(Math.random() * 360);
  const extraSpins = 360 * 5;
  totalRotation += extraSpins + spinAngle;

  document.getElementById("wheel").style.transform = `rotate(${totalRotation}deg)`;

  setTimeout(() => {
    const finalAngle = totalRotation % 360;
    const sliceIndex = Math.floor((360 - finalAngle + 30) % 360 / 60);
    const selectedToken = tokens[sliceIndex];

    if (usedIndexes.includes(sliceIndex)) {
      document.getElementById("result").innerText = `⚠️ ${players[currentPlayer]} çevirisi boşa gitti, piyon daha önce alındı! Tekrar dene.`;
      isSpinning = false;
      return;
    }

    usedIndexes.push(sliceIndex);

    document.getElementById("result").innerHTML =
      `🎉 ${players[currentPlayer]} → ${selectedToken} piyonunu aldı!`;

    currentPlayer++;
    isSpinning = false;

    if (currentPlayer >= players.length) {
      document.getElementById("spin-btn").disabled = true;
      document.getElementById("result").innerHTML += `<br>🎊 Oyun bitti!`;
    } else {
      document.getElementById("result").innerHTML += `<br>Şimdi ${players[currentPlayer]} çevirsin!`;
    }
  }, 4200);
}

function rollDice() {
  const result = Math.floor(Math.random() * 6) + 1;
  document.getElementById("diceResult").innerText = `🎲 Zar Sonucu: ${result}`;
}

function resetGame() {
  location.reload();
}
