# 🌾 Rastreabilidade Agrícola com Blockchain

Sistema de rastreabilidade de produtos agrícolas utilizando blockchain (Polygon) para garantir transparência e autenticidade em toda a cadeia produtiva.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js)
![Polygon](https://img.shields.io/badge/Polygon-Mumbai-8247E5?logo=polygon)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss)

## 📋 Sobre o Projeto

Plataforma enterprise B2B que registra cada etapa da produção agrícola na blockchain, criando um histórico imutável e verificável.

### 🎯 Problema que Resolve

- **Fraudes** na origem de produtos agrícolas
- **Falta de transparência** na cadeia de suprimentos
- **Dificuldade de verificação** da procedência por compradores e consumidores

### 🔄 Fluxo de Rastreabilidade

```
┌─────────┐    ┌───────────┐    ┌──────────┐    ┌────────────┐
│ INSUMO  │ →  │ APLICAÇÃO │ →  │ COLHEITA │ →  │ TRANSPORTE │
└─────────┘    └───────────┘    └──────────┘    └────────────┘
     ↓              ↓               ↓                ↓
   Hash₁          Hash₂           Hash₃            Hash₄
     └──────────────┴───────────────┴────────────────┘
                          ↓
                    BLOCKCHAIN
                  (Polygon Mumbai)
```

## ✨ Funcionalidades

| Página | Descrição |
|--------|-----------|
| **Dashboard** | Visão geral com métricas e lotes recentes |
| **Registrar Lote** | Formulário multi-etapas para cadastrar novos lotes |
| **Rastrear Lotes** | Histórico e timeline de lotes existentes |
| **Verificar** | Validar autenticidade (dados off-chain vs on-chain) |
| **Relatórios** | Exportação e análise de dados |
| **Configurações** | Ajustes do sistema |

## 🛠️ Tecnologias

### Frontend
- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **TailwindCSS** - Estilização
- **shadcn/ui** - Componentes UI
- **React Hook Form + Zod** - Formulários e validação
- **Wouter** - Roteamento
- **TanStack Query** - Gerenciamento de estado servidor

### Backend
- **Node.js + Express** - Servidor API
- **PostgreSQL** - Banco de dados
- **Drizzle ORM** - ORM TypeScript-first

### Blockchain
- **Polygon Mumbai** - Rede testnet Ethereum L2

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- PostgreSQL (opcional para desenvolvimento)
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/tassiadossantos/rastreabilidade-blockchain-.git

# Entre na pasta
cd rastreabilidade-blockchain-

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev
```

O projeto estará disponível em: **http://localhost:5000**

### Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Build de produção
npm run start    # Executa build de produção
npm run check    # Verifica tipos TypeScript
npm run db:push  # Sincroniza schema do banco
```

## 📁 Estrutura do Projeto

```
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── hooks/          # Custom hooks
│   │   └── lib/            # Utilitários
│   └── public/             # Assets estáticos
├── server/                 # Backend Express
│   ├── index.ts            # Entry point
│   ├── routes.ts           # Rotas da API
│   └── storage.ts          # Camada de dados
├── shared/                 # Código compartilhado
│   └── schema.ts           # Schemas do banco
└── package.json
```

## 👥 Usuários do Sistema

- **Produtores** → Registram lotes e etapas produtivas
- **Cooperativas** → Gerenciam múltiplos produtores
- **Compradores** → Verificam autenticidade dos produtos
- **Auditores** → Validam dados contra blockchain

## 🔐 Verificação Blockchain

O sistema compara:
- **Dados off-chain** (banco de dados local)
- **Hash on-chain** (registrado na Polygon)

✅ Hashes iguais = Dados autênticos  
❌ Hashes diferentes = Possível adulteração

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desenvolvido com 💚 e auxílio de IA (GitHub Copilot)
