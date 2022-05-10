import { useEffect, useState } from "react"
import { api } from "../../service/api"
import { formatToBRL } from "../../utils/formatToBRL";
import { Header } from "../Header/Header";
import { Product } from "../Product/Product";
import * as S from './styles'

export const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0)
  const [discount, setDiscount] = useState(0)

  useEffect(() => {
    api.get('/products')
      .then(response => {
        const parsedProducts = response.data.products.map((product) => ({
          ...product,
          total: product.total ? product.total : 0,
          orderedQuantity: product.orderedQuantity ? product.orderedQuantity : 0
        }))

        setProducts(parsedProducts)
      })
  }, [])

  useEffect(() => {
    const getTotal = products.reduce((acc, curr) => {
      if(curr.total) {
        acc += curr.total
      }

      return acc;
    }, 0)

    if(getTotal > 1000) {
      setDiscount(getTotal - (getTotal * 0.1));
    } else {
      setDiscount(0);
    }

    setTotal(getTotal);
  }, [products])

  const addToCart = (id) => {
    const indexOfProduct = products.findIndex(product => product.id === id);

    const productToAdd = products[indexOfProduct];

    if (productToAdd && productToAdd.orderedQuantity < productToAdd.availableCount) {
      productToAdd.orderedQuantity = 
        productToAdd.orderedQuantity ? productToAdd.orderedQuantity + 1 : 1;
      productToAdd.total = 
        productToAdd.total ? productToAdd.total + productToAdd.price : productToAdd.price;

      products[indexOfProduct] = productToAdd;

      setProducts([...products])
    }
  }

  const removeFromCart = (id) => {
    const indexOfProduct = products.findIndex(product => product.id === id)

    const productToRemove = products[indexOfProduct];

    if (productToRemove && productToRemove.orderedQuantity > 0) {
      productToRemove.orderedQuantity = 
        productToRemove.orderedQuantity ? productToRemove.orderedQuantity - 1 : 1;
      productToRemove.total = 
        productToRemove.total ? productToRemove.total - productToRemove.price : productToRemove.price;

      products[indexOfProduct] = productToRemove;

      setProducts([...products])
    }
  }

  return (
    <>
      <Header />
      <S.Main>
        {products.length === 0 ? (
          <span>Carregando produtos...</span>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>ID do Produto</th>
                  <th align='center'>Nome do Produto</th>
                  <th align='center'>Quantidade Disponível</th>
                  <th align='center'>Preço</th>
                  <th align='center'>Quantidade</th>
                  <th align='center'>Total</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <Product 
                    key={product.id} 
                    product={product}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                  />
                ))}
              </tbody>
            </table>
            <S.OrderSummary>
              <h2>Resumo do Pedido</h2>
              <p>Total: {formatToBRL(total)}</p>
              <p>Valor com Desconto: {formatToBRL(discount)}</p>
            </S.OrderSummary>
          </>
        )}
      </S.Main>
    </>
  )
}