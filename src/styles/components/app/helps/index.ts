import styled from '@emotion/styled';

export const MainForumsCtn = styled.main`
  width: 90%;
  margin: 100px auto 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;

    button {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      border: none;
      outline: none;
      border-radius: 100px;
      padding: 6px 13px;
      color: #fff;
      background-color: var(--blue);

      cursor: pointer;
      transition: transform 100ms ease;

      &:active {
        transform: scale(0.95);
      }

      img {
        width: 20px;
        margin-right: 8px;
      }
    }
  }

  .forums {
    margin-top: 40px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 25px;
  }
`;

export const ForumCard = styled.div`
  box-sizing: border-box;
  width: 100%;

  padding: 15px;
  border-radius: 9px;
  cursor: pointer;

  -webkit-box-shadow: 1px 3px 7px 0px rgba(201, 201, 201, 0.9);
  -moz-box-shadow: 1px 3px 7px 0px rgba(201, 201, 201, 0.9);
  box-shadow: 1px 3px 7px 0px rgba(201, 201, 201, 0.9);

  transition: transform 300ms ease;

  &:hover {
    transform: translateY(-10px);
  }

  .author {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    padding-bottom: 10px;
    border-bottom: 1px solid #ececec;

    .info {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;

      p {
        color: var(--black);
        margin: 0;
      }

      p:first-of-type {
        font-family: 'Montserrat', sans-serif;
        font-weight: 600;
        font-size: 15px;
        margin-bottom: 2px;
      }

      p:nth-of-type(2) {
        font-size: 14px;
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding-bottom: 10px;
    border-bottom: 1px solid #ececec;

    h3 {
      font-family: 'Montserrat', sans-serif;
      font-size: 16px;
      color: var(--black);
    }

    .statistics {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;

      p {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        text-align: center;
        margin: 0;
        padding: 3px 12px;
        font-size: 14px;
        border-radius: 100px;
        color: #fff;

        &:first-of-type {
          background-color: var(--blue);
        }

        &:nth-of-type(2) {
          background-color: var(--lightGreen);
        }
      }
    }
  }

  .card-footer {
    justify-content: space-around;
    p:nth-of-type(2) {
      font-size: 13px;
    }
  }
`;

export const ForumFooter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;

  p:first-of-type {
    color: var(--black);
    font-size: 14px;
  }

  p:nth-of-type(2) {
    padding: 3px 10px;
    border: 1px solid var(--blue);
    color: var(--blue);
    border-radius: 100px;
  }
`;

export const FiltersCtn = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .selects {
    display: flex;
    flex-direction: row;
  }
`;
