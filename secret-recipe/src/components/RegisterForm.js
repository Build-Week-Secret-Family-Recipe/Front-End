import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const Registration = (props) => {
  return (
    <Form>
        <FormGroup>
        <Label for="exampleEmail">First Name</Label>
        <Input type="email" name="firstName" id="firstName" placeholder="John" />
      </FormGroup>
        <FormGroup>
        <Label for="exampleEmail">Last Name</Label>
        <Input type="email" name="lastName" id="lastName" placeholder="Doe" />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="email" id="exampleEmail" placeholder="Example: johnandjanedoe@gmail.com" />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input type="password" name="password" id="examplePassword" placeholder="" />
      </FormGroup>
      
      <Button>Submit</Button>
    </Form>
  );
}

export default Registration;