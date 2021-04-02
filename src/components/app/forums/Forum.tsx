import React, { useEffect, useState } from 'react';

import ProfileImg from '@cmpnts/UI/ProfileImg';

import { ForumPreviewProps } from '@interfaces/props';
import { PublicUserInfo } from '@interfaces/index';

import { ForumCard } from '@styles/app/helps';

import { convertToDate } from '@fcns/index';

const Forum = ({ data }: ForumPreviewProps) => {
  const [author, setAuthor] = useState(null as PublicUserInfo | null);

  useEffect(() => {
    const main = async () => {
      const a = await data.author.get();
      setAuthor(a.data() as PublicUserInfo);
    };
    main();
  }, []);

  return (
    <ForumCard>
      <div className="author">
        <ProfileImg
          size="50px"
          url={author ? author.photo! : '/static/icons/app/emptyPhoto.svg'}
        />
        <div className="info">
          <p>{author ? author.nickname : 'cargando...'}</p>
          <p>
            {author
              ? `${author.rol}${author.grade && ' - ' + author.grade + '° grado'}`
              : 'cargando....'}
          </p>
        </div>
      </div>

      <div className="content">
        <h3>{data.title}</h3>
        <div className="statistics">
          <p>{data.votes_count} votos</p>
          <p>{data.answers.length} respuestas</p>
        </div>
      </div>

      <div className="card-footer">
        <p>Hace {convertToDate(Date.now() - data.date)}</p>
        <p>{data.category}</p>
      </div>
    </ForumCard>
  );
};

export default Forum;
