import { MercadoLivreAPI } from "../dataSource";

export interface Context {
    dataSources: {
        mercadoLivreApi: MercadoLivreAPI;
    };
}
