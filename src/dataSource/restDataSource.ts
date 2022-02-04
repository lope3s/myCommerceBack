import { RESTDataSource } from "apollo-datasource-rest";
import { getConnection, getRepository } from "typeorm";
import { Tokens } from "../entity";

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
}
