import styled from 'styled-components';

export const ContainerHeader = styled.header`
  display: flex;
  flex-direction: column;
  background-color: var(--primary);

  img {
    max-width: 65px;
    width: 100%;
  }

  & > div {
    max-width: 1120px;
    margin: 0 auto;
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--color-text-in-primary);
    padding: 1.6rem 0;
  }

  & > nav, & > button, & > div {
    text-align: right;
    float: inline-end;
  }

  ul li {
    display: inline-block;
    margin-left: 20px;
  }

  ul li a {
    color: var(--bg-s-light);
    opacity: 0.8;
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }

  ul li a:hover {
    color: #FFF;
  }

  ul li a.active {
    color: #FFF;
    opacity: 1;
  }

  ul li a.active::after {
    content: '';
    display: block;
    background: var(--secondary);
    margin: 0 auto;
    width: 100%;
    height: 2px;
    margin-top: 10px;
  };
`;