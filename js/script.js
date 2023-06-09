'use strict';

class First {
    hello() {
        console.log('Привет я метод родителя!');
    }

}

class Second extends First {
    constructor() {
        super()
    }
    hello() {
        super.hello()
        console.log('А я наследуемый метод!')
    }
}

const newObject = new Second

newObject.hello()