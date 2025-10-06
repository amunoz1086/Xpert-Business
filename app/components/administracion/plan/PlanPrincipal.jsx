'use client'
import DescripcionPlan from './DescripcionPlan'
import RangosDescripcion from './RangosDescripcion'
import { InclusionPlan } from './InclusionPlan'
import { ClienteCuentaPlanVigente } from './ClienteCuentaPlanVigente'
import { FaPencilAlt } from 'react-icons/fa'
import { IoSaveOutline } from 'react-icons/io5'
import { BiTrash } from 'react-icons/bi'
import { ListarPlanes } from '../ahorro/ListarPlanes'


export const PlanPrincipal = ({ listPlan = [],listaTipoPlan=[] }) => {

    return (
        <div>
            <main className="flex justify-center h-[60vh]">
                <ListarPlanes
                    listPlan={listPlan?.DATA}
                />
            </main>
          
        </div>
    )

}
