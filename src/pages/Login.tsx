import { Form, Input, Button } from "antd";
import { useState } from "react";
import IAuthUser from "../models/AuthUser";
import { authService } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState<IAuthUser>({ password: "", username: "" });
  const navigate = useNavigate();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    authService
      .login(user)
      .then(() => {
        navigate("/");
      })
      .catch(() => console.log("Hata mesajı"));
  };

  const handleOnChange = ({ name, value }: { name: string; value: any }) => {
    setUser((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

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
