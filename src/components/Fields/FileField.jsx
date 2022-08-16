import React,{useState} from 'react'
import { TextField } from '@mui/material'
import { ErrorMessage, Field } from 'formik'


const Filefield = ({name,width}) => {

    return (
        <div>
                <Field
                name={name}
                error={false}
                as={TextField}
                type="file"
                accept="image/*"
                style={{margin:8 , width:width}}
                variant="outlined"
                margin="normal"
                required
                helperText={<ErrorMessage  name={name} render={msg => (<div style={{color:'red'}} >{msg}</div>)} />}
            />


        </div>
    )
}

export default Filefield
