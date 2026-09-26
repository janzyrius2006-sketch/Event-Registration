# Jan Zyrius

An event registration app built with React and Vite.

## Deploy to Vercel

1. Push this project to a Git provider supported by Vercel.
2. In Vercel, choose **Add New Project** and import the repository.
3. Set **Root Directory** to `Event Registration` if importing the containing `Event Registration System` repository. If this folder is the repository root, leave it as `./`.
4. Keep the Vite framework preset. The build command is `npm run build` and the output directory is `dist`; both are also set in `vercel.json`.
5. Choose **Deploy**.

The npm lockfile is included so Vercel can install the project's dependencies during deployment.

## Local development

```sh
npm install
npm run dev
```

Events and registration counts currently live in browser memory and reset when the page reloads. Persistent registrations require a database or other backend.
