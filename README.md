# El Patron — Next.js Migration

## Integrantes

| Nome | RA |
| ---- | -- |
| Gustavo Garabetti Munhoz | 10409258 |
| João Pedro Rodrigues Vieira | 10403595 |
| Joaquim Rafael Mariano Prieto Pereira | 10408805 |
| Caio Yukio Yazawa | 10418604 |
| Erick Guilherme de Macedo Cabral | 10419996 |

---

## Processo de Ideação — Migração para Next.js

### Contexto

O projeto original **El Patron WebApplication** foi desenvolvido como uma landing page estática usando HTML, CSS e JavaScript puro. A aplicação cumpriu bem seu papel inicial: apresentar a barbearia ao público, exibir serviços, galeria de estrutura, formulário de contato e localização.

Com a evolução do projeto, identificamos limitações claras na abordagem estática:

| Limitação do projeto original | Impacto |
| ----------------------------- | ------- |
| Sem roteamento — tudo em uma única página | Navegação limitada, difícil de escalar |
| Dados estáticos no HTML | Impossível atualizar conteúdo sem mexer no código |
| Sem back-end | Formulário salva apenas no localStorage, sem persistência real |
| Sem catálogo de cortes dinâmico | Não existe uma forma estruturada de exibir os tipos de corte oferecidos |

A migração para **Next.js** resolve essas limitações ao introduzir roteamento baseado em arquivos, consumo de API externa, renderização híbrida (SSG + SSR) e uma base de código moderna e escalável.

---

### Decisões de Arquitetura

A nova aplicação adota o **App Router** do Next.js 16, com o código-fonte organizado sob `src/app`. As páginas estáticas são pré-renderizadas em build time, enquanto a tela de cortes consumirá dados em runtime via API externa.

**Stack escolhida:**

