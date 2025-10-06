'use client'

import React, { useState } from 'react';
import { TableAgrupadores } from './TableAgrupadores';
import { TableRolAgrupacion } from './TableRolAgrupacion';
import { TableTitularidadAgrupacion } from './TableTitularidadAgrupacion';
import { TableProductosAgrupacion } from './TableProductosAgrupacion';
import { CollapsibleTableSection } from './CollapsibleTableSection';
import { fnInsertAgrupacionProductos } from '@/app/lib/admin/cuentas/insertAgrupacionProductos';
import { fnUpdateAgrupacionTitularidad } from '@/app/lib/admin/cuentas/updateAgrupacionTitularidad';
import { fnUpdateAgrupacionRol } from '@/app/lib/admin/cuentas/updateAgrupacionRol';
import { fnInsertAgrupadores } from '@/app/lib/admin/cuentas/insertAgrupadores';

import Loading from '@/app/loading';

export const ListaParamettrosCuenta = () => {

  const [agrupadoresData, setAgrupadoresData] = useState([]);
  const [loading, setLoading] = useState(false);


  const handleSaveAgrupadores = async (sectionTitle) => {
    setLoading(true);

    if (sectionTitle === 'Productos por Agrupación') {
      const guardarProductos = JSON.parse(await fnInsertAgrupacionProductos(JSON.stringify(agrupadoresData)));
      setLoading(false);
    };

    if (sectionTitle === 'Titularidad por Agrupación') {
      const guardarTitularidad = JSON.parse(await fnUpdateAgrupacionTitularidad(JSON.stringify(agrupadoresData)));
      setLoading(false);
    };

    if (sectionTitle === 'Rol por Agrupación') {
      const guardarRol = JSON.parse(await fnUpdateAgrupacionRol(JSON.stringify(agrupadoresData)));
      setLoading(false);
    };

    if (sectionTitle === 'Agrupadores') {
      const guardarAgrupadores = JSON.parse(await fnInsertAgrupadores(JSON.stringify(agrupadoresData)));
      setLoading(false);
    };

  };


  return (
    <div className="p-2.5">

      <CollapsibleTableSection
        title="Agrupadores"
        defaultOpen={false}
        onSave={handleSaveAgrupadores}
      >
        <TableAgrupadores onDataChange={setAgrupadoresData} />
      </CollapsibleTableSection>


      <CollapsibleTableSection
        title="Rol por Agrupación"
        defaultOpen={false}
        onSave={handleSaveAgrupadores}
      >
        <TableRolAgrupacion onDataChange={setAgrupadoresData} />
      </CollapsibleTableSection>


      <CollapsibleTableSection
        title="Titularidad por Agrupación"
        defaultOpen={false}
        onSave={handleSaveAgrupadores}
      >
        <TableTitularidadAgrupacion onDataChange={setAgrupadoresData} />
      </CollapsibleTableSection>

      <CollapsibleTableSection
        title="Productos por Agrupación"
        defaultOpen={false}
        onSave={handleSaveAgrupadores}
      >
        <TableProductosAgrupacion onDataChange={setAgrupadoresData} />
      </CollapsibleTableSection>
      {
        loading && <Loading />
      }
    </div>
  );
};







