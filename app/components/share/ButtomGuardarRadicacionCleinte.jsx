//ButtomGuardarRadicacionCleinte

export const ButtomGuardarRadicacionCleinte = ({ titulo = 'Guardar', deshabilitar = false, onClick, clienteNuevoProspectoActualizar }) => {

    //const habilitar = (clienteNuevoProspectoActualizar !== '1' || clienteNuevoProspectoActualizar !== '2' || clienteNuevoProspectoActualizar !== '3')

    const habilitar = (+clienteNuevoProspectoActualizar !== 1)
    //console.log(typeof(clienteNuevoProspectoActualizar));
    //console.log(habilitar);

    return (
        <button
            type="button"
            disabled={habilitar}
            onClick={onClick}
            className={`${habilitar ? 'bg-zinc-300 ' : 'bg-coomeva_color-rojo text-white'} px-20 h-12 rounded-lg shadow-lg `}>{titulo}
        </button>
    );
};