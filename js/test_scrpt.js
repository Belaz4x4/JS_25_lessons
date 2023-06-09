'use strict';

class Person {
    constructor(name, age) { // конструктор присваивает поля класса к объекту
        this.name = name
        this.age = age
    }

    sayHello() { //метод добавляется вне конструктора
        console.log(`Привет! Меня зовут ${this.name}.`)
    }
}

class Counter {
	constructor() {
        Counter.incrementCount() // статические методы могут вызываться из конструктора.
    }
	
    static count = 0
	
    static incrementCount() { 
        Counter.count++
    }
    static getCount() {
		return Counter.count
	}
}

const person1 = new Person('Ivan', 34)
// console.dir(person1.name);
// person1.sayHello()

class FrontEndDev extends Person {
    constructor(name, age, skills=[]) {
        super(name, age)
        this._skills = skills
    }

    get skills() {
        return this._skills
    }

    set skills(str) {
        this._skills.push(str)
    }
}

const dev = new FrontEndDev('Vlad', 44, ['писать код', 'пить пиво'])
// console.log(Counter.getCount());
dev.sayHello();
console.log(dev.skills);
console.log(dev.age);
dev.skills = 'жарить телок';
console.log(dev.skills);

const user = {
    name: 'Alex',
    age: 34,
    isAuth: false,
    projects: {
        firstProject: 'firstProject',
        secondProject: 'secondProject',
    }
}

const {name, age: userAge, isAuth} = user
console.log('name: ', name);
console.log('age: ', userAge);
console.log('isAuth: ', isAuth);

const names = ['Ivan', 'Maria', 'Max', 'Vasya']

const [name1, name2, max] = names

console.log(name1);
console.log(name2);
console.log(max);

const logger = ({first, second, third}) => {
    console.log(second);
}

const object = {first: 1, second: 2, third: 3}

logger(object)

const array1 = [1, 2, 3]
const array2 = [4, 5, 6]

const newArray = [...array1, ...array2, 'пиво', 'телки', 'рок-н-ролл']
console.log('newArray: ', newArray);