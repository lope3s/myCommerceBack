import { Context } from "./types";
import { getConnection, getRepository } from "typeorm";
import { Tokens } from "./entity";

const resolvers = {
    Query: {
        checkHealth: () => "Healthly",
        refreshApiConnection: async (
            parent: any,
            args: any,
            context: Context
        ) => {
            const data =
                await context.dataSources.mercadoLivreApi.refreshConnection();

            const connection = getConnection().getRepository(Tokens);

            const tokens = await connection.findOne();

            if (tokens) {
                tokens.token = data.access_token;
                tokens.refreshToken = data.refresh_token;

                await connection.save(tokens);
            }

            return "Connection Refreshed";
        },
    },
};

export default resolvers;
