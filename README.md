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

## Como Executar

**Pré-requisitos:** Node.js 20+ e npm.

```sh
# 1. Clonar o repositório
git clone https://github.com/joaquimrafael/el-patron-nextjs.git
cd el-patron-nextjs

# 2. Instalar dependências
npm install

# 3. Rodar em modo desenvolvimento (http://localhost:3000)
npm run dev
```

> **Observação:** as telas `/cortes` e `/cortes/[hairstyle-id]` serão reimplementadas como **client components** (`"use client"`) buscando os cortes via `fetch` dentro de `useEffect`. Enquanto a [hairstyle-api](https://github.com/ggarabs/hairstyle-api) não estiver disponível, o `useEffect` chamará as funções mockadas em `src/lib/haircuts.js`; quando a API entrar no ar, o `fetch` passará a apontar diretamente para ela e a camada `src/lib/haircuts.js` será descontinuada.

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

A nova aplicação adota o **App Router** do Next.js 16, com o código-fonte organizado sob `src/app`. As páginas estáticas e a tela da equipe são pré-renderizadas em build time, enquanto as telas de cortes (`/cortes` e `/cortes/[hairstyle-id]`) consumirão dados em runtime **no cliente**, via `fetch` dentro de `useEffect`.

**Stack escolhida:**

- **Next.js 16** com App Router (estrutura `src/app`)
- **React 19**
- **JavaScript** puro (sem TypeScript)
- **CSS3** — estilos globais em `globals.css` (portados do projeto original) somados a **CSS Modules** por componente em `src/components/*` (ex.: `card.module.css`, `cardList.module.css`)
- Camada de dados em `src/lib/` (`haircuts.js`, `team.js`) com funções `async` que hoje devolvem mocks. `getTeam()` continua sendo consumida pela `/equipe` (Server Component); `getHaircuts()` e `getHaircut(id)` serão chamadas dentro de `useEffect` no cliente enquanto a `hairstyle-api` não estiver pronta, e serão removidas quando o `fetch` passar a apontar direto para a API
- **hairstyle-api** como back-end externo — desenvolvida pelo integrante Gustavo Garabetti em Clojure, responsável por armazenar e disponibilizar os tipos de corte ([repositório](https://github.com/ggarabs/hairstyle-api))

---

### Consumo de Dados

As telas dividem-se em dois padrões de consumo, conforme a fonte dos dados:

**Cortes — fetch no cliente (`useEffect`).** `/cortes` e `/cortes/[hairstyle-id]` serão **client components** (`"use client"`) que disparam o `fetch` dentro de um `useEffect`, controlando localmente os estados de carregamento e erro. A integração externa fica restrita a essas duas telas: o destino final do `fetch` é a [`hairstyle-api`](https://github.com/ggarabs/hairstyle-api) (desenvolvida pelo integrante Gustavo Garabetti em Clojure). Enquanto a API não estiver pronta, o `useEffect` chama as funções `getHaircuts()` / `getHaircut(id)` em `src/lib/haircuts.js`, que devolvem mocks no formato exato que a API entregará — assim, na migração, basta trocar a origem de dentro do `useEffect` sem mexer na estrutura da página.

**Equipe — Server Component `async`.** `/equipe` segue padrão diferente: é um Server Component `async` que chama `getTeam()` em `src/lib/team.js` e renderiza no servidor com os dados já resolvidos. A `hairstyle-api` cobre apenas o catálogo de cortes, então a equipe permanece como lista fixa mantida em código (nome, especialidade e foto de cada barbeiro), sem necessidade de `fetch` no cliente.

> **Decisão sobre a rota de API.** Após conversa com a professora, ficou alinhado que o grupo consome diretamente a API externa do próprio projeto (a `hairstyle-api`), em vez de criar uma rota interna `/api/...` dentro do Next.js que apenas devolveria um JSON estático. A API externa cumpre o mesmo papel didático — exercitar o consumo de dados com `fetch` — e ainda exercita uma integração real entre dois projetos desenvolvidos pelo grupo.

**Camada de dados em `src/lib/haircuts.js`** — define o contrato consumido (hoje pelo Server Component, em breve pelo `useEffect` no cliente) e segue o formato esperado da API:

```js
// Mock que segue o formato exato da hairstyle-api: id, name, image, description, tags.
const haircuts = [
  {
    id: "americano",
    name: "Corte Americano",
    image: "/imgs/Screenshot 2026-04-02 at 21.26.09.png",
    description: "Corte clássico de inspiração norte-americana...",
    tags: ["Clássico", "Degradê", "Curto"],
  },
  // ... demais cortes
];

// Versão resumida para o catálogo — somente os campos exibidos no Card.
export async function getHaircuts() {
  return haircuts.map(({ id, name, image }) => ({ id, name, image }));
}

// Busca um corte pelo id; devolve null para id inexistente (a página dispara notFound()).
export async function getHaircut(id) {
  return haircuts.find((haircut) => haircut.id === id) ?? null;
}
```

**Consumo em `src/app/cortes/page.jsx` e `src/app/cortes/[hairstyle-id]/page.jsx`** — implementação cliente pendente. Ambas as páginas serão marcadas como `"use client"` e usarão `useEffect` para popular o estado local: durante a fase mockada, o efeito chama `getHaircuts()` / `getHaircut(id)`; na migração final, o efeito passa a fazer `fetch` direto contra a `hairstyle-api`. Os estados de carregamento e erro são tratados localmente em cada tela.

---

### Novas Telas e Mudanças Principais

#### 1. Tela de Listagem de Cortes — `/cortes`

Catálogo com todos os tipos de corte oferecidos pela barbearia, a ser alimentado pela **hairstyle-api**. Exibe os cortes em cards (componente `Card` dentro de `CardList`), cada um com nome e imagem, e o card inteiro funciona como link para a página de detalhe correspondente. A página será reimplementada como **client component** (`"use client"`) buscando os dados em um `useEffect`: durante a fase mockada, o efeito chamará `getHaircuts()` em `src/lib/haircuts.js` (mock no formato exato esperado da API); na sequência, passará a fazer `fetch` direto na `hairstyle-api`. A tela já apresenta o layout final, com grade responsiva (cards em coluna no mobile e em grid no desktop) e campo de busca (`SearchBar`) como _stub_ visual.

#### 2. Tela Dinâmica de Detalhe — `/cortes/[hairstyle-id]`

Página individual de cada corte, acessada a partir da listagem. Também será reimplementada como **client component** que lê o `hairstyle-id` da URL (via `useParams()` do `next/navigation`) e busca o corte dentro de `useEffect`: durante a fase mockada, chamando `getHaircut(id)`; em seguida, via `fetch` direto na API. A renderização é delegada ao componente `HaircutDetail`, que exibe nome, imagem, descrição e a lista de tags (`TagList` + `Tag`) — preço e duração estimada serão acrescentados junto com a integração da API. A página 404 customizada está implementada em `not-found.jsx` no mesmo segmento dinâmico, exibindo mensagem amigável e botão de retorno ao catálogo quando o id buscado não existir.

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
| `Navbar` / `Hamburger` | Navbar global renderizada no `layout.jsx`; client component que controla o estado aberto/fechado via `useState` e adapta o comportamento ao breakpoint com `react-responsive` (`useMediaQuery`). O `Hamburger` recebe o handler de toggle por prop |
| `Card` / `CardList` | Card de imagem com título e subtítulo opcional, encapsulado por um `Link` quando `href` é informado; usado tanto pela listagem de cortes quanto pela equipe |
| `SearchBar` | Campo de busca com ícone Material Symbols — atualmente _stub_ visual em `/cortes` |
| `HaircutDetail` | Composição da tela de detalhe (nome, imagem via `next/image`, tags e descrição) |
| `Tag` / `TagList` | Lista horizontal de tags exibida na tela de detalhe |
| `LargeButton` / `MediumButton` / `SmallButton` | Botões reutilizáveis com variantes de tamanho (CSS Modules) |
| `Carousel` / `CarouselButton` | Carrossel da home e botão chevron de navegação |
| `ServiceCard` | Card da seção de serviços da home |

---

### Estrutura de Rotas

```DIG
src/
├── app/
│   ├── layout.jsx                 → Layout raiz (Navbar global, footer, metadata, Material Symbols)
│   ├── globals.css                → Estilos globais portados do projeto original
│   ├── page.jsx                   → Home (landing page original, "use client")
│   ├── page.module.css            → Estilos da home
│   ├── equipe/
│   │   ├── page.jsx               → Tela da equipe (Server Component async)
│   │   └── page.module.css
│   └── cortes/
│       ├── page.jsx               → Catálogo de cortes (será client component com useEffect + fetch)
│       ├── page.module.css
│       └── [hairstyle-id]/
│           ├── page.jsx           → Detalhe dinâmico (será client component com useEffect + fetch)
│           ├── not-found.jsx      → Página 404 customizada do segmento dinâmico
│           └── not-found.module.css
├── components/
│   ├── Navbar/                    → Navbar global (client component, react-responsive)
│   ├── Hamburger/                 → Botão da navbar mobile, recebe o toggle por prop
│   ├── Card/ , CardList/          → Card e lista, usados em /cortes e /equipe
│   ├── SearchBar/                 → SearchBar (stub visual em /cortes)
│   ├── HaircutDetail/             → Composição da tela de detalhe
│   ├── Tag/ , TagList/            → Tag e TagList exibidas no detalhe
│   ├── LargeButton/ , MediumButton/ , SmallButton/  → Botões com variantes de tamanho
│   ├── Carousel/ , CarouselButton/  → Carrossel da home e botão chevron
│   └── ServiceCard/               → Card da seção de serviços da home
└── lib/
    ├── haircuts.js                → getHaircuts(), getHaircut(id) — mocks usados pelo useEffect até o fetch passar a apontar direto na hairstyle-api
    └── team.js                    → getTeam() — mock consumido pela /equipe (Server Component)
```

---

### Status de Implementação

| Tela / Rota | Status |
| ----------- | ------ |
| `/` — Home (landing page) | Migrada do projeto original, mantendo o comportamento de DOM/`localStorage` |
| `/cortes` — Listagem | Migração para **client component** (`"use client"` + `useEffect` + `fetch`) pendente. Layout final com `Card`/`CardList`, grade responsiva e `SearchBar` como _stub_ já implementados; consumo da `hairstyle-api` será feito direto do cliente quando a API estiver disponível |
| `/cortes/[hairstyle-id]` — Detalhe | Migração para **client component** com `useEffect` + `fetch` pendente. Renderiza `HaircutDetail` (nome, imagem, tags e descrição); 404 customizada (`not-found.jsx`) já implementada; consumo da `hairstyle-api` no cliente pendente |
| `/equipe` — Equipe | Server Component `async` consumindo `getTeam()` (mock em `src/lib/team.js`); layout final reutilizando `Card`/`CardList` com `subtitle` para a especialidade; dados definitivos, tempo de casa e link para Instagram pendentes |
| Navbar global | Extraída para o componente `Navbar` (client component) e renderizada no `layout.jsx`; o estado aberto/fechado vive em `useState` e é sincronizado ao breakpoint via `react-responsive` (`useMediaQuery`), substituindo a manipulação direta de DOM/`document.body.style` herdada do projeto original |
| Camada de dados (`src/lib/`) | Funções `async` (`getHaircuts`, `getHaircut`, `getTeam`) servindo como mock no formato esperado da API; `getHaircuts`/`getHaircut` continuam ali enquanto o `useEffect` das telas de corte ainda não chama a API direta, e serão descontinuadas na migração; `getTeam` permanece mockada (a equipe não é coberta pela API) |
| `hairstyle-api` | Em desenvolvimento no repositório externo; endpoints serão documentados conforme evoluem |

---

## Aprendizados

Resumo do que ficou claro ao longo da migração para Next.js:

- **Server Components vs Client Components.** No App Router todo componente é Server por padrão; só vira Client (`"use client";`) o que precisa de estado, efeito no navegador ou consumo dinâmico de API — `Navbar`, `Hamburger`, `Carousel` e, na próxima etapa, as telas `/cortes` e `/cortes/[hairstyle-id]`, que vão buscar os cortes via `useEffect` + `fetch` (passando pelo mock de `src/lib/haircuts.js` enquanto a `hairstyle-api` não está pronta e, em seguida, direto contra a API). A `/equipe` continua Server Component `async`, com `getTeam()` resolvido no servidor antes do render.
- **CSS Modules + globais.** `globals.css` guarda apenas _tokens (variáveis de cor, tipografia, reset) e regras herdadas do projeto original. Estilo específico de componente vive em `<nome>.module.css` co-locado, com classes acessadas via `styles.foo`. Isso resolve de vez os conflitos de classe global que tínhamos no Projeto 1.
- **Rotas dinâmicas e 404 customizado.** A rota `/cortes/[hairstyle-id]` exercita o padrão de rota dinâmica do Next, e o `not-found.jsx` no mesmo segmento é renderizado automaticamente quando a página chama `notFound()` para um id inexistente — sem precisar tratar o erro manualmente na página.
- **`params` agora é `Promise` no Next 16.** O destructuring precisa ser `const { "hairstyle-id": id } = await params;`. Detalhe que pegou o grupo no início: a página renderizava vazia silenciosamente sem erro evidente.
- **Componentização real.** `Card` / `CardList` são reaproveitados entre `/cortes` (catálogo de cortes) e `/equipe` (barbeiros) apenas variando a prop opcional `subtitle`. É a vantagem prática do React sobre o HTML estático do Projeto 1 — o mesmo componente serve dois domínios diferentes sem duplicação.
- **Estado encapsulado em vez de DOM imperativo.** No Projeto 1, abrir/fechar a navbar mexia em `document.body.style.gridTemplateColumns`. No Next, a `Navbar` é client component, controla `useState` interno e o JSX condiciona o render — código mais simples de testar e de raciocinar.

---

## Uso de IA

O grupo declara o uso de IA generativa (Claude / Claude Code e ChatGPT) durante a execução do projeto, conforme as Diretrizes da disciplina. Finalidades específicas:

- **Ideação e dúvidas pontuais:** explicação de hooks do React (`useState`, `useEffect`, `useMediaQuery`), diferença entre Server e Client Components no App Router e o padrão de `notFound()` para rotas dinâmicas.
- **Debug de erros:** mensagens do Next 16 sobre `params` assíncrono, problemas de hidratação ao usar `react-responsive` no SSR e ajustes de configuração do ESLint.
- **Apoio na redação deste README** (tutorial), revisão de estrutura e ortografia.

A IA **não** foi utilizada como fonte autônoma de implementação: todo trecho de código produzido com apoio dela foi lido, ajustado e validado pelos integrantes. Conforme exigido pelas diretrizes, todos do grupo dominam a implementação, sabem justificar as decisões linha a linha e estão prontos para questionamentos nas apresentações e check-ins.

---

## Protótipo — Wireframes

### Tela de Listagem de Cortes — `/cortes`

![Protótipo mobile — Listagem de Cortes](public/imgs/Cortes.svg)

---

### Tela de Detalhe do Corte — `/cortes/[hairstyle-id]`

![Protótipo mobile — Detalhe do Corte](public/imgs/Corte.svg)

---

### Tela da Equipe — `/equipe`

![Protótipo mobile — Equipe](public/imgs/Equipe.svg)
