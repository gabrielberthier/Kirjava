---
title: Python e Testes
slug: python-e-testes
date_published: 2023-05-04T19:55:05.000Z
date_updated: 2023-07-12T14:37:26.000Z
tags: articles, article, python, test, unit-testing
excerpt: Os testes unitários são um dos recursos que nos ajudam a automatizar a validação do comportamento do software que estamos implementando.
---

Testes são um dos meus assuntos favoritos no desenvolvimento e por vários motivos:

- Auxiliam na alteração de código que já funciona
- Previnem erros de serem inseridos em produção
- Possibilitam mais tempo no editor de texto e menos executando software
- Se dão muito bem com gamificação
- ellipsis ellipsis ellipsis

# Um pouco de história

Quando comecei a desenvolver software profissionalmente, me frustrava sempre a possibilidade de ver o que eu criei quebrando em qualquer estágio de desenvolvimento e muitas vezes me via como um malabarista de circo tentando segurar e mover as várias partes de execução dos casos de uso que eu escrevia. Comumente, recebia vários erros e percebia que havia algo de errado - se não com a minha escolha de profissão, com minha falta de maturidade.
![Tentando segurar baloes](__GHOST_URL__/content/images/2023/05/image.png)
Você tentando amarrar todas as pontas soltas do negócio
Tudo isso durou até uns cinco anos atrás quando me deparei com algo que mudou minha maneira de escrever código: testes. 

> Ah, Gabriel, mas teste é um assunto batido, né?

Eu também pensava assim, mas mais que ver valor real em testes unitários é saber como extraí-los. 

Como programador, eu cheguei a conclusão que podemos medir a qualidade de um programador mediante seu grau de senioridade da seguinte forma:
- juniores pela disposição com relação aos desafios que encontrarão;
- plenos pela capacidade de lidarem com os desafios que encontram;
- seniores pela expertise dos desafios que já encontraram.

De primeiro momento eu tive bastante disposição, mas não capacidade suficiente para evoluir minha qualidade técnica e das entregas que eu ia fazendo. Conclusão: deadlines estourados, muitas desculpas. 

Entretanto, isso se devia a uma falsa dicotomia que eu mesmo possuía: ora, se criando software eu gasto esse tanto de tempo, criando testes que eu posso fazer manualmente depois eu vou gastar o dobro. E não podia estar mais enganado.

# Por que testar?

Vou focar um pouco em duas abordagens de teste neste artigo: testes unitários e testes integrados. Outros testes são muito bons, mas, para mim, estes são fundamentais. Durante o artigo usarei tudo que aprendi em com testes unitários  - embora gostaria de falar dos integrados num futuro post também - Python, mas já aviso que este é um tópico beeem extenso (se feito corretamente).

## Testes unitários

> O principal objetivo do teste de unidade é isolar o código escrito para testar e determinar se ele funciona conforme o esperado. O teste de unidade é uma etapa importante no processo de desenvolvimento. Se feito corretamente, os testes de unidade podem detectar falhas iniciais no código que podem ser mais difíceis de encontrar em estágios de teste posteriores.

### Como funciona

Testes unitários focam em testar a menor parte lógica de um módulo. Como no paradigma Orientado a Objetos nossos módulos costumam ter classes ou mesmo serem classes e, dado que classes são componentes lógicos complexos, a menor parte a ser testada costuma ser de métodos presentes nestas classes. Por isso a metodologia mais comum aplica um conjunto de asserções sobre métodos para que entradas e saídas sejam validadas de acordo com as expectativas dos testes.

Como assim?

Supomos uma classe CalculaEmprestimo, onde está definido o comportamento de cálculo de um empréstimo com juros de algum% ao ano. Parece simples, correto? Mas essa operação corresponde a uma aplicação de juros compostos, que já possui uma regra matemática definida.

Quando falamos de juros anuais, falamos do temido juros sobre juros. O que ocorre é que a no primeiro mês a taxa, por exemplo, é de 1%, mas no segundo ela tem uma pequena elevação. Os juros anuais são cobrados de forma composta, por isso, confundem tanto as pessoas. Para entender melhor, no final de um ano, ao invés de ser 12%, serão cobrados 12,68%.

