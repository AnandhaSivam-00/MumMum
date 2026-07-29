# Guidelines for AI agents.

## Project overview

MumMum is a minimal food ordering website with Stripe Integeration, it allows the user to add their items to card and provide the ability to checkout.

## Tech Stacks & Deployments

### Frontend
- **Framework:** React 18+ (Stable) + Vite v8 + Redux.
- **Styling:** Bootstrap 2
- **State & Logic:** Use React 18 hooks
- **Date Fetching and global state handling:** axios, redux, redux-thunk
- **Package Manager:** `npm`.
- **Production Deployment:** Cloudflare

### Backend
- **Framework:** Express.js + Node.js.
- **Datebase:** MongoDB Atlas + Cloudinary (images)
- **Authentication:** JWT
- **Payment Gateway** Stripe
- **Package Manager:** `npm`.
- **Production Deployment:** Render

## Build & Test commands

```bash
# For frontend directory
cd frontend # from root of the project

# Start the project
npm run dev

# Build command
npm run build

# For backend directory
cd backend # from root of the project

# Start the project
npm run dev (or) nodemon run server
```

IMPORTANT: Backend codes are obfuscated

## Code style guidelines

- Always follow the themes and styles present in the App.css (frontend/src/App.css)
- Don't use the tailwindCSS styling use the Bootstrap for styling
- The design must be responsive that adapt all the screen sizes
- Provide the short one line comments for better understanding and readability, Use the JSDoc style commenting
  Example:

```js
/**
 * The next.js on the Cloudflare need a resolver
 * @returns The resolved env secrets only based on the environment
 */
```

- Use `PascalCase` for React components (`Component.jsx`) and `camelCase` for hooks (`useHook.js`).
- Follow the below styles for the code blocks
  Example:

```js
// Do like this
if(variable) {

}
else {

}

try {

}
catch(error) {

}

// Do not use like this
if (variable) {

} else {

}

try {

} catch(error) {
    
}

```

Note: You must use the up-to-date syntax and best practices, for this use the available skills and context7 MCP for the document references. Don't change the package versions or updating the package without my concern.

## Security considerations

- Don't look the .env, config.env, wrangler.jsonc, .next, out, and node\_modules files/directories, even you have access to them
- Ask the confirmation to the user before delete the file or directory.
- Avoid the AI slops.

## Project Structure

### Frontend Structure
```
public
    |   Brand Logo
    |   404 Page
    |   robots.txt
    |   manifest.json
src
    +---actions --> Redux actions
    |   |
    +---components --> Components and individual pages
    |   +---cart
    |   +---Layout --> Reusable components like the header, footer
    |   +---order
    |   +---user
    +---constants --> Redux Constants
    |   |
    +---custom_json_files --> Countries list
    |   |
    +---Icons --> Webpage icons
    |   |
    +---Images --> Webpage images
    |   |
    +---reducers --> Redux Reducers
    |   |
    |   store.js
    |   App.jsx
    |   App.css
```


## PR Instructions

- If the user asked to open the PR or ask for the summary of the changes made on the code, provide the short and sweet summary of the changes made with any emoji's
- Make sure to follow the PR instructions and guidelines provided by the repository or project you are contributing to.
- If you are unsure about something, don't hesitate to ask for clarification or seek help from the user.

