# Componente `ListadoCampos.jsx` - Guía para desarrolladores

El componente generico 'ListadoCampos es generico permite pasarle una lista y genera 4 columnas con listas despligable.

siguientes instrucciones:

## Props

El componente `ListadoCampos.jsx` acepta los siguientes props:

### 1. ``formId`` (string)       ----------------- required
### 2. ``seccion`` (string)      ----------------- required
### 3. ``bodyTabla`` (Array)     ----------------- required
### 3. ``idListBody`` (String)     --------------- required
### 3. ``descripcionListBody``(String)    -------- required
### 4. ``listSiNo`` (Array)      ----------------- required
### 5. ``nombrePrimerCol`` (string) -------------- optional
### 6. ``nombreTercerColFilaDos`` (string)-------- optional
### 7. ``tituloSaltoPagina`` (Array)   ----------- optional
### 8. ``tablaEncabezado1`` (Array)  ------------- optional
### 9. ``tablaEncabezado2`` (Array)  ------------- optional



Descripcion :



 formId - id para el formulario para hacer referencia y capturar los datos
 seccion - separar por seccion los datos capturados
bodyTabla  - lista que se pinta en el body de la tabla
idListBody - es la key de la lista del bodyTable es decir el id 
descripcionListBody - es la key de la lista del bodyTable es decir el lo que se quiere mostrar de esa lista 
listSiNo - lista para mostrar los select si/no
nombrePrimerCol - nombre para modificar el  que esta por defecto
nombreTercerColFilaDos - nombre para modificar el  que esta por defecto
tituloSaltoPagina - lista de los saltos de linea donde se agregan titulos  en una fila


## Uso del componente

1. Importa el componente '`ListadoCampos.jsx` en el archivo donde deseas utilizarlo :

   import { ListadoCampos } from "@/app/components/share/ListadoCampos";
   import { queryListarSiNo } from "@/app/lib/admin/querys/listas";

2. Traer los datos del api- para la lista siNo de los select

       const listSiNo = JSON.parse(await queryListarSiNo())

3. Al llamar el componente

      <ListadoCampos
            seccion={'secc1'}
            formId={'form1'}
            listSiNo={listSiNo}
            bodyTabla={[
              {  id:1,
                descripcion:'valor'}
            ]}
            idListBody={'id'}
            descripcionListBody={'descripcion'}
            tituloSaltoPagina={[{id:2000,numFila:0,titulo:"este es el titulo para la fila 0"}]}
        />

