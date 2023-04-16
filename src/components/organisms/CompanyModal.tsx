import React, { useEffect, useMemo, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import ICompany from "../../models/Company";
import countryList from "react-select-country-list";
import { companyService } from "../../services/company.service";

type IProps = {
  show: boolean;
  onHide: () => void;
  onSave: () => void;
  onCancel: () => void;
  id: string | undefined | null;
};

const CompanyModal = (props: IProps) => {
  const [company, setCompany] = useState<ICompany>({
    incorporationCountry: "Turkey",
    legalNumber: 0,
    name: "",
    website: "",
  });

  const countries = useMemo(() => countryList().getData(), []);

  const handleOnChange = ({ name, value }: { name: string; value: any }) => {
    setCompany((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!props.show)
      setCompany({
        incorporationCountry: "Turkey",
        legalNumber: 0,
        name: "",
        website: "",
      });

    if (props.show && props.id)
      companyService.get(props.id).then((data) => setCompany(data));

    return () => {};
  }, [props.show]);

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    if (props.id) companyService.update(company).then(() => props.onSave());
    else companyService.create(company).then(() => props.onSave());
    setValidated(true);
  };

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {props.id ? "Edit Company" : "Create Company"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Please Enter the Company Name"
              value={company.name}
              name="name"
              onChange={({ target }) => handleOnChange(target)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Company Name is required!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="incorporationCountry">
            <Form.Label>Incorporation Contry</Form.Label>
            <Form.Select
              aria-label="Incorporation Contry"
              onChange={({ target }) => handleOnChange(target)}
              value={company.incorporationCountry}
              name="incorporationCountry"
              required
            >
              {countries.map((country) => (
                <option key={country.value} value={country.label}>
                  {country.label}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Incorporation Contry is required!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Legal Number</Form.Label>
            <Form.Control
              type="number"
              value={company.legalNumber}
              name="legalNumber"
              onChange={({ target }) => handleOnChange(target)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Legal Number is required!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Company Website</Form.Label>
            <Form.Control
              type="text"
              placeholder="Please Enter the Company Website"
              value={company.website}
              name="website"
              onChange={({ target }) => handleOnChange(target)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Company Website is required!
            </Form.Control.Feedback>
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" type="button" onClick={props.onCancel}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CompanyModal;
