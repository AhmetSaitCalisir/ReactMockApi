import React, { useEffect, useMemo, useState } from "react";
import { productService } from "../services/product.service";
import IProduct from "../models/Product";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import TableButtons from "../components/molecules/TableButtons";
import { Button } from "react-bootstrap";
import ProductModal from "../components/organisms/ProductModal";

const Product = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [actionId, setActionId] = useState<string | undefined | null>(null);

  const fetchData = () => {
    productService.getAll().then((data) => setProducts(data));
  };

  useEffect(() => {
    fetchData();

    return () => {};
  }, []);

  const columns = useMemo<MRT_ColumnDef<IProduct>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Product Name",
      },
      {
        accessorKey: "category",
        header: "Category",
      },
      {
        accessorKey: "amount",
        header: "Amount",
      },
      {
        accessorKey: "unit",
        header: "Currency",
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
    console.log(id);
  };

  const handleDelete = (id?: string) => {
    if (id) productService.remove(id).then(fetchData);
  };

  return (
    <div>
      <MaterialReactTable
        autoResetPageIndex={false}
        columns={columns}
        data={products}
        enableRowActions
        positionActionsColumn="last"
        renderRowActions={({ row }) => (
          <TableButtons
            deleteOnClick={() => console.log(row.original.id)}
            editOnClick={() => handleEditButton(row.original.id)}
          />
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            type="button"
            variant="outline-success center"
            onClick={() => handleModal()}
          >
            Add Product
          </Button>
        )}
      />
      <ProductModal
        onCancel={handleModal}
        onHide={handleModal}
        onSave={onSave}
        show={showModal}
        id={actionId}
      />
    </div>
  );
};

export default Product;
