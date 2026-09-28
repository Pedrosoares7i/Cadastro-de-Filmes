# 🎬 Cadastro de Filmes (CRUD)

Aplicativo React Native com Expo para cadastro e gerenciamento de filmes, utilizando o **MockAPI** como backend.

## 📋 Funcionalidades (CRUD)

| Operação | Descrição |
|----------|-----------|
| **Create** | Cadastrar um novo filme (título, gênero e ano) |
| **Read** | Listar todos os filmes cadastrados |
| **Update** | Editar os dados de um filme existente |
| **Delete** | Excluir um filme (com confirmação) |

## 🚀 Como executar

### 1. Criar a API no MockAPI

1. Acesse [https://mockapi.io](https://mockapi.io) e crie uma conta gratuita.
2. Crie um novo projeto (ex: `cadastro-filmes`).
3. Crie um recurso chamado **`filmes`** com os seguintes campos:

| Campo | Tipo |
|-------|------|
| `titulo` | String |
| `genero` | String |
| `ano` | String |

> O campo `id` é gerado automaticamente pelo MockAPI.

4. Copie a URL do seu projeto (formato: `https://SEU_ID.mockapi.io/filmes`).

### 2. Configurar a URL no app

Abra o arquivo `src/services/api.ts` e substitua o valor de `BASE_URL`:

```ts
const BASE_URL = "https://SEU_ID_AQUI.mockapi.io/filmes";
```

### 3. Instalar e executar

```bash
npm install
npx expo start
```

- Pressione **`a`** para abrir no emulador Android
- Pressione **`i`** para abrir no simulador iOS
- Escaneie o QR Code com o app **Expo Go** (celular)

## 📁 Estrutura do projeto

```
├── App.tsx                      # Navegação e configuração principal
├── src/
│   ├── types/Filme.ts           # Tipagem dos dados
│   ├── services/api.ts          # Requisições HTTP (CRUD) ao MockAPI
│   ├── navigation/types.ts      # Tipos das rotas
│   └── screens/
│       ├── FilmesListScreen.tsx # Lista de filmes (Read + Delete)
│       └── FormFilmeScreen.tsx  # Formulário (Create + Update)
```

## 🛠️ Tecnologias

- **Expo** (~51)
- **React Native** (0.74)
- **React Navigation** (navegação entre telas)
- **MockAPI** (API REST fake para persistência)
