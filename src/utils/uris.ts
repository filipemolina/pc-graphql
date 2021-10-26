import { CountryCode } from '@src/types';

const attachmentsBaseUri = 'https://click.pc.localtest.me/attachment';

const getContentUri = (countryCode: CountryCode, id: string) =>
  `${attachmentsBaseUri}/${countryCode}/${id}/content`;

const getThumbnailUri = (countryCode: CountryCode, id: string) =>
  `${attachmentsBaseUri}/${countryCode}/${id}/thumbnail`;

const getPrintUri = (countryCode: CountryCode, id: string) =>
  `${attachmentsBaseUri}/${countryCode}/${id}/print`;

const getDownloadUri = (countryCode: CountryCode, id: string) =>
  `${attachmentsBaseUri}/${countryCode}/${id}/download`;

export { getContentUri, getThumbnailUri, getPrintUri, getDownloadUri };
