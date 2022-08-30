import {
    StyledTextInput,
    StyledFormArea,
    StyledFormButton,
    StyledLabel,
    Avatar,
    StyledTitle,
    colors,
    ButtonGroup,
    ExtraText,
    TextLink,
    CopyrightText,
    StyledContainer
} from './../componants/Styles'

import Logo from './../assets/notif.png';

import { Formik, Form } from 'formik';
import { TextInput } from '../componants/FormLib';
import * as Yup from 'yup';
import { FiMail, FiLock } from 'react-icons/fi';
import { ThreeDots } from 'react-loader-spinner';
import { useState } from 'react';
import Axios from 'axios';

import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
    const [gmailReg, setGmail] = useState("");
    const [passwordReg, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const [fulNameReg, setfulNameReg] = useState("");

    const Connexion = () => {
        console.log();
        Axios.post("http://localhost:3001/Connexion", {
            gmail: gmailReg,
            password: passwordReg,



        }).then((response) => {
            console.log(response);
            if (response.data.message) {
                setLoginStatus(response.data.message)
            } else {
                navigate("/acceuil");
                //setLoginStatus(response.data[0].gemail);
            }
        });


    }

    return (
        <StyledContainer>
            <div>

                <StyledFormArea>
                    <Avatar image={Logo}></Avatar>
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        validationSchema={Yup.object({
                            email: Yup.string()
                                .email("Invalid email address")
                                .required("Required"),
                            password: Yup.string()
                                .min(8, "Password is too short")
                                .max(30, "Password is too long")
                                .required("Required"),
                        })}
                        onSubmit={(values) => {
                            console.log(values);

                        }}

                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <TextInput
                                    name="setGmail"
                                    type="text"
                                    label="Email Address"
                                    placeholder="....@gmail.com"
                                    icon={<FiMail />}
                                    onChange={(e) => {
                                        setGmail(e.target.value);
                                    }}
                                />
                                <TextInput
                                    name="setPassword"
                                    type="password"
                                    label="Password"
                                    placeholder="**********"
                                    icon={<FiLock />}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}

                                />
                                {/* <StyledTitle size={15}
                                color={colors.red}>
                                {loginStatus}
                            </StyledTitle> */}
                                {loginStatus && <StyledTitle size={15}
                                    color={colors.red}>
                                    {loginStatus}
                                </StyledTitle>}

                                <ButtonGroup>
                                    {!isSubmitting && (
                                        <StyledFormButton type="submit" onClick={Connexion} to="/acceuil">
                                            Connexion
                                        </StyledFormButton>)}
                                    {isSubmitting && (
                                        <ThreeDots
                                            color="CEE5D0"
                                            height={40}
                                            width={50}
                                        />

                                    )}
                                </ButtonGroup>
                            </Form>
                        )

                        }
                    </Formik>
                    <ExtraText>
                        New here ? <TextLink to="/signup" > Sing up</TextLink>
                    </ExtraText>
                </StyledFormArea>
                <CopyrightText>
                    All rights reserved &copy;2022
                </CopyrightText>
            </div>
        </StyledContainer>
    )
}

export default Login;