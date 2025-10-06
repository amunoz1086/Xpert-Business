# Los Componente `Campos imput,select,fecha,correo,numero,numeroDecimal` - Guía para desarrolladores

Todos los componentes que incian con la palabra Campo que estan ubicador en /components/share. permiten capturar informacion que debe digitar el usuario. para el correcto funcionamiento seguir los pasos sugeridos.

siguientes instrucciones:

ejemplo para el componente CampoCorreo.jsx

## Props

El componente `CampoCorreo.jsx` acepta los siguientes props:

### 1. ``valorInput`` ('String')
### 2. ``placeholder`` ('String')  - contenido para mostrar en el placeholder de elementos 
### 3. ``nameInput`` ('String')  - para asignar el name e id al elemento en el DOM
### 4. ``requerido`` (booleano)  - para controlar si es obligatorio o no el elemento por defecto esta en false
### 5. ``estado`` (booleano)  -  para controlar si se habilita o desabilita el elemento
### 6. ``onChangeInput`` (function)  - funcion para controlar el evento onChange del elemento
### 6. ``onBlurInput`` (function)  - funcion para controlar el evento onBlur del elemento


Descripcion : este ejemplo aplica para todos los demas componentes

CampoCorreo,CampoFecha,CampoLista,CampoLista,CampoMoneda,CampoMonedaDecimal,CampoNumeroParseoMil,CampoNumeroParseoMilDecimal,CampoPorcentaje,CampoTelefono,CampoTexto

## Uso del componente

1. Importa el componente '`CampoCorreo.jsx` en el archivo donde deseas utilizarlo :

import { CampoCorreo } from "@/app/components/share/CampoCorreo"

import { useForm } from "@/app/hooks/useForm"

2. crear un objecto se deseas controlar todos los estados de los componente, utilizando un hook personalizado que retorna la informacion digitada por el usuario en formState,el onchange para controlar el evento onchange y con onResetForm limpiar el contenido de los input

    const { formState, onInputChange, onResetForm } = useForm({
        correo: '',
    })

2.  Al llamar el componente, pasale el prop de acuerdo al requerimiento y asocia el key del formState.correo y el nameInput debe tener el mismo nombre del key del formState que asigno para controlar el valor

    <CampoCorreo
                valorInput={formState.correo}
                onChangeInput={onInputChange}
                placeholder="correo"
                nameInput="correo"
            />

3. uso multiples componentes 


    const { formState, onInputChange, onResetForm } = useForm({
        lista: '',
        campoText: '',
        campoNumero: '',
        parseoMilDecimal: '',
        campoMoneda: '',
        campoMonedaDecimal: '',
        correo: '',
        compoPorcentaje:'',
        fecha:''
    })

    

    `  <form >

            <CampoLista
                valorInput={formState.lista}
                onChangeInput={onInputChange}
                nameInput="lista"
                requerido={true}
            />
            <CampoTexto
                valorInput={formState.campoText}
                onChangeInput={onInputChange}
                nameInput="campoText"
            />
            <CampoNumeroParseoMil
                valorInput={formState.campoNumero}
                onChangeInput={onInputChange}

                nameInput="campoNumero"
            />




            <CampoNumeroParseoMilDecimal
                valorInput={formState.parseoMilDecimal}
                onChangeInput={onInputChange}
                placeholder="parseo mil decimal"
                nameInput="parseoMilDecimal"
            />

            <CampoMoneda
                valorInput={formState.campoMoneda}
                onChangeInput={onInputChange}
                placeholder="compo moneda"
                nameInput="campoMoneda"
            />

            <CampoMonedaDecimal
                valorInput={formState.campoMonedaDecimal}
                onChangeInput={onInputChange}
                placeholder="compo moneda decimal"
                nameInput="campoMonedaDecimal"
            />

            <CampoTelefono
                valorInput={formState.campoTelefono}
                onChangeInput={onInputChange}
                placeholder="Telefono"
                nameInput="campoTelefono"
            />

            <CampoCorreo
                valorInput={formState.correo}
                onChangeInput={onInputChange}
                placeholder="correo"
                nameInput="correo"
            />

            <CampoPorcentaje
                valorInput={formState.compoPorcentaje}
                onChangeInput={onInputChange}
                placeholder="porcentaje"
                nameInput="compoPorcentaje"
            />


            <CampoFecha 
            
            valorInput={formState.fecha}
                onChangeInput={onInputChange}
                placeholder="fecha"
                nameInput="fecha"
            /> 

           
        </form>`

