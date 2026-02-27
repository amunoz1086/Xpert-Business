const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.NODE_HOSTNAME || 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer(async (req, res) => {

        try {
            const parsedUrl = parse(req.url, true);
            const { pathname, query } = parsedUrl;

            // Detecta protocolo correctamente, incluso detrás de un proxy.
            const proto =
                req.headers['x-forwarded-proto']?.split(',')[0] ||
                (req.socket.encrypted ? 'https' : 'http');

            // Usa host del header (proxy-friendly)
            const host = req.headers['x-forwarded-host'] || req.headers.host;

            // Construye URL completa
            const fullUrl = `${proto}://${host}${req.url}`;

            res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
            res.setHeader('X-Frame-Options', 'DENY');
            res.setHeader('Permissions-Policy', 'geolocation=(self), microphone=(), camera=(), fullscreen=(self)');

            if (pathname === '/a') {
                await app.render(req, res, '/a', query);
            } else if (pathname === '/b') {
                await app.render(req, res, '/b', query);
            } else {
                await handle(req, res, parsedUrl);
            }

            console.log(`Request processed: ${req.url}`);
            console.log('Request URL:', fullUrl);

        } catch (err) {
            console.error(`internal server error: ${req.url} - ${err}`);
            res.statusCode = 500;
            res.end(err);
        }
    })
        .once('error', (err) => {
            console.error(`Server error: ${err}`);
            process.exit(1)
        })
        .listen(port, () => {
            console.log(`Server started on http://${hostname}:${port}`);
        })
});