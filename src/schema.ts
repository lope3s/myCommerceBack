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

    type Category {
        id: String
        name: String
    }

    type JoinedCategoryData {
        mainCategory: Category
        childrenCategories: [Category]
    }

    type InitialData {
        currencieData: CurrencieConversion
        joinedCategoryData: [JoinedCategoryData]
    }

    type Query {
        checkHealth: String
        refreshApiConnection: String
        getInitialData: InitialData
    }
`;

export default typeDefs;
