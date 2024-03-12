---
title: Python Type Hints - howto
slug: python-type-hints
date_published: 2023-04-26T19:40:28.000Z
date_updated: 2023-04-26T19:45:40.000Z
tags: articles, article, python
excerpt: Python é uma linguagem de tipagem dinâmica. Isso significa que o interpretador Python faz a verificação de tipo apenas enquanto o código é executado e que o tipo de uma variável pode mudar ao longo de seu tempo de vida.
---

## Tipagem

Python é uma linguagem de tipagem dinâmica. Isso significa que o interpretador Python faz a verificação de tipo apenas enquanto o código é executado e que o tipo de uma variável pode mudar ao longo de seu tempo de vida.

Ex:
```python
    
    a = 42 # int
    a = 42.0 # float
    a = lambda x: x.upper() # lambda
``` 
    

Em contrapartida, uma linguagem com tipagem estática (Java):
```java
    String a;
    a = "42"; // ok
    a = 42; // compiler error
``` 

Qual a melhor? Nenhuma das duas. Tudo depende do contexto.

Outro termo frequentemente usado quando se fala em Python é a tipagem de pato/duck typing, que vem da frase “se anda como um pato e grasna como um pato, então deve ser um pato” (ou qualquer uma de suas variações).

Em termos práticos, o interpretador do Python espera que determinado atributo ou função seja definido e se não houver lança uma exceção. Sucesso.

## E como isso afeta o Grêmio?
```python
    @require_authentication
    async def get_info(_, account_data):
        LOGGER.info("Getting account information")
        try:
            user_account = account_data.get("account", {})
    
        except:
            print("oops")
``` 

No código anterior, account_data pode ser qualquer coisa se não soubermos detalhes da implementação da anotação `require_authentication`. Se do dia para a noite alguém alterar o valor de account_data, como saberemos que tipo estamos lidando sem conhecermos detalhes da implementação? E se account_data mesmo sendo um dicionário não possuir a chave `account`? E se user_account receber um dicionário vazio e a DM perder requisições porque desconhecemos que a key account pode ter mudado?

Deveríamos mudar os microservices para Java?

Nunca.

Outras soluções para o problema são provisionados pelas implementações da linguagem, sendo uma delas a de Type Hint.

## Type Hint

Type Hints são um recurso que permite especificar o tipo de dados de uma variável em seu código. Type Hints não são executadas em tempo de execução (a não ser que você esteja usando mypy), mas podem ser usadas por ferramentas como IDEs e type checkers para fornecer informações adicionais sobre o código. Por exemplo, se você tiver uma função que aceita um número inteiro como argumento, poderá usar um Type Hint para indicar que o argumento deve ser um int.

Existem várias razões para usar Type Hints:

- Type Hints podem ser usadas por ferramentas como IDEs e verificadores de tipo para fornecer informações adicionais sobre o código. Por exemplo, uma IDE pode usar Type Hints para fornecer sugestões de código e verificar se você está usando o tipo correto de dados em uma variável.
- Type Hints podem ser usadas para documentar o código. Isso pode ser útil se você estiver trabalhando em um projeto com várias pessoas, pois permite que você especifique o tipo de dados que uma variável deve conter.
- Type Hints podem ser usadas para verificar se o código está usando o tipo correto de dados em uma variável. Isso pode ser útil para encontrar erros de digitação ou erros de lógica que podem ser difíceis de encontrar em tempo de execução.
- Type Hints podem ser usadas para otimizar o código em tempo de execução. Por exemplo, se você usar Type Hints para especificar que uma variável contém um número inteiro, o interpretador Python pode usar uma implementação mais rápida de operações matemáticas em vez de uma implementação genérica que funciona com qualquer tipo de dados.

No geral, o uso de Type Hints pode fornecer vários benefícios, mas não substitui testes e depurações cuidadosos. Elas são apenas uma ferramenta em seu kit de ferramentas para escrever código Python de alta qualidade.

Também poderíamos prever o que se espera de cada caso desenvolvido e dar esse grau de consciência a quem receber nosso código.

Ex:
```python

    # Bad
    def make_user(values):
        dispatcher = Dispatcher()
        return dispatcher.dispatch(values)
        
    a = make_user() 
    print(a) # a poderia ser um codigo de sucesso, um novo usuário, uma lancha ou jetski. Literalmente, qualquer coisa.
    # Ugly
    def make_user(values):
        dispatcher = Dispatcher()
        return dispatcher.dispatch(values)
    
    a = make_user() 
    if isinstance(a, dict):
        # faz algo com variavel a
        pass
    if isinstance(a, str):
        # faz algo com variavel a
        pass
    else: 
        raise BadType()
    # a ainda assim poderia ser um codigo de sucesso, um novo usuário, uma lancha ou jetski. Literalmente, qualquer coisa.
    # mas nesse caso esperamos que seja algum tipo previamente definido e cruzamos os dedos.
    print(a) 
    
    # Good
    def make_user(name: str, surname: str, tax_id: str) -> UserType:
        dispatcher: DispatcherType = Dispatcher()
        return_type: DispatcherReturnType = dispatcher.dispatch(name, surname, tax_id)
    
        if return_type.sucess:
            return return_type.data
    
        else:
            raise BadType()
    
    try:
        user_type = make_user("Cleiton", "Rasta", "11111111111")
    except BadType:
        print("Um erro ocorreu")
    else:
        print("Debochou legal")
```
    
    
    

