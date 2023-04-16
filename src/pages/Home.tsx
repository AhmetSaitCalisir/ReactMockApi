import { useEffect, useState } from "react";
import { companyService } from "../services/company.service";
import ICompany from "../models/Company";
import { Table } from "react-bootstrap";
import LastAddedTable from "../components/organisms/LastAddedTable";
import { Card, Statistic } from "antd";
import { productService } from "../services/product.service";
import CustomKpi from "../components/organisms/CustomKpi";

const Home = () => {
  const [lastAddedCompanies, setLastAddedCompanies] = useState<ICompany[]>([]);
  const [companyQuantity, setCompanyQuantity] = useState<number>(0);
  const [productQuantity, setProductQuantity] = useState<number>(0);

  useEffect(() => {
    Promise.all([
      companyService.getLastAddedCompanies(),
      companyService.getCompanyQuantity(),
      productService.getProductQuantity(),
    ]).then(([lastCompannies, companyAmount, productAmount]) => {
      setLastAddedCompanies(lastCompannies);
      setCompanyQuantity(companyAmount);
      setProductQuantity(productAmount);
    });

    return () => {};
  }, []);

  return (
    <>
      <LastAddedTable lastAddedCompanies={lastAddedCompanies} />
      <div className="row">
        <CustomKpi title="Company Quanty" value={companyQuantity} />
        <CustomKpi title="Product Quanty" value={productQuantity} />
      </div>
    </>
  );
};

export default Home;
