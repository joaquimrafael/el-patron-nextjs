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

> **Observação:** as telas `/cortes` e `/cortes/[hairstyle-id]` consomem hoje os mocks de `src/lib/haircuts.js`. Quando a [hairstyle-api](https://github.com/ggarabs/hairstyle-api) estiver disponível, a troca pelo `fetch` será pontual nas funções `getHaircuts()` e `getHaircut(id)`, sem impacto nas páginas.

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

### Consumo de Dados

As páginas `/cortes`, `/cortes/[hairstyle-id]` e `/equipe` são **Server Components `async`** que importam funções da camada de dados em `src/lib/`. Esse padrão centraliza o acesso aos dados em um único lugar e mantém os componentes de página enxutos — eles apenas compõem a interface a partir do que recebem.

Hoje as funções retornam mocks no formato exato que a API externa devolverá; quando a [`hairstyle-api`](https://github.com/ggarabs/hairstyle-api) (desenvolvida pelo integrante Gustavo Garabetti em Clojure) estiver em produção, basta trocar o corpo das funções por um `fetch`, sem alterar nenhuma página.

> **Decisão sobre a rota de API.** Após conversa com a professora, ficou alinhado que o grupo consome diretamente a API externa do próprio projeto (a `hairstyle-api`), em vez de criar uma rota interna `/api/...` dentro do Next.js que apenas devolveria um JSON estático. A API externa cumpre o mesmo papel didático — exercitar o consumo de dados com `fetch` — e ainda exercita uma integração real entre dois projetos desenvolvidos pelo grupo.

**Camada de dados em `src/lib/haircuts.js`** — define o contrato consumido pelas páginas:

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

**Consumo em `src/app/cortes/page.jsx`** — Server Component `async` que aguarda os dados antes de renderizar:

```jsx
import { getHaircuts } from "@/lib/haircuts";

// Como é Server Component, a função pode ser declarada async e usar await diretamente —
// sem useEffect, sem useState, sem flicker de loading no cliente.
export default async function HairStylesPage() {
  const items = await getHaircuts();

  return (
    <main className={styles.listPage}>
      <h1>Nossos Cortes</h1>
      <SearchBar placeholder="Buscar corte..." />
      <CardList>
        {items.map((item) => (
          // Cada Card vira um <Link> para a rota dinâmica /cortes/[hairstyle-id].
          <Card
            key={item.id}
            name={item.name}
            image={item.image}
            href={`/cortes/${item.id}`}
          />
        ))}
      </CardList>
    </main>
  );
}
```

Quando a integração com a `hairstyle-api` for ligada, a alteração fica restrita a `src/lib/haircuts.js` — as páginas não mudam:

```js
export async function getHaircuts() {
  const res = await fetch("https://hairstyle-api.example.com/haircuts", {
    next: { revalidate: 60 }, // revalida o cache do Next a cada 1 minuto
  });
  return res.json();
}
```

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
│       ├── page.jsx               → Catálogo de cortes (Server Component async)
│       ├── page.module.css
│       └── [hairstyle-id]/
│           ├── page.jsx           → Detalhe dinâmico de um corte
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
| Navbar global | Extraída para o componente `Navbar` (client component) e renderizada no `layout.jsx`; o estado aberto/fechado vive em `useState` e é sincronizado ao breakpoint via `react-responsive` (`useMediaQuery`), substituindo a manipulação direta de DOM/`document.body.style` herdada do projeto original |
| Camada de dados (`src/lib/`) | Funções `async` (`getHaircuts`, `getHaircut`, `getTeam`) já no contrato esperado da API; troca por `fetch` será pontual |
| `hairstyle-api` | Em desenvolvimento no repositório externo; endpoints serão documentados conforme evoluem |

---

## Aprendizados

Resumo do que ficou claro ao longo da migração para Next.js:

- **Server Components vs Client Components.** No App Router todo componente é Server por padrão; só virou Client (`"use client";`) o que realmente precisa de estado ou efeito no navegador — `Navbar`, `Hamburger` e `Carousel`. As páginas de listagem e detalhe ficaram Server, o que elimina `useEffect` para buscar dados: basta `async` + `await` direto no componente.
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
