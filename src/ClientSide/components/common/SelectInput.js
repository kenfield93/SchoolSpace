/**
 * Created by kyle on 10/17/17.
 */
import React from 'react';

const SelectInput = ({name, label, allowMultiSelect=false, onChange, windowSize=1, required=false, optionValues, error}) =>{
    let wrapperClass = 'form-group';
    if(error && error.length > 0){
        wrapperClass += " " + 'has-error';
    }

    return(
        <div className={wrapperClass}>
            {/*  <label htmlFor={name}>{label}</label> */ }
            <div className="field" >
                <select
                        name={name}
                        className="form-control"
                        required={required}
                        multiple={allowMultiSelect}
                        size={windowSize}
                        onChange={onChange}
                >
                    {optionValues.map((opt) => {
                        return(
                                <option key={opt.value} value={opt.value}>{opt.display}</option>
                        );
                    })}
                </select>
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
    );
};

export default SelectInput;