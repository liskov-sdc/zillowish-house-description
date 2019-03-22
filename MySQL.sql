CREATE SCHEMA zillowDescription;

USE zillowDescription;

CREATE TABLE houses (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  street varchar(255),
  city varchar(255),
  state varchar(5),
  zipcode varchar(10),
  description text
  price INT
);

