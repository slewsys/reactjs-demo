import React, { Component } from 'react';
import './App.css';

class EnterName extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEnterKey = this.handleEnterKey.bind(this);
  }

  handleNameChange(event) {
    const name = event.target.value;
    this.setState(() => ({ name: name }));
  }

  handleEnterKey(e) {
    if (e.key === 'Enter' && this.state.name.length > 0) {
      e.preventDefault();
      this.props.onNameEntered(this.state.name);
      this.setState(() => ({ name: ""}));
    }
  }

  render() {
    return React.createElement(
      "span",
      {},
      React.createElement(
        "label",
        {},
        "Name:",
        React.createElement(
          "input", {
            className: "EnterName",
            type: "text",
            value: this.state.name,
            onChange: this.handleNameChange,
            onKeyUp: this.handleEnterKey
          })
      )
    );
  }
}

class SayHello extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement(
      "div",
      { className: "SayHello" },
      React.createElement(
        "h2",
        {},
        `${this.props.name && this.props.name.length > 0 ? 'Hello ' + this.props.name + '!': ''}`
      )
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { name: this.props.name };
    this.handleNameEntered = this.handleNameEntered.bind(this);
  }

  handleNameEntered(name) {
    this.setState({ name: name });
  }

  render() {
    const name = this.state.name;

    // Can't call EnterName as child of SayHello, so use div instead.
    return React.createElement(
      "div",
      { className: "App" },
      React.createElement(SayHello, {
        key: name,     // Silence React.js warning
        name: name
      }),
      React.createElement(EnterName, {
        onNameEntered: this.handleNameEntered
      })
    );
  }
}

export default App;
