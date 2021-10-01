create TABLE Usuario(
   id varchar(30) NOT NULL PRIMARY KEY,
   [password] varchar(50),
   nombre varchar(50),
   email varchar(30),
   estatus varchar(30),
   tipo varchar(30)
);

create TABLE Administrador(
   id varchar(30) FOREIGN KEY (id) REFERENCES Usuario(id) PRIMARY KEY
);

create TABLE Insignia (
   nombre varchar(30) NOT NULL PRIMARY KEY,
   puntos int
);

create TABLE MiniJuego(
   nombre varchar(30) NOT NULL PRIMARY KEY,
   puntosMax int,
   puntosReq int,
   habDesbloq varchar(50),
   insignia VARCHAR(30) FOREIGN KEY (insignia) REFERENCES Insignia(nombre),
   id int
);

create TABLE Empleado(
   id varchar(30) FOREIGN KEY (id) REFERENCES Usuario(id) PRIMARY KEY,
   juegoAsignado varchar(30) FOREIGN KEY (juegoAsignado) REFERENCES MiniJuego(nombre),
   tiempoDeJuego int,
   posicion int,
   puntaje int,
   diasConsec int
);

create table CasaCampo (
	id_concepto INT,
	id_grupo INT,
	tipo BIT,
	numSecuencia INT,
	concepto VARCHAR(255),
	FOREIGN KEY (id_grupo) REFERENCES Grupo(id),
	PRIMARY KEY (id_concepto)
);

create table Jugador(
   id varchar(30) NOT NULL PRIMARY KEY,
   lugar VARCHAR(255) NULL,
   puntaje INT,
   diasConsec INT,
   otro INT,
   nickname varchar(255) NULL,
   color varchar(255) NULL,
);

--Se agregan datos a tabla de Grupo y a tabla de Proceso
create table Grupo (
	id int not null primary key,
	nombre VARCHAR(255)
);

--Tabla de proceso contiene el id del proceso que se va a utulizar
create table Proceso(
   id_proceso int identity Primary Key clustered,
   id_grupo int,
   proceso varchar(30),
   CONSTRAINT FK_Proceso_Grupo FOREIGN KEY (id_grupo) REFERENCES Grupo (id)
)

-- Se agregan los subprocesos
select * from Proceso
insert into Acomoda values (1, 1, 'Negociación')
insert into Acomoda values (1, 2, 'Administración de Datos Maestros')
insert into Acomoda values (1, 3, 'Gestión de Créditos')
insert into Acomoda values (1, 4, 'Ingreso de Pedidos y Aceptación')
insert into Acomoda values (1, 5, 'Seguimiento de Pedidos y Liberación')
insert into Acomoda values (1, 6, 'Facturación')
insert into Acomoda values (1, 7, 'Cobranza')
insert into Acomoda values (1, 8, 'Post-Venta')

create table ConceptosCasaCampo (
    id_concepto int identity Primary Key clustered,
    id_grupo INT,
    nom_grupo VARCHAR(255),
    tipo BIT,
    numSecuencia INT,
    concepto VARCHAR(255),
    FOREIGN KEY (id_grupo) REFERENCES Grupo(id)
);

--MINIJUEGO TERNY ACOMODA
--Tabla Acomoda contiene los datos de los subprocesos del proceso
create table Acomoda(
   id_acomoda int identity Primary Key clustered,
   id_proceso int not NULL, --proceso comercial
   secuencia int,
   subproceso VARCHAR(50),
   CONSTRAINT FK_Acomoda_Proceso FOREIGN KEY (id_proceso) REFERENCES Proceso (id_proceso)
)

-- VALORES INICIALES
insert into Grupo values (1, 'Ventas')
insert into Proceso values (1, 'Proceso Comercial')
-- PRUEBAS ////// CHECAR
insert into Usuario values (204185, 'ABCdef123!@#', 'Martin', '6789012@ternium.mx', 'Activo', 'Jugador', 1);
insert into Usuario values (567998, 'Mit!8m&A', 'Julia', '4567890@ternium.mx', 'No Activo', 'Administrador', 2);
insert into Usuario values (423456, 'Xtoejrn!0', 'Emilia', '7890123@ternium.mx', 'No Activo', 'Admin', 3);
insert into jugador values ('12', '1', 0, 0, 0)
insert into Insignia values ('estrella de entregas', 250)
insert into MiniJuego values ('Terny Busca', 300, 150, 'Generación de entregas', 'estrella de entregas')
insert into jugador values ('12', 'Terny Busca', 0, 0, 0)

----------------------------------------------
-----------STORE PROCEDURES-------------------
----------------------------------------------

---1---
--User
create procedure SPLoadUsers
as
select id, [password], nombre, email, estatus, tipo, id_grupo from [Usuario];

---2---
-- load user trae un usuario
create Procedure SPLoadUser @id varchar(30)
as
select id, [password], nombre, email, estatus, tipo, id_grupo from [Usuario]
where id = @id

---3---
create Procedure SPUpdateUserGroup @id varchar(30), @id_grupo int
as
update [Usuario] set id_grupo = @id_grupo
where id = @id

---4---
create procedure SPDeleteUser @id varchar(30)
as
delete from Usuario
where id = @id

---5---
create procedure SPAddUser @id varchar(30), @password varchar(50), @nombre varchar(50), @email varchar(30), @estatus varchar(30), @tipo varchar(30), @id_grupo int
as
insert into [Usuario] values(
	@id, @password, @nombre, @email, @estatus, @tipo, @id_grupo)
if (@tipo = 'Jugador')
begin
insert into jugador values (@id, 'Terny Busca', 0, 0, 0, @nombre, '')
end
if (@tipo = 'Administrador')
begin
insert into Administrador values (@id)
end

---6---
--ordenar forma aleatoria
create procedure SPCargaAcomoda @id_proceso int
as select * from Acomoda where id_proceso = @id_proceso order by newid()

---7---
create Procedure SPLoadPlayer @id varchar(30) 
as 
select * from [Jugador]
where id = @id

---8---
create Procedure SPUpdatePlayer @id varchar(30), @color varchar(255), @puntaje int, @diasConsec int 
as 
update [Jugador]
set color = @color, puntaje = @puntaje, diasConsec = @diasConsec
where id = @id

---9---
create Procedure SPGetRanking 
as select top 3 nickname, puntaje from Jugador
order by puntaje desc

---10---
create procedure SPGetConceptos
as
select id_concepto, concepto, nom_grupo from ConceptosCasaCampo;

---11---
create procedure SPAddConcepto @nom_grupo varchar(255), @concepto varchar(255)
as
insert into ConceptosCasaCampo values(
    null, @nom_grupo, null, null, @concepto
)

---12---
create Procedure SPUpdateAdmin @nombre varchar(50) 
as 
update [Usuario]
set tipo = 'Administrador'
where nombre = @nombre

---13---
--  CREAR USUARIO EN LA BASE DE DATOS
create procedure SPCreateUser @id varchar(30), @password varchar(50), @nombre varchar(50), @email varchar(30), @estatus varchar(30), @tipo varchar(30), @id_grupo int
as
insert into [Usuario] values(
	@id, @password, @nombre, @email, @estatus, @tipo, @id_grupo)
if (@tipo = 'Jugador')
begin
insert into jugador values (@id, 'Terny Busca', 0, 0, 0, @nombre, '')
end
if (@tipo = 'Administrador')
begin
insert into Administrador values (@id)
end

---14---
-- INICIA SESIÓN EN LA PÁGINA WEB
create procedure SPLoadUserByEmail @email varchar(50)
as
select id, nombre, email, estatus, tipo, password from Usuario
where email = @email;