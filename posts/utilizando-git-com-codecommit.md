---
title: Utilizando Git com CodeCommit
slug: utilizando-git-com-codecommit
date_published: 2023-07-08T21:25:31.000Z
date_updated: 2023-07-08T21:31:56.000Z
tags: article
excerpt: Como utilizar Git com o CodeCommit? Configurações básicas para a ferramenta.
---

![](https://cdn-images-1.medium.com/max/1000/0*8U9uM3mPMZAcdYg_)
***Importante:**

Antes de tudo, tenha certeza de ter instalado em sua máquina a versão mais recente do Python e do provedor de pacotes pip.

O que precisamos?

Primeiro, precisamos de uma conta na AWS.
![](https://cdn-images-1.medium.com/max/1000/0*fgbtTOELMvwrRJfT)
Uma vez logados, necessitamos instalar a linha de comando da AWS, o AWS CLI, assim muitas funcionalidades da cloud ficam disponíveis para utilizarmos via linha de comando e com o codecommit a uma linha de comando no terminal ganhamos bastante performance de trabalho com o provedor de repositórios da AWS.

Escolha a forma de instalação da cli de acordo com seu sistema operacional em [https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html).

Para confirmar a instalação, abra o menu Iniciar, pesquise cmd para abrir uma janela do prompt de comando e, no prompt de comando, use o comando aws — version.

Agora introduziremos as configurações para acessar os recursos da linha de comando utilizando aws configure.

Nas configurações necessitaremos de quatro inputs:

- [Access key ID](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html#cli-configure-quickstart-creds)
- [Secret access key](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html#cli-configure-quickstart-creds)
- [AWS Region](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html#cli-configure-quickstart-region)
- [Output format](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html#cli-configure-quickstart-format)

Conseguimos estas credenciais buscando por IAM no console da AWS. Ou simplesmente clicando no nome de nosso usuário no canto direito do site e logo depois indo em My Security Credentials:
![](https://cdn-images-1.medium.com/max/1000/0*2sTfopnouPnQTwpx)
Uma vez na página, criamos nossas credenciais de acesso em Create Credentials:
![](https://cdn-images-1.medium.com/max/1000/0*UcjviEAj5mg9e21J)
Copie as informações e execute no terminal o comando aws configure, inserindo os valores providos pelo servidor, algo como:
```bash
AWS Access Key ID [None]: AKIAI44QH8DHBEXAMPLE

AWS Secret Access Key [None]: je7MtGbClwBF/2Zp9Utk/h3yCo8nvbEXAMPLEKEY

Default region name [None]: us-east-1

Default output format [None]: json (ou text)
```
Desta forma, ao finalizar vamos tentar executar algum comando de teste, por exemplo `aws rds describe-db-instances`, que nos retorna as instâncias de banco de dados na nossa conta AWS.

Agora precisamos apenas instalar o git-remote-codecommit, que nos permite clonar e trabalhar com o repositório remoto da AWS no CodeCommit. Faremos isso no terminal utilizando o comando pip install git-remote-codecommit.

Uma vez terminada a instalação veremos a mensagem Successfully built git-remote-codecommit.

Agora podemos clonar nosso repositório criado no CodeCommit, indo ao repositório escolhido, clicando nele e selecionando a opção de clonagem **Clone HTTPS (GRC)**, que nos dará uma url similar a

```bash
git clone codecommit::us-east-1://your-repo-name.
```
Se tudo funcionou corretamente até aqui, agora é só navegar até seu recurso ou projeto clonado com:

```bash

cd nome-da-pasta/

```

E só!

Referências:

[https://www.youtube.com/watch?v=hBRnWjz9YxM&ab_channel=TreinaWeb](https://www.youtube.com/watch?v=hBRnWjz9YxM&amp;ab_channel=TreinaWeb)

[https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-connect.html#how-to-connect-prerequisites](https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-connect.html#how-to-connect-prerequisites)

[https://docs.aws.amazon.com/codecommit/latest/userguide/setting-up-git-remote-codecommit.html#setting-up-git-remote-codecommit-prereq](https://docs.aws.amazon.com/codecommit/latest/userguide/setting-up-git-remote-codecommit.html#setting-up-git-remote-codecommit-prereq)
