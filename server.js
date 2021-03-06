const express = require('express');
const moment = require('moment');
const app = express();
const sequelize = require('sequelize');
const PORT = process.env.PORT || 3000;
const fs = require('fs');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const db = require('./models');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jsonwebtoken = require("jsonwebtoken");

const Games = db.games;
const Users = db.users;

const Stamps = db.stamps;

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

const saltRounds = 10;

require('./passport')();

app.use(express.static('public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cookieParser());
app.use(
  session({
    store: new RedisStore(),
    secret: 'run with the devil',
    resave: false,
    saveUninitialized: false
  })
);

app.use(function(req, res, next){
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode){
      if (err) {
        req.user = undefined;
      }
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

app.use(passport.initialize());
app.use(passport.session());

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.post('/api/get_stamp', jsonParser, (req, res) => {
  Stamps.findById(req.body.id)
  .then( response => {
    res.json(response);
  })

})

app.get('/api/logout', jsonParser, (req, res) => {
  req.logout()
  req.session.destroy();
  res.send( { message: 'Successfully logged out' } );
})

//create and respond with new user
app.post('/api/register', jsonParser, (req, res) => {
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      Users.create({
        username: req.body.username,
        password: hash,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
      })
      .then(user => {
        res.json(user.dataValues);
      })
      .catch(err => {
        return res.json(err);
      });
    });
  });
});

app.get('/api/auth', jsonParser, (req, res) => {
  // let id = req.user ? req.user.id : null;
  // console.log("PASSPORT ID", req.session.passport.user)
  // let id = req.session.passport.user ? req.session.passport.user : null;
  // let username = req.user ? req.user.username : null;
  // res.json({id, username })
  if (req.user){
    res.json( { id: req.user } )
  } else {
    return res.status(401).json({ message: "Unauthorized user!" });
  }
})


//create and respond with new user
app.post('/api/login', jsonParser, (req, res) => {
  Users.findOne({where: { username: req.body.username }})
  .then( user => {
    if (!user) {
      res.status(401).json({ message: 'Authentication failed. User not found.'})
    } else {
      if(bcrypt.compareSync(req.body.password, user.password)){
        return res.json({ token: jsonwebtoken.sign( { id: user.id, username: user.username}, 'RESTFULAPIs')})
      } else {
        res.status(401).json({ message: 'Authentication failed. Wrong password.'});
      }
    }
  })
});
  // passport.authenticate('local', (err, user) => {
  //     if (err) return res.status(500).json({ err });
  //     if (!user) return res.status(401).json({ message: 'invalid' });

  //     req.logIn( user, (err) => {
  //       if (err) return res.json({ err });
  //       // return res.status(200).json(user);
  //     });
  // })(req, res);


app.post('/api/active_game', jsonParser, (req, res) => {
  let gameID = req.body.game_id;
  Games.findById(gameID)
  .then( game => {
    res.json(game.game_state.game);
  })
})

app.post('/api/save_game', jsonParser, (req, res) => {
  let gameID = req.body.game_id;

  let propValue;
  for (prop in req.body){
    if (prop !== 'game_id') {
      propValue = prop;
    }
  }

  Games.findById(gameID)
  .then( game => {
    let gameState = game.game_state;
    gameState.game[propValue] = req.body[propValue];
    Games.update(
      { game_state: gameState },
      { where: { id: gameID } }
    )
    .then(result => res.json(result) )
    .error(err =>
      console.log("ERROR ", err)
    )
  });
})

app.post('/api/get_games', jsonParser, (req, res) => {
  Games.findAll( {where : { user_id: req.user.id}} )
  .then( response => {
      let gameArray=[];
      response.forEach( game => {
        let game_id = game.id;
        let time = moment(game.updatedAt).fromNow();
        let sentence = '';
        let sentence_array = game.game_state.game.sentence;
        sentence_array.forEach( word => {
          sentence += word.word + ' ';
        })
        gameArray.push({ game_id, sentence, time })
      })
      res.json( { games: gameArray } )
  })
  .catch( err => res.send());
});

