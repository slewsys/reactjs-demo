const returnKey = 13;

let nameNode = document.getElementById("name");

nameNode.addEventListener("keyup",
  e => {
    if (e.keyCode !== returnKey || nameNode.value.length <= 0) {
      return;
    }

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

    let spanNode  = document.getElementById("input");

    rootNode.insertBefore(sayHelloNode, spanNode);
    nameNode.value = "";
  }
);
