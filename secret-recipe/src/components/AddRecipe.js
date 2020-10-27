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
  FormText
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
  qty_amount: '',
  qty_type: '',
};




const EditRecipe = () => {
  const { id } = useParams();
  const history = useHistory();
  const [recipe, setRecipe] = useState(initialState);

  useEffect(() => {
    axiosWithAuth()
      .get(`/api/recipes/user/:user_${id}`)
      .then((res) => {
        console.log('edit recipe', res);
        //setRecipe(res.data);
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
    e.preventDefault();
    axiosWithAuth()
      .post(`/api/recipes/user/:user_${id}`, recipe)
      .then((res) => {
        console.log("this is affirmative",res.data);
        setRecipe(res.data);
        history.push(`/api/recipes/:user_${id}`);
      })
      .catch((err) => {
        console.log("I cannea give her anymore",err);
      });
  };

  const cancel = (e) => {
    e.preventDefault();
    history.push(`/api/recipes/user/user:${id}`);
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
              <Label for='ingredients'>Ingredients</Label>
              <Input
          
             type='select'
             name='ingredients'
             id='ingredients'
             onChange={handleChange}
             value={recipe.ingredients}>
             <option>Add ingredient</option>
             <option>Onion</option>
             <option>Tomato</option>
             <option>Garlic</option>
             <option>Pasta</option>
             <option>Carrot</option>
             <option>Beef</option>
             <option>Chicken</option>
             <option>Flour</option>
             </Input>
            </FormGroup>
            <FormGroup>
              <Label for='qty_amount'>Quantity</Label>
              <Input
             type='select'
             name='qty_amount'
             id='qty_amount'
             onChange={handleChange}
             value={recipe.qty_amount}>
             <option>How Many?</option>
             <option>1</option>
             <option>2</option>
             <option>3</option>
             <option>4</option>
             <option>5</option>
             <option>6</option>
             <option>7</option>
             <option>8</option>
             <option>9</option>
             <option>10</option>
             </Input>
            </FormGroup>
            <FormGroup>
              <Label for='qty_type'>Quantity</Label>
              <Input
             type='select'
             name='qty_type'
             id='qty_type'
             onChange={handleChange}
             value={recipe.qty_type}>
             <option>Type of Measurement</option>
             <option>Tablespoon</option>
             <option>Teaspoon</option>
             <option>Clove</option>
             <option>Cup</option>
             <option>Ounce</option>
             <option>Gram</option>
             </Input>
            </FormGroup>
            <FormGroup>
              <Label for='instructions'>Instructions</Label>
              <Input
                type='textarea'
                name='instructions'
                id='instructions'
                placeholder='Instructions...'
                onChange={handleChange}
                value={recipe.instructions}
              />
            </FormGroup>
            <FormGroup>
              <Label for='servings'>servings</Label>
              <Input
                type='number'
                name='servings'
                id='servings'
                placeholder='How many servings'
                onChange={handleChange}
                value={recipe.servings}
              />
              </FormGroup>
              <FormGroup>
              <Label for='prep_time'>Prep Time</Label>
              <Input
                type='textarea'
                name='prep_time'
                id='prep_time'
                placeholder='Prep time'
                onChange={handleChange}
                value={recipe.prep_time}
              />
              </FormGroup>
              <FormGroup>
              <Label for='cook_time'> Time</Label>
              <Input
                type='textarea'
                name='cook_time'
                id='cook_time'
                placeholder='Cooking time'
                onChange={handleChange}
                value={recipe.cook_time}
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

export default EditRecipe;