import React from 'react';
import { Button, Form, FormGroup, Label, Input,} from 'reactstrap';

const Login = (props) => {
  return (
    <Form>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="email" id="Email" placeholder="Example: johnandjanedoe@gmail.com" />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input type="password" name="password" id="Password" placeholder="" />
      </FormGroup>
      
      <Button>Submit</Button>

      <p>Don't have an account? <br/>Create one<Button color="link">here.</Button></p>
    </Form>
  );
}

export default Login;