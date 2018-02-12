let rootNode = document.getElementById("root");
let spanNode = document.createElement("span");
let labelNode = document.createElement("label");
let inputNode = document.createElement("input");

inputNode.setAttribute("type", "text");
inputNode.id =  "name";
labelNode.textContent = "Name:";
spanNode.className = "input";

labelNode.appendChild(inputNode);
spanNode.appendChild(labelNode);
rootNode.appendChild(spanNode);

let nameNode = document.getElementById("name");

nameNode.addEventListener("keyup",
  e => {
    e.preventDefault();
    if (e.keyCode === 13) {
      if (nameNode.value.length > 0) {
        let sayHelloNode = document.createElement('div');
        let highlightNode = document.createElement('h2');
        let greetingNode =
            document.createTextNode(`Hello ${nameNode.value}!`);

        highlightNode.appendChild(greetingNode);
        sayHelloNode.appendChild(highlightNode);
        sayHelloNode.className = "SayHello";

        let inputNode = document.getElementById("input");
        let rootNode = document.getElementById("root");
        let rootNodes = rootNode.childNodes;

        rootNodes.forEach(node => {
          if (node.className !== "input") {
            rootNode.removeChild(node);
          }
        });
        rootNode.insertBefore(sayHelloNode, inputNode);
        nameNode.value = "";
      }
    }
  });
