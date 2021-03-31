import Link from 'next/link';
import React, { FormEvent, useState } from 'react';
import Forum from '../../../components/app/forums/Forum';
import AppLayout from '../../../components/AppLayout';
import Search from '../../../components/UI/Search';
import Select from '../../../components/UI/Select';
import SelectSprite from '../../../components/UI/SelectSprite';

import { FiltersCtn, MainForumsCtn } from '../../../styles/components/app/helps';

const Helps = () => {
  const [category, setCategory] = useState('all');
  const [filter, setFilter] = useState('recents');

  const handleCategory = (e: FormEvent<HTMLSelectElement>) => {
    setCategory(e!.currentTarget.value);
  };

  const handleFilter = (e: FormEvent<HTMLSelectElement>) => {
    setFilter(e!.currentTarget.value);
  };

  return (
    <AppLayout title="Cursos y repasos">
      <MainForumsCtn>
        <div className="button">
          <Link href="/app/helps/new-help">
            <button>
              <img src="/static/icons/app/add.png" alt="add icon" /> Iniciar nuevo foro
            </button>
          </Link>
        </div>

        <FiltersCtn className="filters">
          <Search width="40%" placeholder="Busca foros o ayudas" />

          <div className="selects">
            <Select minWidth="200px" onChange={handleCategory} defaultValue={category}>
              <option value="all">Cualquier categoría</option>
              <option value="art">Arte y cultura</option>
              <option value="natural-sciences">Ciencias naturales</option>
              <option value="sports">Deportes</option>
              <option value="economy">Economía</option>
              <option value="epa">Emprendimento</option>
              <option value="epa">Filosofía y lenguaje</option>
              <option value="epa">Matemáticas</option>
              <option value="epa">Tecnología</option>
              <option value="epa">Religión y sociedad</option>
            </Select>

            <SelectSprite />

            <Select minWidth="200px" onChange={handleFilter} defaultValue={filter}>
              <option value="recents">Más recientes</option>
              <option value="epa">Más antiguos</option>
              <option value="epa">Más votos</option>
              <option value="epa">Menos votos</option>
              <option value="epa">Mis foros</option>
            </Select>
          </div>
        </FiltersCtn>

        <div className="forums">
          <Forum />
          <Forum />
          <Forum />
          <Forum />
          <Forum />
          <Forum />
          <Forum />
          <Forum />
          <Forum />
          <Forum />
        </div>
      </MainForumsCtn>
    </AppLayout>
  );
};

export default Helps;
