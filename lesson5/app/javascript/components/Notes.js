import React, { Component } from 'react';

const API = 'http://localhost:3001/notes';

const immutableUnshift = (ary, elm) => {
  return ([elm, ...ary]);
};

const immutableDelete = (ary, id) => {
  const index = ary.findIndex(elm => elm.id === id);
  return ([...ary.slice(0, index), ...ary.slice(index + 1)]);
};

const immutableUpdate = (ary, newElm) => {
  const index = ary.findIndex(elm => elm.id === newElm.id);
  return ([...ary.slice(0, index), newElm, ...ary.slice(index + 1)]);
};

class Note extends Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEdit() {
    this.props.editNote(this.props.note.id);
  }

  handleDelete(event) {
    this.props.deleteNote(this.props.note.id);
  }

  render() {
    return (
        <div className="note">
          <span className="deleteButton" onClick={this.handleDelete}>x</span>
          <div onClick={this.handleEdit}>
            <h3>{this.props.note.title}</h3>
            <p>{this.props.note.body}</p>
          </div>
        </div>
    );
  }
}

class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.note.title,
      body: this.props.note.body,
      blurCount: 0
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleBlur(event) {
    const note = {
      note: {
        title: this.state.title,
        body: this.state.body
      }
    };
    const count = this.state.blurCount + 1;

    this.setState({ blurCount: count });
    fetch(`${API}/${this.props.note.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify(note)
    })
      .then(res => res.json())
      .then(data => {
        // console.log('data updated in handleBlur:');
        // console.log(data);


        this.props.updateNote(data);
        if (this.state.blurCount > 1)
          this.props.editNote(null);
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <form className="noteForm" onBlur={this.handleBlur}>
        <input className="input" type="text"
          name="title" placeholder="Note title..."
          value={this.state.title} onChange={this.handleInput} />
        <textarea className="input"
          name="body" placeholder="Note description..."
          value={this.state.body} onChange={this.handleInput} />
      </form>
    );
  }
}

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      editingNoteID: null
    };
    this.addNote = this.addNote.bind(this);
    this.editNote = this.editNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  componentDidMount() {
    fetch(API)
      .then(res => res.json())
      .then(data => this.setState({ notes: data }))
      .catch(error => console.log(error));
  }


  addNote() {
    fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({ note: { title: '', body: ''}})
    })
      .then(res => res.json())
      .then(note => {
        // const newNotes = [note, ...this.state.notes];
        const newNotes = immutableUnshift(this.state.notes, note);

        console.log('data from addNote:');
        console.log(note);
        console.log('new notes:');
        console.log(newNotes);

        this.setState({
          notes: newNotes,
          editingNoteID: note.id
        });
      })
      .catch(error => console.log(error));
  }

  editNote(id) {
    this.setState({ editingNoteID: id });
  }

  updateNote(note) {
    const newNotes = immutableUpdate(this.state.notes, note);

    this.setState({ notes: newNotes });
  }

  deleteNote(id) {
    fetch(`${API}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: ""
    })
      .then(res => {
        const newNotes = immutableDelete(this.state.notes, id);

        this.setState({ notes: newNotes });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="notesContainer">
        <div>
          <button className="newNoteButton" onClick={this.addNote}>
            New
          </button>
        </div>
        {this.state.notes.map(note => {
            if (note.id === this.state.editingNoteID)
              return (<NoteForm
                        note={note}
                        editNote={this.editNote}
                        updateNote={this.updateNote}
                        key={note.id} />);
            else
              return (<Note
                        note={note}
                        editNote={this.editNote}
                        deleteNote={this.deleteNote}
                        key={note.id} />);
        })}
      </div>
    );
  }
}

export default Notes;
