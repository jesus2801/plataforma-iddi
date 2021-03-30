import styled from '@emotion/styled';

export const LandingCtn = styled.div`
  box-sizing: border-box;
  position: relative;
  top: 0;
  width: 100%;
  background: linear-gradient(to right, var(--blue), var(--lightBlue));

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-bottom-left-radius: 50% 64px;
  border-bottom-right-radius: 50% 64px;

  .nav-ctn {
    margin-top: 10px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    .logo {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      span {
        margin-right: 10px;
        color: #fff;
      }

      p {
        color: #fff;
      }
    }

    nav {
      a {
        text-decoration: none;
        margin-right: 15px;
        color: #fff;
        font-size: 17px;
        font-style: italic;
        transition: color 300ms ease;

        &:hover {
          color: var(--lightGreen);
        }

        &:last-of-type {
          margin: 0;
        }
      }
    }

    button {
      border-radius: 7px;
      outline: none;
      color: #fff;
      padding: 5px 14px;
      cursor: pointer;

      border: 1px solid var(--lightGreen);
      background-color: transparent;
      margin-right: 20px;
      transition: background-color 300ms ease;

      &:hover {
        background-color: var(--lightGreen);
      }
    }

    @media (max-width: 430px) {
      nav {
        a {
          font-size: 14px;
        }
      }

      .logo {
        p {
          font-size: 14px;
        }
      }
    }
  }

  .content {
    margin-top: 40px;
    margin-bottom: 100px;
    width: 80%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 60px;

    .info {
      width: 100%;

      h2 {
        position: absolute;
        color: rgba(255, 255, 255, 0.2);
        font-family: 'Montserrat', sans-serif;
        font-size: 85px;
        margin: 0;
      }

      h1 {
        color: #fff;
        font-family: 'Montserrat', sans-serif;
        font-size: 44px;
        margin: 24px 0 0 0;
      }

      p {
        color: #fff;
        line-height: 20px;
      }

      button {
        border: none;
        border-radius: 7px;
        outline: none;
        padding: 5px 14px;
        background: linear-gradient(to right, var(--lightBlue), var(--lightGreen));
        color: #fff;
        cursor: pointer;
      }

      @media (max-width: 1200px) {
        h2 {
          font-size: 65px;
        }

        h1 {
          margin: 16px 0 0 0;
        }
      }

      @media (max-width: 800px) and (min-width: 671px) {
        h2 {
          font-size: 50px;
        }

        h1 {
          font-size: 36px;
          margin: 16px 0 0 0;
        }

        p {
          font-size: 14px;
        }
      }
    }

    .image {
      display: flex;
      justify-content: center;
      align-items: center;
      object {
        width: 400px;

        @media (max-width: 880px) {
          width: 300px;
        }
      }
    }

    @media (max-width: 1000px) {
      width: 91%;
    }

    @media (max-width: 670px) {
      grid-template-columns: 100%;
      column-gap: 0;
      row-gap: 40px;

      .info {
        grid-row: 2 / 3;
      }

      .image {
        object {
          width: 60%;
        }
      }
    }

    @media (max-width: 570px) {
      .image {
        object {
          width: 91%;
        }
      }
    }

    @media (max-width: 430px) {
      .info {
        h2 {
          font-size: 45px;
        }

        h1 {
          font-size: 36px;
          margin: 16px 0 0 0;
        }

        p {
          font-size: 14px;
        }
      }
    }
  }
`;
