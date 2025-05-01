import { createHandler } from '@universal-middleware/express';
import compression from 'compression';
import express from 'express';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createGzip } from 'node:zlib';
import { SitemapStream, streamToPromise } from 'sitemap';
import { createDevMiddleware } from 'vike/server';

import { ROUTES } from '@/shared/config';

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
     * Sitemap route
     **/

    let sitemap: Buffer<ArrayBufferLike>;
    app.get('/sitemap.xml', (req, res) => {
        res.header('Content-Type', 'application/xml');
        res.header('Content-Encoding', 'gzip');
        // if we have a cached entry send it
        if (sitemap) {
            res.send(sitemap);
            return;
        }

        try {
            const smStream = new SitemapStream({ hostname: 'https://cognitivelab.ru/' });
            const pipeline = smStream.pipe(createGzip());

            // pipe your entries or directly write them.
            smStream.write({ url: '/', changefreq: 'daily', priority: 0.3 });
            smStream.write({ url: ROUTES.TEST, changefreq: 'weekly', priority: 0.7 });
            smStream.write({ url: '/types', changefreq: 'weekly', priority: 0.5 });

            // cache the response
            streamToPromise(pipeline).then((sm) => (sitemap = sm));
            // make sure to attach a write stream such as streamToPromise before ending
            smStream.end();
            // stream write the response
            pipeline.pipe(res).on('error', (e) => {
                throw e;
            });
        } catch (e) {
            console.error(e);
            res.status(500).end();
        }
    });

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
