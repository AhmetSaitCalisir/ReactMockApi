import { useEffect, useMemo, useState } from "react";
import ICompany from "../models/Company";
import { companyService } from "../services/company.service";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import TableButtons from "../components/molecules/TableButtons";
import { Button } from "react-bootstrap";
import CompanyModal from "../components/organisms/CompanyModal";

const Company = () => {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [actionId, setActionId] = useState<string | undefined | null>(null);

  const fetchData = () => {
    companyService.getAll().then((data) => setCompanies(data));
  };

  useEffect(() => {
    fetchData();

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

  const handleModal = () => {
    setShowModal((previous) => !previous);
    setActionId(null);
  };

  const onSave = () => {
    setShowModal(false);
    fetchData();
  };

  const handleEditButton = (id?: string) => {
    setActionId(id);
    setShowModal(true);
  };

  const handleDelete = (id?: string) => {
    if (id) companyService.remove(id).then(fetchData);
  };

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
            deleteOnClick={() => handleDelete(row.original.id)}
            editOnClick={() => handleEditButton(row.original.id)}
          />
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            type="button"
            variant="outline-success center"
            onClick={handleModal}
          >
            Add Company
          </Button>
        )}
      />
      <CompanyModal
        onCancel={handleModal}
        onHide={handleModal}
        onSave={onSave}
        show={showModal}
        id={actionId}
      />
    </div>
  );
};

export default Company;
