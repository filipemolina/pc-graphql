import { ContextType } from '@src/api';
import { DocumentsModel, DocumentVersionsModel } from '@src/models';
import { ApiDocumentVersion } from '@src/types';

const DocumentVersionResolvers = {
  DocumentVersion: {
    Template: (parent: ApiDocumentVersion, _args: {}, context: ContextType) =>
      DocumentVersionsModel.getDocumentVersionById(context, parent.Template_Id),
    Document: (parent: ApiDocumentVersion, _args: {}, context: ContextType) =>
      DocumentsModel.getDocumentById(context, parent.Document_Id),
    Latest: (parent: ApiDocumentVersion, _args: {}, context: ContextType) =>
      parent.Latest_Id
        ? DocumentsModel.getDocumentById(context, parent.Latest_Id)
        : null,
    Active: (parent: ApiDocumentVersion, _args: {}, context: ContextType) =>
      parent.Active_Id
        ? DocumentsModel.getDocumentById(context, parent.Active_Id)
        : null,
  },
};

export { DocumentVersionResolvers };
