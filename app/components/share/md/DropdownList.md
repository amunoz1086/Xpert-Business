# Componente `DropdownList.jsx` - Guía para desarrolladores

El componente generico 'DropdowmList lista' es una lista desplegable que permite trabajar seleccionando multiples opciones o una opcion dependiendo la funcion a cumplir.

siguientes instrucciones:

## Props

El componente `DropdownList.jsx` acepta los siguientes props:

### 1. ``ListOpciones`` ([{id:1,descripcion:'opcion 1'}])
### 2. ``idLista`` (booleano)  - la key id de la lista
### 3. ``descripcion`` (booleano)  - ls key que muestra el contenido de la lista

esto sera para manjar el estado 
### 4. ``opcionesSelecionada`` (booleano)
### 5. ``setOpcionesSelecionada`` (booleano)


### 6. ``multiselect`` (booleano)

Descripcion :



 ListOpciones - se debe pasar la lista que deseas mostrar
 multiselect - por defecto esta en `false`. lo que indica que el select solo permiter escoger una opcion. para habilitar multiples opciones se debe pasar con `true`


## Uso del componente

1. Importa el componente '`DropdownList.jsx` en el archivo donde deseas utilizarlo :

    `import { DropdownList } from "@/app/components/share/DropdownList";`

2.  Crear el estado para manipular la informacion seleccionada

    const multiselect = false

    const [opcionesSelecionada, setOpcionesSelecionada] = useState(multiselect ? [] : '')

3. Al llamar el componente, pasale el prop la lista y solo permite seleccionar una opcion

    ` <DropdownList
                opcionesSelecionada={opcionesSelecionada}
                setOpcionesSelecionada={setOpcionesSelecionada}
                idLista={'id'}
                descripcion={'descripcion'}
                ListOpciones={
                    [
                        { id: '1', descripcion: 'Opción 1' },
                        { id: '2', descripcion: 'Opción 2' },
                        { id: '3', descripcion: 'Opción 3' }
                    ]
                }

            />`

3. Al llamar el componente, pasale el prop la lista y el multiselect 'true' para que permita seleccionar varias opciones

    ` <DropdownList
                multiselect={multiselect}
                opcionesSelecionada={opcionesSelecionada}
                setOpcionesSelecionada={setOpcionesSelecionada}
                idLista={'id'}
                descripcion={'descripcion'}
                ListOpciones={
                    [
                        { id: '1', descripcion: 'Opción 1' },
                        { id: '2', descripcion: 'Opción 2' },
                        { id: '3', descripcion: 'Opción 3' }
                    ]
                }
        />`
