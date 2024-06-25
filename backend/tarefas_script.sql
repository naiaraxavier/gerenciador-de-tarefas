USE tarefasdb;

-- -----------------------------------------------------
-- Table `tarefasdb`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE usuario (
  id_usuario INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  senha VARCHAR(45) NOT NULL,
  foto VARCHAR(45) NULL,
  PRIMARY KEY (id_usuario)
);

-- -----------------------------------------------------
-- Table `tarefasdb`.`Icone`
-- -----------------------------------------------------
CREATE TABLE icone (
  id_icone INT NOT NULL AUTO_INCREMENT,
  caminho_icone VARCHAR(45) NOT NULL,
  PRIMARY KEY (id_icone)
);

-- -----------------------------------------------------
-- Adicionar dados na tabela `icone`
-- -----------------------------------------------------
INSERT INTO icone (caminho_icone) VALUES ('../img/home.png');
INSERT INTO icone (caminho_icone) VALUES ('../img/work.png');
INSERT INTO icone (caminho_icone) VALUES ('../img/education.png');
INSERT INTO icone (caminho_icone) VALUES ('../img/shopping-cart.png');

-- -----------------------------------------------------
-- Table `tarefasdb`.`Lista`
-- -----------------------------------------------------
CREATE TABLE lista (
  id_lista INT NOT NULL AUTO_INCREMENT,
  nome_lista VARCHAR(45) NOT NULL,
  id_usuario INT NOT NULL,
  id_icone INT NOT NULL DEFAULT 1,
  PRIMARY KEY (id_lista),
  UNIQUE(id_icone),
  CONSTRAINT fk_lista_usuario_id
    FOREIGN KEY(id_usuario)
    REFERENCES usuario(id_usuario),
  CONSTRAINT fk_lista_icone_id
    FOREIGN KEY(id_icone)
    REFERENCES icone(id_icone)
);

-- -----------------------------------------------------
-- Table `tarefasdb`.`Tarefa`
-- -----------------------------------------------------
CREATE TABLE tarefa (
  id_tarefa INT NOT NULL AUTO_INCREMENT,
  descricao VARCHAR(45) NOT NULL,
  data DATE NOT NULL,
  hora DATETIME NOT NULL,
  repete TINYINT NOT NULL,
  id_lista INT NOT NULL,
  PRIMARY KEY (id_tarefa),
  CONSTRAINT fk_tarefa_lista_id
    FOREIGN KEY (id_lista)
    REFERENCES lista(id_lista)
    ON DELETE CASCADE
);



