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
    // return React.createElement(
    //   "span",
    //   {},
    //   React.createElement(
    //     "label",
    //     { for: "name" },
    //     "Name:",
    //     React.createElement(
    //       "input", {
    //         className: "EnterName",
    //         type: "text",
    //         value: this.state.name,
    //         onChange: this.handleNameChange,
    //         onKeyUp: this.handleEnterKey
    //       })
    //   )
    // );
    return (
      <span>
        <label> Name: </label>
        <input
            className="EnterName"
            type="text"
            value={this.state.name}
            onChange={this.handleNameChange}
            onKeyUp={this.handleEnterKey}
        />
      </span>
    );
  }
}

class SayHello extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // return React.createElement(
    //   "div",
    //   { className: "SayHello" },
    //   React.createElement(
    //     "h2",
    //     {},
    //     `${this.props.name && this.props.name.length > 0 ? 'Hello ' + this.props.name + '!': ''}`
    //   )
    // );
    return (
      <div className="SayHello">
        <h2>
        {`${this.props.name && this.props.name.length > 0 ? 'Hello ' + this.props.name + '!': ''}`}
        </h2>
      </div>
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
    // const name = this.state.name;
    //
    // Can't call EnterName as child of SayHello, so use div instead.
    // return React.createElement(
    //   "div",
    //   { className: "App" },
    //   React.createElement(SayHello, {
    //     key: name,     // Silence React.js warning
    //     name: name
    //   }),
    //   React.createElement(EnterName, {
    //     onNameEntered: this.handleNameEntered
    //   })
    // );
    return (
      <div className="App">
        <SayHello key={this.state.name} name={this.state.name} />
        <EnterName onNameEntered={this.handleNameEntered} />
      </div>
    );
  }
}

export default App;
