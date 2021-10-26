import { ContentMetadata } from '@src/types';

const MimeTypes = {
  ExcelX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  CommaSeparatedValues: 'text/csv',
  TabSeparatedValues: 'text/tab-separated-values',
  PlainText: 'text/plain',
  Pdf: 'application/pdf',
  OctetStream: 'application/octet-stream',
  WordDoc: 'application/msword',
  WordDocX:
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  WordTemplateX:
    'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
  Excel: 'application/vnd.ms-excel',
  ExcelTemplateX:
    'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
  PowerPoint: 'application/vnd.ms-powerpoint',
  PowerPointX:
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  PowerPointTemplateX:
    'application/vnd.openxmlformats-officedocument.presentationml.template',
  PowerPointSlideShowX:
    'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
  Png: 'image/png',
  Jpg: 'image/jpeg',
  Gif: 'image/gif',
  Bmp: 'image/bmp',
  Tiff: 'image/tiff',
  Json: 'application/json',
  Zip: 'application/zip',
  XZip: 'application/x-zip-compressed',
} as const;

const isPdf = (meta: ContentMetadata) =>
  !!(
    meta.MimeType == MimeTypes.Pdf ||
    (meta.Name && meta.Name.trim() && meta.Name.toLowerCase().endsWith('.pdf'))
  );

export { isPdf };