Neste caso, precisaríamos conhecer a taxa atual para sabermos quanto cobrar mensalmente sobre o montante, mas como?

A fórmula para isso é:

$$
Iq = [(1 + It)^q/(t – 1)] x 100
$$


Onde:

• Iq = taxa de juros no período que você quer;

• It = taxa de juros no período que você tem;

• q = período que você quer;

• t = período que você tem.

Daí, por exemplo, se nosso app fosse checar quanto seria gasto por mês teríamos o seguinte:

$$
taxa = [(1 + 0,15)^(1/12) – 1] x 100
$$


Nesse caso, 1.17% ao mês.

E a fórmula para Juros Compostos é expressa por:

$$
M = C(1+i)^t
$$

Onde:

• M = montante final

• C = capital inicial

• i = taxa de juros

• t = tempo.

Como precisamos que nosso método funcione com qualquer valor anual já que essa é uma regra arbitrária que nosso P.O escolheu (eu mesmo), então esse valor também precisa ser passado de alguma maneira.

Computacionalmente, nosso método seria algo tipo:

```python
    
    # O input
    
    class Loan(BaseModel):
        amout: Decimal
        tax_per_year: float
        acquired_at: datetime
    
    class CalculaEmprestimo:
        def calcula(self, loan: Loan) -> Decimal:
            tax_percent = loan.tax_per_year / 100
            # Multiplicamos por 100 para ficar no formato decimal%
            month_tax = (((1 + tax_percent) ** (1 / 12) - 1)) * 100
            current_date = datetime.now()
            start_date = loan.acquired_at
            delta = relativedelta(current_date, start_date)
            res_months = delta.months + (delta.years * 12)
            tax_over_value = Decimal((1 + (month_tax / 100)) ** res_months)
            # o output
            return loan.amount * Decimal(tax_over_value)
```  

Ok, mas depois de todo esse blablá, com um cenário hipotético de cálculo levemente complexo, onde entram os testes? Antes de tudo: o que queremos testar?

Bom, dado um objeto **Loan(amout: decimal, tax_per_year: float, acquired_at: datetime)**, queremos o valor a ser pago depois de um determinado período para o valor original baseado no tempo que aquele valor passou em aberto. Portanto, algumas ideias para testes são: dado um valor de 500 reais, o teste deve retornar o valor após seis meses; dado um periodo menor que um mes, o teste deve retornar o valor original; dado um valor de taxa ao ano, o valor correto de taxa mensal deve ser aplicado e por aí vai.

Por via de regra o mindset antes de iniciar nossa suite de testes é:

1. O que quero testar?
2. Estou escrevendo um teste de unidade ou integração?

Então a estrutura para nossos testes é mais ou menos o seguinte:

1. Criar os inputs;
2. Executar os testes e capturar o output;
3. Comparar o output esperado pelas nossas expectativas com o output capturado pelos testes.

De que maneira isso é feito e automatizado? Bom, aí entram duas das principais bibliotecas de testes automatizados do Python: o Pytest e o Unittest. Focarei no último, porque acho mais interessante e possui uma abordagem que considero mais conveniente.

## Unittest

Em suma, o unittest é um framework de testes que já vem incorporado às libs do Python. Tem uma sintaxe levemente semelhante às asserções presente em outras ferramentas de outras linguagens - PHPUnit, JUnit, alguém?. Uma suite de testes com a ferramenta é mais ou menos assim:
```python

    import unittest
    
    class TestStringMethods(unittest.TestCase):
    
        def test_upper(self):
            self.assertEqual('foo'.upper(), 'FOO')
    
        def test_isupper(self):
            self.assertTrue('FOO'.isupper())
            self.assertFalse('Foo'.isupper())
    
        def test_split(self):
            s = 'hello world'
            self.assertEqual(s.split(), ['hello', 'world'])
            # check that s.split fails when the separator is not a string
            with self.assertRaises(TypeError):
                s.split(2)
    
    if __name__ == '__main__':
        unittest.main()
```

E aí é só executar nosso teste :D.

---

Testes costumam seguir as tomadas de decisão e a comunicação descrita pelo sistema principal (aquele que realmente somos pagos para fazer). Logo, se quisermos estruturar nosso teste de acordo com nosso primeiro exemplo, teríamos algo assim:

