import { Button } from "react-bootstrap";
import { BiEdit, BiTrash } from "react-icons/bi";

type IProps = {
  editOnClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  deleteOnClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const TableButtons = (props: IProps) => {
  return (
    <div className="d-flex justify-content-between align-self-center">
      <Button
        type="button"
        variant="outline-warning center"
        onClick={props.editOnClick}
      >
        <BiEdit />
      </Button>

      <Button
        type="button"
        variant="outline-danger center"
        onClick={props.deleteOnClick}
      >
        <BiTrash />
      </Button>
    </div>
  );
};

export default TableButtons;
