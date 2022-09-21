import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Satoshi', sans-serif;
    
  
  }
 
body{
  overflow-x: hidden;
}

body::-webkit-scrollbar{
      width: 8px;
      height: 8px;
    }

body::-webkit-scrollbar-thumb{
      background: #545454;
      border-radius: 50px;
    }

body::-webkit-scrollbar-track{
      background: #303030;
    }

`;
