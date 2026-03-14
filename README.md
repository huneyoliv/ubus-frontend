# Ubus — Transporte Universitário

> Plataforma mobile-first para gestão de transporte universitário público com três perfis de usuário: **Aluno**, **Motorista** e **Gestor**.

---

## Índice

- [Visão Geral](#visão-geral)
- [Stack Tecnológica](#stack-tecnológica)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Perfis de Usuário](#perfis-de-usuário)
- [Controle de Acesso](#controle-de-acesso)
- [Estrutura de Rotas](#estrutura-de-rotas)
- [Estrutura de Diretórios](#estrutura-de-diretórios)
- [State Management](#state-management)
- [Layouts](#layouts)
- [Componentes Principais](#componentes-principais)
- [Páginas](#páginas)
- [Integração com API](#integração-com-api)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Rodando o Projeto](#rodando-o-projeto)

---

## Visão Geral

O **Ubus** é uma Progressive Web App (PWA) voltada para o gerenciamento de transporte universitário. O sistema contempla três tipos de usuários com interfaces e permissões distintas:

| Perfil | Interface | Função principal |
|--------|-----------|-----------------|
| Aluno | Mobile (AppLayout) | Reservar assentos, ver bilhetes e acompanhar viagens |
| Motorista | Mobile Dark Theme (DriverLayout) | Visualizar rota, validar presença e gerenciar paradas |
| Gestor | Desktop Sidebar (ManagerLayout) | Administrar frota, rotas, alunos e relatórios |

O backend é desenvolvido por outro time e expõe uma API REST em `http://129.80.98.178/api/`. A autenticação é feita via token JWT e o backend é responsável por retornar o `type` do usuário (`aluno`, `motorista` ou `gestor`), que direciona toda a lógica de exibição e acesso do front.

---

## Stack Tecnológica

| Categoria | Tecnologia | Versão |
|-----------|-----------|--------|
| UI Framework | React | ^19.0.0 |
| Bundler | Vite | ^6.2.0 |
| Linguagem | TypeScript | ~5.7.2 |
| CSS | TailwindCSS | ^4.0.14 |
| Roteamento | React Router DOM | ^7.3.0 |
| Estado Global | Zustand | ^5.0.3 |
| Animações | Framer Motion | ^12.4.7 |
| Ícones | Lucide React | ^0.475.0 |
| Utilitários CSS | clsx + tailwind-merge | ^2.1.1 / ^3.0.2 |
| Componentes UI | Radix UI (Dialog, Select, Tabs, Toast, Dropdown) | ^1.x / ^2.x |
| PWA | vite-plugin-pwa | ^0.21.1 |

---

## Arquitetura do Projeto

O projeto segue uma arquitetura baseada em **Feature Folders** para as páginas e **Shared Components** para layouts e UI reutilizáveis.

```
src/
├── components/
│   ├── layout/          # Layouts por perfil de usuário
│   └── ui/              # Componentes de UI reutilizáveis
├── hooks/               # Custom hooks
├── lib/                 # Utilitários (cn, etc.)
├── pages/
│   ├── driver/          # Páginas exclusivas do motorista
│   ├── manager/         # Páginas exclusivas do gestor
│   └── *.tsx            # Páginas do aluno (raiz)
├── routes/              # Definição de rotas e guards
├── store/               # Estado global (Zustand)
├── styles/              # CSS global e tokens
└── types/               # Tipos TypeScript compartilhados
```

---

## Perfis de Usuário

### Aluno
- Interface mobile-first com fundo claro
- Navegação via **BottomNav** (barra inferior)
- Funcionalidades: reservas, bilhetes, histórico, carteirinha, pagamentos, perfil
- Tabs condicionais: **Pagamentos** (se habilitado) e **Líder** (se for líder de turma)

### Motorista
- Interface mobile com tema escuro (`#27251b`)
- Navegação via **BottomNav** escuro
- Funcionalidades: painel de rota, status de presença, mapa, avisos, configurações
- Fluxo de onboarding: Splash → Selecionar Veículo → Dashboard

### Gestor
- Interface desktop com **sidebar fixa** (responsiva com bottom nav mobile)
- Funcionalidades: dashboard analítico, gerenciamento de rotas, validações de cadastro, frota, relatórios e configurações

---

## Controle de Acesso

O controle de acesso é implementado pelo componente `ProtectedRoute`.

```tsx
// src/components/ProtectedRoute.tsx

// Fluxo de decisão:
// 1. Não autenticado → redireciona para /login
// 2. Tipo do usuário não permitido na rota → redireciona para /dashboard
// 3. Tipo permitido → renderiza o conteúdo
```

### Matriz de Permissões

| Rota | Aluno | Motorista | Gestor |
|------|-------|-----------|--------|
| `/dashboard` | ✅ | ✅ | ✅ |
| `/reservar`, `/bilhete`, `/historico`, `/perfil`, `/carteirinha`, `/pagamentos`, `/lider`, `/meus-dados`, `/alterar-senha`, `/renovar-semestre`, `/regras` | ✅ | ❌→`/dashboard` | ❌→`/dashboard` |
| `/mapa`, `/avisos`, `/config` | ❌→`/dashboard` | ✅ | ❌→`/dashboard` |
| `/rotas`, `/validacoes`, `/frota`, `/relatorios`, `/configuracoes` | ❌→`/dashboard` | ❌→`/dashboard` | ✅ |

---

## Estrutura de Rotas

```
/                          → Splash (pública)
/login                     → Login (pública)
/cadastro                  → Cadastro (pública)
/motorista                 → MotoristaSplash (pública — onboarding)
/selecionar-veiculo        → SelecionarVeiculo (pública — onboarding)
/cadastro-veiculo          → CadastroVeiculo (pública — onboarding)

/dashboard                 → Dashboard unificado
                             • type=aluno    → AppLayout + Home
                             • type=motorista → DriverLayout + MotoristaDashboard
                             • type=gestor   → ManagerLayout + ManagerDashboard

── Protegidas: aluno ───────────────────────────────────────────
/reservar                  → Reservar assento
/bilhete                   → Bilhete digital
/perfil                    → Perfil do usuário
/historico                 → Histórico de viagens
/carteirinha               → Carteirinha estudantil
/pagamentos                → Gestão de pagamentos
/lider                     → Painel do Líder de Turma
/meus-dados                → Editar dados pessoais
/alterar-senha             → Alterar senha
/renovar-semestre          → Renovação semestral
/regras                    → Regras do serviço

── Protegidas: motorista ───────────────────────────────────────
/mapa                      → Mapa da rota em tempo real
/avisos                    → Avisos e notificações
/config                    → Configurações do motorista

── Protegidas: gestor ──────────────────────────────────────────
/rotas                     → Gerenciar rotas
/validacoes                → Validar cadastros pendentes
/frota                     → Gestão da frota
/relatorios                → Relatórios e métricas
/configuracoes             → Configurações do sistema
```

---

## Estrutura de Diretórios

```
Ubus/
├── public/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.tsx        # Layout do aluno (mobile)
│   │   │   ├── DriverLayout.tsx     # Layout do motorista (mobile dark)
│   │   │   ├── ManagerLayout.tsx    # Layout do gestor (desktop sidebar)
│   │   │   └── BottomNav.tsx        # Navegação inferior do aluno
│   │   ├── ui/                      # Componentes de UI reutilizáveis
│   │   └── ProtectedRoute.tsx       # Guard de rotas por tipo de usuário
│   ├── hooks/
│   ├── lib/
│   │   └── utils.ts                 # Helper `cn()` (clsx + tailwind-merge)
│   ├── pages/
│   │   ├── driver/
│   │   │   ├── CadastroVeiculo.tsx
│   │   │   ├── MotoristaDashboard.tsx
│   │   │   ├── MotoristaSplash.tsx
│   │   │   └── SelecionarVeiculo.tsx
│   │   ├── manager/
│   │   │   ├── ManagerConfiguracoes.tsx
│   │   │   ├── ManagerDashboard.tsx
│   │   │   ├── ManagerFrota.tsx
│   │   │   ├── ManagerRelatorios.tsx
│   │   │   ├── ManagerRoutes.tsx
│   │   │   └── ManagerValidations.tsx
│   │   ├── AlterarSenha.tsx
│   │   ├── Bilhete.tsx
│   │   ├── Cadastro.tsx
│   │   ├── Carteirinha.tsx
│   │   ├── Dashboard.tsx            # Dashboard unificado (entry point pós-login)
│   │   ├── Historico.tsx
│   │   ├── Home.tsx
│   │   ├── Lider.tsx
│   │   ├── Login.tsx
│   │   ├── MeusDados.tsx
│   │   ├── Pagamentos.tsx
│   │   ├── Perfil.tsx
│   │   ├── Regras.tsx
│   │   ├── RenovarSemestre.tsx
│   │   ├── Reservar.tsx
│   │   └── Splash.tsx
│   ├── routes/
│   │   └── index.tsx                # Definição de todas as rotas
│   ├── store/
│   │   └── useAuthStore.ts          # Estado global de autenticação (Zustand)
│   ├── styles/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## State Management

O estado global é gerenciado com **Zustand** + `persist` middleware (localStorage).

### `useAuthStore`

```ts
// src/store/useAuthStore.ts

interface User {
    id: string
    name: string
    cpf: string
    institution: string
    course: string
    type: 'aluno' | 'motorista' | 'gestor'   // Define qual dashboard renderizar
}

interface AuthState {
    token: string | null
    user: User | null
    isAuthenticated: boolean
    pagamentos: boolean    // Habilita aba de pagamentos no BottomNav
    lider: boolean         // Habilita aba do Líder no BottomNav
    setAuth(token, user, pagamentos?, lider?): void
    logout(): void
}
```

**Persistência:** chave `ubus-auth` no `localStorage`.

---

## Layouts

### AppLayout — Aluno
- Container mobile (`max-w-md`, `h-[100dvh]`)
- `pb-20` para não sobrepor o `BottomNav`
- Suporta `children` prop (usado pelo `Dashboard.tsx`) ou `<Outlet />` via rotas

### DriverLayout — Motorista
- Container mobile com fundo escuro (`#f8f8f5` / `#221f10`)
- Bottom nav escuro com hover amarelo (`#f2cc0d`)
- Links: Painel `/dashboard`, Mapa `/mapa`, Avisos `/avisos`, Config `/config`

### ManagerLayout — Gestor
- Layout desktop com sidebar fixa de 256px
- Header com notificações e avatar do usuário
- Mobile: bottom nav horizontal com 5 itens
- Links sidebar: Dashboard `/dashboard`, Rotas `/rotas`, Validações `/validacoes`, Frota `/frota`, Relatórios `/relatorios`, Configurações `/configuracoes`

---

## Componentes Principais

### `ProtectedRoute`
```tsx
<ProtectedRoute allowedTypes={['aluno']} />
// Se não autenticado → /login
// Se tipo incorreto  → /dashboard
// Se autorizado      → <Outlet />
```

### `Dashboard` (rota unificada)
```tsx
// src/pages/Dashboard.tsx
// Lê user.type do useAuthStore e renderiza o layout+conteúdo correto

if (user.type === 'aluno')     return <AppLayout><Home /></AppLayout>
if (user.type === 'motorista') return <DriverLayout><MotoristaDashboard /></DriverLayout>
if (user.type === 'gestor')    return <ManagerLayout><ManagerDashboard /></ManagerLayout>
```

### `BottomNav`
- Renderizado apenas nas rotas do aluno (exceto `/bilhete`)
- Itens condicionais baseados em `pagamentos` e `lider` do store

---

## Páginas

### Aluno

| Página | Rota | Descrição |
|--------|------|-----------|
| Home | `/dashboard` | Dashboard com status de reservas e viagens do dia |
| Reservar | `/reservar` | Seleção de assento (ida/volta) |
| Bilhete | `/bilhete` | QR Code do bilhete digital |
| Histórico | `/historico` | Histórico de viagens anteriores |
| Carteirinha | `/carteirinha` | Carteirinha estudantil digital |
| Pagamentos | `/pagamentos` | Pendências e histórico financeiro |
| Líder | `/lider` | Painel de controle do líder de turma (marcação de presença) |
| Perfil | `/perfil` | Dados do perfil e configurações |
| Meus Dados | `/meus-dados` | Edição de dados pessoais |
| Alterar Senha | `/alterar-senha` | Troca de senha |
| Renovar Semestre | `/renovar-semestre` | Renovação do contrato semestral |
| Regras | `/regras` | Regulamento do serviço |

### Motorista

| Página | Rota | Descrição |
|--------|------|-----------|
| Splash | `/motorista` | Tela de boas-vindas do motorista (onboarding) |
| Selecionar Veículo | `/selecionar-veiculo` | Lista de veículos disponíveis |
| Cadastro Veículo | `/cadastro-veiculo` | Cadastro de novo veículo |
| Dashboard | `/dashboard` | Status de presença, paradas, contador e validador QR |

### Gestor

| Página | Rota | Descrição |
|--------|------|-----------|
| Dashboard | `/dashboard` | KPIs, gráfico semanal, mapa em tempo real, rotas ativas |
| Rotas | `/rotas` | Gerenciamento de rotas e horários |
| Validações | `/validacoes` | Aprovação de cadastros pendentes |
| Frota | `/frota` | Gerenciamento de veículos |
| Relatórios | `/relatorios` | Relatórios e métricas de uso |
| Configurações | `/configuracoes` | Configurações do sistema |

---

## Integração com API

**Base URL:** `http://129.80.98.178/api/`

### Autenticação

```http
POST /auth/login
Content-Type: application/json

{
  "cpf": "12345678900",
  "password": "senha123"
}
```

**Resposta esperada:**
```json
{
  "token": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "name": "Nome do Usuário",
    "cpf": "123.456.789-00",
    "institution": "Nome da Instituição",
    "course": "Nome do Curso",
    "type": "aluno",
    "pagamentos": true,
    "lider": false
  }
}
```

> **Importante:** O campo `type` (`"aluno"` | `"motorista"` | `"gestor"`) é obrigatório. Ele determina qual dashboard será exibido e quais rotas o usuário poderá acessar.

### Autenticação nas requisições

O token deve ser enviado no header:
```http
Authorization: Bearer {token}
```

---

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://129.80.98.178/api
```

> **Nota:** Por enquanto as chamadas de API estão hardcoded em `Login.tsx`. Recomenda-se centralizar a `VITE_API_URL` em um arquivo de configuração quando a integração com a API for expandida.

---

## Rodando o Projeto

### Pré-requisitos
- Node.js >= 18
- npm >= 9

### Instalação
```bash
git clone <repositório>
cd Ubus
npm install
```

### Desenvolvimento
```bash
npm run dev
# Acesse http://localhost:5173
```

### Build de produção
```bash
npm run build
npm run preview
```

---

## Convenções de Código

- **Componentes:** PascalCase (ex: `ManagerDashboard.tsx`)
- **Hooks:** camelCase prefixado com `use` (ex: `useAuthStore.ts`)
- **Imports:** alias `@/` aponta para `src/`
- **CSS:** Utility-first com TailwindCSS v4 — classes customizadas via `bg-primary`, `bg-bg-light`, etc.
- **Sem comentários no código** (policy do projeto)
