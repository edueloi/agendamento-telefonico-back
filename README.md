# 📞 Agendamento Telefônico - Back-End

Este é o Back-End do projeto Agendamento Telefônico, desenvolvido com Spring Boot e PostgreSQL.

## 🚀 Tecnologias Utilizadas

Java 17

Spring Boot 3.4.2

Spring Data JPA

PostgreSQL

Hibernate

JUnit 5 e Mockito (Testes)

## 📌 Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

Java 17 ou superior

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


## ✨ Créditos

📌 **Desenvolvido por:**  
👨‍💻 **Engenheiro Eduardo Eloi** 🚀

📅 **Versão:** `1.0`  
🔗 **Tecnologia:** `Spring Boot 3.4.2`
