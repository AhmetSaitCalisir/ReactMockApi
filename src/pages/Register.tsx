import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import IRegisterUser from "../models/RegisterUser";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../stores/auth";

const Register = () => {
  const [registerUser, setRegisterUser] = useState<IRegisterUser>({
    password: "",
    passwordMatch: "",
    username: "",
  });
  const navigate = useNavigate();
  const authUser = useSelector((state: any) => state.auth.authUser);
  const dispatch = useDispatch<any>();

  const handleOnChange = ({ name, value }: { name: string; value: any }) => {
    setRegisterUser((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(register(registerUser));
  };

  useEffect(() => {
    if (authUser) navigate("/");

    return () => {};
  }, [authUser]);

  return (
    <div className="form-container">
      <Form className="form" onSubmitCapture={onSubmit}>
        <Form.Item
          label="Username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            placeholder="Specify your username."
            value={registerUser.username}
            name="username"
            onChange={({ target }) => handleOnChange(target)}
          />
        </Form.Item>
        <Form.Item label="Password">
          <Input
            type="password"
            placeholder="Set your password"
            name="password"
            value={registerUser.password}
            onChange={({ target }) => handleOnChange(target)}
          />
        </Form.Item>
        <Form.Item label="Password">
          <Input
            type="password"
            placeholder="Re-enter the password"
            name="passwordMatch"
            value={registerUser.passwordMatch}
            onChange={({ target }) => handleOnChange(target)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="form-button">
            Register
          </Button>
          Already have an account? <a href="/login">Login</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
