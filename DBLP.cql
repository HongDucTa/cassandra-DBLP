CREATE KEYSPACE "DBLP"
WITH replication = {
	'class' : 'SimpleStrategy',
	'replication_factor' : 1
};

CREATE TYPE IF NOT EXISTS pages(
	start INT,
	end INT
);

CREATE TYPE IF NOT EXISTS journal(
	series VARCHAR,
	editor VARCHAR,
	volume VARCHAR,
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

/* DROP TABLE DBLP; */

SELECT Count(*) FROM DBLP;

/*
SELECT authors FROM DBLP;
SELECT journal.series FROM DBLP;
SELECT pages.start,pages.end FROM DBLP;
*/