Como no exemplo anterior, usando type hints teríamos um pouco mais de contexto e certeza do que é recebido na função, por exemplo em uma action:
```python
    from typing import Any
    
    @require_authentication
    async def get_info(_: Any, account_data: dict):
        LOGGER.info("Getting information administration my DMCred")
        try:
            user_account = account_data.get("account", {})
    
        except:
            print("Algo de errado aconteceu")
    
```

Ok. Agora sabemos que account_data é um dict, mas nada garante que ele possua as informações que precisamos, certo?

Para outro problema, temos outra solução.

## Dataclasses (Python 3.7+)

Dataclasses são *quase* classes comuns do Python, o que diferencia é que elas têm métodos básicos de modelo de dados como .**init**(), .**repr**() e .**eq**() implementados para você, além de contarem com inicializadores e um suporte mais claro aos type hints. Apesar de terem uma tipagem para seus atributos, eles não são **obrigatórios**, embora ainda assim permitam entendermos melhor o contexto.

Por exemplo:
```python
    from dataclasses import dataclass
    
    @dataclass
    class Mate:
        name: str
        age: int
    
    mate = Mate("42", 42)
    print(mate)
    # [output]: Mate(name="42", age=42)
    
    # Mas nada impede que passemos valores arbitrários
    
    mate = Mate(42, "cachorro")
    print(mate)
    # [output]: Mate(name="42", age="cachorro")
    
``` 

Se refatorássemos o mesmo cenário do `get_info`, poderíamos abstrair o valor do account_data para algo mais claro, estabelecendo uma espécie de contrato, ou protocolo, para o valor que esperamos e que deve ser passar pela annotation. A seguir, vamos supor que tivéssemos de refatorar a annotation `require_authentication`.
```python
    # authlib/authlib.py
    
    @dataclass
    class Account:
        name: str
        ...
    
    @dataclass
    class AuthResponse:
        account: Account
        token: str
    
    def require_authentication(function):
        async def wrapper_decorator(*args, **kwargs):
            http_response = caller(
                request,
                kwargs.get("is_transaction_action"),
                kwargs.get("decode_token_locally")
            )
    
            dict_response: dict|None = None
    
            if isinstance(http_response, JSONResponse):
                dict_response = json.loads(http_response.body)
                return http_response
            if isinstance(http_response, dict):
                dict_response = http_response
    
            account = dict_response.get('account', {})
            token = dict_response.get('token', {})
    
            auth_response = AuthResponse(account=account, token=token)
    
    
            return await function(*args, auth_response)
    
        return wrapper_decorator
```    

Nossos métodos de actions agora teriam mais clareza sobre o que account data poderia ser, pois teríamos um **protocolo** para seguir.
```python
    from typing import Any
    
    @require_authentication
    async def get_info(_: Any, account_data: AuthResponse):
        LOGGER.info("Getting information administration my DMCred")
        try:
            user_account = account_data.account # Account class
    
        except:
            print("Algo de errado aconteceu")
```   
    

Ainda que dataclasses NÃO OBRIGUEM a passar valores com a tipagem esperada, ele cria uma expectativa que deve ser concretizada pelos vários pontos de código que interagem com esta interface.Mais exemplos que poderíamos ter benefícios:

- Retorno de método
```python
     async def get_client_simulation(
      _, account_data: dict
      ):  # pylint: disable=too-many-return-statements
          try:
              user_account = account_data["account"]
              account_id = user_account.get("id")
              tax_id = user_account.get("tax_id")
              LOGGER.info(f"getting tax id {tax_id}")
    
              user_simulation_details: dict = CreditService().get_user_simulation_details(
                  tax_id=user_account["tax_id"], account_id=account_id
              )
    
              return response_generator(
                  data=user_simulation_details,
                  status_code=200,
              )
    
          except:
              pass
```

- E se `user_simulation_details` não tiver algum campo esperado pelo frontent?  

- E se `user_simulation_details` necessitar ser alterado?

- Default values 
```python
    
     # Don't initialize list with [] 
      @dataclass
      class Premium:
          amount: int = 0
          role: str = 'user'
          users: List[str] = [] # bad
    
      # Use instead dataclasses.field 
      @dataclass
      class Premium:
          amount: int = 0
          role: str = field(default='user')
          users: List[str] = field(default_factory=list) # correct
```

- Unpacking

