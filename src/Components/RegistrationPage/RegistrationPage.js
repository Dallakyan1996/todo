import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { apiObject } from '../../service/API';
import { Link } from 'react-router-dom';
import './registration-page.css';
import DatePicker from "react-datepicker";
import { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";

const RegistrationPage = () => {
    const [startDate, setStartDate] = useState(new Date());
    return <div className="loginForm">
        <div className="registrationFormContainer">
            <div className="registrationFormWrapper">
                <Formik
                    initialValues={{
                        email: "",
                        firstName: "",
                        lastName: "",
                        birthDay: "",
                        gender: "",
                        password: ""
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().required('Email e is required'),
                        firstName: Yup.string().required('Firstname is required'),
                        lastName: Yup.string().required('Lastname e is required'),
                        birthDay: Yup.string().required('Birthday is required'),
                        gender: Yup.string().required('Gender is required'),
                        password: Yup.string().required('Password e is required')
                    })}
                    onSubmit={({ email, firstName, lastName, birthDay, gender, password }, { setStatus, setSubmitting }) => {
                        setStatus();
                        apiObject.registration(email, firstName, lastName, birthDay, gender, password)
                            .then(
                                user => {
                                    console.log("okey")
                                    setSubmitting(false);
                                },
                                error => {
                                    setSubmitting(false);
                                    setStatus(error);
                                }
                            );
                    }}>
                    {({ errors, status, touched, isSubmitting }) => (
                        <Form>
                            <h3>Registration Page</h3>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="birthDay">Birth Day</label>
                                <Field name="birthDay" type="text" className={'form-control' + (errors.birthDay && touched.birthDay ? ' is-invalid' : '')} />
                                <ErrorMessage name="birthDay" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="gender">Gender</label>
                                <Field name="gender" type="text" className={'form-control' + (errors.gender && touched.gender ? ' is-invalid' : '')} />
                                <ErrorMessage name="gender" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn" disabled={isSubmitting}>Submmit</button>
                                {isSubmitting &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                            </div>
                            <span className="registrationPage"><Link to="login">Login Page</Link></span>
                            {status &&
                                <div className={'alert alert-danger'}>{status}</div>
                            }
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    </div>
}

export default RegistrationPage;