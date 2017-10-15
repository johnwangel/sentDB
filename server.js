const express = require('express');
const app = express();
const sequelize = require('sequelize');
const PORT = process.env.PORT || 3000;
const db = require('./models');
const Nouns = db.nouns;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/api/random', (req, res) => {

  Nouns.findAll()
  .then( words => {
      let len = words.length;
      let rand = parseInt(Math.random() * (len - 2) + 2);
      console.log(rand);
      Nouns.findOne({ where: { id: rand }})
      .then( word => {
        let newWord = { id: word.id, word: word.word, isPlural: word.isPlural, plural: word.plural }
        res.json(newWord);
      })
  });
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

