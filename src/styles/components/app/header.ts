import styled from '@emotion/styled';

export const HeaderCtn = styled.div`
  position: fixed;
  top: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 10px 30px 10px 70px;
  background-color: var(--blue);

  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .logo {
    p {
      color: #fff;
    }
    span {
      color: #fff;
      margin-right: 14px;
    }
  }

  .content {
    img {
      width: 24px;
      cursor: pointer;
    }

    .image {
      margin: 0 20px;
    }
  }
`;

export const MenuIcon = styled.div`
  position: fixed;
  top: 21px;
  left: 10px;
  width: 33px;
  margin-right: 20px;
  cursor: pointer;
  z-index: 10;

  &.active {
    div {
      background-color: var(--black);
    }
  }

  div {
    width: 100%;
    height: 3px;
    border-radius: 100px;
    background-color: #fff;
    margin-bottom: 5px;
    transition: background-color 700ms ease;

    &:last-of-type {
      margin: 0;
    }
  }
`;

export const ConfigButtonCtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 24px;
    cursor: pointer;
    transition: transform 300ms ease;

    &.active {
      transform: rotate(180deg);
    }
  }

  img.active + ul {
    opacity: 1;
    visibility: visible;
  }

  ul {
    padding: 0;
    margin: 0;

    position: absolute;
    right: 0px;
    top: 70px;

    width: 300px;
    background-color: #fff;
    border-bottom-left-radius: 2px;

    opacity: 0;
    visibility: hidden;
    transition: all 300ms ease;

    -webkit-box-shadow: 1px 3px 6px 0px rgba(217, 217, 217, 1);
    -moz-box-shadow: 1px 3px 6px 0px rgba(217, 217, 217, 1);
    box-shadow: 1px 3px 6px 0px rgba(217, 217, 217, 1);

    li {
      list-style: none;
      width: 100%;
      padding: 10px 0;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      border-bottom: 1px solid #f7f7f7;
      color: var(--black);
      transition: background-color 300ms ease;

      &.option {
        cursor: pointer;
        &:hover {
          background-color: #f7f7f7;
        }
      }

      &:last-of-type {
        border: none;
      }

      .info {
        margin-left: 20px;
        p {
          margin: 0;
          color: var(--black);
          font-size: 14px;
        }

        p:first-of-type {
          font-size: 18px;
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          margin-bottom: 5px;
        }
      }
    }
  }
`;
