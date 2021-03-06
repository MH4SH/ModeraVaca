import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  /** Colors
  */
  :root {
      --primary: rgba(111, 201, 113, 1);
      --primary-light: #B5E2B7;
      --primary-s-light   : #C6E9C8;
      --secondary: #6999EA;
      --secondary-light: #B5E2B7;
      --secondary-s-light   : #C6E9C8;
      --bg: #212421;
      --bg-light: #BFC5BF;
      --bg-s-light: #EFF6EF;
      --white: #EFF6EF;
  }


  /** Reset css
  */

  * {
      padding:0;
      margin:0;
      vertical-align:baseline;
      list-style:none;
      border:0;
      font: 400 18px Roboto, sans-setif;
  }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
      font-size: 100%;
      color: var(--bg);
  }
  /* HTML5 display-role */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section, img {
      display: block;
  }
  body {
      line-height: 1;
      background: #FDFDFD;
  }
  ol, ul {
      list-style: none;
  }
  blockquote, q {
      quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
      content: '';
      content: none;
  }
  table {
      border-collapse: collapse;
      border-spacing: 0;
  }
  a {
      text-decoration: none;
  }
  /** Grid css
  */
  *, *:before, *:after {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }

  .container {
      width: 1120px;
      margin: 0 auto;
      padding: 0px;
    position: relative;
  }
  .row {
      width: 100%;
      position: relative;
  }

  .container:after, .row:before {
      content: " ";
      display: table;
      clear: both;
  }

  .row:after {
      clear: both;
  }

  .grid-1, .grid-2, .grid-3, .grid-4, .grid-5, .grid-6, .grid-7, .grid-8, .grid-9, .grid-10, .grid-11, .grid-12, .grid-1-3 {
      float: left;
      margin-left: 16px;
      margin-right: 16px;
  }

  .grid-1 	{width: calc((100%/12)*1 - 32px);}
  .grid-2 	{width: calc((100%/12)*2 - 32px);}
  .grid-3 	{width: calc((100%/12)*3 - 32px);}
  .grid-4 	{width: calc((100%/12)*4 - 32px);}
  .grid-5 	{width: calc((100%/12)*5 - 32px);}
  .grid-6 	{width: calc((100%/12)*6 - 32px);}
  .grid-7 	{width: calc((100%/12)*7 - 32px);}
  .grid-8 	{width: calc((100%/12)*8 - 32px);}
  .grid-9 	{width: calc((100%/12)*9 - 32px);}
  .grid-10 	{width: calc((100%/12)*10 - 32px);}
  .grid-11 	{width: calc((100%/12)*11 - 32px);}
  .grid-12 	{width: calc(100% - 32px);}
  .grid-1-3	{width: calc(100%/3 - 32px);}




  body {
      -webkit-font-smoothing: antialiased;
      color: #212421;
  }

  input, button, textarea {
      font: 400 18px Roboto, sans-setif;
  }

  textarea:focus, select:focus {
      outline: 0;
      border: 2px solid #b5e2b6;
  }

  h1 {
      font-family: 'Ubuntu', sans-serif;
      font-weight: 700;
  }

  form select {
      width: 100%;
      height: 40px;
      color: #212421;
      background: #EFF6EF;
      border: 0px solid #dcdce6;
      padding: 0 10px;
  }
`;
