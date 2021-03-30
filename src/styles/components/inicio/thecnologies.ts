import styled from '@emotion/styled';

export const TechnologiesCtn = styled.div`
  margin: 30px auto;
  width: 90%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 20px;

  @media (max-width: 1070px) {
    row-gap: 24px;
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 880px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 670px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 500px) {
    column-gap: 0px;
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Technologie = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  object {
    width: 46px;
    margin-right: 14px;
  }

  h3 {
    font-family: 'Montserrat', sans-serif;
    color: var(--grey);
    font-size: 26px;
    margin: 0;
  }
`;
