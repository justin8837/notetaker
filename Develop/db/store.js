const util = require("util");
const fs = require("fs");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  constructor() {
    this.id = 0;
  }
  read() {
    return readFileAsync("./db/db.json", "utf8");
  }
  write(note) {
    return writeFileAsync("./db/db.json", JSON.stringify(note));
  }
  getNotes() {
    return this.read().then(notes => {
      let formattedNotes;
      try {
        formattedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        formattedNotes = [];
      }
      return formattedNotes;
    });
  }
  addNote(note) {
    const { title, text } = note;
    if (!title || !text) {
      throw new Error("Note is not having title or text");
    }
    const newNote = { title, text, id: ++this.id };
    return this.getNotes()
      .then(notes => [...notes, newNote])
      .then(updateNotes => this.write(updateNotes))
      .then(() => newNote);
  }
  removeNote(id) {
    return this.getNotes()
      .then(notes => {
        for (var i = 0; notes.length > i; i++) {
          if (notes[i].id == id) {
            notes.splice(i, 1);
          }
        }
      })
      .then(updateNotes => this.write(updateNotes))
      .then(() => id);
  }
}

module.exports = new Store();
