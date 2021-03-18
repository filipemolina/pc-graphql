"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.QueryResolvers = void 0;
var mock_data_1 = require("../mock_data");
var utils_1 = require("../utils");
var QueryResolvers = {
    Query: {
        organizations: function () {
            var organizations = mock_data_1.mock_data.organizations, documents = mock_data_1.mock_data.documents;
            return organizations.map(function (organization) { return (__assign(__assign({}, organization), { documentIds: undefined, documents: utils_1.getDocumentsByOrganizationId(documents, organization.id), __typename: 'Organization' })); });
        },
        documents: function (_parent, _a) {
            var organizationId = _a.organizationId;
            var documents = mock_data_1.mock_data.documents, organizations = mock_data_1.mock_data.organizations, questions = mock_data_1.mock_data.questions;
            return documents
                .filter(function (apiDocument) { return apiDocument.organizationId === organizationId; })
                .map(function (apiDocument) { return (__assign(__assign({}, apiDocument), { organizationId: undefined, attendeeQuestionIds: undefined, signeeQuestionIds: undefined, organization: utils_1.getOrganizationById(organizations, apiDocument.organizationId), attendeeQuestions: utils_1.getQuestionsById(questions, apiDocument.attendeeQuestionIds), signeeQuestions: utils_1.getQuestionsById(questions, apiDocument.signeeQuestionIds), __typename: 'Document' })); });
        }
    }
};
exports.QueryResolvers = QueryResolvers;
