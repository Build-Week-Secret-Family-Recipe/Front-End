import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  Container,
  Row,
  Col,
  Form as ReactForm,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { SpinnerDiv, Spinner } from '../components/spinner';

import { Login } from '../store/actions';

const Form = styled(ReactForm)`
  margin-top: 150px;
  width: 100%;
`;

const initialState = {
  email: '',
  password: '',
};

const LoginForm = (props) => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState(initialState);

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  // POST request through Redux
  const handleSubmit = (e) => {
    e.preventDefault();
    props.Login(userInfo);
    history.push('/api/auth/login');
  };

  if (localStorage.getItem('token')) {
    return <Redirect to='/recipes' />;
  } else {
    return (
      <Container>
        <Row>
          <Col xs='10' md={{ size: 5, offset: 3 }}>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for='email'>Email</Label>
                <Input style={{ borderRadius: '20px' }}
                  type='text'
                  name='email'
                  id='email'
                  placeholder='Email'
                  value={userInfo.email}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for='password'>Password</Label>
                <Input style={{ borderRadius: '20px' }}
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Password'
                  value={userInfo.password}
                  onChange={handleChange}
                />
              </FormGroup>
              <button>Log In</button>
              <h6 style={{ color: 'darkBlue' }}>
                Don't have an account?
                <Link to='/registration'> Register Here </Link>{' '}
              </h6>
            </Form>
            {props.isFetching && (
              <SpinnerDiv>
                <Spinner color='danger' />
              </SpinnerDiv>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.isFetching,
    error: state.error,
  };
};

export default connect(mapStateToProps, { Login })(LoginForm);
