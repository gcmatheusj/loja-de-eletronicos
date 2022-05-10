import styled from 'styled-components'

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 1200px;
  margin: 0 auto;

  table {
    width: 100%;
    border-spacing: 0 8px;

    th {
      color: #666;
      font-weight: 400;
      padding: 10px 20px;
      line-height: 15px;
    }

    td {
      padding: 16px 24px;
      border: 0;
      background-color: #fff;
      color: #666;
    }
  }

  span {
    color: #666;
  }
`

export const OrderSummary = styled.div`
  margin-top: 20px;
  color: #666;

  h2 {
    margin-bottom: 8px;
  }

  p {
    margin-bottom: 4px;
  }
`