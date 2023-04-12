import IBase from "./Base";

export default interface IProduct extends IBase {
  name: string;
  category: string;
  amount: number;
  unit: string;
  companyId: string;
}
