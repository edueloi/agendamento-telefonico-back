# 📞 Agendamento Telefônico - Back-End

Este é o Back-End do projeto Agendamento Telefônico, desenvolvido com Spring Boot e PostgreSQL.

## 🚀 Tecnologias Utilizadas

Java 23

Spring Boot 3.4.2

Spring Data JPA

PostgreSQL

Hibernate

JUnit 5 e Mockito (Testes)

## 📌 Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

Java 23

Maven

PostgreSQL

## 🔧 Configuração do Banco de Dados

### O projeto utiliza PostgreSQL como banco de dados. No arquivo application.properties, configure as credenciais corretamente:

```
spring.datasource.url=jdbc:postgresql://localhost:5432/telefone_agendamento
spring.datasource.username=SEU_USUARIO
spring.datasource.password=SUA_SENHA
spring.datasource.driver-class-name=org.postgresql.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

## 📌 Nota: Substitua SEU_USUARIO e SUA_SENHA pelas credenciais do seu banco de dados.

### 🛠️ Como Rodar o Projeto

Clone o repositório:

git clone https://github.com/edueloi/agendamento-telefonico-back.git

Acesse o diretório do projeto:

cd agendamento-telefonico-back

Compile e rode a aplicação usando Maven:

mvn spring-boot:run

A API estará disponível em: http://localhost:8080

### 📑 Funcionalidades do Sistema

O sistema inclui funcionalidades completas para o gerenciamento de contatos:

📋 Cadastro de Contatos

Nome, E-mail e Celular são obrigatórios

Telefone fixo é opcional

Opção de adicionar aos favoritos

Validação de campos

### 🔍 Consulta de Contatos

Listagem completa de contatos cadastrados

Filtros por favoritos, ativos e inativos

Busca dinâmica por nome ou número

Ordenação por ID ou Nome

### ✏️ Edição de Contatos

Atualização de qualquer campo cadastrado

Manutenção da consistência dos dados

### ❌ Exclusão de Contatos

Confirmação antes de excluir

Atualização automática da lista

### 🔄 Ativação/Inativação de Contatos

Contatos podem ser ativados ou inativados rapidamente

Mudança dinâmica no status (verde para ativo, vermelho para inativo)

### 🔗 APIs Disponíveis

### Exemplo de Endpoints:

```
GET /contatos → Lista todos os contatos
POST /contatos → Cadastra um novo contato
PUT /contatos/{id} → Atualiza um contato existente
DELETE /contatos/{id} → Remove um contato
PATCH /contatos/{id}/favorito → Alterna status de favorito
PATCH /contatos/inativar/{id} → Inativa um contato
```

### 🏗️ Compilando e Rodando Testes

### Para rodar os testes unitários:

```mvn test```

### Para gerar a versão final do sistema:

```mvn package```

🎨 Destaques Visuais e Melhorias

API documentada e estruturada

Integração com PostgreSQL otimizada

Log detalhado para acompanhamento das requisições

Uso de boas práticas de desenvolvimento

## 🔧 Configuração do PostgreSQL no pgAdmin

Para configurar o banco de dados PostgreSQL no pgAdmin, siga os passos abaixo:

### 1️⃣ Criando a Conexão com o Servidor

1. Abra o pgAdmin e clique com o botão direito em Servers > Create > Server....
2. Na aba General, defina um nome para o servidor (exemplo: PostgreSQL Local).
3. Na aba Connection, preencha os campos:
   ```
   . Host name/address: localhost
   . Port: 5432 (padrão do PostgreSQL) 
   . Maintenance database: postgres
   . Username: Seu usuário do PostgreSQL
   . Password: Sua senha do PostgreSQL
   ```
  
4. Clique em Save.

### 2️⃣ Criando o Banco de Dados

1. Expanda o servidor recém-criado e clique com o botão direito em Databases > Create > Database....
2. No campo Database Name, insira telefone_agendamento.
3. Em Owner, selecione seu usuário PostgreSQL.
4. Clique em Save.

### Criando a Estrutura da Tabela no Banco

Para criar as tabelas e o esquema do banco, execute o seguinte script no Query Tool do pgAdmin:
```
-- Exclui a tabela caso já exista
DROP TABLE IF EXISTS desafio.contato;

-- Cria o esquema caso não exista
CREATE SCHEMA IF NOT EXISTS desafio;

-- Cria a tabela 'contato' com constraints adicionais
CREATE TABLE desafio.contato (
    contato_id SERIAL PRIMARY KEY,
    contato_nome VARCHAR(100) NOT NULL,
    contato_email VARCHAR(255) NOT NULL,
    contato_celular VARCHAR(11) NOT NULL UNIQUE,
    contato_telefone VARCHAR(10),
    contato_sn_favorito CHARACTER(1) NOT NULL DEFAULT 'N',
    contato_sn_ativo CHARACTER(1) NOT NULL DEFAULT 'S',
    contato_dh_cad TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Criar índices para melhorar a performance nas buscas
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_contato_sn_ativo') THEN
        CREATE INDEX idx_contato_sn_ativo ON desafio.contato(contato_sn_ativo);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_contato_sn_favorito') THEN
        CREATE INDEX idx_contato_sn_favorito ON desafio.contato(contato_sn_favorito);
    END IF;
END $$;

-- Insere um exemplo de contato
INSERT INTO desafio.contato (contato_nome, contato_email, contato_celular, contato_telefone, contato_sn_favorito, contato_sn_ativo)
VALUES ('João Silva', 'joao@email.com', '11999999999', '1144444444', 'N', 'S')
ON CONFLICT (contato_celular) DO NOTHING;  -- Evita erro caso já exista esse número cadastrado

```

### 4️⃣ Validando a Criação da Tabela
Após executar o script, para verificar se a tabela foi criada corretamente:

  1. No pgAdmin, expanda Servers > Databases > telefone_agendamento > Schemas > desafio > Tables.
  2. Você deverá ver a tabela contato listada.
  3. Para visualizar os dados inseridos, execute
```SELECT * FROM desafio.contato;```

Agora seu banco está pronto para ser utilizado pela aplicação! 🎉

## ✨ Créditos

📌 **Desenvolvido por:**  
👨‍💻 **Engenheiro Eduardo Eloi** 🚀

📅 **Versão:** `1.0`  
🔗 **Tecnologia:** `Spring Boot 3.4.2`
