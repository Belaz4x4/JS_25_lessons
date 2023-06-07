'use strict';

function DomElement(height='auto', width='auto', bg='fff', fontSize='1rem') {
    this.height = height
    this.width = width  
    this.bg = bg  
    this.fontSize = fontSize
    this.defaultStyle = `height: ${this.height}; width: ${this.width}; background: ${this.bg}; font-size: ${this.fontSize}`

    this.createDomElement = function(selector, text='', style=this.defaultStyle) {
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

        newElement.style.cssText = style
        newElement.innerText = text
        
        const body = document.querySelector('body')
        body.prepend(newElement)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const addElement = new DomElement()
    addElement.createDomElement('.block', '', 'height: 100px; width: 100px; background: #4e9403; position: absolute;')

    const square = document.querySelector('.block')
    let top = 0
    let left = 0


    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight') {
            left += 10
            square.style.left =  left + 'px'
        } else if (event.key === 'ArrowLeft') {
            left -= 10
            square.style.left =  left + 'px'
        } else if (event.key === 'ArrowUp') {
            top -= 10
            square.style.top =  top + 'px'
        } else if (event.key === 'ArrowDown') {
            top += 10
            square.style.top =  top + 'px'
        }
    })
})


