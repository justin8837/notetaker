const store = require("../db/store");

module.exports = function(app) {
  app.post("/api/notes", function(req, res) {
    store
      .addNote(req.body)
      .then(note => res.json(note))
      .catch(err => res.status(500).json(err));
  });
  app.get("/api/notes", function(req, res) {
    store
      .getNotes()
      .then(notes => res.json(notes))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  app.delete("/api/notes/:id", function(req, res) {
    var id = req.params.id;
    console.log(res);
    store
      .removeNote(id)
      .then(notes => res.json(notes))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    console.log(id);
  });

  app.post("/api/clear", function(req, res) {
    tableData.length = 0;
    waitListData.length = 0;

    res.json({ ok: true });
  });
};
