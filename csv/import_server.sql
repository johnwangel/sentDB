COPY adj_comparison_types(type,"createdAt","updatedAt")
FROM '/srv/sentDB/csv/adj_comparison_types.csv'
DELIMITER ',' CSV HEADER;

COPY adjective_types(type,"createdAt","updatedAt")
FROM '/srv/sentDB/csv/adjective_types.csv'
DELIMITER ',' CSV HEADER;

COPY adjectives(word,type_id,comptype_id,altcomp,altsup,category,"createdAt","updatedAt")
FROM '/srv/sentDB/csv/adjectives.csv'
DELIMITER ',' CSV HEADER;

COPY adverb_types(type,"createdAt","updatedAt")
FROM '/srv/sentDB/csv/adverb_types.csv'
DELIMITER ',' CSV HEADER;

COPY adverbs(word,type_id,category,"createdAt","updatedAt")
FROM '/srv/sentDB/csv/adverbs.csv'
DELIMITER ',' CSV HEADER;

COPY articles(word,"createdAt","updatedAt")
FROM '/srv/sentDB/csv/articles.csv'
DELIMITER ',' CSV HEADER;

COPY interjections(word,category,"createdAt","updatedAt")
FROM '/srv/sentDB/csv/interjections.csv'
DELIMITER ',' CSV HEADER;

COPY prepositions(word,"createdAt","updatedAt")
FROM '/srv/sentDB/csv/prepositions.csv'
DELIMITER ',' CSV HEADER;

COPY conjunction_types(type,"createdAt","updatedAt")
FROM '/srv/sentDB/csv/conjunction_types.csv'
DELIMITER ',' CSV HEADER;

COPY conjunctions(word,type_id,"createdAt","updatedAt")
FROM '/srv/sentDB/csv/conjunctions.csv'
DELIMITER ',' CSV HEADER;

COPY genders(type,"createdAt","updatedAt")
FROM '/srv/sentDB/csv/gender.csv'
DELIMITER ',' CSV HEADER;

COPY numbers(type,"createdAt","updatedAt")
FROM '/srv/sentDB/csv/number.csv'
DELIMITER ',' CSV HEADER;

COPY persons(type,"createdAt","updatedAt")
FROM '/srv/sentDB/csv/person.csv'
DELIMITER ',' CSV HEADER;

COPY pronouns_personals(person_id,number_id,gender_id,subjective,objective,"possessiveAttributive","possessivePredicate",reflexive,"createdAt","updatedAt")
FROM '/srv/sentDB/csv/pronouns_personal.csv'
DELIMITER ',' CSV HEADER;

COPY pronouns_others(word,type,number_id,"createdAt","updatedAt")
FROM '/srv/sentDB/csv/pronouns_others.csv'
DELIMITER ',' CSV HEADER;

COPY verbs(word,is_aux,is_active,is_passive,tense_pres3ps,tense_past1ps,tense_past2ps,tense_past3ps,tense_past1pp,tense_past2pp,tense_past3pp,past_part,category,"createdAt","updatedAt")
FROM '/srv/sentDB/csv/verbs.csv'
DELIMITER ',' CSV HEADER;

COPY nouns(word,"isPlural",plural,category,"createdAt","updatedAt")
FROM '/srv/sentDB/csv/nouns.csv'
DELIMITER ',' CSV HEADER;

COPY stamps(title,pos,value,description,"createdAt","updatedAt")
FROM '/srv/sentDB/csv/stamps.csv'
DELIMITER ',' CSV HEADER;

COPY sentence_complexity(complexity,"createdAt","updatedAt")
FROM '/srv/sentDB/csv/sentence_complexity.csv'
DELIMITER ',' CSV HEADER;

COPY sentences(words,coded,complexity_id,keywords,"createdAt","updatedAt")
FROM '/srv/sentDB/csv/sentences.csv'
DELIMITER ',' CSV HEADER;