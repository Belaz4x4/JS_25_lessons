'use strict';

function DomElement(height, width, bg, fontSize) {
    this.height = height
    this.width = width  
    this.bg = bg  
    this.fontSize = fontSize

    this.createDomElement = function(selector, text='') {
        let newElement = ''
        if (selector.startsWith('.')) 
        {
            newElement = document.createElement('div')
            newElement.classList.add(selector.slice(1))
        } else if (selector.startsWith('#')) 
        {
            newElement = document.createElement('p')
            newElement.id = selector.slice(1)
        }

        newElement.style.cssText = `height: ${this.height}; width: ${this.width}; background: ${this.bg}; font-size: ${this.fontSize}`
        newElement.innerText = text
        
        const body = document.querySelector('body')
        body.prepend(newElement)
    }
}

const addElement = new DomElement('50px', '600px', '#48a108', '15')
addElement.createDomElement('#best', 'какой-то текст')
addElement.createDomElement('.block', 'какой-то блок')

