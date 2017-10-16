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

app.get('/api/init_tiles', (req, res) => {

  let POS = getRandomPOS();

  switch(POS.pos){
    case PronPers:
      POS.pos.findOne({ where: { person_id: POS.pers, number_id: POS.numb, gender_id: POS.gend }})
      .then( word => {
        let newWord = { person: word.person_id, number: word.number_id, gender: word.gender_id, case: POS.cas, word: word[POS.cas] };
        res.json(newWord);
      })
      break;

    default:
      POS.pos.findAll()
      .then( words => {
          let len = words.length;
          let rand = parseInt(Math.random() * (len - 2) + 2);
          POS.pos.findOne({ where: { id: rand }})
          .then( word => {
            res.json(word);
          })
      });
    }
});

app.get('/api/random', (req, res) => {

  let POS = getRandomPOS();

  switch(POS.pos){
    case PronPers:
      POS.pos.findOne({ where: { person_id: POS.pers, number_id: POS.numb, gender_id: POS.gend }})
      .then( word => {
        let newWord = { person: word.person_id, number: word.number_id, gender: word.gender_id, case: POS.cas, word: word[POS.cas] };
        res.json(newWord);
      })
      break;

    default:
      POS.pos.findAll()
      .then( words => {
          let len = words.length;
          let rand = parseInt(Math.random() * (len - 2) + 2);
          POS.pos.findOne({ where: { id: rand }})
          .then( word => {
            res.json(word);
          })
      });
  }

});


function getRandomPOS(){
  let posIndex = parseInt((Math.random()*10)+1);

  switch(posIndex){
    case 1:
      return { pos: PronOth };
    case 2:
      return { pos: Adj };
    case 3:
      return { pos: Verbs };
    case 4:
      return { pos: Nouns };
    case 5:
      return { pos: Adv };
    case 6:
      let numb = parseInt((Math.random()*2) + 1);
      let pers = parseInt((Math.random()*3) + 1);
      let gend;
      if (pers === 3 && numb === 1) {
        gend = parseInt((Math.random()*3) + 2);
      } else {
        gend = 1;
      }
      let casID = parseInt((Math.random()*5) + 1);
      let cas;
      switch(casID){
        case 1:
          cas = "subjective";
          break;
        case 2:
          cas = "objective";
          break;
        case 3:
          cas = "possessiveAttributive";
          break;
        case 4:
          cas = "possessivePredicate";
          break;
        case 5:
          cas = "reflexive"
          break;
      }
      return  { pos: PronPers, numb, pers, gend, cas };
    case 7:
      return { pos: Art };
    case 8:
      return { pos: Prep };
    case 9:
      return { pos: Conj };
    case 10:
      return { pos: Intj };
    default:
      return { pos: Nouns };
  }
}

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

