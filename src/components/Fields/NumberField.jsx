import React from 'react'
import { TextField } from '@mui/material'
import { ErrorMessage, Field } from 'formik'


const NumberField = ({name,label,type}) => {
    return (
        <div>
            <Field
                name={name}
                as={TextField}
                label={label}
                type={type}
                style={{margin:8 , width:'80%' }}
                variant="contained"
                margin="normal"
                required
                helperText={<ErrorMessage  name={name} render={msg => (<div style={{color:'red'}} >{msg}</div>)} />}
            />
        </div>
    )
}

export default NumberField
