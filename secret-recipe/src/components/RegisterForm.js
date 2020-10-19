import React from 'react';
import { connect } from 'react-redux';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { Redirect, Link } from 'react-router-dom';
import { Formik, Form as FormikForm, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { Container, Row, Col } from 'reactstrap';
import { SpinnerDiv, Spinner } from './spinner';

import { Register, Login } from '../store/actions';

const FormContainer = styled.div`
  margin-top: 150px;
  width: 100%;
`;

const Input = styled(Field)`
  width: 100%;
  padding: 6px 10px;
  border: 1px solid #d5d5d5;
  border-radius: 20px;
  margin-bottom: 15px;
`;

const RegisterForm = (props) => {
  if (localStorage.getItem('token')) {
    return <Redirect to='/recipes' />;
  } else {
    return (
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string()
            .min(2, 'Username requires at least 2 characters')
            .max(30, 'Username cannot be more than 30 characters')
            .required('You need a username'),
          password: Yup.string()
            .min(5, 'Password needs to be at least 5 characters')
            .required('Password is required'),
        })}
        onSubmit={(values) => {
          console.log(values);
          axiosWithAuth()
            .post('/auth/register', values)
            .then((res) => {
              console.log(res);
              props.login(values);
            })
            .catch((err) => {
              console.log(err);
            });
        }}>
        {(props) => (
          <Container>
            <Row>
              <Col xs='12' md={{ size: 6, offset: 3 }}>
                <FormContainer>
                  <FormikForm style={{ width: '100%' }}>
                    {props.touched.username && props.errors.username && (
                      <p>{props.errors.username}</p>
                    )}
                    <label htmlFor='username'>Username</label>
                    <Input
                      type='text'
                      name='username'
                      id='username'
                      placeholder='Username'
                    />
                    {props.touched.password && props.errors.password && (
                      <p>{props.errors.password}</p>
                    )}
                    <label htmlFor='password'>Password</label>
                    <Input
                      type='password'
                      name='password'
                      id='password'
                      placeholder='Password'
                    />
                    <button type='submit'>Register</button>
                    <h6>
                      Already have an account?
                      <Link to='/loginForm'> Login</Link>{' '}
                    </h6>
                  </FormikForm>
                </FormContainer>
                {props.isFetching && (
                  <SpinnerDiv>
                    <Spinner color='danger' />
                  </SpinnerDiv>
                )}
              </Col>
            </Row>
          </Container>
        )}
      </Formik>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.isFetching,
    error: state.error,
  };
};

export default connect(mapStateToProps, { Register, Login })(RegisterForm);
