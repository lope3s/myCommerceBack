import { gql } from "apollo-server";

const typeDefs = gql`
    type Query {
        checkHealth: String
    }
`;

export default typeDefs;
