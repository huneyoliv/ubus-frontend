# Contribuindo com o Ubus

## Configuração do Ambiente

```bash
cp .env.example .env
npm install
npm run dev
```

## Fluxo de Trabalho

1. Crie uma branch a partir de `main`:
   ```bash
   git checkout -b feat/nome-da-funcionalidade
   ```
2. Faça commits seguindo o padrão **Conventional Commits**:
   ```
   feat: adiciona tela de mapa do motorista
   fix: corrige redirect após logout
   refactor: extrai helper de formatação de CPF
   docs: atualiza README com nova rota /mapa
   ```
3. Abra um Pull Request descrevendo o que foi feito e qual perfil de usuário é afetado.

## Padrões de Código

- **TypeScript estrito** — sem `any` explícito
- **Sem comentários no código**
- **Imports:** utilize sempre o alias `@/` ao invés de caminhos relativos longos
- **Componentes:** um componente por arquivo, nomeado em PascalCase
- **Sem lógica de negócio em layouts** — layouts apenas estruturam, não consomem API

## Adicionando Novas Páginas

### Para o Aluno
1. Crie o arquivo em `src/pages/NomePagina.tsx`
2. Importe e adicione a rota dentro do grupo `ProtectedRoute allowedTypes={['aluno']}` em `src/routes/index.tsx`

### Para o Motorista
1. Crie o arquivo em `src/pages/driver/NomePagina.tsx`
2. Importe e adicione a rota dentro do grupo `ProtectedRoute allowedTypes={['motorista']}` em `src/routes/index.tsx`

### Para o Gestor
1. Crie o arquivo em `src/pages/manager/NomePagina.tsx`
2. Importe e adicione a rota dentro do grupo `ProtectedRoute allowedTypes={['gestor']}` em `src/routes/index.tsx`
3. Adicione o link ao `navItems` em `src/components/layout/ManagerLayout.tsx`

## Adicionando Chamadas de API

Centralize chamadas de API em arquivos de serviço dentro de `src/lib/`:

```ts
// src/lib/api.ts
const BASE_URL = import.meta.env.VITE_API_URL

export async function apiFetch(path: string, options?: RequestInit) {
    const token = /* useAuthStore.getState().token */
    return fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            ...options?.headers,
        },
    })
}
```

## Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento em `localhost:5173` |
| `npm run build` | Build de produção (TypeScript + Vite) |
| `npm run preview` | Preview do build de produção |
