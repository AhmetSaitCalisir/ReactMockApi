import { useEffect, useMemo, useState } from "react";
import ICompany from "../models/Company";
import { companyService } from "../services/company.service";
import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_Row,
} from "material-react-table";
import TableButtons from "../components/molecules/TableButtons";
import { Button } from "react-bootstrap";

const Company = () => {
  const [companies, setCompanies] = useState<ICompany[]>([]);

  useEffect(() => {
    companyService.getAll().then((data) => setCompanies(data));

    return () => {};
  }, []);

  const columns = useMemo<MRT_ColumnDef<ICompany>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Company Name",
      },
      {
        accessorKey: "incorporationCountry",
        header: "Country",
      },
      {
        accessorKey: "legalNumber",
        header: "Legal Number",
      },
      {
        accessorKey: "website",
        header: "Web Site",
      },
    ],
    []
  );

  return (
    <div>
      <MaterialReactTable
        autoResetPageIndex={false}
        columns={columns}
        data={companies}
        enableRowActions
        positionActionsColumn="last"
        renderRowActions={({ row }) => (
          <TableButtons
            deleteOnClick={() => console.log(row.original.id)}
            editOnClick={() => console.log(row.original.id)}
          />
        )}
        renderTopToolbarCustomActions={() => (
          <Button type="button" variant="outline-success center">
            Add Company
          </Button>
        )}
      />
    </div>
  );
};

export default Company;
