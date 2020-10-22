import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const AddRecipe = (props) => {
  return (
    <Form>
      <FormGroup>
        <Label for="exampleEmail">Title</Label>
        <Input type="text" name="text" id="titleText" placeholder="Title" />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Source</Label>
        <Input type="text" name="source" id="source" placeholder="Who's the original chef?" />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Prep Time</Label>
        <Input type="text" name="prepTime" id="prepTime" placeholder="Prep Time" />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Cook Time</Label>
        <Input type="text" name="cookTime" id="cookTime" placeholder="Cook Time" />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Servings</Label>
        <Input type="text" name="servings" id="servings" placeholder="Servings" />
      </FormGroup>
      <FormGroup>
        <Label for="exampleSelect">Select</Label>
        <Input type="select" name="select" id="exampleSelect">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="exampleText">Step 1</Label>
        <Input type="textarea" name="step1" id="Step 1" />
      </FormGroup>
      <FormGroup>
        <Label for="exampleText">Step 2</Label>
        <Input type="textarea" name="step2" id="Step 2" />
      </FormGroup>
      <FormGroup>
        <Label for="exampleText">Step 3</Label>
        <Input type="textarea" name="step3" id="Step 3" />
      </FormGroup>
      <FormGroup>
        <Label for="exampleSelect">Amount</Label>
        <Input type="select" name="amount" id="amount">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="exampleSelect">Quantity Type</Label>
        <Input type="select" name="type" id="type">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="exampleSelect">Ingredient</Label>
        <Input type="select" name="ingredient" id="ingredient">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </FormGroup>


      <Button>Submit</Button>
    </Form>
  );
}

export default AddRecipe;