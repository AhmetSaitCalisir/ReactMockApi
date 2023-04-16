import CurrencyList from "currency-list";

export const extensionMethods = { getCurencyDropdown };

function getCurencyDropdown() {
  const curencyList = CurrencyList.getAll("en_US");
  const currencyArray = Object.entries(curencyList);
  const currencyDatas = currencyArray.map((currency) => currency[1]);
  const dropdown = currencyDatas.map((currency) => {
    return { value: currency.symbol_native, label: currency.name };
  });
  return dropdown;
}
