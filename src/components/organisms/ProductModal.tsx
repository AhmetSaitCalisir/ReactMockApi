import React, { useEffect, useMemo, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import IProduct from "../../models/Product";
import { productService } from "../../services/product.service";
import { companyService } from "../../services/company.service";
import { extensionMethods } from "../../helpers/extensionMethods";

type IProps = {
  show: boolean;
  onHide: () => void;
  onSave: () => void;
  onCancel: () => void;
  id: string | undefined | null;
};

const ProductModal = (props: IProps) => {
  const [product, setProduct] = useState<IProduct>({
    amount: 0,
    category: "",
    companyId: "",
    name: "",
    unit: "",
  });

  const [companyOptions, setCompanyOptions] = useState<
    {
      label: string;
      value: string | undefined;
    }[]
  >([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    if (props.id) productService.update(product).then(() => props.onSave());
    else productService.create(product).then(() => props.onSave());
  };

  const handleOnChange = ({ name, value }: { name: string; value: any }) => {
    setProduct((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  useEffect(() => {
    companyService.getAsDropdown().then((data) => setCompanyOptions(data));

    if (!props.show)
      setProduct({
        amount: 0,
        category: "",
        companyId: "",
        name: "",
        unit: "₺",
      });

    if (props.show && props.id)
      productService.get(props.id).then((data) => setProduct(data));

    return () => {};
  }, [props.show]);

  const currencyOptions = useMemo(
    () => extensionMethods.getCurencyDropdown(),
    []
  );

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {props.id ? "Edit Product" : "Create Product"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Please Enter the Product Name"
              value={product.name}
              name="name"
              onChange={({ target }) => handleOnChange(target)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Product Name is required!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Product Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Please Enter the Product Category"
              value={product.category}
              name="category"
              onChange={({ target }) => handleOnChange(target)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Product Category is required!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="company">
            <Form.Label>Company</Form.Label>
            <Form.Select
              aria-label="Company"
              onChange={({ target }) => handleOnChange(target)}
              value={product.companyId}
              name="companyId"
              required
            >
              {companyOptions.map((company) => (
                <option key={company.value} value={company.value}>
                  {company.label}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Product Company is required!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Amount</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                value={product.amount}
                name="amount"
                onChange={({ target }) => handleOnChange(target)}
                required
              />
              <Form.Select
                aria-label="Unit"
                onChange={({ target }) => handleOnChange(target)}
                value={product.unit}
                name="unit"
                required
              >
                {currencyOptions.map((currency, index) => (
                  <option key={index} value={currency.value}>
                    {currency.label}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" type="button" onClick={props.onCancel}>
              Close
            </Button>
            <Button variant={props.id ? "success" : "primary"} type="submit">
              {props.id ? "Save Changes" : "Create"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;
