import { gql } from "apollo-server";

const typeDefs = gql`
    type Query {
        checkHealth: String
        refreshApiConnection: String
    }
`;

export default typeDefs;
