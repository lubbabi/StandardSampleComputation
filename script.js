const form = document.getElementById('computation-form');
const resultsContainer = document.getElementById('results-container');
const bodyElement = document.body;
const currentTitle = document.title;

window.addEventListener("blur", () => {
  document.title = "You're away (>_<)";
});

window.addEventListener("focus", () => {
  document.title = currentTitle;
});

const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const uspInput = document.getElementById('unit-selling-price');
  let usp = null;

  // Check if the input value is a valid number
  if (!isNaN(uspInput.value) && uspInput.value.trim() !== '') {
    usp = parseFloat(uspInput.value);
  } else {
    // Display an error message to the user
    alert('Please enter a valid numeric value for Unit Selling Price');
    return;
  }

  let totalDiscount = 0;
  let nusp = usp;

  for (let i = 1; i <= 4; i++) {
    const discountInput = document.getElementById(`discount${i}`);
    let discount = null;

    // Check if the discount input value is a valid number
    if (!isNaN(discountInput.value) && discountInput.value.trim() !== '') {
      discount = parseFloat(discountInput.value);
    } else {
      // Display an error message to the user
      alert(`Please enter a valid numeric value for Discount ${i}`);
      return;
    }

    const discountAmount = nusp * discount / 100;
    totalDiscount += discountAmount;

    nusp -= discountAmount;

    // Display the total USP after each discount
    const discountResultContainer = document.createElement('div');
	discountResultContainer.innerHTML = `<p>Total USP after Discount ${i}: ${formatter.format(nusp)} (${discount}discount)</p>`;
	resultsContainer.appendChild(discountResultContainer);

  }

  const netSellingPrice = nusp;
  const otherFees = netSellingPrice * 0.08;
  const vat = netSellingPrice > 2200000 ? netSellingPrice * 0.12 : 0;
  const totalContractPrice = netSellingPrice + vat + otherFees;
  const downPayment = totalContractPrice * 0.2;
  const netDownPayment = downPayment - 15000;
  const balancePayment = totalContractPrice * 0.8;
  const monthlyAmortization = netDownPayment / 72;

  // Display the final computation results
  resultsContainer.innerHTML = '';
    const finalResultContainer = document.createElement('div');
  finalResultContainer.innerHTML = `
    <h2 style="text-align:center"> > RESULT < </h2>
    ${Array.from(Array(4)).map((_, i) => {
      const discountAmount = usp * parseFloat(document.getElementById(`discount${i + 1}`).value) / 100;
      usp -= discountAmount;
      return `<p style="color:white">Total USP after Discount ${i + 1}: ${formatter.format(usp)}</p>`;
    }).join('')}
    <br>
    <p style="color:white"> Net Selling Price: ${formatter.format(netSellingPrice)}</p>
    <br>
    <p style="color:white"> Other Fees (8%): ${formatter.format(otherFees)}</p>
    <p style="color:white"> VAT (12%): ${formatter.format(vat)}</p>
    <p style="color:white"> Total Contract Price: ${formatter.format(totalContractPrice)}</p>
    <br>
    <p style="color:white"> Down Payment (20%): ${formatter.format(downPayment)}</p>
    <p style="color:white"> Net Down Payment: ${formatter.format(netDownPayment)}</p>
    <p style="color:white"> No. of Months: 72 Months </p>
    <p style="color:white"> Monthly Amortization: ${formatter.format(monthlyAmortization)}</p>
    <br><br>
    <p style="color:white"> Balance Payment (80%): ${formatter.format(balancePayment)}</p>
  `;
   resultsContainer.appendChild(finalResultContainer);

});

  const audio = document.getElementById("audio-player");
  const playPauseButton = document.getElementById("play-pause-button");
  const previousButton = document.getElementById("previous-button");
  const nextButton = document.getElementById("next-button");
  const audioElement = document.querySelector('audio');
  audioElement.volume = 0.2; // Change 0.2 to adjust

  let isPlaying = false;
  const audioSources = [
    "Sugar-Cookie.mp3",
    "Soso.mp3",
    "Tea-Time.mp3"
  ];
  let currentAudioIndex = 0;

  function playAudio() {
    audio.play();
    playPauseButton.innerText = "Pause";
    isPlaying = true;
  }

  function pauseAudio() {
    audio.pause();
    playPauseButton.innerText = "Play";
    isPlaying = false;
  }

  function togglePlayPause() {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }

  function playNextTrack() {
    currentAudioIndex = (currentAudioIndex + 1) % audioSources.length;
    audio.src = audioSources[currentAudioIndex];
    playAudio();
  }

  function playPreviousTrack() {
    currentAudioIndex = (currentAudioIndex - 1 + audioSources.length) % audioSources.length;
    audio.src = audioSources[currentAudioIndex];
    playAudio();
  }

  playPauseButton.addEventListener("click", function() {
  if (isPlaying) {
    audio.pause();
    playPauseButton.innerText = "Play";
  } else {
    audio.play();
    playPauseButton.innerText = "Pause";
  }
  isPlaying = !isPlaying;
});
