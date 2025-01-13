# CRM API

### Requisitos para rodar o projeto

- Docker (latest)
- Node 20.10.0 ou superior

---

### Recomendações

Commitar seguindo o [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#specification)

Seguir o padrão das pastas e nome dos arquivos.
    - Pasta common -> Uso geral e serviços externos
    - Pasta infra -> Tudo relacionado a parte interna da API e ferramentas usadas no código
    - Pasta modules -> Concentra o código da aplicação, utilizamos a abordagem voltada para a arquitetura 
    modular, então os contextos da api são dividos como módulos e cada um deve ser desenvolvido de forma que
    seja independente de outros módulos e que possa ser separado no futuro em um serviço externo caso precise.
        - Dentro de cada módulo estamos usando a idéia de camadas:
            - Pasta presentation: Concentra o código que lida com as requests e chamdas externas
            - Pasta application: Concentra o código que lida com as regras de negócio
            - Pasta external: Concentra o código que utiliza os serviços externos, como bando de dados
            integração com apis external e etc.
            - Pasta integration: Concentra o código que lida com a exposição do código interno do módulo para que outros módulos possam utilizar

---

### Passos para iniciar o projeto

1. Criar arquivo .env baseado no arquivo .env.example

2. Para iniciar a api:

```bash
npm run start:dev
```
