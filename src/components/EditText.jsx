import React, { useEffect, useState } from 'react';
import "../components/style/edit_text.css"

function EditText(props) {
    const [edit, setEdit] = useState(false)
    const [btnEditVisible, setbtnEditVisible] = useState(true)
    const [value, setValue]  = useState()

    useEffect(() => {
        
    }, [])

    useEffect(() => {
        setValue(props.value)
    }, [props.value])


    let clickSave = () => {
        let val = document.getElementById("edit-field").value
        console.log(val, props.pk);
        props.onSave(val, props.pk)
        setEdit(!edit)
        setValue(val)
    }

    if(!props.canEdit){
        return (
            <div className="d-flex w-100 justify-content-between p-1 editContainer">
                <div style={{fontSize: props.textSize}}>
                    {value}
                </div>
            </div>
        )
    }

    

    if(edit){
        return (
            <div className="d-flex w-100 justify-content-between p-1 editContainer">
                <div>
                    <input id="edit-field" type="text" className="form-control" defaultValue={value} />
                </div>
                <div>
                    <div className="btn btn-success" onClick={clickSave}><i class="bi bi-check2"></i></div>
                    <div className="btn btn-danger" onClick={() => setEdit(!edit)}><i class="bi bi-x"></i></div>
                </div>
            </div>
        )
    }
    else{
        return (
            <div className="d-flex w-100 justify-content-between p-1 editContainer">
                <div style={{fontSize: props.textSize}}>
                    {value}
                </div>
                <div>
                    <div className="btn btn-light" onClick={() => setEdit(!edit)}><i class="bi bi-pen"></i></div>
                </div>
            </div>
        );
    }

    
}

export default EditText;