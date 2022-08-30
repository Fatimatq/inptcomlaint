import React, { useState } from "react";
import { colors, StyledFormArea, StyledTitle, ButtonGroup, StyledFormButton } from "../componants/Styles";
import { Formik, Form } from 'formik';
import './reclamations.css'

import Axios from 'axios';


const Reclamation = () => {
    const [name, setName] = useState('');
    const [pavNumber, setPavNumber] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [problem, setProblem] = useState('');

    const Envoyer = () => {
        console.log();
        Axios.post("http://localhost:3001/Envoyer", {
            name: name,
            pavNumber: pavNumber,
            roomNumber: roomNumber,
            problem: problem,

        })
    }
    return (
        <div className="complaint-div" >
            <div className="img-div">
                <img src='./../assets/maintenance.png' alt="prblm" />
            </div>
            <div className="contact">
                <div className="title">
                    <StyledTitle size={20} color="#277BC0"> Faire votre réclamations ici </StyledTitle>
                </div>
                <div className="form-div">
                    <form>
                        <input
                            name="setName"
                            type="text"
                            placeholder="Votre Nom Complet?"
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        <select name="setPavNumber" placeholder="Votre Pavillon ?" value={pavNumber} onChange={(e) => setPavNumber(e.target.value)}>
                            <option value="Pavillon 1">Pavillon 1</option>
                            <option value="Pavillon 2">Pavillon 2</option>
                            <option value="Pavillon 3">Pavillon 3</option>
                        </select>
                        <input
                            name="setRoomNumber"
                            type="number"
                            placeholder="Le nombre de la chambre ?"
                            onChange={(e) => {
                                setRoomNumber(e.target.value);
                            }}
                        />
                        <textarea name="setProblem" placeholder="Quelle- est votre probleme...?"
                            onChange={(e) => {
                                setProblem(e.target.value);
                            }}
                        ></textarea>
                        <ButtonGroup>
                            <StyledFormButton color="#277BC0" type="submit" onClick={Envoyer} >
                                Envoyer
                            </StyledFormButton>


                        </ButtonGroup>

                    </form>
                </div>
            </div>


        </div >
    );
}

export default Reclamation;
