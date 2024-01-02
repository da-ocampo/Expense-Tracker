let hourlyRate, hoursPerWeek, monthlyIncome;
let expenses = [];

function calculateMonthlyIncome() {
    hourlyRate = parseFloat(document.getElementById('hourlyRate').value) || 0;
    hoursPerWeek = parseFloat(document.getElementById('hoursPerWeek').value) || 0;

    if (hourlyRate === 0 || hoursPerWeek === 0) {
        alert("Please enter valid values for hourly rate and hours per week.");
        return;
    }

    monthlyIncome = hourlyRate * hoursPerWeek * 4;

    document.getElementById('monthlyIncome').innerText = `Your monthly gross pay is $${monthlyIncome.toFixed(2)}`;
    document.getElementById('slide2').style.display = 'block';
}

function addExpense() {
    const expenseItem = document.createElement('li');
    expenseItem.className = 'expense-item';

    const createInputElement = (type, placeholder) => {
        const input = document.createElement('input');
        input.type = type;
        input.placeholder = placeholder;
        return input;
    };

    const expenseNameInput = createInputElement('text', 'Expense Name');
    const expenseAmountInput = createInputElement('number', 'Amount');

    const expenseCategorySelect = document.createElement('select');
    ['Need', 'Want'].forEach(category => {
        const option = document.createElement('option');
        option.value = category.toLowerCase();
        option.text = category;
        expenseCategorySelect.add(option);
    });

    const removeExpenseBtn = document.createElement('span');
    removeExpenseBtn.className = 'remove-expense';
    removeExpenseBtn.innerHTML = 'x';
    removeExpenseBtn.onclick = () => {
        expenseItem.remove();
        calculateExpenses();
    };

    expenseItem.appendChild(expenseNameInput);
    expenseItem.appendChild(expenseAmountInput);
    expenseItem.appendChild(expenseCategorySelect);
    expenseItem.appendChild(removeExpenseBtn);

    document.getElementById('expenses-list').appendChild(expenseItem);
}

function calculateExpenses() {
    expenses = Array.from(document.getElementsByClassName('expense-item')).map(expenseItem => ({
        name: expenseItem.children[0].value,
        amount: parseFloat(expenseItem.children[1].value) || 0,
        category: expenseItem.children[2].value,
    }));

    if (expenses.length < 2) {
        alert("Please add at least two expenses before proceeding.");
        return;
    }

    const totalIncome = monthlyIncome;
    const totalNeeds = expenses.reduce((acc, expense) => expense.category === 'need' ? acc + expense.amount : acc, 0);
    const totalWants = expenses.reduce((acc, expense) => expense.category === 'want' ? acc + expense.amount : acc, 0);

    const needsPercentage = Math.min(((totalNeeds / totalIncome) * 100), 100).toFixed(2);
    const wantsPercentage = Math.min(((totalWants / totalIncome) * 100), 100).toFixed(2);

    const needsAmount = totalNeeds.toFixed(2);
    const wantsAmount = totalWants.toFixed(2);

    const savingsPercentage = 20;
    const savingsAmount = (monthlyIncome * (savingsPercentage / 100)).toFixed(2);

    const leftForWants = (monthlyIncome - totalNeeds - savingsAmount).toFixed(2);

    const totalPercentage = parseFloat(needsPercentage) + parseFloat(wantsPercentage) + savingsPercentage;

    if (totalPercentage > 100) {
        alert("Warning: Your total expenses for needs and wants exceed 100%. Please reconsider your budgeting.");
        return;
    }

    document.getElementById('needsPercentage').innerText = `${needsPercentage}% of your income is allocated to necessities, totaling $${needsAmount}.`;
    document.getElementById('wantsPercentage').innerText = `${wantsPercentage}% of your income is designated for luxuries, amounting to $${wantsAmount} for your wants.`;

    document.getElementById('leftForWants').innerText = `To ensure a well-rounded financial approach, it is advisable to reserve a minimum of 30% of your income for discretionary expenses, translating to $${leftForWants} left over for your wants. Additionally, consider saving 20% of your income for future goals; this would allow you to set aside $${savingsAmount} each month.`;

    document.getElementById('slide3').style.display = 'block';
}
