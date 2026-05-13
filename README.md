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

# 3. (Opcional) configurar a URL da hairstyle-api — padrão: http://localhost:8080
echo 'NEXT_PUBLIC_HAIRSTYLE_API_URL=http://localhost:8080' > .env.local

# 4. Rodar em modo desenvolvimento (http://localhost:3000)
npm run dev
```

> **Observação:** as telas `/cortes` e `/cortes/[hairstyle-id]` são **client components** (`"use client"`) que buscam os cortes via `fetch` dentro de `useEffect`, batendo direto nas rotas `GET /api/hairstyles` e `GET /api/hairstyles/:id` da [hairstyle-api](https://github.com/ggarabs/hairstyle-api). A URL base é lida de `NEXT_PUBLIC_HAIRSTYLE_API_URL` (fallback `http://localhost:8080`); para o front funcionar é preciso ter a API rodando.

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
- Camada de dados em `src/lib/`: `team.js` com `getTeam()` mockada (consumida pela `/equipe`, Server Component) e `haircuts.js` como **cliente HTTP da `hairstyle-api`** — concentra a URL base, o `fetch`, o mapeamento `main-image → image` e a semântica de `404 → null` para o detalhe. As páginas `/cortes` e `/cortes/[hairstyle-id]` consomem `getHaircuts()` / `getHaircut(id)` de dentro de um `useEffect` sem precisar saber dos detalhes da API
- **hairstyle-api** como back-end externo — desenvolvida pelo integrante Gustavo Garabetti em Clojure, responsável por armazenar e disponibilizar os tipos de corte ([repositório](https://github.com/ggarabs/hairstyle-api))

---

### Consumo de Dados

As telas dividem-se em dois padrões de consumo, conforme a fonte dos dados:

**Cortes — fetch no cliente (`useEffect`) via `src/lib/haircuts.js`.** `/cortes` e `/cortes/[hairstyle-id]` são **client components** (`"use client"`) que disparam o `fetch` dentro de um `useEffect`, controlando localmente os estados de carregamento, erro e ausência (404). O `fetch` em si é encapsulado em `src/lib/haircuts.js`, que age como cliente HTTP da [`hairstyle-api`](https://github.com/ggarabs/hairstyle-api) (desenvolvida pelo integrante Gustavo Garabetti em Clojure): a listagem bate em `GET /api/hairstyles` e o detalhe em `GET /api/hairstyles/:id`. A URL base sai de `process.env.NEXT_PUBLIC_HAIRSTYLE_API_URL`, com fallback para `http://localhost:8080`. O cliente também adapta o payload (renomeia `main-image` para `image`) e converte `404` em `null`, deixando as páginas com lógica enxuta: chamar `getHaircuts()` / `getHaircut(id)` e renderizar o resultado.

**Equipe — Server Component `async`.** `/equipe` segue padrão diferente: é um Server Component `async` que chama `getTeam()` em `src/lib/team.js` e renderiza no servidor com os dados já resolvidos. A `hairstyle-api` cobre apenas o catálogo de cortes, então a equipe permanece como lista fixa mantida em código (nome, especialidade e foto de cada barbeiro), sem necessidade de `fetch` no cliente.

> **Decisão sobre a rota de API.** Após conversa com a professora, ficou alinhado que o grupo consome diretamente a API externa do próprio projeto (a `hairstyle-api`), em vez de criar uma rota interna `/api/...` dentro do Next.js que apenas devolveria um JSON estático. A API externa cumpre o mesmo papel didático — exercitar o consumo de dados com `fetch` — e ainda exercita uma integração real entre dois projetos desenvolvidos pelo grupo.

**Contrato da `hairstyle-api`** — o cliente em `src/lib/haircuts.js` recebe os payloads abaixo e devolve dados já adaptados:

```jsonc
// GET /api/hairstyles  →  listagem (usada na /cortes)
[
  {
    "id": 1,
    "name": "Buzz Cut",
    "description": "Minimal short hairstyle",
    "texture": ["straight"],
    "length": "short",
    "main-image": "https://example.com/image.jpg"
  }
]

// GET /api/hairstyles/:id  →  detalhe (usado em /cortes/[hairstyle-id])
{
  "id": 1,
  "name": "Buzz Cut",
  "slug": "buzz-cut",
  "description": "Minimal short hairstyle",
  "texture": ["straight"],
  "length": "short",
  "main-image": "https://example.com/image.jpg",
  "gallery": ["https://example.com/1.jpg"],
  "tags": ["clássico"]
}
```

**Cliente em `src/lib/haircuts.js`** — duas responsabilidades: encapsular o `fetch` e devolver dados no formato que os componentes esperam:

```js
const API_URL =
  process.env.NEXT_PUBLIC_HAIRSTYLE_API_URL ?? "http://localhost:8080";

// Renomeia main-image → image e normaliza tags ausentes para [].
function adapt(haircut) {
  return {
    id: haircut.id,
    name: haircut.name,
    image: haircut["main-image"],
    description: haircut.description,
    tags: haircut.tags ?? [],
  };
}

export async function getHaircuts({ signal } = {}) {
  const res = await fetch(`${API_URL}/api/hairstyles`, { signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()).map(adapt);
}

// 404 vira null para a página acionar notFound(); demais erros sobem como exceção.
export async function getHaircut(id, { signal } = {}) {
  const res = await fetch(`${API_URL}/api/hairstyles/${id}`, { signal });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return adapt(await res.json());
}
```

Assim as páginas ficam só com `useEffect` + estado: quando `getHaircut(id)` devolve `null` (id inexistente na API), a página dispara `notFound()` e o `not-found.jsx` do segmento dinâmico é renderizado.

---

### Novas Telas e Mudanças Principais

#### 1. Tela de Listagem de Cortes — `/cortes`

Catálogo com todos os tipos de corte oferecidos pela barbearia, alimentado pela **hairstyle-api**. Exibe os cortes em cards (componente `Card` dentro de `CardList`), cada um com nome e imagem, e o card inteiro funciona como link para a página de detalhe correspondente. A página é um **client component** (`"use client"`) que busca os dados em um `useEffect` chamando `getHaircuts()` do cliente em `src/lib/haircuts.js` — quem fala com `GET /api/hairstyles` e adapta `main-image → image`. A tela já apresenta o layout final, com grade responsiva (cards em coluna no mobile e em grid no desktop), estado de carregamento, mensagem de erro e busca (`SearchBar`) com filtro client-side por nome (case-insensitive, ignorando acentos).

#### 2. Tela Dinâmica de Detalhe — `/cortes/[hairstyle-id]`

Página individual de cada corte, acessada a partir da listagem. Também é um **client component** que lê o `hairstyle-id` da URL via `useParams()` do `next/navigation` e chama `getHaircut(id)` do cliente em `src/lib/haircuts.js` dentro de `useEffect` (a função encapsula `GET /api/hairstyles/:id` e devolve `null` quando a API responde `404`). A renderização é delegada ao `HaircutDetail`, que exibe nome, imagem, descrição e a lista de tags (`TagList` + `Tag`) — preço e duração estimada serão acrescentados conforme a API evoluir. Quando o cliente devolve `null`, a página dispara `notFound()`, acionando o `not-found.jsx` do segmento dinâmico (tela amigável com botão de retorno ao catálogo).

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
| `SearchBar` | Campo de busca controlado (`value` / `onChange`) com ícone Material Symbols — usado em `/cortes` para filtrar o catálogo por nome no cliente |
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
│       ├── page.jsx               → Catálogo de cortes (client component, useEffect chamando lib/haircuts.js)
│       ├── page.module.css
│       └── [hairstyle-id]/
│           ├── page.jsx           → Detalhe dinâmico (client component, useEffect chamando lib/haircuts.js)
│           ├── page.module.css    → Estilos dos estados de loading/erro do detalhe
│           ├── not-found.jsx      → Página 404 customizada do segmento dinâmico
│           └── not-found.module.css
├── components/
│   ├── Navbar/                    → Navbar global (client component, react-responsive)
│   ├── Hamburger/                 → Botão da navbar mobile, recebe o toggle por prop
│   ├── Card/ , CardList/          → Card e lista, usados em /cortes e /equipe
│   ├── SearchBar/                 → Input controlado usado em /cortes para filtrar o catálogo no cliente
│   ├── HaircutDetail/             → Composição da tela de detalhe
│   ├── Tag/ , TagList/            → Tag e TagList exibidas no detalhe
│   ├── LargeButton/ , MediumButton/ , SmallButton/  → Botões com variantes de tamanho
│   ├── Carousel/ , CarouselButton/  → Carrossel da home e botão chevron
│   └── ServiceCard/               → Card da seção de serviços da home
└── lib/
    ├── haircuts.js                → Cliente HTTP da hairstyle-api: getHaircuts(), getHaircut(id); adapta main-image → image e 404 → null
    └── team.js                    → getTeam() — mock consumido pela /equipe (Server Component)
```

---

### Status de Implementação

| Tela / Rota | Status |
| ----------- | ------ |
| `/` — Home (landing page) | Migrada do projeto original, mantendo o comportamento de DOM/`localStorage` |
| `/cortes` — Listagem | **Client component** chamando `getHaircuts()` do cliente em `src/lib/haircuts.js` (que bate em `GET /api/hairstyles`) dentro de `useEffect`, com estados de carregamento e erro; layout final com `Card`/`CardList`, grade responsiva e `SearchBar` filtrando o catálogo por nome no cliente |
| `/cortes/[hairstyle-id]` — Detalhe | **Client component** lendo o slug via `useParams()` e chamando `getHaircut(id)` do cliente em `src/lib/haircuts.js` (`GET /api/hairstyles/:id`, 404 → `null`) dentro de `useEffect`; quando o cliente devolve `null`, a página dispara `notFound()` → `not-found.jsx`; renderiza `HaircutDetail` (nome, imagem, tags e descrição) |
| `/equipe` — Equipe | Server Component `async` consumindo `getTeam()` (mock em `src/lib/team.js`); layout final reutilizando `Card`/`CardList` com `subtitle` para a especialidade; dados definitivos, tempo de casa e link para Instagram pendentes |
| Navbar global | Extraída para o componente `Navbar` (client component) e renderizada no `layout.jsx`; o estado aberto/fechado vive em `useState` e é sincronizado ao breakpoint via `react-responsive` (`useMediaQuery`), substituindo a manipulação direta de DOM/`document.body.style` herdada do projeto original |
| Camada de dados (`src/lib/`) | `team.js` com `getTeam()` `async` mockada (consumida pela `/equipe`, Server Component); `haircuts.js` é o cliente HTTP da `hairstyle-api`, com `getHaircuts()` / `getHaircut(id)` encapsulando URL base, `fetch`, adaptação `main-image → image` e a regra `404 → null` |
| `hairstyle-api` | Integração ativa nas duas telas de corte (`GET /api/hairstyles` e `GET /api/hairstyles/:id`); URL base configurável via `NEXT_PUBLIC_HAIRSTYLE_API_URL` (fallback `http://localhost:8080`) |

---

## Aprendizados

Resumo do que ficou claro ao longo da migração para Next.js:

- **Server Components vs Client Components.** No App Router todo componente é Server por padrão; só vira Client (`"use client";`) o que precisa de estado, efeito no navegador ou consumo dinâmico de API — `Navbar`, `Hamburger`, `Carousel` e as telas `/cortes` e `/cortes/[hairstyle-id]`, que buscam os cortes na `hairstyle-api` via `useEffect` + `fetch`. A `/equipe` continua Server Component `async`, com `getTeam()` resolvido no servidor antes do render.
- **CSS Modules + globais.** `globals.css` guarda apenas _tokens (variáveis de cor, tipografia, reset) e regras herdadas do projeto original. Estilo específico de componente vive em `<nome>.module.css` co-locado, com classes acessadas via `styles.foo`. Isso resolve de vez os conflitos de classe global que tínhamos no Projeto 1.
- **Rotas dinâmicas e 404 customizado.** A rota `/cortes/[hairstyle-id]` exercita o padrão de rota dinâmica do Next, e o `not-found.jsx` no mesmo segmento é renderizado automaticamente quando a página chama `notFound()` para um id inexistente — sem precisar tratar o erro manualmente na página.
- **`params` em Server vs Client Components.** No Next 16, em Server Components o `params` é `Promise` e exige `const { "hairstyle-id": id } = await params;` — detalhe que pegou o grupo no início, porque sem o `await` a página renderizava vazia sem erro evidente. Com a migração da tela de detalhe para Client Component, o caminho passou a ser `useParams()` do `next/navigation`, que devolve o objeto sincronamente.
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
