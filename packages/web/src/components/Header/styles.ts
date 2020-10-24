import styled from 'styled-components';

export const ContainerHeader = styled.header`
  display: flex;
  flex-direction: column;
  background-color: var(--primary);
`;

export const TopBarHeader = styled.header`
  max-width: 1120px;
  margin: 0 auto;
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-text-in-primary);
  padding: 1.8rem 0;

  & > a {
    margin-left: 0px;
    img {
      max-width: 65px;
      width: 100%;
    }
  }

  & > nav,
  & > button,
  & > div {
    text-align: right;
    float: inline-end;
  }

  & > div {
    margin-right: 0px;

    ul li {
      display: inline-block;
      margin-left: 20px;

      a {
        color: var(--bg-s-light);
        opacity: 0.8;
        font-family: Poppins;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        transition: opacity 0.2s;
      }

      a::after {
        content: '';
        display: block;
        background: var(--secondary);
        margin: 0 auto;
        width: 0%;
        height: 2px;
        margin-top: 8px;
        transition: width 0.2s;
      }

      a:hover {
        color: #fff;
        opacity: 1;
      }

      a:hover::after {
        content: '';
        display: block;
        background: var(--secondary);
        margin: 0 auto;
        width: 100%;
        height: 2px;
        margin-top: 8px;
        transition: width 0.2s;
      }

      a.active {
        color: #fff;
        opacity: 1;
      }

      a.active::after {
        content: '';
        display: block;
        background: var(--secondary);
        margin: 0 auto;
        width: 100%;
        height: 2px;
        margin-top: 8px;
      }
    }
  }
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  width: 100%;
  position: relative;
  margin: 3.2rem auto;
  flex: 1;
  margin: 0 auto;
  padding-bottom: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
