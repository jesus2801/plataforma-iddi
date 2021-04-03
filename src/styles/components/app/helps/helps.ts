import styled from '@emotion/styled';

export const ForumCtn = styled.div`
  width: 93%;
  max-width: 850px;
  margin: 100px auto 30px auto;

  .add-answer {
    margin: 25px 0;
  }

  .delete-forum {
    background-color: var(--lightRed);
  }
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
  margin-top: 45px;

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

  .vote-forum {
    width: fit-content;
    margin: 16px 30px 0 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    color: var(--red);
    cursor: pointer;
    img {
      width: 30px;
      margin-right: 10px;
    }
  }

  .m-top {
    margin-top: 20px;
  }

  .m-bottom {
    margin-bottom: 20px;
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
  margin-top: 12px;

  background-color: #fff;
  ${DarkShadow}
  padding: 13px;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;

  .author {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;

    .info {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;

      min-height: 80px;

      p:first-of-type {
        color: var(--black);
        margin: 0;
        span {
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
        }
      }

      p:nth-of-type(2) {
        color: var(--black);
        font-size: 15px;
        margin: 8px 0;
      }

      p:nth-of-type(3) {
        color: var(--black);
        font-size: 13px;
        margin: 0;
      }
    }
  }

  .options {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    div {
      position: absolute;
      transform: translateX(-50px);
      background-color: #fff;
      padding: 4px 8px;
      border-radius: 4px;

      -webkit-box-shadow: 1px 1px 3px 0.1px rgba(217, 217, 217, 1);
      -moz-box-shadow: 1px 1px 3px 0.1px rgba(217, 217, 217, 1);
      box-shadow: 1px 1px 3px 0.1px rgba(217, 217, 217, 1);

      opacity: 0;
      visibility: hidden;
      transition: all 200ms ease;

      &.active {
        opacity: 1;
        visibility: visible;
      }

      li {
        color: var(--black);
        list-style: none;
        cursor: pointer;
      }
    }

    img {
      cursor: pointer;
    }
  }
`;
