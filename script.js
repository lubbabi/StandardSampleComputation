const form = document.getElementById('computation-form');
const resultsContainer = document.getElementById('results-container');
const bodyElement = document.body;

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
    totalDiscount += discount;

    nusp -= discountAmount;
  }

  const netSellingPrice = nusp;
  const vat = netSellingPrice > 3200000 ? netSellingPrice * 0.12 : 0;
  const otherFees = netSellingPrice * 0.08;
  const totalContractPrice = netSellingPrice + vat + otherFees;
  const downPayment = totalContractPrice * 0.2;
  const netDownPayment = downPayment - 15000;
  const balancePayment = totalContractPrice * 0.8;
  const monthlyAmortization = netDownPayment / 72;

  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  resultsContainer.innerHTML = `
    <h2 style="text-align:center"> > RESULT < </h2>
    <p style="color:white"> Net Selling Price: ${formatter.format(netSellingPrice)}</p>
	<br>
    <p style="color:white"> VAT (12%): ${formatter.format(vat)}</p>
    <p style="color:white"> Other Fees (8%): ${formatter.format(otherFees)}</p>
	<br>
    <p style="color:white"> Total Contract Price: ${formatter.format(totalContractPrice)}</p>
	<br>
    <p style="color:white"> Down Payment (20%): ${formatter.format(downPayment)}</p>
    <p style="color:white"> Net Down Payment: ${formatter.format(netDownPayment)}</p>
	<p style="color:white"> No. of Months: 72 Months </p>
	<p style="color:white"> Monthly Amortization: ${formatter.format(monthlyAmortization)}</p>
	<br><br>
    <p style="color:white" > Balance Payment: ${formatter.format(balancePayment)}</p>
  `;
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

  playPauseButton.addEventListener("click", togglePlayPause);
  nextButton.addEventListener("click", playNextTrack);
  previousButton.addEventListener("click", playPreviousTrack);