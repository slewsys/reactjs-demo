const RETURN_KEY = 13;

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

    let span_node  = document.getElementById("input");

    root_node.insertBefore(say_hello_node, span_node);
    name_node.value = "";
  }
);
