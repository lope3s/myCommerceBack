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

            console.log("at: ", data.access_token, "rt: ", data.refresh_token);

            return "Connection Refreshed";
        },
        getCurrencyConversion: async (
            parent: any,
            args: any,
            { dataSources: { mercadoLivreApi } }: Context
        ) => {
            const data = await mercadoLivreApi.getCurrencyConversion();

            return data;
        },
    },
};

export default resolvers;
