import { RESTDataSource } from "apollo-datasource-rest";
import { getConnection, getRepository } from "typeorm";
import { Tokens } from "../entity";
import { IGetCurrencieConversion } from "../types";

export class MercadoLivreAPI extends RESTDataSource {
    clientId = process.env.CLIEND_ID;
    clientSecret = process.env.CLIENT_SECRET;
    connection = getConnection().getRepository(Tokens);

    constructor() {
        super();
        this.baseURL = "https://api.mercadolibre.com";
    }

    async refreshConnection() {
        const tokens = await this.connection.findOne();
        return this.post(
            `/oauth/token?grant_type=refresh_token&client_id=${this.clientId}&client_secret=${this.clientSecret}&refresh_token=${tokens?.refreshToken}`
        );
    }

    async getCurrencyConversion() {
        const tokens = await this.connection.findOne();
        return this.get<IGetCurrencieConversion[]>(
            "/currency_conversions/search?from=BRL&to=USD",
            {
                headers: {
                    authorization: `Bearer ${tokens?.token}`,
                },
            }
        );
    }

    async getCategories() {
        const tokens = await this.connection.findOne();
        return this.get("/sites/MLB/categories", {
            headers: {
                authorization: `Bearer ${tokens?.token}`,
            },
        });
    }

    async getCategoriesDetails(categoryId: string) {
        const tokens = await this.connection.findOne();
        return this.get(`/categories/${categoryId}`, {
            headers: {
                authorization: `Bearer ${tokens?.token}`,
            },
        });
    }
}
