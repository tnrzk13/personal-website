## Get started

Install the dependencies...

```bash
npm install
npm run dev
```

The app will be running in http://localhost:8080

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).

## Single-page app mode

By default, sirv will only respond to requests that match files in `public`. This is to maximise compatibility with static fileservers, allowing you to deploy your app anywhere.

If you're building a single-page app (SPA) with multiple routes, sirv needs to be able to respond to requests for _any_ path. You can make it so by editing the `"start"` command in package.json:

```js
"start": "sirv public --single"
```

## Using TypeScript

This template comes with a script to set up a TypeScript development environment, you can run it immediately after cloning the template with:

```bash
node scripts/setupTypeScript.js
```

Or remove the script via:

```bash
rm scripts/setupTypeScript.js
```

If you want to use `baseUrl` or `path` aliases within your `tsconfig`, you need to set up `@rollup/plugin-alias` to tell Rollup to resolve the aliases. For more info, see [this StackOverflow question](https://stackoverflow.com/questions/63427935/setup-tsconfig-path-in-svelte).

## Deploying to the web

### With [Vercel](https://vercel.com)

1. **Install the Vercel CLI** if you haven't already:

```bash
npm install -g vercel
```

2. **Login to Vercel**:

```bash
vercel login
```

3. **Deploy your site**:
   - For a preview deployment (development):
   ```bash
   # From the root project folder
   vercel
   ```
   
   - For a production deployment:
   ```bash
   # From the root project folder
   vercel --prod
   ```

4. **Configure Custom Domain**:
   - Add your domain to Vercel:
   ```bash
   vercel domains add your-domain.com
   ```
   
   - Update your DNS settings with your domain provider:
     - Add an A record with:
       - Host: www (or @)
       - Value: 76.76.21.21
     - Alternatively, set up a CNAME record pointing to cname.vercel-dns.com

Vercel will automatically deploy your site from the root directory (no need to `cd` into the public folder). The `vercel.json` configuration file handles the build settings.

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public my-project.surge.sh
```
