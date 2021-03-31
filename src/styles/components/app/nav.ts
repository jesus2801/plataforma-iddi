import styled from '@emotion/styled';

export const NavBar = styled.div`
  position: fixed;
  box-sizing: border-box;
  top: 0;
  width: 280px;
  height: 100vh;
  background-color: #fff;
  z-index: 8;
  padding: 50px 20px 20px 20px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  transition: transform 700ms ease;
  transform: translateX(-280px);

  &.active {
    transform: translateX(0px);
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    .user {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .info {
        margin-left: 8px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        p {
          margin: 0;
          color: var(--black);
          font-size: 15px;

          &:first-of-type {
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            margin-bottom: 4px;
          }

          &:nth-of-type(2) {
            margin-bottom: 4px;
            color: var(--textGrey);
          }

          &:nth-of-type(3) {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            font-size: 14px;

            span {
              display: block;
              content: '';

              width: 10px;
              height: 10px;
              min-width: 10px;
              min-height: 10px;
              border-radius: 50%;
              background-color: var(--lightGreen);

              margin-right: 5px;
            }
          }
        }
      }
    }

    ul {
      margin-top: 30px;
      width: 100%;
      padding: 0;
      li {
        width: 100%;
        box-sizing: border-box;
        padding: 14px 0;

        display: flex;
        flex-direction: row;
        align-items: center;

        border-bottom: 1px solid #ececec;

        cursor: pointer;

        &:first-of-type {
          border-top: 1px solid #ececec;
        }

        &:hover {
          p {
            color: var(--blue);
          }
        }

        img {
          width: 38px;
          height: 38px;
        }

        p {
          margin: 0;
          color: var(--black);
          width: 100%;
          text-align: center;
          transition: color 300ms ease;
        }
      }
    }
  }

  .by {
    color: var(--black);

    a {
      color: var(--blue);
    }
  }
`;

export const DarkShade = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);

  opacity: 0;
  visibility: hidden;
  transition: all 700ms ease;
  z-index: 7;

  &.active {
    opacity: 1;
    visibility: visible;
  }
`;
