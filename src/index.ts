import { ApolloServer } from "apollo-server";
import resolvers from "./resolvers";
import typeDefs from "./schema";
import { join } from "path";
import { config } from "dotenv";
import { MercadoLivreAPI } from "./dataSource";
import "reflect-metadata";
import { createConnection } from "typeorm";

config({ path: join(__dirname, "../.env") });

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        return {
            mercadoLivreApi: new MercadoLivreAPI(),
        };
    },
});

server.listen().then(async ({ url }) => {
    try {
        await createConnection();
        console.log(`\nserver running on ${url}`);
    } catch (error) {
        console.log(error);
    }
});
