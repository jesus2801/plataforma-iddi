import styled from '@emotion/styled';

export const AuthCtn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .abs {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    object:first-of-type {
      height: 100vh;
    }
    object:nth-of-type(2) {
      position: absolute;
      width: 420px;
    }
  }

  .login {
    box-sizing: border-box;
    width: 91%;
    max-width: 400px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border-radius: 7px;

    margin-right: 14%;
    padding: 20px;
    background-color: #fff;
    -webkit-box-shadow: 1px 4px 9px 0px rgba(212, 212, 212, 1);
    -moz-box-shadow: 1px 4px 9px 0px rgba(212, 212, 212, 1);
    box-shadow: 1px 4px 9px 0px rgba(212, 212, 212, 1);

    a {
      margin-top: 15px;
      color: var(--black);
    }

    object {
      width: 100px;
    }

    h1 {
      font-family: 'Montserrat', sans-serif;
      color: var(--black);
    }

    .form-group {
      width: 93%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      margin-bottom: 15px;

      label {
        color: var(--black);
        font-size: 15px;
      }

      .in {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;

        input {
          width: 100%;
          margin-top: 5px;
          color: var(--black);
          border: none;
          outline: none;
          border-bottom: 1px solid #ccc;

          padding: 4px 4px 4px 24px;
          box-sizing: border-box;
        }

        object {
          position: absolute;
          width: 15px;
        }

        &:focus-within + .line {
          width: 100%;
        }
      }

      .line {
        position: absolute;
        width: 0px;
        height: 1px;
        background-color: var(--blue);

        display: inline-block;
        transition: width 300ms ease;
        position: relative;
        transform: translateY(-1px);

        &.active {
          width: 100%;
        }
      }
    }

    input[type='submit'] {
      width: 93%;
      border: none;
      outline: none;
      border-radius: 4px;
      background-color: var(--blue);
      color: #fff;
      padding: 6px 14px;
      cursor: pointer;
    }

    @media (max-width: 1100px) {
      margin-right: 5%;
    }
  }

  @media (max-width: 1100px) {
    justify-content: center;
    .abs {
      display: none;
    }

    .login {
      margin: 100px 0 0 0;
    }
  }
`;
