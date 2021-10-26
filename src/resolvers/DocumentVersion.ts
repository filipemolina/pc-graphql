import { ContextType } from '@src/api';
import {
  AttachmentsModel,
  DocumentsModel,
  DocumentVersionsModel,
} from '@src/models';
import { QuestionModel } from '@src/models/questions';
import { Document, DocumentVersionResolvers, Resolvers } from '@src/types';

const DocumentVersionResolvers: Resolvers<ContextType> = {
  DocumentVersion: {
    Template: (parent, _args, context) =>
      DocumentVersionsModel.getDocumentVersionById(context, parent.Template_Id),
    Document: (parent, _args, context) =>
      DocumentsModel.getDocumentById(
        context,
        parent.Document_Id
      ) as Promise<Document>,
    Latest: (parent, _args, context) =>
      parent.Latest_Id
        ? DocumentsModel.getDocumentById(context, parent.Latest_Id)
        : null,
    Active: (parent, _args, context) =>
      parent.Active_Id
        ? DocumentsModel.getDocumentById(context, parent.Active_Id)
        : null,
    AttendeeQuestions: (parent, _args, context) =>
      QuestionModel.getQuestionsById(context, parent.AttendeeQuestions_Id),
    PrivateQuestions: (parent, _args, context) =>
      QuestionModel.getQuestionsById(context, parent.PrivateQuestions_Id),
    PublicQuestions: (parent, _args, context) =>
      QuestionModel.getQuestionsById(context, parent.PublicQuestions_Id),
    SigneeQuestions: (parent, _args, context) =>
      QuestionModel.getQuestionsById(context, parent.SigneeQuestions_Id),
    Attachments: (parent, _args, context) =>
      AttachmentsModel.getAttachmentsByDocumentVersionId(context, parent.Id),
  },
};

export { DocumentVersionResolvers };
