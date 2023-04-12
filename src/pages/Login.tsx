import { Form, Input, Button, Checkbox } from "antd";

const Login = () => {
  return (
    <div className="form-container">
      <Form className="form">
        <Form.Item>
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item>
          <Input type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
