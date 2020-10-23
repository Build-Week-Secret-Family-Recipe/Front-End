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
          name: '',
          email: '',
          role: '',
          password: '',
        }}
        //yup validation
        formSchema = {Yup.object().shape({
            name: Yup.string().required("Please enter your full name!"),
            email: Yup.string().email().required("Please enter an email!"),
            role: Yup.string().required("Please enter a role!"),
            password: Yup.string()
                .min(5, 'Password needs to be at least 5 characters')
                .required('Password is required'),
        })}
        onSubmit={(values) => {
          console.log(values);
          axiosWithAuth()
            .post('/api/auth/register', values)
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
                    {props.touched.name && props.errors.name && (
                      <p>{props.errors.name}</p>
                    )}
                    <label htmlFor='name'>Name</label>
                    <Input
                      type='text'
                      name='name'
                      id='name'
                      placeholder='Name'
                    />
                    {props.touched.email && props.errors.email && (
                      <p>{props.errors.email}</p>
                    )}
                    <label htmlFor='email'>Email</label>
                    <Input
                      type='text'
                      name='email'
                      id='email'
                      placeholder='Email'
                    />
                    {props.touched.role && props.errors.role && (
                      <p>{props.errors.role}</p>
                    )}          
                    <label htmlFor='role'>User Role</label>
                    <Input
                      type='text'
                      name='role'
                      id='role'
                      placeholder='User Role'
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
                    <h6 style={{ color: '#626262' }}>
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