Nosso primeiro teste ficará localizado em:
```
    project/
    │
    ├── services/
    │   └── calcula_emprestimo.py
    │   └── __init__.py
    |
    └── test/
    │   └── __init__.py
    │   └── services/
    │       └── test_calcula_emprestimo.py
    │       └── __init__.py
    └── main.py
``` 

Mas você pode seguir o mesmo exemplo (deste repositório)[[https://github.com/navdeep-G/samplemod](https://github.com/navdeep-G/samplemod)].

> Sem mais delonga, mostra o código aí de teste?

OK. Vamos começar testando a menor parte do nosso módulo.

```python

    # services/calcula_emprestimo.py
    
    from pydantic import BaseModel
    from decimal import Decimal
    
    class Loan(BaseModel):
        amout: decimal
        tax_per_year: float
        acquired_at: datetime
    
    class CalculaEmprestimo:
        def calcula(self, loan: Loan) -> Decimal:
            tax_percent = loan.tax_per_year / 100
            # Multiplicamos por 100 para ficar no formato decimal%
            month_tax = (((1 + tax_percent) ** (1 / 12) - 1)) * 100
            current_date = datetime.now()
            start_date = loan.acquired_at
            delta = relativedelta(current_date, start_date)
            res_months = delta.months + (delta.years * 12)
    
            tax_over_value = Decimal((1 + (month_tax / 100)) ** res_months)
    
            # o output
            return loan.amount * Decimal(tax_over_value)
```   

E o teste:

```python 
    # tests/services/test_calcula_emprestimo.py
    
    import unittest
    from services.calcula_emprestimo import CalculaEmprestimo, Loan
    from datetime import datetime
    from dateutil.relativedelta import relativedelta
    from decimal import Decimal
    
    class TestCalculaEmprestimo(unittest.TestCase):
        def setUp(self):
            self.sut = CalculaEmprestimo() # Sut? https://en.wikipedia.org/wiki/System_under_test.
    
        # Primeiro teste:
        # IMPORTANTE: Espera-se que o teste descreva uma EXPECTATIVA.
        def test_should_return_correct_amount_for_loan_after_two_months(self):
            two_m_ago = datetime.now() - relativedelta(months=2)
            loan = Loan(amount=Decimal(500), tax_per_year=15, acquired_at=two_m_ago)
    
            output = self.sut.calcula(loan)
    
            self.assertEqual(round(output, 2), round(Decimal(511.78), 2))
    
        # Segundo teste:
        def test_should_return_same_original_value_for_less_than_a_month_range(self):
            now = datetime.now()
            loan = Loan(amount=Decimal(500), tax_per_year=15, acquired_at=now)
    
            output = self.sut.calcula(loan)
    
            self.assertEqual(output, Decimal(500))
```
    

Pronto! Conseguimos criar nosso primeiro teste. MAS. ESPERA AÍ. O mundo real não é tão simples. Nossa classe de cálculo é completamente objetiva, mas o cenário do dia a dia é bem... menos pragmático. E se agora surgisse uma nova classe para outro cenário em que além de calculo do juros composto precisássemo também salvar o valor da consulta em outro serviço ou banco de dados ou em algum provedor de cache? Alguma classe de conexão para armazenar este valor seria necessário, mas além disso precisaríamos do contexto para fazer esta operação sem que ele impactasse nos testes atuais. Como fazer isso?

Novo exemplo complexo:
```python
    class AtualizaValorEmprestimo:
        def __init__(self) -> None:
            self.calculadoraJurosComposto = CalculaEmprestimo()
            self.registraValor = RegistraValor()
    
        def atualiza_valor(self, owner_id: str, loan: Loan):
            new_value = self.calculadoraJurosComposto.calcula(loan)
    
            self.registraValor.registra_novo_valor(owner_id, new_value)
```

Agora temos um teste que necessita de um agente externo do qual temos pouca ou nenhuma informação a não ser pela interface que ele expõe. Para termos um teste desta classe teremos que criar em toda criação do sistema sob teste novos objetos, o que dificulta nossa testagem e pode criar resíduos na API, banco de dados ou qualquer forma de armazenamento de estados que estiver vinculado a este agente.

## Um bom teste unitário

Para garantir que vamos evoluir bem com nossos testes unitário devemos ter algumas bases do que qualifica um bom teste unitário. Não é legal que tenhamos apenas boa intenção e tempo, é preciso que nossos testes não sejam uma dificuldade ao longo do tempo e um impeditivo da evolução do sistema principal. Para isso, vamos considerar um bom teste unitário com base nas seguintes regras.

-> Características de um bom teste unitário (Fonte: Microsoft)[[https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices)].

- Rápido: não é incomum que projetos maduros tenham milhares de testes de unidade. Os testes de unidade devem levar pouco tempo para serem executados. Milissegundos..
- Isolado: os testes de unidade são autônomos, podem ser executados isoladamente e não dependem de nenhum fator externo, como sistema de arquivos ou banco de dados. Isso ocorre porque os testes unitários não devem armazenar estado! Isto impossibilitaria que fossem repetidos com fidelidade e dificultaria a confibiabilidade do teste que passaria a depender da infraestrutura em que está.
- Repetível: A execução de um teste de unidade deve ser consistente com seus resultados, ou seja, sempre retornará o mesmo resultado se você não alterar nada entre as execuções.
- Autoverificação: O teste deve ser capaz de detectar automaticamente se passou ou falhou sem qualquer interação humana.
- Pontual: um teste de unidade não deve levar um tempo desproporcionalmente longo para ser escrito em comparação com o código que está sendo testado. Se você achar que testar o código leva muito tempo em comparação com escrever o código, considere um design que seja mais testável.

Com base no nosso último caso, algo precisa ser pensado antes de escrevermos nossos testes novamente.

## Mantendo o isolamento

É sempre preferível que nossos testes não dependam de agentes externos como a rede, arquivos, banco de dados, etc etc etc. Mas quando o teste tem uma relação direta com uma classe que depende desses fatores, é preciso que encontremos outra forma de testar. Neste caso, a solução que vai melhor para o cenário é utilizar `mocks`.

### Mocks

(Fake it, before you make it)

A biblioteca unittest do Python inclui um subpacote denominado unittest.mock — ou se você o declarar como uma dependência, simplesmente mock — que fornece meios extremamente poderosos e úteis para criar mocks e eliminar a dependência de serviços com efeitos colaterais indesejados.

> Como desenvolvedores, durante testes, geralmente nos preocupamos mais em saber se a função de conexão a agentes externos é executada corretamente do que verificar que os agentes foram afetados.

Esse comportamento é exatamente o que precisamos no caso anterior, onde não queremos que nosso sistema real ou suas dependências sejam afetados por um cenário de testes. Neste caso, vamos usar um mock para que nossa classe possa se "comunicar" com o registrador de valores. No caso dos mocks isto pode ser feito de VÁRIAS maneiras:

- Via declaração de mock
```python
    mock = Mock()
    # ou
    mock = MagicMock()
``` 

- Via decorador patch
```python
    from unittest.mock import patch
    
    class Test(unittest.TestCase):
        @patch("RegistraValor")
        def test_should_register_value(self, mock): # sim, é obrigatório passar a variável mock
            pass
```    
    

- Via context manager
```python
    from unittest.mock import patch
    
    class Test(unittest.TestCase):
        def test_should_register_value(self):
            with patch('module') as mock:
                ...
```  
    

E cada qual tem suas próprias finalidades, drawbacks e comportamentos esquisitos :)

---

**DETALHE IMPORTANTE**: Um mock só deve funcionar via patch se for chamado diretamente no módulo que queremos acessar. Logo, um serviço que possui uma conexão que queremos criar um mock precisa ser passado como string na seguinte forma ao patch:
```python
    patch("services.service_module.ConnectionNameClass")
```

Do contrário os métodos testados NÃO devem funcionar.

---

De volta ao nosso cenário de testes, como fazer o teste passar?

Nosso teste muito simples ficaria da seguinte forma:

```python    
    class TestAtualizaValorEmprestimo(unittest.TestCase):
        @patch(f"{__name__}.RegistraValor")
        def test_should_register_value(self, mock):
            sut = AtualizaValorEmprestimo()
            loan = Loan(amount=Decimal(500), tax_per_year=15, acquired_at=datetime.now())
            sut.atualiza_valor("owner", loan)
```
    

Bom, agora nosso teste deve passar. Mas... o que testamos aqui?

Basicamente, somente afirmamos que nosso teste vai executar o mock, mas não temos output, garantias de que foi chamado corretamente, nada!

Por isso, objetos do tipo mock vêm com uma série de asserções para nos ajudar a garantir que foram executados da maneira esperada.

Alguns exemplos:

- `assert_called_once_with`
- `assert_called_once`
- `assert_called_with`
- `assert_has_calls`
- `assert_not_called`
- `assert_any_call`

e por aí vai.

No nosso teste, seria o suficiente saber que o registrador de valores foi chamado com o valor que passamos e com o id informado. Portanto, poderíamos chamar nosso mock da seguinte maneira:
```python
    class TestAtualizaValorEmprestimo(unittest.TestCase):
        @patch(f"{__name__}.RegistraValor") # Local onde está sendo informada a classe
        def test_should_register_value(self, mock: Mock):
            sut = AtualizaValorEmprestimo()
            loan = Loan(amount=Decimal(500), tax_per_year=15, acquired_at=datetime.now())
            sut.atualiza_valor("owner", loan)
    
            mock.assert_called_once_with("owner", Decimal(500))
```

Note que o teste deve falhar. Isso ocorre porque apesar de um mock ter sido passado para a nossa classe sob testes, este mock vai "transformar" nossa classe em um objeto mock, mas este objeto não é o que queremos testar, e sim seu método. Neste caso, seria interessante usarmos o patch.object para termos acesso a instância deste objeto.

```python
    
    class TestAtualizaValorEmprestimo(unittest.TestCase):
        @patch.object(RegistraValor, "registra_novo_valor", return_value=None)
        def test_should_register_value(self, mock: Mock):
            sut = AtualizaValorEmprestimo()
            loan = Loan(amount=Decimal(500), tax_per_year=15, acquired_at=datetime.now())
            sut.atualiza_valor("owner", loan)
    
            mock.assert_called_once_with("owner", Decimal(500))
```

Note que agora testamos diretamente o método com este mock e passamos a classe como spec no primeiro parâmetro do método de patching, seguido pelo método que queremos testar.

### Retornando valores

Além de termos acesso ao que é passado a este mock, podemos também criar valores arbitrários de retorno - ou mesmo criar cenários de exceções.

Supondo que queremos ter controle na nossa classe de produção sobre o que é retornado do registrador e se tivermos um erro criar um log, o que poderíamos fazer?
```python
    import loggin
    
    class AtualizaValorEmprestimo:
        def __init__(self) -> None:
            self.calculadoraJurosComposto = CalculaEmprestimo()
            self.registraValor = RegistraValor()
    
        def atualiza_valor(self, owner_id: str, loan: Loan):
            new_value = self.calculadoraJurosComposto.calcula(loan)
            try:
                self.registraValor.registra_novo_valor(owner_id, new_value)
    
                logger.info("Successfully stored new register")
    
            except Exception as ex:
                logger.error(ex)
    
                raise Exception from ex
```

Trabalhamos agora com mais dois cenários:

1 - No caso de sucesso, adicionamos um log de sucesso informativo.

2 - No caso de erro, precisamos informar a existência deste erro e, neste caso simbólico, garantir que o erro vá "borbulhar".

Estes comportamentos são definidos nos parâmetros que passamos ao patch: **return_value** e **side_effect**.

Por exemplo, se quiséssemos que nosso mock retornasse um novo valor arbitrário, poderíamos escrevê-lo assim:
```python
    class TestAtualizaValorEmprestimo(unittest.TestCase):
        @patch.object(RegistraValor, "registra_novo_valor", return_value=ValorArbitrario())
        def test_should_register_value(self, mock: Mock):
            sut = AtualizaValorEmprestimo()
            loan = Loan(amount=Decimal(500), tax_per_year=15, acquired_at=datetime.now())
            sut.atualiza_valor("owner", loan)
    
            mock.assert_called_once_with("owner", Decimal(500))
```

E teríamos como retorno do método este novo valor.

Entretanto, como lidar com uma exceção?

### Lidando com exceções

Nosso registrador agora vai responder a um Exception, por qualquer motivo imaginário que seja. O importante é que nossa classe de produção saiba lidar com este cenário e agir de maneira coesa para os erros que pode assumir. Vamos adicionar mais um método para testar a classe de produção.
```python
        @patch.object(
            RegistraValor, "registra_novo_valor", side_effect=Exception("Erro de conexão")
        )
        def test_should_raise_if_registra_valor_raises(self, mock: Mock):
            sut = AtualizaValorEmprestimo()
            loan = Loan(amount=Decimal(500), tax_per_year=15, acquired_at=datetime.now())
            sut.atualiza_valor("owner", loan)
    
            mock.assert_called_once_with("owner", Decimal(500))
```

Executando nosso novo cenário de teste, percebemos que a exceção é sem dúvida nenhuma lançada. Mas isso é esperado, então, como fazer nosso teste responder a isso? Por sorte o unittest tem cenários para isso.

```python 
        @patch.object(
            RegistraValor, "registra_novo_valor", side_effect=Exception("Erro de conexão")
        )
        def test_should_raise_if_registra_valor_raises(self, mock: Mock):
            sut = AtualizaValorEmprestimo()
            loan = Loan(amount=Decimal(500), tax_per_year=15, acquired_at=datetime.now())
    
            with self.assertRaises(Exception) as exception:
                sut.atualiza_valor("owner", loan)
    
            self.assertEquals(str(exception.exception), "Erro de conexão")
 ```   
    

Desta maneira podemos também ter acesso a exceção lançada, causas, temporalidade, etc etc etc. E mais que isso, ter controle sobre o fluxo de exceções internas que podem ser alvos de entropia na definição de uma classe.

Porém, surge assim também um problem: temos apenas dois casos de teste, e se tivéssemos vários? Faríamos inúmeros patches?

## Inversão de Dependência

> Módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem depender de abstrações; Abstrações não devem depender de detalhes. Detalhes devem depender de abstrações. (MARTIN 1996)

Nossa classe assume um risco grande ao criar as próprias instâncias, pois nos tornamos responsáveis por garantir que estas instâncias sejam mockadas, gerenciadas e não mudem com o tempo. Contornar isto pode ser difícil, principalmente em bases de código grandes, mas não é impossível. Começamos com boas práticas.

Você com certeza já deve ter visto código como o abaixo.
```php
    
    function gerarNotaFiscal(int $pedidoId)
    {
        $preçoPedido = calcular($pedidoId);
        // rotina para gerar a nota fiscal
    }
    function calcular(int $pedidoId) : float
    {
        $produtos = obterProdutos($pedidoId);
        // rotina que calcula a soma de todos os produtos
        return 678.50;
    }
    function obterProdutos(int $pedidoId) : array
    {
        // rotina que busca a lista de produtos
        // no banco de dados com base no id do pedido
        return [];
    }
```
    

E qual o problema com ele?

Nos tornamos repetitivos e dependentes de módulos externos E internos.

> No exemplo, as dependências seguem uma sequência, onde o fluxo começa com a função de alto nível (gerarNotaFiscal), que depende de uma função de baixo nível (calcular) que, por sua vez, depende de um detalhe (obterProdutos).

No nosso caso, algo similar ocorre, onde precisamos uma instância que faça algo, mas não queremos nos tornar responsáveis por criar uma. Neste caso, podemos aplicar a Inversão de Dependência utilizando de parâmetros em nosso construtor da classe de produção para que recebamos este instância. Nos testes isso cria uma nova facilidade, podemos agora definir nosso mock apenas uma vez e ser responsável em cada teste individualmente pelo seu comportamento.

```python  
    class AtualizaValorEmprestimo:
        def __init__(
            self, calculadoraJurosComposto: CalculaEmprestimo, registraValor: RegistraValor
        ) -> None:
            self.calculadoraJurosComposto = calculadoraJurosComposto
            self.registraValor = registraValor
    
        def atualiza_valor(self, owner_id: str, loan: Loan):
            new_value = self.calculadoraJurosComposto.calcula(loan)
    
            self.registraValor.registra_novo_valor(owner_id, new_value)
```  

Se precisarmos de uma instância única criamos um auto_spec que possa ser utilizado durante a vida útil da suite de teste :D

> A especificação automática pode ser feita por meio do argumento autospec para patch ou da função create_autospec(). A especificação automática cria objetos fictícios que têm os mesmos atributos e métodos dos objetos que estão substituindo, e quaisquer funções e métodos (incluindo construtores) têm a mesma assinatura de chamada do objeto real.

Assim, nossa versão melhorada utilizando autospec e removendo duplicidade fica assim:
```python
    class TestAtualizaValorEmprestimo(unittest.TestCase):
        def setUp(self) -> None:
            self.registra_valor_mock = MagicMock(spec=RegistraValor, autospec=True)
            self.sut = AtualizaValorEmprestimo(
                CalculaEmprestimo(), self.registra_valor_mock
            )
    
        def test_should_register_value(self):
            loan = Loan(amount=Decimal(500), tax_per_year=15, acquired_at=datetime.now())
            self.sut.atualiza_valor("owner", loan)
    
            self.registra_valor_mock.registra_novo_valor.assert_called_once_with(
                "owner", Decimal(500)
            )
    
        def test_should_raise_if_registra_valor_raises(self):
            loan = Loan(amount=Decimal(500), tax_per_year=15, acquired_at=datetime.now())
    
            self.registra_valor_mock.registra_novo_valor.side_effect = Exception(
                "Erro de conexão"
            )
    
            with self.assertRaises(Exception) as exception:
                self.sut.atualiza_valor("owner", loan)
    
            self.assertEqual(str(exception.exception), "Erro de conexão")
```

Bem mais limpo, certo?

## Conclusão

Foi um artigo meio longo e que PASSA LONGE DE COBRIR TUDO - quem sabe numa parte 2 com async? -, mas falamos de algo vital para a manutenção de sistemas atuais complexos, nossos testes unitários (falaria de integração também, mas vamo deixar para outro dia hehe). Testes não somente permitem entender de antemão possíveis erros que não pensamos, como também flexibilizam mudanças e nos dão uma maior confiança de que o usuário final não vai ter de lidar com um problema unicamente nosso de desenvolvimento.

Ficou com alguma dúvida? Achou algum erro? Comenta aí ;)

