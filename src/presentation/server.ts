import express, { Router } from 'express'
import cors from 'cors'

interface Options {
	port: number,
	routes: Router,
}

export class Server {
	public port: number;
	private readonly routes: Router;
	public readonly app = express();

	constructor(options: Options){
		const { port,routes } = options;

		this.port = port
		this.routes = routes
	}

	async start() {
		this.app.use(express.json()); //raw
		this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded
		
		this.app.use(cors({
			origin: ['http://localhost:3000', 'http://localhost:3001'],
			credentials: true
		}))

		this.app.use(this.routes);

		this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port} 🚀`)
		})
	}
}