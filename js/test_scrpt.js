let screen = ''
let amount = '3'

isScreens = function () { // написать проверку для включения кнопки рассчитать
        
        if (Boolean(screen && amount)) 
        {
            return true
        }
    }

console.log(Boolean(isScreens()));