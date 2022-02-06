import { Context, IJoinedCategoryData } from "./types";
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
        getInitialData: async (
            parent: any,
            args: any,
            { dataSources: { mercadoLivreApi } }: Context
        ) => {
            const currencieData = await mercadoLivreApi.getCurrencyConversion();

            const data = await mercadoLivreApi.getCategories();

            const joinedCategoryData = await Promise.all(
                data.map(async (val) => {
                    const { children_categories } =
                        await mercadoLivreApi.getCategoriesDetails(val.id);

                    const destructuredData = children_categories.map(
                        (categoryDetails) => {
                            const { total_items_in_this_category, ...rest } =
                                categoryDetails;

                            return rest;
                        }
                    );

                    return {
                        mainCategory: val,
                        childrenCategories: destructuredData,
                    };
                })
            );

            const initialData = { currencieData, joinedCategoryData };

            return initialData;
        },
    },
};

export default resolvers;
