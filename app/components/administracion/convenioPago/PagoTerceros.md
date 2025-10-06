# Componente `PagoTerceros.js` - Guía para desarrolladores

El componente 'Pago Terceros' es responsable de recibir datos de la base de datos y llenar una tabla. Para utilizar este componente de manera efectiva, sigue las siguientes instrucciones:

## Props

El componente `PagoTerceros.js` acepta los siguientes props:

### 1. ``guardar`` (booleano)

- Descripción: Este prop indica si se debe ejecutar la función de guardar en la base de datos de forma interna en el componente.
- Tipo de dato: booleano (true o false).
- Uso: Puedes utilizar un estado (useState) en el botón de guardar de la cabecera y pasar el valor booleano al componente `PagoTerceros.js`. Si el estado es `true`, se ejecutará la función de guardar; de lo contrario, no.

## Uso del componente

1. Importa el componente '`PagoTerceros.js` en el archivo donde deseas utilizarlo:

    `import PagoTerceros from 'ruta/del/componente/PagoTerceros'`

2. Al llamar el componente, pasale el prop de tu estdo 'guardar':

    `<PagoTerceros guardar="tu-estado-guardar-booleano"/>`

