CREATE DATABASE quiz;
USE quiz;

CREATE TABLE quizzes(
id int auto_increment,
quiz_name varchar(255) not null,     
link text not null,
primary key(id)
);

CREATE TABLE results(
	id int auto_increment,
    id_quiz int not null,
    user varchar(255) not null,
    quantity_q int not null,
    quantity_a int not null,
    date datetime default now(),
    primary key(id),
    foreign key (id_quiz) references quizzes(id)
);

CREATE TABLE questions(
	id int auto_increment,
    id_quiz int not null,
    question varchar(255) not null,
    opt1 varchar(255) not null,
    opt2 varchar(255) not null,
    opt3 varchar(255) not null,
    opt4 varchar(255) not null,
    correct int not null,
    primary key(id),
    foreign key (id_quiz) references quizzes(id)
);

CREATE TABLE result_details(
	id int auto_increment,
    id_question int not null,
    id_result int not null,
    choosed int not null,
    correct int not null,
    isCorrect boolean not null,
    primary key(id),
    foreign key (id_question) references questions(id),
    foreign key (id_result) references results(id)
);