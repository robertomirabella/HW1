create table Visitatore(
ID integer primary key auto_increment,
nome varchar(255), 
cf varchar(16)
);

create table Zoo(
ID integer primary key auto_increment, 
nome varchar(255), 
luogo varchar(255),
costo float,
data_apertura date
);

create table Biglietto(
visitatore integer, 
zoo integer, 
data_ingresso date,

index idx_vis1(visitatore),
index idx_zoo1(zoo),
foreign key(visitatore)references visitatore(id),
foreign key(zoo)references zoo(id),
primary key(visitatore,zoo)
);

create table Dipendente(
ID integer primary key auto_increment, 
titolo_studi varchar(255),
tipo boolean, /*true = sezione amministrativa, false = sezione animali*/ 
stipendio integer
);

create table Impiego(
zoo integer, 
dipendente integer, 
data_inizio date, 
tipo boolean, /*true = corrente, false = passato*/ 
data_fine date,
index idx_dip1(dipendente),
index idx_zoo2(zoo),
foreign key(dipendente)references dipendente(id),
foreign key(zoo)references zoo(id),
primary key(dipendente,zoo)
);

create table Dati_anagrafici(
dipendente integer,
cf varchar(16), 
nome varchar(255), 
data_nascita date,
index idx_dip2(dipendente),
foreign key(dipendente)references dipendente(id),
primary key(dipendente)
);

create table Direzione(
dipendente integer,
zoo integer,
index idx_dip3(dipendente),
index idx_zoo3(zoo),
foreign key(dipendente)references dipendente(id),
foreign key(zoo)references zoo(id),
primary key(dipendente,zoo)
);

create table Recinti(
ID integer auto_increment primary key,
zoo integer,
tipo varchar(255), 
n_animali integer,
index idx_zoo4(zoo),
foreign key(zoo)references zoo(id),
unique(zoo,id)
);

create table Specie(
specie varchar(255) primary key,
descrizione varchar(511),
foto varchar(255)
);

create table Animali_terrestri(
ID_chip integer auto_increment primary key,
specie varchar(255), 
data_acquisizione date, 
peso float, 
recinto integer, 
zoo integer,
index idx_zoo5(zoo),
index idx_rec1(recinto),
index idx_specie1(specie),
foreign key(zoo)references recinti(zoo),
foreign key(recinto)references recinti(id),
foreign key(specie) references specie(specie)
);

create table Animali_acquatici(
ID_chip integer auto_increment primary key,
specie varchar(255), 
data_acquisizione date, 
tipo boolean,-- true = dolce, false = salata 
recinto integer, 
zoo integer,
index idx_zoo6(zoo),
index idx_rec2(recinto),
index idx_specie2(specie),
foreign key(zoo)references recinti(zoo),
foreign key(recinto)references recinti(id),
foreign key(specie) references specie(specie)
);


delimiter //
create trigger inserimento_animali_terrestri
before insert on animali_terrestri
for each row
begin
DECLARE msg VARCHAR(255);
 if exists(select * from recinti where id=new.recinto and zoo=new.zoo)
 then
	if exists(select n_animali from recinti where id=new.recinto and zoo=new.zoo and n_animali<7)
	then
		update recinti
			set n_animali=n_animali+1
            where id=new.recinto and zoo=new.zoo;
	else 
		set msg = "Errore non puoi inserire l'animale, il recinto è già pieno";
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
	end if;
else
	set msg = "Recinto non trovato";
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
end if;
end//
delimiter ;

delimiter //
create trigger inserimento_animali_acquatici
before insert on animali_acquatici
for each row
begin
DECLARE msg VARCHAR(255);
 if exists(select * from recinti where id=new.recinto and zoo=new.zoo)
 then
	if exists(select n_animali from recinti where id=new.recinto and zoo=new.zoo and n_animali<15 and new.tipo = false)
	then
		update recinti
			set n_animali=n_animali+1
            where id=new.recinto and zoo=new.zoo;
	elseif(select n_animali from recinti where id=new.recinto and zoo=new.zoo and n_animali<10 and new.tipo = true)
    then
		update recinti
			set n_animali=n_animali+1
            where id=new.recinto and zoo=new.zoo;
	else
		set msg = "Errore non puoi inserire l'animale, l'acquario è già pieno";
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
	end if;
else
	set msg = "Recinto non trovato";
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
end if;
end//
delimiter ; 

alter table dipendente add column email varchar(255) unique;
alter table dipendente add column password varchar(255) not null;
alter table dati_anagrafici modify column cf varchar(16) unique;
alter table zoo add column foto varchar(255);
alter table zoo add column descrizione varchar(1024);
alter table recinti add column descrizione varchar(255);
