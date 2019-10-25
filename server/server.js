import http from 'http';
import app from './app';

const port = 3000 || process.env.PORT;
const server = http.createServer(app);
server.listen(port, () => console.log(`listening on port ${port}`));
