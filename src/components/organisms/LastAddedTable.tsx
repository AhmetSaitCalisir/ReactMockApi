import { Table } from "react-bootstrap";
import ICompany from "../../models/Company";

type IProps = {
  lastAddedCompanies: ICompany[];
};

const LastAddedTable = (props: IProps) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Company Name</th>
          <th>Created Date</th>
        </tr>
      </thead>
      <tbody>
        {props.lastAddedCompanies.map((company, index) => (
          <tr key={company.id}>
            <td>{index + 1}</td>
            <td>{company.name}</td>
            <td>
              {company.createdDate &&
                new Date(company.createdDate).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default LastAddedTable;
