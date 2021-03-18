"use strict";
exports.__esModule = true;
exports.getQuestionsById = exports.getOrganizationById = exports.getDocumentsByOrganizationId = void 0;
var getDocumentsByOrganizationId = function (documents, organizationId) {
    return documents.filter(function (apiDocument) { return apiDocument.organizationId === organizationId; });
};
exports.getDocumentsByOrganizationId = getDocumentsByOrganizationId;
var getOrganizationById = function (organizations, organizationId) {
    var organization = organizations.find(function (apiOrganization) { return apiOrganization.id === organizationId; });
    return organization || organizations[0];
};
exports.getOrganizationById = getOrganizationById;
var getQuestionsById = function (questions, questionIds) {
    return questionIds.flatMap(function (questionId) {
        return questions.filter(function (question) { return question.id === questionId; });
    });
};
exports.getQuestionsById = getQuestionsById;
