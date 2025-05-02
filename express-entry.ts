import { createHandler } from '@universal-middleware/express';
import compression from 'compression';
import express from 'express';
import expressStaticGzip from 'express-static-gzip';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createDevMiddleware } from 'vike/server';

import { vikeHandler } from './server/vike-handler';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = __dirname;
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

async function startServer() {
    const app = express();

    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(`${root}/dist/client`));
        app.use(
            root,
            expressStaticGzip(`${root}/dist/client`, {
                enableBrotli: true,
                orderPreference: ['br', 'gz'],
            })
        );
        app.use(
            compression({
                brotli: true,
            })
        );
    } else {
        // Instantiate Vite's development server and integrate its middleware to our server.
        // ⚠️ We should instantiate it *only* in development. (It isn't needed in production
        // and would unnecessarily bloat our server in production.)
        const { devMiddleware } = await createDevMiddleware({ root });
        app.use(devMiddleware);
    }

    /**
     * Vike route
     *
     * @link {@see https://vike.dev}
     **/

    app.all('*', createHandler(vikeHandler)());

    app.listen(port, () => {
        console.log(`Server listening on http://localhost:${port}`);
    });

    return app;
}

export default (await startServer()) as unknown;
