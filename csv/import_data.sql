COPY sentences(words,coded,complexity_id,keywords,"createdAt","updatedAt")
FROM '/Users/johnatkins/MyProjects/sentDB/csv/sentences.csv'
DELIMITER ',' CSV HEADER;