const RETURN_KEY = 13

const rootNode = document.getElementById('root')
const nameNode = document.getElementById('name')

nameNode.addEventListener('keyup', e => {
  if (e.keyCode !== RETURN_KEY || nameNode.value.length <= 0) {
    return
  }

  const sayHelloNode = document.createElement('div')
  const highlightNode = document.createElement('h2')
  const greetingNode = document.createTextNode(`Hello ${nameNode.value}!`)

  highlightNode.appendChild(greetingNode)
  sayHelloNode.appendChild(highlightNode)
  sayHelloNode.className = 'SayHello'

  rootNode.childNodes.forEach(node => {
    if (node.id !== 'input') {
      rootNode.removeChild(node)
    }
  })

  const spanNode = document.getElementById('input')

  rootNode.insertBefore(sayHelloNode, spanNode)
  nameNode.value = ''
})
