import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import SelectSprite from '@cmpnts/UI/SelectSprite';
import Categories from '@cmpnts/UI/Categories';
import Forum from '@cmpnts/app/forums/Forum';
import AppLayout from '@cmpnts/AppLayout';
import withAuth from '@cmpnts/withAuth';
import Search from '@cmpnts/UI/Search';
import Select from '@cmpnts/UI/Select';

import { FiltersCtn, MainForumsCtn } from '@styles/app/helps';

import { ForumCategory } from '@interfaces/index';
import { ForumsFilter } from '@interfaces/states';
import { AppCtx } from '@interfaces/context';

import { getForums } from 'context/actions/forums.actions';

const Helps = () => {
  //component states
  const [category, setCategory] = useState('all' as 'all' | ForumCategory);
  const [filter, setFilter] = useState('recent' as ForumsFilter);

  //dispatch for exec actions
  const dispatch = useDispatch();

  //destructuring forums and user data from the principal store
  const {
    forums: { forums, isLoading },
    user: { publicInfo, rollbar },
  } = useSelector((state: AppCtx) => state);

  //update category when it change
  const handleCategory = (e: FormEvent<HTMLSelectElement>) => {
    setCategory(e!.currentTarget.value as 'all' | ForumCategory);
  };

  //update filter when it change
  const handleFilter = (e: FormEvent<HTMLSelectElement>) => {
    setFilter(e!.currentTarget.value as ForumsFilter);
  };

  //search forum with title and the actual filters
  const initSearch = () => {
    const input = document.getElementById('search-input') as HTMLInputElement;
    const vl = input.value;
    if (vl.trim() === '') return;
    dispatch(getForums(category, filter, publicInfo!.docId, vl, rollbar));
  };

  //get forums with the actual filters
  useEffect(() => {
    if (publicInfo) {
      dispatch(getForums(category, filter, publicInfo.docId, '', rollbar));
    }
  }, [category, filter, publicInfo]);

  //render data
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
          <Search
            width="40%"
            placeholder="Busca un titulo exacto"
            onKeyDown={(e) => {
              if (e.key.toLowerCase() === 'enter') {
                initSearch();
              }
            }}
            id="search-input"
          />

          <div className="selects">
            <Select minWidth="200px" onChange={handleCategory} defaultValue={category}>
              <Categories />
            </Select>

            <SelectSprite />

            <Select minWidth="200px" onChange={handleFilter} defaultValue={filter}>
              <option value="recent">Más recientes</option>
              <option value="ancient">Más antiguos</option>
              <option value="more-votes">Más votos</option>
              <option value="less-votes">Menos votos</option>
              <option value="user-forums">Mis foros</option>
            </Select>
          </div>
        </FiltersCtn>

        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <div className="forums">
            {forums.map((data) => (
              <Forum data={data} key={data.id} />
            ))}
          </div>
        )}
      </MainForumsCtn>
    </AppLayout>
  );
};

export default withAuth(Helps);
