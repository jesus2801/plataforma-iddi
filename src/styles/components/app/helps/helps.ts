import styled from '@emotion/styled';

export const ForumCtn = styled.div`
  width: 93%;
  max-width: 850px;
  margin: 100px auto 30px auto;
`;

const DarkShadow = `
  -webkit-box-shadow: 1px 0px 6px 1px rgba(220, 220, 220, 1);
  -moz-box-shadow: 1px 0px 6px 1px rgba(220, 220, 220, 1);
  box-shadow: 1px 0px 6px 1px rgba(220, 220, 220, 1);
`;

export const MainCtn = styled.main`
  box-sizing: border-box;
  width: 100%;

  background-color: #fff;
  border-radius: 8px;
  padding: 25px;

  ${DarkShadow}

  .author {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    .info {
      margin-left: 19px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;

      p:first-of-type {
        font-family: 'Montserrat', sans-serif;
        font-weight: 600;
        font-size: 19px;
        color: var(--black);

        span {
          color: #9aa8b0;
        }
      }

      p:nth-of-type(2) {
        margin: 0;
        font-size: 15px;
        color: var(--black);
      }
    }
  }

  .forum-footer {
    margin-top: 10px;
    justify-content: space-between;
    p:first-of-type {
      margin-left: 30px;
    }

    p:nth-of-type(2) {
      margin-right: 30px;
    }
  }

  .select-categories {
    margin: 30px 0;
  }
`;

export const ForumTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;

  font-size: 33px;
  color: var(--blue);

  text-transform: uppercase;
`;

export const CommentInput = styled.div`
  box-sizing: border-box;
  margin-top: 25px;
  width: 100%;

  background-color: #fff;
  border-radius: 8px;
  ${DarkShadow}

  padding: 13px;

  .add-comment {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    textarea {
      box-sizing: border-box;
      width: 100%;
      padding: 8px;
      border: 1px solid var(--grey);
      border-radius: 8px;
      outline: none;

      color: var(--black);
      transition: border 300ms ease;

      &:focus {
        border: 1px solid var(--blue);
      }
    }

    button {
      margin-top: 10px;
      width: 100%;
      padding: 7px 15px;
      border: none;
      outline: none;

      color: #fff;
      font-size: 17px;
      background-color: var(--blue);
      border-radius: 3px;

      cursor: pointer;
    }
  }
`;

export const TitleForumInput = styled.textarea`
  margin-top: 20px;
  width: 100%;
  font-size: 33px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;

  color: var(--blue);
  border: none;
  outline: none;
  resize: none;
`;

export const SubmitForumInput = styled.input`
  width: 100%;
  padding: 8px 14px;
  border: none;
  border-radius: 5px;
  outline: none;

  font-size: 18px;
  background-color: var(--blue);
  color: #fff;
  cursor: pointer;
`;

export const CommentForumDiv = styled.div`
  box-sizing: border-box;
  width: 100%;
  border-radius: 8px;

  background-color: #fff;
  ${DarkShadow}
`;
