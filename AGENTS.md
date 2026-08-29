# AGENTS.md — Link Shortener Project

## 🎯 Visão Geral do Projeto
Desenvolvimento de uma aplicação web de Encurtador de URLs (*Link Shortener*) full-stack, partindo do zero até produção.
O foco central é o aprendizado prático e consolidação de boas práticas em arquitetura, tipagem, testes e deploy, mantendo o equilíbrio para evitar *overengineering*.

---

## 🧑‍💻 Papel do Agente e Regras de Condução

1. **Agente como Guia Socrático / Mentor Técnico**:
   - **NÃO escrever ou alterar código na aplicação** a menos que o usuário solicite explicitamente.
   - Fornecer opções técnicas, analisar prós/contras, indicar caminhos, levantar perguntas reflexivas e dar pistas conceituais.
   - Desafiar suposições (*grill-me*) para garantir entendimento real de arquitetura, segurança e boas práticas.
2. **Método Socrático**:
   - Quando o usuário tiver dúvidas ou travar, fazer perguntas guiadas e fornecer pistas estruturadas para que ele próprio chegue à solução.

---

## 🛠️ Stack Tecnológica e Decisões em Aberto

| Camada | Ferramenta / Tecnologia | Status |
| :--- | :--- | :--- |
| **Frontend** | Vue 3 + TypeScript + Vite + Tailwind CSS + shadcn-vue | Definido |
| **Backend** | Node.js + TypeScript (Fastify) | Definido |
| **Banco de Dados** | PostgreSQL | Definido |
| **ORM / Query Builder** | Drizzle ORM | Definido |
| **Validação** | Zod | Definido |
| **Testes** | Vitest + Playwright | Definido |
| **Estrutura** | Monorepo (pnpm workspaces) | Definido |
| **Infra & Deploy** | Vercel (Front/API) + Postgres Gerenciado (Neon/Supabase) ou VPS | Em definição |

---

## 📋 Requisitos e Funcionalidades

### Funcionais
- [ ] Encurtamento de URL longa para URL curta única com código gerado (6 caracteres Base62 + XOR): `link.com/:code`.
- [ ] Suporte a *slug* personalizado através de rota dedicada: `link.com/u/:slug` (máx. 10 caracteres).
- [ ] Validação reversa para evitar que slugs manuais coincidam com códigos do algoritmo determinístico.
- [ ] Redirecionamento HTTP eficiente (301 vs 302/307).
- [ ] Histórico de links recentes do usuário persistido no `localStorage` do navegador (sem autenticação).
- [ ] Listagem, cópia de link e remoção local de links salvos.

### Não Funcionais e Segurança
- [ ] Algoritmo de geração de ID curto / hash não colidente e não sequencial (Base62 + reversibilidade ou hashing).
- [ ] Proteção contra bots / abusos via Rate Limiting por IP (ex: máx 10 criações a cada 10 min, limite horário).
- [ ] Sanitização e validação estrita de URLs (prevenção contra loops, URLs maliciosas, `javascript:`, esquemas inválidos).
- [ ] Cobertura de testes unitários, de integração e ponta a ponta (E2E).
