# Requisitos

### Recuperação de senha

**RF**
- O usuário deve poder recuperar sua senha informando o seu E-mail.✅
- O usuário deve poder receber um E-mail com instruçõe para recuperar seu senha.✅
- O usuário deve poder resetar sua senha.✅

**RNF**
- Utilizar o Ethereal para envio de E-mails em ambiente dev.✅
- Utilizar o Amazon SES para envio de E-mails em ambiente de produção dev.
- O envio de E-mails deve acontecer em segundo plano (background job)

**RN**
- O link de recuperação deve inspirar em 2h.✅
- O usuário deve confirmar a nova senha ao resetar a senha.
- O envio do E-mail so deve acontecer se existir uma conta cadastradado com o email informado.✅

### Atualização do perfil
**RF**
- O usuário deve poder atualizar o nome, email e senha.✅

**RN**
- O usuário não pode autualizar o seu E-mail para um E-mail ja cadastrado.✅
- Para atualizar a senha, o usuário deve informar a antiga senha.✅
- Para atualizar a senha, o usuário deve confirmar a nova senha.

### Painel do prestador

**RF**
- O usuário deve poder listar todos os seu agendamentos em um dia específico.
- O prestador deve poder receber uma notificação sempre que houver um novo agendamento.
- O prestador deve poder visualizar as notificações não lidas.

**RNF**
- Osagendamentos do prestador no dia  devem ser armazeanda em cache.
- As notificaçõe do prestador devem ser armazenadas no MongoDB
- As notificaçõe do prestador devem ser enviadas usando o socket.io.

**RN**
- A notificaçõe devem ter um status de lida e não-lida

### Agendamento de Senviço
**RF**
- O usuário deve poder listar todos os prestadores de serviços cadastrados.✅
- O usuário deve poder listar todos todos os dias de um mês disponível de um prestador.✅
- O usuário deve poder listar todos todos os horários de um dia disponível de um prestador.✅
- O usuário deve poder realizar um novo agendameto com um prestador.✅

**RNF**
- A listagem de prestadores devem ser armazendas em cache.

**RN**
- Cada agendamento deve durar exatamente 1h.✅
- O usuário não pode agendar em um horáro já ocupado.✅
- O usuário não pode agendar em um horáro que já passou.✅
- Os agendamentos devem estar disponíveis entre 8hrs e 18hrs.✅
- O usuário não pode agendar um serviço consigo mesmo.✅
