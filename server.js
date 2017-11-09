const express = require('express');
const app = express();
const sequelize = require('sequelize');
const PORT = process.env.PORT || 3000;
const db = require('./models');
const bodyParser = require('body-parser');

const AdjComp = db.adj_comparison_types;
const AdjType = db.adjective_types;
const Adj = db.adjectives;

const AdvType = db.adverb_types;
const Adv = db.adverbs;

const Art = db.articles;

const ConjType = db.conjunction_types;
const Conj = db.conjunctions;

const Intj = db.interjections;

const Nouns = db.nouns;

const Prep = db.prepositions;

const Gender = db.genders;
const Numb = db.numbers;
const Person = db.persons;
// const PronTypes = db.pronoun_types;
const PronOth = db.pronouns_others;
const PronPers = db.pronouns_personals;

const SentCompl = db.sentence_complexity;
const Sent = db.sentences;

const Verbs = db.verbs;

app.use(bodyParser.json());

app.get('/api/sentence', (req, res) => {
  console.log(mySent);
  res.json(mySent);
});

app.get('/api/random', (req, res) => {

  let POS = getRandomPOS();

  let includeObj = [];

  if (POS.joins){
    for (var i = 0; i < POS.joins.length; i++) {
      includeObj[i] = { model: POS.joins[i] };
    }
  }

  switch(POS.pos){
    case PronPers:

      let query =  {where: { person_id: POS.pers, number_id: POS.numb, gender_id: POS.gend }}
      if (includeObj.length !== 0 ) query.include = includeObj;

      POS.pos.findOne(query)
      .then( word => {
        let newWord = {
          pos: 'pronoun',
          word: word[POS.cas],
          pronoun_type: 'personal',
          person: word.person.dataValues.type,
          number: word.number.dataValues.type,
          gender: word.gender.dataValues.type,
          case: POS.cas,
        };
        res.json(newWord);
      })
      break;

    default:
      POS.pos.findAll()
      .then( words => {
          let len = words.length;
          let rand = parseInt(Math.random() * (len - 2) + 2);
          let query =  {where: { id: rand }}
          if (includeObj.length !== 0 ) query.include = includeObj;
          POS.pos.findOne(query)
          .then( word => {
            let newWord = word.dataValues;
            newWord.pos = POS.label;
            delete newWord.createdAt;
            delete newWord.updatedAt;

            if (newWord.pos === 'adjective') {
              let newWordObj = {
                pos: newWord.pos,
                id: newWord.id,
                word: newWord.word,
                type: newWord.adjective_type.type,
                comparison_type: newWord.adj_comparison_type.type,
              }
              if (newWord.adj_comparison_type.type === 'irregular'){
                newWordObj.comparative = newWord.altcomp;
                newWordObjsuperlative = newWord.altsup;
              }
              newWord = newWordObj;
            }

            if (newWord.pos === 'adverb'){
              let newWordObj = {
                pos: newWord.pos,
                id: newWord.id,
                word: newWord.word,
                type: newWord.adverb_type.type,
              }
              newWord = newWordObj;
            }

            if (newWord.pos === 'conjunction'){
              let newWordObj = {
                pos: newWord.pos,
                id: newWord.id,
                word: newWord.word,
                type: newWord.conjunction_type.type,
              }
              newWord = newWordObj;
            }

            if (newWord.pos === 'pronoun' && !newWord.gender) {
              let newWordObj = {
                pos: newWord.pos,
                id: newWord.id,
                word: newWord.word,
                pronoun_type: newWord.type,
                number: newWord.number.type
              }
              newWord = newWordObj;
            }

            if (newWord.pos === 'verb') {
              let newWordObj = {
                pos: newWord.pos,
                id: newWord.id,
                word: newWord.word,
                auxilliary: newWord.is_aux,
                active: newWord.is_active,
                passive: newWord.is_passive,
              }
              if (newWord.tense_pres3ps !== null ) newWordObj.present_tense_third_person_singular = newWord.tense_pres3ps;
              if (newWord.tense_past1ps !== null ) newWordObj.past_tense_first_person_singular = newWord.tense_past1ps;
              if (newWord.tense_past2ps !== null ) newWordObj.past_tense_second_person_singular = newWord.tense_past2ps;
              if (newWord.tense_past3ps !== null ) newWordObj.past_tense_third_person_singular = newWord.tense_past3ps;
              if (newWord.tense_past1pp !== null ) newWordObj.past_tense_first_person_plural = newWord.tense_past1pp;
              if (newWord.tense_past2pp !== null ) newWordObj.past_tense_second_person_plural = newWord.tense_past2pp;
              if (newWord.tense_past3pp !== null ) newWordObj.past_tense_third_person_plural = newWord.tense_past3pp;

              if (newWord.word === "be") {
                newWordObj.present_tense_first_person_singular = 'am';
                newWordObj.present_tense_second_person_singular = 'are';
                newWordObj.present_tense_first_person_plural = 'are';
                newWordObj.present_tense_second_person_plural = 'are';
                newWordObj.present_tense_third_person_plural = 'are';
              }
              newWord = newWordObj;
            }

            if (newWord.pos === 'noun') {
              let newWordObj = {
                pos: newWord.pos,
                id: newWord.id,
                word: newWord.word,
                is_plural: newWord.isPlural,
              }
              if (newWord.plural !== null ) newWordObj.irregular_plural = newWord.plural;
              newWord = newWordObj;
            }

            res.json(newWord);
          })
      });
  }

});

