import React from 'react';
import './myInput.style.css';
import { withFormsy } from 'formsy-react';

const myInput = (props) => {

    const errorMessage = props.errorMessage;

    const changeValue = (e) => {
        props.setValue(e.target.value)
    }

    return (
        <>
            <div className={"input-row"}>
                <label className="myinput-label">{props.label}{props.isRequired ? '*' : null}</label>
                <div className="ui input">
                    <input onChange={changeValue} type={props.type} placeholder={props.placeholder} value={props.value || ''} />
                </div>
                <span className="span-err-msg">{errorMessage}</span>
            </div>
        </>
    )
}

export default withFormsy(myInput);