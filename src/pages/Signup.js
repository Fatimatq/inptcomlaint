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
import Axios from 'axios';

import Logo from './../assets/notif.png';

import { Formik, Form } from 'formik';
import { TextInput } from '../componants/FormLib';
import * as Yup from 'yup';
import { FiMail, FiLock, FiUser, FiCalendar } from 'react-icons/fi';
import { ThreeDots } from 'react-loader-spinner';
import { useState } from 'react';


const Signup = () => {
    const [fulNameReg, setfulNameReg] = useState("");
    const [gmailReg, setgmailReg] = useState("");
    const [passwordReg, setpasswordReg] = useState("");
    const [dateOfBirthReg, setdateOfBirthReg] = useState("");

    const Sinscrire = () => {
        console.log();
        Axios.post("http://localhost:3001/Sinscrire", {
            fullName: fulNameReg,
            gmail: gmailReg,
            dateOfBirthday: dateOfBirthReg,
            password: passwordReg,


        }).then((response) => {
            console.log(response);
        })

    }
    return (
        <StyledContainer>
            <div>
                <StyledFormArea>

                    <Avatar image={Logo}></Avatar>
                    {/* <StyledTitle size={30}
                    color={colors.theme}>
                    Member Signup
                </StyledTitle> */}
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                            repeatPassword: "",
                            dateOfBirth: "",
                            name: "",
                        }}
                        validationSchema={Yup.object({
                            email: Yup.string()
                                .email("Invalid email address")
                                .required("Required"),
                            password: Yup.string()
                                .min(8, "Password is too short")
                                .max(30, "Password is too long")
                                .required("Required"),
                            name: Yup.string().required("Required"),
                            dateOfBirth: Yup.date().required("Required"),
                            repeatPassword: Yup.string().required("Required").oneOf([Yup.ref("password")], "Passwords must match"),

                        })}
                        onSubmit={(values) => {
                            console.log(values);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <TextInput
                                    name="setfulNameReg"
                                    type="text"
                                    label="Nom Complet"
                                    placeholder="Entre Votre Nom"
                                    icon={<FiUser />}
                                    onChange={(e) => {
                                        setfulNameReg(e.target.value);
                                    }}
                                />


                                <TextInput
                                    name="setgmailReg"
                                    type="text"
                                    label="Email Address"
                                    placeholder="Exemple@gmail.com"
                                    icon={<FiMail />}
                                    onChange={(e) => {
                                        setgmailReg(e.target.value);
                                    }}
                                />

                                <TextInput
                                    name="setdateOfBirthReg"
                                    type="date"
                                    label="Date of Birthday"
                                    icon={<FiCalendar />}
                                    onChange={(e) => {
                                        setdateOfBirthReg(e.target.value);
                                    }}
                                />

                                <TextInput
                                    name="setpasswordReg"
                                    type="password"
                                    label="Password"
                                    placeholder="**********"
                                    icon={<FiLock />}
                                    onChange={(e) => {
                                        setpasswordReg(e.target.value);
                                    }}

                                />

                                <TextInput
                                    name="repeatPassword"
                                    type="password"
                                    label="Repeat Password"
                                    placeholder="**********"
                                    icon={<FiLock />}

                                />

                                <ButtonGroup>
                                    {!isSubmitting && (
                                        <StyledFormButton onClick={Sinscrire} type="submit">
                                            S'inscrire
                                        </StyledFormButton>)}
                                    {isSubmitting && (
                                        <ThreeDots
                                            color={colors.theme}
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
                        Already have an account ? <TextLink to="/login"> Login</TextLink>
                    </ExtraText>
                </StyledFormArea>
                <CopyrightText>
                    All rights reserved &copy;2022
                </CopyrightText>
            </div >
        </StyledContainer >
    );
}

export default Signup;