import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import {
  Container,
  Row,
  Col,
  Button,
  Form as ReactForm,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { useParams, useHistory } from 'react-router-dom';

const Form = styled(ReactForm)`
  width: 100%;
`;

const initialState = {
  title: '',
  source: '',
  ingredients: '',
  instructions: '',
  category: '',
};

const EditRecipe = () => {
  const { id } = useParams();
  const history = useHistory();
  const [recipe, setRecipe] = useState(initialState);

  useEffect(() => {
    axiosWithAuth()
      .get(`/api/recipes/${id}`)
      .then((res) => {
        console.log('edit recipe', res);
        setRecipe(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleChange = (e) => {
    e.persist();
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log('Adds recipe', recipe);
    e.preventDefault();
    axiosWithAuth()
      .put(`/api/recipes/${id}`, recipe)
      .then((res) => {
        console.log(res.data);
        setRecipe(res.data);
        history.push(`/api/recipes/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cancel = (e) => {
    e.preventDefault();
    history.push(`/api/recipes/${id}`);
  };

  return (
    <Container>
      <Row>
        <Col xs='12' md={{ size: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for='title'>Title</Label>
              <Input
                type='text'
                name='title'
                id='title'
                placeholder='Recipe Title'
                onChange={handleChange}
                value={recipe.title}
              />
            </FormGroup>
            <FormGroup>
              <Label for='source'>Source</Label>
              <Input
                type='text'
                name='source'
                id='source'
                placeholder='Recipe Origin'
                onChange={handleChange}
                value={recipe.source}
              />
            </FormGroup>
            <FormGroup>
              <Label for='category'>Category</Label>
              <Input
                type='select'
                name='category'
                id='category'
                onChange={handleChange}
                value={recipe.category}>
                <option>Add category</option>
                <option>Lunch</option>
                <option>Breakfast</option>
                <option>Dinner</option>
                <option>Cookies</option>
                <option>Dessert</option>
                <option>Bread</option>
                <option>Salad</option>
                <option>Soup</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for='sampleText'>Ingredients</Label>
              <Input
                type='textarea'
                name='ingredients'
                id='ingredients'
                placeholder='List of ingredients...'
                onChange={handleChange}
                value={recipe.ingredients}
              />
            </FormGroup>
            <FormGroup>
              <Label for='sampleText'>Instructions</Label>
              <Input
                type='textarea'
                name='instructions'
                id='instructions'
                placeholder='Instructions...'
                onChange={handleChange}
                value={recipe.instructions}
              />
            </FormGroup>
            <Button type='submit'>Save changes</Button>
            <Button onClick={cancel}>Cancel</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditRecipe