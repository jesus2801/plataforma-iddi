import styled from '@emotion/styled';

export const MainCtn = styled.main`
  box-sizing: border-box;
  width: 93%;
  max-width: 850px;
  margin: 100px auto 30px auto;

  background-color: #fff;
  border-radius: 8px;
  padding: 25px;

  -webkit-box-shadow: 1px 0px 6px 1px rgba(204, 204, 204, 1);
  -moz-box-shadow: 1px 0px 6px 1px rgba(204, 204, 204, 1);
  box-shadow: 1px 0px 6px 1px rgba(204, 204, 204, 1);

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

  .select-categories {
    margin: 30px 0;
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
