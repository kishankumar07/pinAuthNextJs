
# Next.js Application with Supabase PIN Authentication


This documentation provides instructions to set up and run the Next.js application locally. Follow these steps to install the necessary dependencies, configure the environment, and start the development server.

## 1. Prerequisites
Before getting started, make sure you have the following tools installed on your machine:
- Node.js (LTS version recommended, e.g., 18.x.x)

- Download and install from [Node.js official website](https://nodejs.org/en/download/package-manager/)
- npm (comes with Node.js) or yarn (if you prefer using Yarn)

- To check if Node.js and npm are installed, run: 

```bash
node -v
npm -v
```
- Git (to clone the repository)
- Install Git from [Git official website](https://git-scm.com/)

## 2. Clone the Repository
- Open a terminal ( command prompt or Git Bash).
- Navigate to the directory where you want to clone the repository.
- Run the following command to clone the project.

```bash
git clone <repository-url>

```
Replace <repository-url> with the actual Git URL of the project repository. 

- Navigate to the project folder:
```bash
cd <project-folder>

```

## 3. Install Dependencies
After cloning the repository, install the project dependencies using either npm or yarn.

Using npm : 

```bash
npm install

```

Using Yarn:

```bash
yarn install
```
This will install all the required packages listed in the package.json file.

## 4. Set Up Environment Variables
The application requires environment variables for Supabase and other configurations.

1 . In the root of the project directory, create a .env.local file and configure it with Supabase credentials and other necessary environment variables.

```bash
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>

```
2 . You can find these credentials in your [Supabase dashboard](https://supabase.com/).

## 5. Running the Application Locally

Once the dependencies are installed and environment variables are set, you can start the application in development mode.

Using npm: 
```bash
npm run dev
```
Using Yarn:
```bash
yarn dev
```
This will start the Next.js development server, typically running on http://localhost:3000.

You should now be able to access the application by opening your browser and visiting:

```bash
http://localhost:3000

```

## 6. Available Scripts

Here are some additional scripts you can run:

- npm run build or yarn build: Creates an optimized production build of the application.
- npm run start or yarn start: Runs the production build of the application.
- npm run lint or yarn lint: Lints the codebase for any style issues or errors.

## 7. Addtional Configuratins
- Bcrypt Compatibility: If you are using bcrypt (as in this project), ensure the bcrypt module works properly in your environment. In case of issues, verify that all required native dependencies for bcrypt are installed.

## 8. Troubleshooting
If you encounter issues during setup or running the project:
- Ensure that all dependencies are properly installed by deleting node_modules and reinstalling:

```bash
rm -rf node_modules
npm install

```
- Double-check that the environment variables are set correctly in .env.local.

## 9. Building for Production
When you're ready to build the application for production:

```bash
npm run build
```
This will create an optimized version of the application in the .next folder. You can run this build with:
```bash
npm run start
```

## 11. Hosting /Deployment 

If hosting on a platform like Vercel, Netlify, or another service, include specific steps or instructions on how to deploy. For example, with Vercel:

 1 . Install Vercel CLI:
 ```bast
 npm install -g vercel
 ```
 2 . Deploy the application

 ```bash
 vercel
```