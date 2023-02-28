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
    <h2>Results:</h2>
    <p>Net Selling Price: ${formatter.format(netSellingPrice)}</p>
	<br>
    <p>VAT (12%): ${formatter.format(vat)}</p>
    <p>Other Fees (8%): ${formatter.format(otherFees)}</p>
	<br>
    <p>Total Contract Price: ${formatter.format(totalContractPrice)}</p>
	<br>
    <p>Down Payment (20%): ${formatter.format(downPayment)}</p>
    <p>Net Down Payment: ${formatter.format(netDownPayment)}</p>
	<p> No. of Months: 72 Months </p>
	<p>Monthly Amortization: ${formatter.format(monthlyAmortization)}</p>
	<br><br>
    <p>Balance Payment: ${formatter.format(balancePayment)}</p>
    
  `;
});
