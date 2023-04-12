import React, { useEffect, useMemo, useState } from "react";
import { productService } from "../services/product.service";
import IProduct from "../models/Product";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import TableButtons from "../components/molecules/TableButtons";
import { Button } from "react-bootstrap";

const Product = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    productService.getAll().then((data) => setProducts(data));

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
            editOnClick={() => console.log(row.original.id)}
          />
        )}
        renderTopToolbarCustomActions={() => (
          <Button type="button" variant="outline-success center">
            Add Product
          </Button>
        )}
      />
    </div>
  );
};

export default Product;
