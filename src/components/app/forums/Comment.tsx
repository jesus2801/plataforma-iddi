import { convertToDate } from '@fcns/index';
import { ForumCommentProps } from '@interfaces/props';
import { CommentForumDiv } from '@styles/app/helps/helps';
import React, { useEffect } from 'react';

const Comment = ({ data }: ForumCommentProps) => {
  useEffect(() => {
    // data.author.get().then().catch();
  }, []);

  return (
    <CommentForumDiv>
      <p>{data.comment}</p>
      <p>Hace {convertToDate(Date.now() - data.date)}</p>
    </CommentForumDiv>
  );
};

export default Comment;
