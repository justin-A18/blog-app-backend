import { envs } from "./config/envs"
import { Server } from "./presentation/server"
import { AppRoutes } from "./presentation/routes"
import { MongoDataBase } from "./database"

(() => {
	main()
})()

async function main() {
	
	//* connect to dataBase
	await MongoDataBase.connect({
		dbName: envs.MONGO_DB_NAME,
		mongoUrl: envs.MONGO_URL
	})

	// config server
	new Server({ port: envs.PORT, routes: AppRoutes.routes }).start();

}