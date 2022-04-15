DROP TABLE IF EXISTS "npuyear";
DROP TABLE IF EXISTS "npucat";
DROP TABLE IF EXISTS "neibyear";
DROP TABLE IF EXISTS "neibcat";

CREATE TABLE neibcat (
    index_ INT PRIMARY KEY,
	neighborhood VARCHAR,
    crime_type VARCHAR,
	occur_year VARCHAR,
	occur_month VARCHAR,
    occur_count INT);

CREATE TABLE neibyear (
    index_ INT PRIMARY KEY,
	neighborhood VARCHAR,
    occur_year VARCHAR,
	occur_count INT
);



CREATE TABLE npucat (
    index_ INT PRIMARY KEY,
	npu VARCHAR,
    crime_type VARCHAR,
	occur_year VARCHAR,
	occur_month VARCHAR,
    occur_count INT);



CREATE TABLE npuyear (
    index_ INT PRIMARY KEY,
	npu VARCHAR,
	occur_year VARCHAR,
    occur_count INT
    );
