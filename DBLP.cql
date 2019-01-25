CREATE TYPE IF NOT EXISTS pages(
	start INT,
	end INT
);

CREATE TYPE IF NOT EXISTS journal(
	series VARCHAR,
	editor VARCHAR,
	volume INT,
	isbn LIST<VARCHAR>
);

CREATE TABLE IF NOT EXISTS DBLP(
	id VARCHAR,
	path VARCHAR,
	type VARCHAR,
	year INT,
	title VARCHAR,
	authors LIST<VARCHAR>,
	pages FROZEN<pages>,
	booktitle VARCHAR,
	journal FROZEN<journal>,
	url VARCHAR,
	cites LIST<VARCHAR>,
	PRIMARY KEY (id)
);

/*
INSERT INTO DBLP JSON '{ "id" : "408aa9e4-99a1-4310-97d9-2c4550d328fe", "path"  : "series/cogtech/Zancanaro12", "type" : "Article", "year" : 2012, "title" : "Shared Interfaces for Co-located Interaction.", "authors" : [ "Massimo Zancanaro" ], "pages" : { "start" : 71, "end" : 88 }, "booktitle" : "Ubiquitous Display Environments", "journal" : { "series" : null, "editor" : null, "volume" : null, "isbn" : [  ] }, "url" : "db/series/cogtech/364227662.html#Zancanaro12", "cites" : [  ] }';
INSERT INTO DBLP JSON '{ "id" : "32826b56-b813-4d83-a230-edbf07fef5d5", "path"  : "series/cogtech/Wahlster13", "type" : "Article", "year" : 2013, "title" : "The Semantic Product Memory: An Interactive Black Box for Smart Objects.", "authors" : [ "Wolfgang Wahlster" ], "pages" : { "start" : 3, "end" : 21 }, "booktitle" : "SemProM", "journal" : { "series" : null, "editor" : null, "volume" : null, "isbn" : [  ] }, "url" : "db/series/cogtech/364237376.html#Wahlster13", "cites" : [  ] }';

SELECT * FROM DBLP;
*/