- **Next.js 16** com App Router (estrutura `src/app`)
- **React 19**
- **JavaScript** puro (sem TypeScript)
- **CSS3** — estilos globais em `globals.css` (portados do projeto original) somados a **CSS Modules** por componente em `src/components/*` (ex.: `card.module.css`, `cardList.module.css`)
- Camada de dados em `src/lib/` (`haircuts.js`, `team.js`) com funções `async` que hoje devolvem mocks e serão substituídas pelo consumo da API sem alterar a assinatura usada pelas páginas
- **hairstyle-api** como back-end externo — desenvolvida pelo integrante Gustavo Garabetti em Clojure, responsável por armazenar e disponibilizar os tipos de corte ([repositório](https://github.com/ggarabs/hairstyle-api))

---

### Novas Telas e Mudanças Principais

#### 1. Tela de Listagem de Cortes — `/cortes`

Catálogo com todos os tipos de corte oferecidos pela barbearia, a ser alimentado pela **hairstyle-api**. Exibe os cortes em cards (componente `Card` dentro de `CardList`), cada um com nome e imagem, e o card inteiro funciona como link para a página de detalhe correspondente. A página é um **Server Component `async`** que busca os dados via `getHaircuts()` em `src/lib/haircuts.js` — hoje devolvendo um conjunto fixo de exemplos, no formato exato esperado da API. A tela já apresenta o layout final, com grade responsiva (cards em coluna no mobile e em grid no desktop) e campo de busca (`SearchBar`) como _stub_ visual.

#### 2. Tela Dinâmica de Detalhe — `/cortes/[hairstyle-id]`

Página individual de cada corte, acessada a partir da listagem. É um Server Component `async` que recebe o `hairstyle-id` via `params`, busca o corte por `getHaircut(id)` e, em caso de id inexistente, dispara `notFound()` do `next/navigation`. A renderização é delegada ao componente `HaircutDetail`, que exibe nome, imagem (`next/image`), descrição e a lista de tags (`TagList` + `Tag`) — preço e duração estimada serão acrescentados junto com a integração da API. A página 404 customizada está implementada em `not-found.jsx` no mesmo segmento dinâmico: a aplicação responde com HTTP 404 e renderiza uma tela com mensagem amigável e botão de retorno ao catálogo.

#### 3. hairstyle-api

API externa desenvolvida em **Clojure** por Gustavo Garabetti, responsável por armazenar e disponibilizar os tipos de corte oferecidos pela El Patron. A aplicação Next.js consome essa API via `fetch`. Os endpoints disponíveis serão documentados conforme a API evolui.

Repositório: [github.com/ggarabs/hairstyle-api](https://github.com/ggarabs/hairstyle-api)

#### 4. Tela Estática da Equipe — `/equipe`

Página dedicada aos profissionais da El Patron, inexistente no projeto original. Será completamente estática e pré-renderizada em build time. Cada membro exibirá: nome, especialidade, tempo de casa, foto e link para Instagram (opcional). Hoje a tela já apresenta o layout final, reutilizando os componentes `Card` e `CardList` da listagem de cortes — o mesmo `Card` aceita uma prop `subtitle` que aqui é usada para a especialidade do barbeiro. Os dados vêm de `getTeam()` em `src/lib/team.js`, com membros de exemplo (nome, especialidade e foto). Os dados definitivos da equipe, tempo de casa e link para Instagram serão preenchidos em uma próxima iteração.

---

### Componentes Compartilhados

Para evitar duplicação entre `/cortes` e `/equipe` (e preparar terreno para a integração com a API), o catálogo, a tela da equipe e a tela de detalhe foram montados a partir de componentes reutilizáveis em `src/components/`:

| Componente | Responsabilidade |
| ---------- | ---------------- |
| `Card` / `CardList` | Card de imagem com título e subtítulo opcional, encapsulado por um `Link` quando `href` é informado; usado tanto pela listagem de cortes quanto pela equipe |
| `SearchBar` | Campo de busca com ícone Material Symbols — atualmente _stub_ visual em `/cortes` |
| `HaircutDetail` | Composição da tela de detalhe (nome, imagem via `next/image`, tags e descrição) |
| `Tag` / `TagList` | Lista horizontal de tags exibida na tela de detalhe |
| `LargeButton` / `MediumButton` | Botões reutilizáveis com variantes de tamanho (CSS Modules) |
| `CarouselButton` | Botão chevron do carrossel da home |
| `ServiceCard` | Card da seção de serviços da home |

---

### Estrutura de Rotas

```DIG
src/
├── app/
│   ├── layout.jsx                 → Layout raiz (header, footer, metadata)
│   ├── globals.css                → Estilos globais portados do projeto original
│   ├── Hamburger.jsx              → Botão da navbar mobile (client component)
│   ├── page.jsx                   → Home (landing page original)
│   ├── equipe/
│   │   └── page.jsx               → Tela da equipe (Server Component async)
│   └── cortes/
│       ├── page.jsx               → Catálogo de cortes (Server Component async)
│       └── [hairstyle-id]/
│           ├── page.jsx           → Detalhe dinâmico de um corte
│           └── not-found.jsx      → Página 404 customizada do segmento dinâmico
├── components/
│   ├── card/                      → Card + card.module.css
│   ├── cardList/                  → CardList + cardList.module.css
│   ├── searchBar/                 → SearchBar (stub visual)
│   ├── haircutDetail/             → HaircutDetail (composição da tela de detalhe)
│   ├── tag/ , tagList/            → Tag e TagList
│   ├── button/                    → LargeButton, MediumButton + styles.module.css
│   ├── carouselButton/            → Botão chevron do carrossel da home
│   └── serviceCard/               → Card da seção de serviços da home
└── lib/
    ├── haircuts.js                → getHaircuts(), getHaircut(id) — hoje devolvem mocks
    └── team.js                    → getTeam() — hoje devolve mocks
```

---

### Status de Implementação

| Tela / Rota | Status |
| ----------- | ------ |
| `/` — Home (landing page) | Migrada do projeto original, mantendo o comportamento de DOM/`localStorage` |
| `/cortes` — Listagem | Server Component `async` consumindo `getHaircuts()` (mock em `src/lib/haircuts.js`); layout final com `Card`/`CardList`, grade responsiva e `SearchBar` como _stub_; integração com a API pendente |
| `/cortes/[hairstyle-id]` — Detalhe | Server Component `async` consumindo `getHaircut(id)`; renderiza `HaircutDetail` (nome, imagem via `next/image`, tags e descrição); 404 customizada (`not-found.jsx`) ativa via `notFound()`; consumo da API pendente |
| `/equipe` — Equipe | Server Component `async` consumindo `getTeam()` (mock em `src/lib/team.js`); layout final reutilizando `Card`/`CardList` com `subtitle` para a especialidade; dados definitivos, tempo de casa e link para Instagram pendentes |
| Camada de dados (`src/lib/`) | Funções `async` (`getHaircuts`, `getHaircut`, `getTeam`) já no contrato esperado da API; troca por `fetch` será pontual |
| `hairstyle-api` | Em desenvolvimento no repositório externo; endpoints serão documentados conforme evoluem |

---

## Protótipo — Wireframes

### Tela de Listagem de Cortes — `/cortes`

![Protótipo mobile — Listagem de Cortes](img/Cortes.svg)

---

### Tela de Detalhe do Corte — `/cortes/[hairstyle-id]`

![Protótipo mobile — Detalhe do Corte](img/Corte.svg)

---

### Tela da Equipe — `/equipe`

![Protótipo mobile — Equipe](img/Equipe.svg)