## Referências

(Real Python: Python Testing)[[https://realpython.com/python-testing/](https://realpython.com/python-testing/)]

(Unittest docs)[[https://docs.python.org/3/library/unittest.html](https://docs.python.org/3/library/unittest.html)]

(GrugBrainDev)[[https://grugbrain.dev/](https://grugbrain.dev/)]

(Five unit testing guidelines)[[https://medium.com/vx-company/the-5-unit-testing-guidelines-f21d39c33e0b](https://medium.com/vx-company/the-5-unit-testing-guidelines-f21d39c33e0b)]

(Toptal: An Introduction to Mocking in Python)[[https://www.toptal.com/python/an-introduction-to-mocking-in-python](https://www.toptal.com/python/an-introduction-to-mocking-in-python)]

(Mock docs)[[https://docs.python.org/3/library/unittest.mock.html](https://docs.python.org/3/library/unittest.mock.html)]

(O Princípio da Inversão de Dependência)[[https://medium.com/contexto-delimitado/o-princípio-da-inversão-de-dependência-d52987634fa9](https://medium.com/contexto-delimitado/o-princ%C3%ADpio-da-invers%C3%A3o-de-depend%C3%AAncia-d52987634fa9)]

(Mocking with autospec)[[https://m1lt0n.github.io/python/unittest/mock/autospec/mocking-with-autospec/](https://m1lt0n.github.io/python/unittest/mock/autospec/mocking-with-autospec/)]

(Python Mocking, You Are A Tricksy Beast)[[https://medium.com/python-pandemonium/python-mocking-you-are-a-tricksy-beast-6c4a1f8d19b2](https://medium.com/python-pandemonium/python-mocking-you-are-a-tricksy-beast-6c4a1f8d19b2)]
