import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routesProduct from '../routes/product';
import db from '../db/connection';
import sequelize from '../db/connection';

class Server {
    private app: Application;
    private port: string;
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('current port is ' + this.port)
        })
    }

    routes() {
        this.app.get('/', (req: Request, res: Response) => {
           res.json({
            msg: 'API working'
           })
        })

        this.app.use('/api/products', routesProduct)
    }

    middlewares() {
        this.app.use(express.json());

        this.app.use(cors());
    }

    async dbConnect() {

        try {
            await db.authenticate();
            console.log('Connected');
        } catch(error) {
            console.log(error);
            console.log("Couldn't connect");
        }
        
    }

}

export default Server;