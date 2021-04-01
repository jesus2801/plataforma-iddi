import React, { FormEvent, useState } from 'react';
import Link from 'next/link';

import SelectSprite from '@cmpnts/UI/SelectSprite';
import Categories from '@cmpnts/UI/Categories';
import Forum from '@cmpnts/app/forums/Forum';
import AppLayout from '@cmpnts/AppLayout';
import withAuth from '@cmpnts/withAuth';
import Search from '@cmpnts/UI/Search';
import Select from '@cmpnts/UI/Select';

import { FiltersCtn, MainForumsCtn } from '@styles/app/helps';

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
              <Categories />
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

export default withAuth(Helps);