app.get('/api/newGame', (req, res) => {
  Games.create({
    user_id: req.user.id,
    game_state: { game: {} },
  })
  .then(game => {
      res.json(game.dataValues);
    })
  .catch(err => {
      console.log(err);
    });
});

app.get('/api/sentence', (req, res) => {
  Sent.findAndCountAll()
  .then( count => {
    let len = count.count;
    Sent.findById(parseInt(Math.random() * (len - 2) + 2))
    .then( result => {
      res.json(result);
    })
  })
});

app.get('/api/canteen', (req, res) => {
  Stamps.findAll()
  .then( response => {
    res.json(response)
  })
});

app.get('/api/init_stamps', (req, res) => {
  Stamps.findAndCountAll()
  .then( count => {
    let len = count.count;
    p1 = Stamps.findById(parseInt(Math.random() * (len - 2) + 2))
    p2 = Stamps.findById(parseInt(Math.random() * (len - 2) + 2))
    p3 = Stamps.findById(parseInt(Math.random() * (len - 2) + 2))
    p4 = Stamps.findById(parseInt(Math.random() * (len - 2) + 2))
    p5 = Stamps.findById(parseInt(Math.random() * (len - 2) + 2))

    Promise.all([p1, p2, p3, p4, p5])
    .then( result => {
      res.json(result);
    })

  })
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

// const mySent = { sentence, metadata };

// const sentence = [{ id: 1, pos: 'article', word: 'the', word_id: 3, modifies: 4, },{ id: 2, pos: 'adjective', word: 'quick', word_id: 254, modifies: 4, },{ id: 3, pos: 'adjective', word: 'brown', word_id: 28, modifies: 4, },{ id: 4, pos: 'noun', word: 'fox', word_id: 117, plural: false, agreement: 5, },{ id: 5, pos: 'verb', word: 'jumps', id: 105, tense: 'present', number: 'singular', person: 'third', gender: 'neuter', agreement: 4},{ id: 6, pos: 'preposition', word: 'over', id: 47, phrase_id: 1 },{ id: 7, pos: 'article', word: 'the', word_id: 3, modifies: 9, phrase_id: 1 },{ id: 8, pos: 'adjective', word: 'lazy', word_id: 389, modifies: 9, phrase_id: 1 },{ id: 9, pos: 'noun', word: 'dog', word_id: 116, phrase_id: 1 },{ id: 10, pos: 'punctuation', word: '.'}]

// const metadata = {
//   phrases: [
//     { id: 1, type: 'preposition', func: 'adverbial', modifies: 5 },
//   ],
// }

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


// words,coded,,,,,,,,,,complexity,keywords,createdAt(),updatedAt()
// "Wow, the hungry cat chased the mouse under the table and quickly ate it.","@9,1@`|4,3%5,1%1,1,1,1,1|^2,3,5,3,1,1,1^~4,3%1,2,1,2,2~$2,2,1>8,1%4,3%1,3,1,2,3$&,2,1>7,1%^6,1%2,2,5,3,1,1,2^~3,3,1,1,2,1~.",,,,,,,,,,1,general,now(),now()
// Tomorrow is often the busiest day of the week.,"|1,7,1,1,1|^2,1,1,3,1,1,1%6,2^~4,3%5,3,2%1,8,1,2,2~$1,1,2>8,3%4,3%1,9,1,2,3$.",,,,,,,,,,1,wisdom,now(),now()
// I love the smell of napalm in the morning.,"|3,1,1,1,1,1|^2,7,1,1,2,1,1^~4,3%1,10,1,2,1~$2,1,1>8,3%1,11,1,2,2$$3,2,1>8,37%4,3%1,12,1,2,3$.",,,,,,,,,,1,movies,now(),now()
// My mama always said life was like a box of chocolates.,"|3,1,1,1,3,1%1,13,1,1,1|^6,3%2,8,5,3,1,1,1^#1<|1,14,1,1,2|^2,1,5,3,1,2,2^$6,1,2>8,40%4,1%1,15,1,2,3$$7,1,3>8,3%1,17,2,2,4$#.",,,,,,,,,,2,movies,now(),now()