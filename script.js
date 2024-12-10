let timeRemaining = 300; // Timer starts at 300 seconds
let score = 0;
let hintCount = 0;
const maxHints = 4;
let correctSuspect = Math.floor(Math.random() * 8); // Randomly choose Patient Zero
let currentClueIndex = 0;

// Backstory for the game
const backstory = `
  A mysterious viral outbreak has occurred during a high-profile international medical conference. 
  Symptoms have started spreading among the attendees, and the situation is escalating quickly. 
  The virus's source, "Patient Zero," must be identified to prevent a full-blown epidemic.

  Eight attendees are under investigation. Each has been exposed to potential infection 
  scenarios, and their activities before and during the conference have raised suspicions. 
  You, as the lead epidemiologist, must analyze the evidence, interview individuals, 
  and use the clues to pinpoint the origin of the outbreak before it spirals out of control. 
`;

// Display backstory
document.getElementById("story").textContent = backstory;

// Individuals under investigation
const suspects = [
  {
    name: "Dr. Renuka",
    backstory: "An infectious disease expert who recently returned from an outbreak zone. Known for her tireless dedication to research, but her frequent travel to high-risk areas raises questions about exposure. Conference attendees noticed her coughing during her keynote presentation.",
    clues: [
      "Security footage captured her disposing of a biohazard bag in a restricted area.",
      "Her hotel room contained a discarded surgical mask with traces of a rare pathogen.",
      "Her conference badge showed traces of a disinfectant used in high-risk zones.",
      "Her luggage included blood samples from another outbreak site."
    ]
  },
  {
    name: "Dr. Abdulahi",
    backstory: "A pharmaceutical representative showcasing a new antiviral medication. Known for his charm and aggressive marketing tactics, but whispers suggest he cut corners during clinical trials. His frequent physical contact with attendees raises suspicion.",
    clues: [
      "A handkerchief he left behind tested positive for the virus.",
      "Emails revealed his company knew about potential contamination risks.",
      "A promotional sample he handled had traces of the virus on its packaging.",
      "His booth was located next to a vent spreading the virus in the exhibition hall."
    ]
  },
  {
    name: "Dr. Pam",
    backstory: "A public health official who recently coordinated a vaccination campaign. Known for her advocacy, but her reluctance to disclose her health status at the conference drew attention. Witnesses observed her taking multiple breaks, looking fatigued.",
    clues: [
      "She was seen coughing into a tissue near the buffet table.",
      "Her water bottle contained a residue of a medication prescribed for flu-like symptoms.",
      "A used tissue she left behind contained traces of the virus.",
      "Her travel itinerary showed a stopover in a high-risk country."
    ]
  },
  {
    name: "Dr. Abel",
    backstory: "A virologist specializing in rare pathogens. Known for his brilliance but criticized for his reckless experiments. He was overheard discussing a ‘unique strain’ during a private conversation.",
    clues: [
      "His lab coat had a stain containing traces of the virus.",
      "A contaminated petri dish was found in his conference briefcase.",
      "He reported missing samples from his laboratory prior to the conference.",
      "His presentation slides included images of the pathogen's structure."
    ]
  },
  {
    name: "Dr. Abha",
    backstory: "A pediatrician attending the conference to present on vaccine hesitancy. Known for her empathy, but she appeared unusually quiet and withdrawn during the event. Her sudden absence from the gala dinner raised eyebrows.",
    clues: [
      "A tissue from her purse contained traces of the virus.",
      "Her smartphone had recent searches for 'early outbreak symptoms.'",
      "Her roommate reported seeing her disinfecting surfaces obsessively.",
      "A room service receipt was found with traces of the virus."
    ]
  },
  {
    name: "Dr. Connor",
    backstory: "A surgeon who spent time in a hospital with a recent outbreak. Known for his skill under pressure, but he exhibited signs of fatigue and stress throughout the conference. He also avoided handshakes with colleagues.",
    clues: [
      "He was overheard making a phone call about 'exposure protocols.'",
      "His conference pass had faint smudges of a rare disinfectant.",
      "A discarded coffee cup with his name tested positive for the virus.",
      "A surgical kit he carried contained biohazard material."
    ]
  },
  {
    name: "Dr. Sarah",
    backstory: "A nutritionist advocating for immunity-boosting diets. Known for her eccentric theories, she shared homemade supplements with attendees, raising concerns about their contents. Her erratic behavior was noted by several participants.",
    clues: [
      "Her conference notes referenced a 'biological cleansing.'",
      "The supplement she distributed were found to contain trace amounts of the virus.",
      "Her gloves, found in the trash, tested positive for the pathogen.",
      "She had a heated argument about 'natural immunity' before the outbreak.",
    ]
  },
  {
    name: "Dr. Alexes",
    backstory: "A geneticist studying virus mutation patterns. Known for her groundbreaking research, but her reclusive nature and refusal to interact socially drew attention. She claimed to be feeling 'under the weather' during her panel discussion.",
    clues: [
      "Her laptop contained a draft paper on the newly identified virus.",
      "Her mask worn throughout the event was found discarded and contaminated with a different strain of the virus.",
      "Her travel itinerary showed visits to multiple research labs with outbreak histories.",
      "Her personal diary mentioned being exposed to a 'carrier' prior to the conference."
    ]
  }
];

