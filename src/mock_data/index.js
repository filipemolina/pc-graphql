"use strict";
exports.__esModule = true;
exports.mock_data = void 0;
var types_1 = require("../types");
var organizations = [
    {
        id: '1',
        name: 'Organization 1',
        nameForCommunications: 'Organization Number One',
        numberOfStudents: 200,
        divisionName: 'Division One',
        documentIds: ['1']
    },
    {
        id: '2',
        name: 'Organization 2',
        nameForCommunications: 'Organization Number Two',
        numberOfStudents: 300,
        divisionName: 'Division Two',
        documentIds: ['2']
    },
    {
        id: '3',
        name: 'Organization 3',
        nameForCommunications: 'Organization Number Three',
        numberOfStudents: 1000,
        divisionName: 'Division Three',
        documentIds: ['3']
    },
];
var questions = [
    {
        id: '1',
        name: 'Question One',
        isRequired: true,
        labelText: 'Question One Label',
        reportingLabel: 'Question One Reporting Label',
        placeHolderText: 'Think really hard about your answer',
        dataValue: 'Question One Data Value',
        characterLimit: 350,
        format: 'Question one format',
        valueType: 'Free text',
        valueOptions: [],
        hidden: false,
        sortValueOptions: false,
        pinnedValueOptions: [],
        minEntries: 0,
        maxEntries: 0,
        supportsApprovers: false
    },
    {
        id: '2',
        name: 'Question Two',
        isRequired: true,
        labelText: 'Question Two Label',
        reportingLabel: 'Question Two Reporting Label',
        placeHolderText: 'Think really hard about your answer',
        dataValue: 'Question Two Data Value',
        characterLimit: 350,
        format: 'Question Two format',
        valueType: 'Free text',
        valueOptions: [],
        hidden: false,
        sortValueOptions: false,
        pinnedValueOptions: [],
        minEntries: 0,
        maxEntries: 0,
        supportsApprovers: false
    },
    {
        id: '3',
        name: 'Question Three',
        isRequired: true,
        labelText: 'Question Three Label',
        reportingLabel: 'Question Three Reporting Label',
        placeHolderText: 'Think really hard about your answer',
        dataValue: 'Question Three Data Value',
        characterLimit: 350,
        format: 'Question Three format',
        valueType: 'Free text',
        valueOptions: [],
        hidden: false,
        sortValueOptions: false,
        pinnedValueOptions: [],
        minEntries: 0,
        maxEntries: 0,
        supportsApprovers: false
    },
];
var fields = [
    {
        id: '1',
        collapsable: false,
        questionId: '1',
        readOnly: false,
        approversEnabled: true,
        equationSectionIds: []
    },
    {
        id: '2',
        collapsable: false,
        questionId: '2',
        readOnly: false,
        approversEnabled: true,
        equationSectionIds: []
    },
    {
        id: '3',
        collapsable: false,
        questionId: '3',
        readOnly: false,
        approversEnabled: true,
        equationSectionIds: []
    },
];
var documents = [
    {
        id: '1',
        name: 'Form 1',
        parentMenssage: 'Please fill form 1',
        attendeeQuestionIds: ['1', '3'],
        signeeQuestionIds: ['2'],
        organizationId: '1',
        type: types_1.DocumentType.Form
    },
    {
        id: '2',
        name: 'Form 2',
        parentMenssage: 'Please fill form 2',
        attendeeQuestionIds: ['2', '3'],
        signeeQuestionIds: ['1'],
        organizationId: '2',
        type: types_1.DocumentType.Process
    },
    {
        id: '3',
        name: 'Form 3',
        parentMenssage: 'Please fill form 3',
        attendeeQuestionIds: ['1', '2'],
        signeeQuestionIds: ['3'],
        organizationId: '3',
        type: types_1.DocumentType.FormTemplate
    },
];
var mock_data = {
    organizations: organizations,
    questions: questions,
    fields: fields,
    documents: documents
};
exports.mock_data = mock_data;
