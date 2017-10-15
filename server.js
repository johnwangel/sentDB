const express = require('express');
const app = express();
const sequelize = require('sequelize');
const PORT = process.env.PORT || 3000;
const db = require('./models');
const bodyParser = require('body-parser');

const AdjComp = db.adj_comparison_types;
const AdjType = db.adjective_types;
const Adj = db.adjectives;

const AdvType = db.adverb_type;
const Adv = db.adverbs;

const Art = db.articles;

const ConjType = db.conjunction_types;
const Conj = db.conjunctions;

const Intj = db.interjections;

const Nouns = db.nouns;

const Prep = db.prepositions;

const Gender = db.gender;
const Numb = db.number;
const Person = db.person;
const PronTypes = db.pronoun_types;
const PronOth = db.pronouns_other;
const PronPers = db.pronouns_personal;

const SentCompl = db.sentence_complexity;
const Sent = db.sentences;

const Verbs = db.verbs;

app.use(bodyParser.json());

app.get('/api/random', (req, res) => {

  let posIndex = parseInt((Math.random()*10)+1);
  let POS;

  switch(posIndex){
    case 1:
      POS = PronOth;
      break;
    case 2:
      POS = Adj;
      break;
    case 3:
      POS = Verbs;
      break;
    case 4:
      POS =  Nouns;
      break;
    case 5:
      POS =  Adv;
      break;
    case 6:
      POS =  PronPers;
      break;
    case 7:
      POS =  Art;
      break;
    case 8:
      POS =  Prep;
      break;
    case 9:
      POS =  Conj;
      break;
    case 10:
      POS =  Intj;
    default:
      POS = Nouns;
  }

  POS.findAll()
  .then( words => {
      let len = words.length;
      let rand = parseInt(Math.random() * (len - 2) + 2);
      POS.findOne({ where: { id: rand }})
      .then( word => {
        res.json(word);
      })
  });
});


function getCount(POS){

}

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