Como parte da sintaxe de unpacking do Python, podemos passar unpacked dicts como parâmetros para uma dataclass, sem necessitar de inúmeros parâmetros para montar um objeto ou dict.

```python   
     # Não usando dataclasses
      def create_user_details(self, name, tax_id, favourite_taylor_swift_song, shoe_number = 42) -> dict:
      """ Faz algo com os parâmetros e retorna um dict
      """
      return {
          'name': name,
          'tax_id': tax_id,
          'favourite_taylor_swift_song': favourite_taylor_swift_song,
          'shoe_number': shoe_number,
      }
    
      # Usando dataclasses
      @dataclass
      class UserWhoLikesTaylorSwift:
          name: str
          tax_id: str
          favourite_taylor_swift_song: Optional[str]
          shoe_number: field(default=42)
    
          # Faz algo com os parâmetros recebidos no construtor
          def __post_init__(self):
              if self.favourite_taylor_swift_song != 'Love Story':
                  raise ValueError("No Taylor fan")
              if self.shoe_number < 30:
                  print('Baby shoe')
    
      values_from_somewhere: dict = get_values_from_somewhere()
      user =  UserWhoLikesTaylorSwift(**values_from_somewhere)
```
        

- Coerção em dicionário

```python
     # transforma dataclasses em dicts
     from dataclasses import dataclass, asdict
    
     values: dict = asdict(dataclass_object)
```
    

## Problemas adicionais

Como visto, dataclasses propõem uma maneira pythonica de direcionar o fluxo de informações oferecendo clareza maior sobre os dados e as informações. Entretanto, ainda temos alguns problemas:

- Não existe obrigatoriedade de tipos
- Não existe coerção de tipagem
- O cliente da dataclass pode implementar valores arbitrários

Como impedir que isso ocorra?

## Pydantic

Quando coerção de tipagem, obrigatoriedade de tipagem ou necessidade de validação sobre os dados é necessário, a biblioteca que mais se destaca é o Pydantic.

Se dataclasses funcionam como containers de dados, os models do Pydantic utilizam abordagens mais profundas para garantir a integridade dos dados recebidos e o comportamento de cada instância destes models.

> “Pydantic is a library that provides data validation and settings management using type annotations.” — Pydantic official documentation.

```python
    from pydantic import BaseModel
    
    class Person(BaseModel):
        first_name: str
        last_name: str
```

Uma vez que um model é definido, ele **deve** receber valores corretos para sua implementação ou um validation error é lançado como exceção. Isto funciona de maneira bastante coerente para os dados que recebermos nas actions e nas requisições externas que recebermos. Por exemplo:

```python

    class NotifyValues(BaseModel):
        debit_notification_id: str
        payment_value: float
        external_id: str
        type: str
        transaction_id: str
    
    service_dispatcher = ServiceDispatcher()
    values = service_dispatcher.dispatch()
    
    notify_values = NotifyValues(**values)
```
    

## Quando escolher entre dataclasses e Pydantic Models?

O Pydantic tem, em geral, um desempenho ruim comparado a classes nativas do Python, pois a verificação estrita de tipo e a facilidade de uso criam instâncias com menos desempenho, mas ajudam o dev a garantir integridade de daddos. Os benefícios das data classes, entretanto, são: vêm com o cpython e são suficientes (além de uma performance relativamente superior), e necessitam, entretanto, maior configuração em casos de complexidade maior.

## Conclusão

Independente de como, aproveitar o type hint do Python é uma maneira de trazer clareza ao desenvolvimento, além de protocolar o que é criado e dar assertividade nas decisões de design.

## Referências

[https://blog.labdigital.nl/sorry-youre-just-not-my-type-e1b8934c1013?gi=1c6294bcde82](https://blog.labdigital.nl/sorry-youre-just-not-my-type-e1b8934c1013?gi=1c6294bcde82)
[https://medium.com/capital-fund-management/python-dataclasses-6d7a2e1d23db](https://medium.com/capital-fund-management/python-dataclasses-6d7a2e1d23db)
[https://www.treinaweb.com.br/blog/tipagem-no-python-com-type-hints](https://www.treinaweb.com.br/blog/tipagem-no-python-com-type-hints)
[https://medium.com/alan/5-things-you-should-know-about-dataclass-8c143b75596](https://medium.com/alan/5-things-you-should-know-about-dataclass-8c143b75596)
[https://realpython.com/python-type-checking/](https://realpython.com/python-type-checking/)
[https://towardsdatascience.com/8-reasons-to-start-using-pydantic-to-improve-data-parsing-and-validation-4f437eae7678](https://towardsdatascience.com/8-reasons-to-start-using-pydantic-to-improve-data-parsing-and-validation-4f437eae7678)
[https://towardsdatascience.com/pydantic-or-dataclasses-why-not-both-convert-between-them-ba382f0f9a9c](https://towardsdatascience.com/pydantic-or-dataclasses-why-not-both-convert-between-them-ba382f0f9a9c)
