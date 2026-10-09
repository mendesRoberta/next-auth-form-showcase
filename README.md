# Protótipo - Geoportal (Next.js + OAuth 2.0)

Este projeto é uma aplicação de demonstração que exemplifica a integração entre autenticação **OAuth 2.0** e um **formulário protegido** utilizando o **Next.js (App Router)** e **Auth.js (NextAuth v5)**.

---

## 🎯 Propósito do Projeto

O objetivo principal deste protótipo é demonstrar na prática:
1. **Identificação Segura via OAuth 2.0:** Autenticação de usuários por meio de um provedor de identidade externo confiável (**GitHub**).
2. **Integração de Perfil com Formulário:** Uso dos dados atestados pelo provedor OAuth (Nome, E-mail, Foto de Perfil) para pré-preencher campos fixos de identificação no formulário.
3. **Segurança de Dados no Servidor (Server Actions):** Validação da sessão ativa diretamente no servidor ao processar o formulário, impedindo que o cliente adultere informações de autoria ou contorne a autenticação.

---

## 🚀 Funcionalidades

- **Proteção no Servidor (Server Components):** Usuários não autenticados visualizam apenas a tela de boas-vindas com a opção de identificação via GitHub.
- **Login OAuth 2.0:** Fluxo direto com o GitHub utilizando redirecionamento seguro e troca de tokens pelo NextAuth.
- **Formulário Integrado e Pré-preenchido:**
  - Campos de identificação (**Nome** e **E-mail**) preenchidos automaticamente com os dados da conta do GitHub em modo somente leitura (`readOnly`).
  - Campos de entrada de dados (**Título da Demanda** e **Descrição / Observações**) para envio.
- **Submissão Segura:** Processamento via *Server Action* que revalida a sessão no backend e vincula os dados da demanda ao e-mail/nome do usuário logado.
- **Encerramento de Sessão (Sign Out):** Botão para destruir a sessão e retornar ao estado não autenticado com segurança.

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Biblioteca de Interface:** [React](https://react.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Autenticação:** [Auth.js / NextAuth.js v5](https://authjs.dev/) (`next-auth@beta`)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)

---

## 📁 Estrutura de Arquivos Principais

```text
├── src/
│   ├── app/
│   │   ├── api/auth/[...nextauth]/route.ts  # Route Handler do NextAuth para lidar com OAuth callbacks
│   │   ├── globals.css                     # Configurações de estilos globais (Tailwind CSS)
│   │   ├── layout.tsx                      # Layout raiz da aplicação
│   │   └── page.tsx                        # Interface principal (Login condicional, Perfil e Formulário)
│   └── auth.ts                             # Configuração central do Auth.js e provedor GitHub
├── .env.local                              # Variáveis de ambiente e credenciais OAuth (não versionado)
├── package.json                            # Dependências e scripts do projeto
└── tsconfig.json                           # Configuração do TypeScript
```

---

## ⚙️ Como Executar o Projeto Localmente

### 1. Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18.18+ ou superior)
- Conta no [GitHub](https://github.com)

### 2. Configurar o OAuth App no GitHub
1. Acesse o GitHub em **Settings > Developer Settings > OAuth Apps > New OAuth App**.
2. Preencha os campos:
   - **Application name:** `Protótipo - Geoportal` (ou o nome de sua preferência)
   - **Homepage URL:** `http://localhost:3000`
   - **Authorization callback URL:** `http://localhost:3000/api/auth/callback/github`
3. Registre a aplicação e gere um **Client Secret**.
4. Copie o **Client ID** e o **Client Secret**.

### 3. Configurar as Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:

```env
# Chave secreta aleatória para assinar os tokens de sessão do NextAuth
AUTH_SECRET="uma-chave-secreta-longa-e-aleatoria"

# Credenciais obtidas no GitHub Developer Settings
AUTH_GITHUB_ID="SEU_CLIENT_ID"
AUTH_GITHUB_SECRET="SEU_CLIENT_SECRET"
```

### 4. Instalar as Dependências
No terminal, execute:

```bash
npm install
```

### 5. Iniciar o Servidor de Desenvolvimento
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para testar a aplicação.
