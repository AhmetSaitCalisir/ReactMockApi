import { Form, Input, Button } from "antd";
import { useEffect, useState } from "react";
import IAuthUser from "../models/AuthUser";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../stores/auth";

const Login = () => {
  const [user, setUser] = useState<IAuthUser>({ password: "", username: "" });
  const navigate = useNavigate();
  const authUser = useSelector((state: any) => state.auth.authUser);
  const dispatch = useDispatch<any>();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login(user));
  };

  const handleOnChange = ({ name, value }: { name: string; value: any }) => {
    setUser((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (authUser) navigate("/");

    return () => {};
  }, [authUser]);

  return (
    <div className="form-container">
      <Form className="form" onSubmitCapture={onSubmit}>
        <Form.Item
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            placeholder="Username"
            value={user.username}
            name="username"
            onChange={({ target }) => handleOnChange(target)}
          />
        </Form.Item>
        <Form.Item>
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={({ target }) => handleOnChange(target)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="form-button">
            Login
          </Button>
          Or <a href="/register">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
