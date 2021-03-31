import React from 'react';
import AppLayout from '../../../components/AppLayout';
import Search from '../../../components/UI/Search';

import { FiltersCtn, MainForumsCtn } from '../../../styles/components/app/helps';

const Helps = () => {
  return (
    <AppLayout title="Cursos y repasos">
      <MainForumsCtn>
        <FiltersCtn className="filters">
          <Search width="40%" placeholder="Busca foros o ayudas" />

          <div className="selects">
            <label className="select" htmlFor="slct">
              <select id="slct" required={true}>
                <option value="" disabled={true} selected={true}>
                  Select option
                </option>
                <option value="#">One</option>
                <option value="#">Two</option>
                <option value="#">Three</option>
                <option value="#">Four</option>
                <option value="#">Five</option>
                <option value="#">Six</option>
                <option value="#">Seven</option>
              </select>
            </label>

            <label className="select" htmlFor="slct">
              <select id="slct" required={true}>
                <option value="" disabled={true} selected={true}>
                  Select option
                </option>
                <option value="#">One</option>
                <option value="#">Two</option>
                <option value="#">Three</option>
                <option value="#">Four</option>
                <option value="#">Five</option>
                <option value="#">Six</option>
                <option value="#">Seven</option>
              </select>
            </label>
          </div>
        </FiltersCtn>
        <div className="forums"></div>
      </MainForumsCtn>
    </AppLayout>
  );
};

export default Helps;