function getRandomPOS(){
  let posIndex = parseInt((Math.random()*10)+1);
  // let posIndex = 4;
  switch(posIndex){
    case 1:
      return { pos: PronOth, label: "pronoun", joins: [Numb]};
    case 2:
      return { pos: Adj, label: "adjective", joins: [AdjComp, AdjType] };
    case 3:
      return { pos: Verbs, label: "verb"  };
    case 4:
      return { pos: Nouns, label: "noun"  };
    case 5:
      return { pos: Adv, label: "adverb", joins: [AdvType]  };
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
      return  { pos: PronPers, numb, pers, gend, cas, label: "pronoun", joins: [Person, Numb, Gender] };
    case 7:
      return { pos: Art, label: "article"  };
    case 8:
      return { pos: Prep, label: "preposition"  };
    case 9:
      return { pos: Conj, label: "conjunction", joins: [ConjType]  };
    case 10:
      return { pos: Intj, label: "interjection"  };
    default:
      return { pos: Nouns, label: "noun" };
  }
}

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

const sentence = [
  { id: 1, pos: 'article', word: 'the', word_id: 3, modifies: 4, },
  { id: 2, pos: 'adjective', word: 'quick', word_id: 254, modifies: 4, },
  { id: 3, pos: 'adjective', word: 'brown', word_id: 28, modifies: 4, },
  { id: 4, pos: 'noun', word: 'fox', word_id: 117, plural: false, agreement: 5, },
  { id: 5, pos: 'verb', word: 'jumps', id: 105, tense: 'present', number: 'singular', person: 'third', gender: 'neuter', agreement: 4},
  { id: 6, pos: 'preposition', word: 'over', id: 47, phrase_id: 1 },
  { id: 7, pos: 'article', word: 'the', word_id: 3, modifies: 9, phrase_id: 1 },
  { id: 8, pos: 'adjective', word: 'lazy', word_id: 389, modifies: 9, phrase_id: 1 },
  { id: 9, pos: 'noun', word: 'dog', word_id: 116, phrase_id: 1 },
  { id: 10, pos: 'punctuation', word: '.'}
]

const metadata = {
  phrases: [
    { id: 1, type: 'preposition', func: 'adverbial', modifies: 5 },
  ],
}



// const sentence = [
//   { id: 1, pos: 'article', word: 'the', word_id: 3, modifies: 3, },
//   { id: 2, pos: 'adjective', word: 'nicest', word_id: 205, superlative: true, modifies: 3, },
//   { id: 3, pos: 'noun', word: 'thing', word_id: 100, plural: false, agreement: 8, },
//   { id: 4, pos: 'pronoun',  type: 'personal', word: 'I', person: 1, number: 1, gender: 1, case: 'subjective', agreement: 5, clause_id: 1 },
//   { id: 5, pos: 'verb', word: 'can say', id: 64, agreement: 4, modal: true, clause_id: 1, phrase_id: 1, },
//   { id: 6, pos: 'preposition', word: 'about', id: 2, phrase_id: 2 },
//   { id: 7, pos: 'pronoun', type: 'personal', word: 'her', person: 3, number: 1, gender: 3, case: 'objective', phrase_id: 2 },
//   { id: 8, pos: 'verb', word: 'is', id: 93, tense: 'present', agreement: 3 },
//   { id: 9, pos: 'pronoun', type: 'indefinite', word: 'all', id: 1, agreement: 18, clause_id: 2 },
//   { id: 10, pos: 'pronoun', type: 'personal', word: 'her', person: 3, number: 1, gender: 3, case: 'possessive', modifies: 17, clause_id: 2, phrase_id: 2  },
//   { id: 11, pos: 'noun', word: 'tattoos', id: 115, plural: true, agreement: 12, clause_id: 2, phrase_id: 2 },
//   { id: 12, pos: 'verb', word: 'are spelled', id: 93, tense: 'present', voice: 'passive', agreement: 11, clause_id: 2,  },
//   { id: 13, pos: 'adverb', word: 'correctly', id: 41, modifies: 12, clause_id: 2, },
//   { id: 14, pos: 'punctuation', word: '.'}
// ]

// const metadata = {
//   clauses: [
//     { id: 1, type: 'adjectival', modifies: 3 },
//     { id: 2, type: 'nominative', func: 'direct object' },
//   ],
//   phrases: [
//     { id: 1, type: 'preposition', func: 'adverbial', modifies: 5 },
//     { id: 2, type: 'preposition', func: 'adjectival', modifies: 9 },
//   ],
// }

const mySent = { sentence, metadata };