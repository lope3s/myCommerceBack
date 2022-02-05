import { gql } from "apollo-server";

const typeDefs = gql`
    type CurrencieConversion {
        currency_base: String
        currency_quote: String
        ratio: Float
        rate: Float
        inv_rate: Float
        creation_date: String
        valid_until: String
    }

    type Query {
        checkHealth: String
        refreshApiConnection: String
        getCurrencyConversion: CurrencieConversion
    }
`;

export default typeDefs;
