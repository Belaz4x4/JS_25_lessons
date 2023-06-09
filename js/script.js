'use strict';

let startBtn            = document.getElementById('start'),
    resetBtn            = document.getElementById('reset'),
    screens             = document.querySelectorAll('.screen'),
    screenBtn           = document.querySelector('.screen-btn'),
    otherItems          = document.querySelectorAll('.other-items'),
    CMSOpen             = document.querySelector('#cms-open'),
    range               = document.querySelector('.main-controls__range > input'),
    rangeValue          = document.querySelector('.range-value'),
    layoutCost          = document.querySelector('#total'),
    screensValue        = document.querySelector('#total-count'),
    additionalCost      = document.querySelector('#total-count-other'),
    totalCost           = document.querySelector('#total-full-count'),
    rollbackCost        = document.querySelector('#total-count-rollback'),
    screenOptionsAmount = screens[0].querySelectorAll('.main-controls__select option').length;
    CMSOpen             = document.querySelector('#cms-open')

const   russianLetters    = /^[\u0400-\u04FF\s.,!?;:()"'-]+$/,
        digits            = /\d/;

const appData = {
    screensAmount: 0,
    screenPrice: 0,  
    rollback: 0,
    allServicePrices: 0,
    fullPrice: 0,
    servicePrcentPrice: 0,
    
    start: function () {
        if (this.checkScreens()) {
            this.getScreenPrice()
            this.getScreensAmount()
            this.getAllServicePrices()
            this.getFullPrice()
            this.getServicePercentPrice()
            this.switchBtns()
            this.switchInputs()
    
            this.showResult()
        }
    },
  
    getScreenPrice: function () {
        screens.forEach((item) => {
            let screenCost = +item.querySelector('option:checked').value
            let screensInItem = +item.querySelector('input').value
            
            this.screenPrice += screenCost * screensInItem

        })
    },

    getScreensAmount: function () {
        screens.forEach((item) => {
            let screensInItem = +item.querySelector('input').value
            
            this.screensAmount += screensInItem
        })
    },
    
    getAllServicePrices: function () {
        otherItems.forEach((item) => {
            let checkbox = item.querySelector('.custom-checkbox')
            
            if (checkbox.checked) 
            {
                let addServisePrice = +item.querySelector('input[type="text"]').value
                
                if (item.classList.contains('percent')) 
                {
                    this.allServicePrices += this.screenPrice * addServisePrice/100
                } else 
                {
                    this.allServicePrices += addServisePrice
                }
            }
        })
    },

    getFullPrice: function () {
        this.fullPrice = this.screenPrice + this.allServicePrices
    },

    getServicePercentPrice: function () {
        this.servicePrcentPrice = this.fullPrice + this.fullPrice*this.rollback/100
    },

    addScreenBlock: function () {       
        let newItem = screens[screens.length - 1].cloneNode(true);
        newItem.querySelector('input[type="text"]').value = '';
        screens[screens.length - 1].after(newItem);
        screens = document.querySelectorAll('.screen');

        let newBlockInput = screens[screens.length - 1].querySelector('input');
        newBlockInput.addEventListener('input', function () {
            appData.validateInput(newBlockInput, digits)
        });
        
        if (screens.length === screenOptionsAmount) {
            screenBtn.style.display = 'none'
        }
    },

    showResult: function () {
        layoutCost.value = this.screenPrice; 
        screensValue.value = this.screensAmount; 
        additionalCost.value = this.allServicePrices;
        totalCost.value = this.fullPrice;
        rollbackCost.value = this.servicePrcentPrice;
        rangeValue.textContent = range.value
    },

    reset: function () {
        this.screensAmount = 0
        this.screenPrice = 0  
        this.rollback = 0
        this.allServicePrices = 0
        this.fullPrice = 0
        this.servicePrcentPrice = 0
        
        range.value = '0'
        this.switchBtns()
        this.switchInputs()

        this.showResult()
        
        while (screens.length > 1) {
            screens[screens.length -1].remove()
            screens = document.querySelectorAll('.screen')
        }

        screenBtn.style.display = 'block'

        otherItems.forEach((item) => {
            item.querySelector('.custom-checkbox').checked = false
        })

        CMSOpen.checked = false
        range.value = this.rollback
        rangeValue.textContent = range.value
    },

    validateInput: function (input, validCharacters) {
        if(!validCharacters.test(input.value[input.value.length - 1])) 
        {
            input.value = input.value.slice(0, [input.value.length - 1])
        }
    },

    addListeners: function () {
        let screenAmount = screens[0].querySelector('input');
        screenAmount.addEventListener('input', function () {
            appData.validateInput(screenAmount, digits)
        });

        startBtn.addEventListener('click', () => {
            appData.start.call(appData)
        });    
        
        resetBtn.addEventListener('click', () => {
            appData.reset.call(appData)
        });    
        
        screenBtn.addEventListener('click', appData.addScreenBlock)
        
        range.addEventListener('input', () => {
            this.rollback = +range.value
            rangeValue.textContent = range.value
        });
            
        
    },

    checkScreens: function () {
        let dataEntered = false
        
        screens.forEach((item) => {
            let screen = item.querySelector('select').value
            let amount = item.querySelector('input').value
            
            if (Boolean(screen && amount)) 
            {
                dataEntered = true
                return 
            }
        })
        
        return dataEntered
    },
    
    switchBtns: function () {
        if (startBtn.style.display === 'block' || startBtn.style.display === '') 
        {
            startBtn.style.display = 'none'
            resetBtn.style.display = 'block'
        } else
        {
            startBtn.style.display = 'block'
            resetBtn.style.display = 'none'
        }
    },

    switchInputs: function () {

        screens.forEach((item) => {
            let screenInput = item.querySelector('input')
            appData.switchElement(screenInput)

            let screenSelect = item.querySelector('select')
            appData.switchElement(screenSelect)
        })

        appData.switchElement(screenBtn)

        otherItems.forEach((item) => {
            let otherItemsCheckbox = item.querySelector('.custom-checkbox')
            appData.switchElement(otherItemsCheckbox)
        })

        appData.switchElement(CMSOpen)
        appData.switchElement(range)
    },

    switchElement: function(element) {
        if (element.disabled === false) 
        {
            element.disabled = true
        } else 
        {
            element.disabled = false
        }
    },
};

appData.addListeners()



