
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/97ec86a8-23a4-43f7-a602-3522abf316ba

## Setting up in VS Code

To work with this project in VS Code, follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org/) (version 16.x or higher)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/)

### Step 1: Clone the repository
```sh
# Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Navigate to the project directory.
cd <YOUR_PROJECT_NAME>
```

### Step 2: Install VS Code extensions (recommended)
For the best development experience, install these VS Code extensions:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets

### Step 3: Install project dependencies
```sh
# Install the necessary dependencies.
npm i
```

### Step 4: Start the development server
```sh
# Start the development server with auto-reloading and an instant preview.
npm run dev
```

The application will be available at `http://localhost:8080`

## Project structure
- `/src/components/game/` - Game-specific components
- `/src/components/ui/` - UI components from shadcn
- `/src/hooks/` - Custom React hooks
- `/src/pages/` - Page components
- `/src/lib/` - Utility functions

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/97ec86a8-23a4-43f7-a602-3522abf316ba) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/97ec86a8-23a4-43f7-a602-3522abf316ba) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes it is!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
