let rootNode = document.getElementById("root");
let spanNode = document.createElement("span");
let labelNode = document.createElement("label");
let inputNode = document.createElement("input");

inputNode.setAttribute("type", "text");
inputNode.id =  "name";
labelNode.textContent = "Name:";
spanNode.id = "input";

labelNode.appendChild(inputNode);
spanNode.appendChild(labelNode);
rootNode.appendChild(spanNode);

let nameNode = document.getElementById("name");

nameNode.addEventListener("keyup",
  e => {
    const returnKey = 13;
    e.preventDefault();
    if (e.keyCode === returnKey) {
      if (nameNode.value.length > 0) {
        let sayHelloNode  = document.createElement('div');
        let highlightNode = document.createElement('h2');
        let greetingNode  = document.createTextNode(`Hello ${nameNode.value}!`);

        highlightNode.appendChild(greetingNode);
        sayHelloNode.appendChild(highlightNode);
        sayHelloNode.className = "SayHello";

        let rootNode  = document.getElementById("root");
        let rootNodes = rootNode.childNodes;

        rootNodes.forEach(node => {
          if (node.id !== "input") {
            rootNode.removeChild(node);
          }
        });
        rootNode.insertBefore(sayHelloNode, spanNode);
        nameNode.value = "";
      }
    }
  });
