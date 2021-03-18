const organizations = [
  {
    id: '1',
    name: 'Organization 1',
    nameForCommunications: 'Organization Number One',
    numberOfStudents: 200,
    divisionName: 'Division One',
    documents: ['1'],
  },
  {
    id: '2',
    name: 'Organization 2',
    nameForCommunications: 'Organization Number Two',
    numberOfStudents: 300,
    divisionName: 'Division Two',
    documents: ['2'],
  },
  {
    id: '3',
    name: 'Organization 3',
    nameForCommunications: 'Organization Number Three',
    numberOfStudents: 1000,
    divisionName: 'Division Three',
    documents: ['3'],
  },
];

const questions = [
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
    supportsApprovers: false,
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
    supportsApprovers: false,
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
    supportsApprovers: false,
  },
];

const fields = [
  {
    id: '1',
    collapsable: false,
    questionId: '1',
    readOnly: false,
    approversEnabled: true,
    equationSections: [],
  },
  {
    id: '2',
    collapsable: false,
    questionId: '2',
    readOnly: false,
    approversEnabled: true,
    equationSections: [],
  },
  {
    id: '3',
    collapsable: false,
    questionId: '3',
    readOnly: false,
    approversEnabled: true,
    equationSections: [],
  },
];

const documents = [
  {
    id: '1',
    name: 'Form 1',
    parentMenssage: 'Please fill form 1',
    attendeeQuestionIds: ['1', '3'],
    signeeQuestions: ['2'],
    organizationId: '1',
    type: 'FORM',
  },
  {
    id: '2',
    name: 'Form 2',
    parentMenssage: 'Please fill form 2',
    attendeeQuestionIds: ['2', '3'],
    signeeQuestions: ['1'],
    organizationId: '2',
    type: 'PROCESS',
  },
  {
    id: '3',
    name: 'Form 3',
    parentMenssage: 'Please fill form 3',
    attendeeQuestionIds: ['1', '2'],
    signeeQuestions: ['3'],
    organizationId: '3',
    type: 'FORM_TEMPLATE',
  },
];

const mock_data = {
  organizations,
  questions,
  fields,
  documents,
};

export { mock_data };
