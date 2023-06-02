'use strict';

let start                   = document.getElementById('start'),
    cancel                  = document.getElementById('cancel'),
    addIncomePlus           = document.getElementsByTagName('button')[0],
    addExpensesPlus         = document.getElementsByTagName('button')[1],
    depositCheck            = document.querySelector('#deposit-check'),
    additionalIncomeItems   = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue        = document.querySelector('.budget_month-value'),
    bugetDayValue           = document.querySelector('.budget_day-value'),
    expencesMonthValue      = document.querySelector('.expenses_month-value'),
    addIncomeValue          = document.querySelector('.additional_income-value'),
    incomePeriodValue       = document.querySelector('.income_period-value'),
    targetMonthValue        = document.querySelector('.target_month-value'),
    salaryAmount            = document.querySelector('.salary-amount'),
    targetAmount            = document.querySelector('.target-amount'),
    expenses                = document.querySelectorAll('.expenses-title'),
    expensesAmount          = document.querySelectorAll('.expenses-amount'),
    expensesItems           = document.querySelectorAll('.expenses-items'),
    addExpensesItem         = document.querySelector('.additional_expenses-item'),
    periodSelect            = document.querySelector('.period-select'),
    addiExpensesValue       = document.querySelector('.additional_expenses-value'),
    incomeItems             = document.querySelectorAll('.income-items'),
    periodAmount            = document.querySelector('.period-amount'),
    allTextInputs           = document.querySelectorAll('input[type=text]');

const appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    perscentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    targetMonth: 0,
    incomeMonth: 0,
    
    start: function () {
        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getTargetMonth();
        this.getBudget();

        this.showResult();
    },
  
    getStatusIncome: function () {
        if (this.budgetDay > 1200) 
        {
            return'У вас высокий уровень дохода';
        } else if (this.budgetDay <= 1200 && this.budgetDay >= 600 ) 
        {
            return'У вас средний уровень дохода';
        } else if (this.budgetDay < 600) 
        {
            return'К сожалению у вас уровень дохода ниже среднего';
        } else 
        {
            return'Что то пошло не так';
        }
    },
    
    getExpensesMonth: function () {
        this.monthExpenses = 0;
        Object.values(this.expenses).forEach((item) => {
            this.monthExpenses += item
        })

        return this.monthExpenses
    },
    
    getBudget: function () {
        this.budgetMonth = this.budget + this.incomeMonth - this.monthExpenses;
        this.budgetDay = +(this.budgetMonth / 30).toFixed(2);

        return this.budgetDay, this.budgetMonth
    },
    
    getTargetMonth: function () {
        if (targetAmount.value !== '') {
            let monthToTarget = Math.ceil(targetAmount.value / this.budgetMonth);
            
            if (monthToTarget > 0) 
            {
                return monthToTarget
            }else 
            {       
                return 'Цель не будет достигнута'
            }
        }
    },

    // getInfoDeposit: function () {
    //     if (appData.deposit) 
    //     {
    //         appData.moneyDeposit    = inputNumber('Какая сумма у вас на счету?', 100000);
    //         appData.perscentDeposit = inputNumber('Под какой процент?', 10);
    //     }
    // },

    calcSavedMoney: function () {
        return this.budgetMonth * this.period;
    },

    addExpensesBlock: function () {
        let newItem = expensesItems[expensesItems.length - 1].cloneNode(true);
        newItem.querySelector('.expenses-title').value = '';
        newItem.querySelector('.expenses-amount').value = '';
        expensesItems[expensesItems.length - 1].after(newItem);
        expensesItems = document.querySelectorAll('.expenses-items');

        let newBlock = expensesItems[expensesItems.length - 1];
        checkInput(newBlock.querySelector('.expenses-title'), russianLetters);
        checkInput(newBlock.querySelector('.expenses-amount'), digits);

        if (expensesItems.length === 3) {
            addExpensesPlus.style.display = 'none'
        }
    },

    addIncomeBlock: function () {
        let newItem = incomeItems[incomeItems.length - 1].cloneNode(true);
        newItem.querySelector('.income-title').value = null;
        newItem.querySelector('.income-amount').value = null;
        incomeItems[incomeItems.length - 1].after(newItem);
        incomeItems = document.querySelectorAll('.income-items');
        
        let newBlock = incomeItems[incomeItems.length - 1];
        checkInput(newBlock.querySelector('.income-title'), russianLetters);
        checkInput(newBlock.querySelector('.income-amount'), digits);

        if (incomeItems.length === 3) {
            addIncomePlus.style.display = 'none'
        }

    },

    getExpenses: function () {
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = +item.querySelector('.expenses-amount').value;
            
            if (itemExpenses !== '' && cashExpenses !== '') this.expenses[itemExpenses] = cashExpenses;
        });
    },

    getIncome: function () {
        incomeItems.forEach((item) => {
                let itemIncome = item.querySelector('.income-title').value;
                let cashIncome = item.querySelector('.income-amount').value;
                if (itemIncome !== '' && cashIncome !== '') this.income[itemIncome] = +cashIncome;
            }
        )

        for (let key in this.income)
        {
            this.incomeMonth += this.income[key];
        }
    },

    getAddExpenses: function () {
        let addExpenses = addExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') this.addExpenses.push(item);
        })
    },

    getAddIncome: function () {
        additionalIncomeItems.forEach((item) => {
            let itemValue = item.value.trim();
            if (itemValue !== '') this.addIncome.push(itemValue)

        });
    },

    calcPeriod: function () {
        return this.budgetMonth * periodSelect.value;
    },

    showResult: function () {
        budgetMonthValue.value = this.budgetMonth; 
        bugetDayValue.value = this.budgetDay; 
        expencesMonthValue.value = this.expensesMonth;
        addiExpensesValue.value = this.addExpenses.join(', ');
        addIncomeValue.value = this.addIncome.join(', ');
        if (targetAmount.value !== '') targetMonthValue.value = this.getTargetMonth();        
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('change', function () {
            incomePeriodValue.value = this.calcPeriod();
        });
    },

    reset: function () {
        this.income = {}
        this.addIncome = []
        this.expenses = {}
        this.addExpenses = []
        this.deposit = false
        this.perscentDeposit = 0
        this.moneyDeposit = 0
        this.budget = 0
        this.budgetDay = 0
        this.budgetMonth = 0
        this.expensesMonth = 0
        this.targetMonth = 0
        this.incomeMonth = 0

        this.showResult()

        allTextInputs.forEach((item) => {
            item.value = ''
        })

        periodSelect.value = 1
        periodAmount.textContent = periodSelect.value;

        while (incomeItems.length > 1) {
            incomeItems[incomeItems.length -1].remove()
            incomeItems = document.querySelectorAll('.income-items')
        }

        while (expensesItems.length > 1) {
            expensesItems[expensesItems.length -1].remove()
            expensesItems = document.querySelectorAll('.income-items')
        }

        addExpensesPlus.style.display = 'block'
        addIncomePlus.style.display = 'block'

    },
};

