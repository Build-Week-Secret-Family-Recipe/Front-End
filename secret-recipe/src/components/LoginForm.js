import React, { useState, useEffect } from 'react';
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
import * as Yup from "yup"; 
import { Login } from '../store/actions';
import { AvForm, AvField } from 'availity-reactstrap-validation';

const Form = styled(ReactForm)`
  margin-top: 150px;
  width: 100%;
`;



const LoginForm = (props) => {
  const history = useHistory();
  const [formState, setFormState] = useState({
    email: "",
    password: ""
  });
  const [userInfo, setUserInfo] = useState(formState);

  
  // Yup Validation
  
  const formSchema = Yup.object().shape({
    email: Yup
      .string()
      .email("Must be a valid email address.")
      .required("Must include email address."),
    password: Yup
      .string()
      .required("Password is Required")
    });
  
    const [errors, setErrors] = useState({
      email: "",
      password: "",
    });
  
    const [buttonDisabled, setButtonDisabled] = useState(true)
  
    useEffect(() => {
      formSchema.isValid(formState).then(valid => {
        setButtonDisabled(!valid);
      });
    }, [formState]);
    const inputChange = e => {
      e.persist();
    
    Yup
        .reach(formSchema, e.target.name)
        .validate(e.target.value)
        .then(valid => {
          setErrors({
            ...errors,
            [e.target.name]: ""
          });
        })
        .catch(err => {
          setErrors({
            ...errors,
            [e.target.name]: err.errors[0]
          });
        });
  
      setFormState({
        ...formState,
        [e.target.name]: e.target.value
      });
    }
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
                  {...errors.email.length > 0 ? (<p className="error">{errors.email}</p>) : null}
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
                  {...errors.password.length > 6 ? (<p className="error">{errors.email}</p>) : null}
                />
              </FormGroup>
              <button>Log In</button>
              <h6 style={{ color: '#626262' }}>
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
