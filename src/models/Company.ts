import IBase from "./Base";

export default interface ICompany extends IBase {
  name: string;
  incorporationCountry: string;
  legalNumber: number;
  website: string;
}