const checkInput = (input, validCharacters) => {
    input.addEventListener('input', () => {
        if(!validCharacters.test(input.value[input.value.length - 1])) {
            input.value = input.value.slice(0, [input.value.length - 1])
        }
    });
}

const russianLetters = /^[\u0400-\u04FF\s.,!?;:()"'-]+$/;
const digits = /\d/;

checkInput(salaryAmount, digits)
checkInput(incomeItems[0].querySelector('.income-title'), russianLetters);
checkInput(incomeItems[0].querySelector('.income-amount'), digits);
checkInput(expensesItems[expensesItems.length - 1].querySelector('.expenses-title'), russianLetters);
checkInput(expensesItems[expensesItems.length - 1].querySelector('.expenses-amount'), digits);

additionalIncomeItems.forEach((item) => {
    checkInput(item, russianLetters);
});

checkInput(addExpensesItem, russianLetters);
checkInput(targetAmount, digits);

start.disabled = true
salaryAmount.addEventListener('input', () => {
    if (salaryAmount.value !== '') start.disabled = false
})

start.addEventListener('click', () => {
    appData.start.call(appData)
    
    allTextInputs = document.querySelectorAll('input[type=text]')
    allTextInputs.forEach((item) => {
        item.disabled = true
    })
    periodSelect.disabled = true
    
    start.style.display = 'none'
    cancel.style.display = 'block'
});    

cancel.addEventListener('click', () => {
    appData.reset.call(appData)
    allTextInputs.forEach((item) => {
        item.disabled = false
    })
    periodSelect.disabled = false
    start.style.display = 'block'
    cancel.style.display = 'none'
});    

addExpensesPlus.addEventListener('click', appData.addExpensesBlock);
addIncomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', () => {
    periodAmount.textContent = periodSelect.value;
});

