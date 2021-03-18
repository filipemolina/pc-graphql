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
    maxEntries: Int
    supportsApprovers: Boolean!
  }

  type ApiQuestion {
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
    maxEntries: Int
    supportsApprovers: Boolean!
  }

  type Field {
    id: ID!
    collapsable: Boolean!
    question: ApiQuestion!
    readOnly: Boolean!
    approversEnabled: Boolean
    equationSections: [ApiQuestion!]!
  }

  type ApiField {
    id: ID!
    collapsable: Boolean!
    questionId: String!
    readOnly: Boolean!
    approversEnabled: Boolean
    equationSectionIds: [String!]!
  }

  type Document {
    id: ID!
    name: String!
    parentMenssage: String!
    attendeeQuestions: [ApiQuestion!]!
    signeeQuestions: [ApiQuestion!]!
    organization: ApiOrganization!
    type: DocumentType!
  }

  type ApiDocument {
    id: ID!
    name: String!
    parentMenssage: String!
    attendeeQuestionIds: [String!]!
    signeeQuestionIds: [String!]!
    organizationId: String!
    type: DocumentType!
  }

  type Organization {
    id: ID!
    name: String!
    nameForCommunications: String!
    numberOfStudents: Int
    divisionName: String!
    documents: [ApiDocument!]!
  }

  type ApiOrganization {
    id: ID!
    name: String!
    nameForCommunications: String!
    numberOfStudents: Int
    divisionName: String!
    documentIds: [String!]!
  }

  type Query {
    organizations: [Organization!]!
    documents(organizationId: ID!): [Document!]!
  }
`;

export { typeDefs };