// Timer countdown logic
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const hintTextElement = document.getElementById("hint-text");

const timer = setInterval(() => {
  if (timeRemaining > 0) {
    timeRemaining--;
    timerElement.textContent = timeRemaining;
  } else {
    clearInterval(timer);
    endGame(false); // End game if time runs out
  }
}, 1000); // Countdown every second

// Function to display suspects
function displaySuspects() {
  const suspectsPage = document.getElementById("suspects-page");
  const suspectsList = document.getElementById("suspects-list");
  suspectsPage.classList.remove("hidden");
  document.getElementById("game-container").classList.add("hidden");

  suspectsList.innerHTML = ""; // Clear previous suspects
  suspects.forEach((suspect, index) => {
    const suspectDiv = document.createElement("div");
    suspectDiv.className = "suspect";
    suspectDiv.innerHTML = `
      <h4>${suspect.name}</h4>
      <p>${suspect.backstory}</p>
      <button onclick="guessSuspect(${index})">Accuse</button>
    `;
    suspectsList.appendChild(suspectDiv);
  });
}

// Function to handle hints
function getHint() {
  if (hintCount < maxHints) {
    hintTextElement.textContent = suspects[correctSuspect].clues[currentClueIndex];
    currentClueIndex = (currentClueIndex + 1) % suspects[correctSuspect].clues.length;
    hintCount++;
    score -= 5; // Deduct points for using a hint
    scoreElement.textContent = score;
  } else {
    hintTextElement.textContent = "No more hints available!";
  }
}

// Function to handle accusations
function guessSuspect(index) {
  if (index === correctSuspect) {
    score += 15;
    endGame(true);
  } else {
    score -= 10; // Deduct points for incorrect guess
    scoreElement.textContent = score;
    window.alert("Wrong guess! Try again.");
  }
}

// Function to end the game
function endGame(win) {
  clearInterval(timer); // Stop the timer
  const endScreen = document.getElementById("end-screen");
  const gameContainer = document.getElementById("game-container");
  const suspectsPage = document.getElementById("suspects-page");

  gameContainer.classList.add("hidden");
  suspectsPage.classList.add("hidden");
  endScreen.classList.remove("hidden");

  const endMessage = document.getElementById("end-message");
  const culpritDetails = document.getElementById("culprit-details");

  if (win) {
    endMessage.textContent = `Congratulations! You found Patient Zero, ${suspects[correctSuspect].name}!`;
    culpritDetails.textContent = `Your final score is ${score}.`;
  } else {
    endMessage.textContent = `Game Over! Time ran out. Patient Zero was ${suspects[correctSuspect].name}.`;
    culpritDetails.textContent = `Your final score is ${score}.`;
  }
}

// Event listeners for buttons
document.getElementById("suspects-button").addEventListener("click", displaySuspects);
document.getElementById("hint-button").addEventListener("click", getHint);
document.getElementById("back-button").addEventListener("click", () => {
  document.getElementById("suspects-page").classList.add("hidden");
  document.getElementById("game-container").classList.remove("hidden");
});
