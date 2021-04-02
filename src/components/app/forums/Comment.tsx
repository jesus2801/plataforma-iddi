import { convertToDate } from '@fcns/index';
import { ForumCommentProps } from '@interfaces/props';
import { CommentForumDiv } from '@styles/app/helps/helps';
import React from 'react';

const Comment = ({ data }: ForumCommentProps) => {
  return (
    <CommentForumDiv>
      <p>{data.comment}</p>
      <p>Hace {convertToDate(Date.now() - data.date)}</p>
    </CommentForumDiv>
  );
};

export default Comment;
