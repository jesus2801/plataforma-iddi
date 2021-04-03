import React, { useEffect, useState } from 'react';

import ProfileImg from '@cmpnts/UI/ProfileImg';

import { ForumPreviewProps } from '@interfaces/props';
import { PublicUserInfo } from '@interfaces/index';

import { ForumCard, ForumFooter } from '@styles/app/helps';

import { convertToDate } from '@fcns/index';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { AppCtx } from '@interfaces/context';
import { defaultPhotoRute } from 'utils/variables';

const Forum = ({ data }: ForumPreviewProps) => {
  const [author, setAuthor] = useState(null as PublicUserInfo | null);

  const rollbar = useSelector((state: AppCtx) => state.user.rollbar);

  useEffect(() => {
    data.author
      .get()
      .then((a) => {
        setAuthor(a.data() as PublicUserInfo);
      })
      .catch((e) => {
        rollbar.error(e, 'error obteniendo la información de un foro en el preview');
      });
  }, []);

  return (
    <Link href={`/app/helps/help?id=${data.id}`}>
      <ForumCard>
        <div className="author">
          <ProfileImg
            size="50px"
            url={
              author
                ? author.photo || defaultPhotoRute
                : defaultPhotoRute
            }
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
            <p>{data.answers_count} respuestas</p>
          </div>
        </div>

        <ForumFooter className="card-footer">
          <p>Hace {convertToDate(Date.now() - data.date)}</p>
          <p>{data.category}</p>
        </ForumFooter>
      </ForumCard>
    </Link>
  );
};

export default Forum;
