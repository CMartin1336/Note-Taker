const express = require('express');
const path = require('path');

const app = express();
const PORT =  process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const notes = [];

app.get('/', (req, res) => res.sendFile(path.join(__dirname/public, 'index.html')));
app.get('/add', (req, res) => res.sendFile(path.join(__dirname/public, 'notes.html')));

app.get('/api/notes', (req, res) => res.json(characters));

app.get('/api/notes/:id', (req, res) => {
  const chosen = req.params.notes;

  console.log(chosen);

  /* Check each character routeName and see if the same as "chosen"
   If the statement is true, send the character back as JSON,
   otherwise tell the user no character was found */

  for (let i = 0; i < notes.length; i++) {
    if (chosen === notes[i].routeName) {
      return res.json(notes[i]);
    }
  }

  return res.json(false);
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;

  newNote.routeName = newNote.name.replace(/\s+/g, '').toLowerCase();
  console.log(newNote);

  characters.push(newNote);
  res.json(newNote);
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
