First Put all into Game-Launcher\backend
npm init -y
npm install typescript ts-node @types/node --save-dev
npx tsc --init

Install core dependencies:

bashCopynpm install express mongoose dotenv cors helmet jsonwebtoken bcrypt
npm install @types/express @types/mongoose @types/cors @types/helmet @types/jsonwebtoken @types/bcrypt --save-dev

Set up your TypeScript configuration Adjust your tsconfig.json

npm install
npm install -D ts-node-dev
