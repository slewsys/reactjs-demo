const RETURN_KEY = 13;

let root_node = document.getElementById("root");
let span_node = document.createElement("span");
let label_node = document.createElement("label");
let input_node = document.createElement("input");

input_node.setAttribute("type", "text");
input_node.id =  "name";
label_node.textContent = "Name:";
span_node.id = "input";

label_node.appendChild(input_node);
span_node.appendChild(label_node);
root_node.appendChild(span_node);

let name_node = document.getElementById("name");

name_node.addEventListener("keyup",
  e => {
    if (e.keyCode !== RETURN_KEY || name_node.value.length <= 0) {
      return;
    }

    let say_hello_node  = document.createElement('div');
    let highlight_node = document.createElement('h2');
    let greeting_node  = document.createTextNode(`Hello ${name_node.value}!`);

    highlight_node.appendChild(greeting_node);
    say_hello_node.appendChild(highlight_node);
    say_hello_node.className = "SayHello";

    let root_node  = document.getElementById("root");
    let root_node_list = root_node.childNodes;

    root_node_list.forEach(node => {
      if (node.id !== "input") {
        root_node.removeChild(node);
      }
    });

    root_node.insertBefore(say_hello_node, span_node);
    name_node.value = "";
  }
);
