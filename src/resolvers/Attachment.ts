import { CountryCode, Resolvers } from '@src/types';
import {
  getContentUri,
  getDownloadUri,
  getPrintUri,
  getThumbnailUri,
  isPdf,
} from '@src/utils';
import { Context } from 'apollo-server-core';

const AttachmentResolvers: Resolvers<Context> = {
  Attachment: {
    IsPdf: (parent) =>
      !!(parent.ContentMetadata && isPdf(parent.ContentMetadata)),
    FileType: (parent) => parent.ContentMetadata.MimeType,
    ContentUri: (parent) => getContentUri(CountryCode.Ca, parent.Id),
    DownloadUri: (parent) => getDownloadUri(CountryCode.Ca, parent.Id),
    PrintUri: (parent) => getPrintUri(CountryCode.Ca, parent.Id),
    ThumbnailUri: (parent) => getThumbnailUri(CountryCode.Ca, parent.Id),
  },
};

export { AttachmentResolvers };
