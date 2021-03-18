import { gql } from 'apollo-server';

const typeDefs = gql`
  enum DocumentType {
    FORM
    PROCESS
    FORM_TEMPLATE
    PROCESS_TEMPLATE
  }

  type Question {
    id: ID!
    name: String!
    isRequired: Boolean!
    labelText: String!
    reportingLabel: String!
    placeHolderText: String!
    dataValue: String!
    characterLimit: Int!
    format: String!
    valueType: String!
    valueOptions: [String!]!
    hidden: Boolean!
    sortValueOptions: Boolean!
    pinnedValueOptions: [String!]!
    minEntries: Int
    MmxEntries: Int
    supportsApprovers: Boolean!
  }

  type Field {
    id: ID!
    collapsable: Boolean!
    question: Question!
    readOnly: Boolean!
    approversEnabled: Boolean
    equationSections: [Question!]!
  }

  type Document {
    id: ID!
    name: String!
    parentMenssage: String!
    attendeeQuestions: [Question!]!
    signeeQuestions: [Question!]!
    organization: Organization!
    type: DocumentType!
  }

  type Organization {
    id: ID!
    name: String!
    nameForCommunications: String!
    numberOfStudents: Int
    divisionName: String!
    documents: [Document!]!
  }

  type Query {
    organizations: [Organization!]!
    documents(organizationId: ID!): [Document!]!
  }
`;

export { typeDefs };
