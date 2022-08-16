import React,{useState} from 'react'
import { TextField } from '@mui/material'
import { ErrorMessage, Field } from 'formik'


const Textfield = ({name,label,type,width,method,accept}) => {

const [val,setVal] =useState(undefined)

    return (
        <div>
            {
                method == undefined &&
                <Field
                name={name}
                error={false}
                as={TextField}
                label={label}
                type={type}
                style={{margin:8 , width:width ,border:"none"}}
                variant="standard"
                margin="normal"
                required
                helperText={<ErrorMessage  name={name} render={msg => (<div style={{color:'red'}} >{msg}</div>)} />}
            />
}
{
    method != undefined &&
    <Field
    name={name}
    error={false}
    as={TextField}
    label={label}
    type={type}
    style={{margin:8 , width:width}}
    variant="outlined"
    margin="normal"
    required
    value={val}
    accept={accept && accept}
    onChange={(e)=>{
    if((method!==null || method !== undefined) && type !='file'){
        method(e.target.value);
        setVal(e.target.value)
    }
    else{
        method(e.target.files[0]);
        setVal(e.target.files[0])
        // console.log(e.target.files[0])
    }
    }
    }
    helperText={<ErrorMessage  name={name} render={msg => (<div style={{color:'red'}} >{msg}</div>)} />}
/>
}

        </div>
    )
}

export default Textfield
