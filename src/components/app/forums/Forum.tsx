import React from 'react';
import { ForumCard } from '../../../styles/components/app/helps';
import ProfileImg from '../../UI/ProfileImg';

const Forum = () => {
  return (
    <ForumCard>
      <div className="author">
        <ProfileImg
          size="50px"
          url="https://i.pinimg.com/236x/0a/64/ab/0a64abc21d6b4d728a262ff393a33c3f.jpg"
        />
        <div className="info">
          <p>Josefino calaz</p>
          <p>student - 10° grado</p>
        </div>
      </div>

      <div className="content">
        <h3>Problema de racionales</h3>
        <div className="statistics">
          <p>3 votos</p>
          <p>2 respuestas</p>
        </div>
      </div>

      <div className="card-footer">
        <p>Hace 2 días</p>
        <p>Matematicas</p>
      </div>
    </ForumCard>
  );
};

export default Forum;
