// Declare allExpenseItems globally
const allExpenseItems = document.querySelector(".expense-list");

// Total Budget Section
const totalBudgetField = document.querySelector("#budget-form");
const inputOne = document.querySelector("#budget-input");
const budgetUi = document.querySelector("#budget-amount");

inputOne.value = "";

totalBudgetField.addEventListener("submit", function (event) {
    event.preventDefault();

    if (inputOne.value === "") {
        alert("Please Enter Your Budget");
        return;
    }

    budgetUi.innerText = inputOne.value;
    inputOne.value = "";

    // Clear the expense list
    allExpenseItems.innerHTML = "";

    // Reset expense amount to 0
    const allExpenseAmountUi = document.querySelector("#expense-amount");
    allExpenseAmountUi.innerText = "0";

    updateBalance();
});

// Expense Section

// Add Expenses
const totalExpenseField = document.querySelector("#expense-form");
const inputTwo = document.querySelector("#expense-input");
const inputThree = document.querySelector("#amount-input");

inputTwo.value = "";
inputThree.value = "";

totalExpenseField.addEventListener("submit", function (event) {
    event.preventDefault();

    if (inputTwo.value === "" || inputThree.value === "") {
        alert("Please Enter Your Expense and Amount");
        return;
    }

    // Create a new expense element
    const newExpense = document.createElement("div");
    newExpense.className = "expense";
    newExpense.innerHTML = `<div class="expense-item d-flex justify-content-between align-items-baseline">
        <h6 class="expense-title mb-0 text-uppercase list-item">- ${inputTwo.value}</h6>
        <h5 class="expense-amount mb-0 list-item">${inputThree.value}</h5>
        <div class="expense-icons list-item">
            <a href="#" class="delete-icon">
                <i class="fas fa-trash"></i>
            </a>
        </div>
    </div>`;

    // Append the new expense to the list
    allExpenseItems.appendChild(newExpense);

    // Clear input values
    inputTwo.value = "";
    inputThree.value = "";

    // Update calculations
    deleteFnc();
    multiplyExpenses();
    updateBalance();
});

// Delete Expenses
function deleteFnc() {
    const deleteButtons = document.querySelectorAll(".delete-icon");
    deleteButtons.forEach(function (deleteButton) {
        deleteButton.addEventListener("click", function (event) {
            event.preventDefault();
            const currentExpense = event.target.closest(".expense");
            if (confirm("Are You Sure?")) {
                currentExpense.remove();
                // Update calculations after deletion
                multiplyExpenses();
                updateBalance();
            }
        });
    });
}

// Calculate Expenses
function multiplyExpenses() {
    const allExpenseAmounts = document.querySelectorAll(".expense-amount");
    let totalAmount = 0;

    allExpenseAmounts.forEach(function (singleAmount) {
        totalAmount += parseFloat(singleAmount.innerText);
    });

    const allExpenseAmountUi = document.querySelector("#expense-amount");
    allExpenseAmountUi.innerText = totalAmount.toFixed();
}

// Update Balance
function updateBalance() {
    const allExpenseAmountUi = document.querySelector("#expense-amount");
    const budgetUi = document.querySelector("#budget-amount");
    const balanceUi = document.querySelector("#balance-amount");
    const totalBudget = parseFloat(budgetUi.innerText);
    const totalExpenses = parseFloat(allExpenseAmountUi.innerText);
    const remainingBalance = totalBudget - totalExpenses;

    balanceUi.innerText = remainingBalance.toFixed();
}

// Call the function to update balance initially
updateBalance();