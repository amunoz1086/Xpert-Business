import { useState } from 'react';


export const useForm = ( initialForm = {}, nombreCampoId = false,functionActualizarContext=()=>{} ) => {

    const [ formState, setFormState ] = useState( initialForm );

    const onInputChange = ({ target }) => {

        let { name, value,id } = target;
        const nombreCampo = nombreCampoId && (id).split('.')[1]
        name = nombreCampoId ? nombreCampo : name

        setFormState({
            ...formState,
            [ name ]: value
        });


       functionActualizarContext(formState)


    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        setFormState
    }
}