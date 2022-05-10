import { formatToBRL } from '../../utils/formatToBRL'
import * as S from './styles'

export const Product = ({ product, addToCart, removeFromCart }) => {
  return (
    <tr>
      <td>{product.id}</td>
      <td align='center'>{product.name}</td>
      <td align='center'>{product.availableCount}</td>
      <td align='center'>{formatToBRL(product.price)}</td>
      <td align='center'>{product.orderedQuantity}</td>
      <td align='center'>{formatToBRL(product.total)}</td>
      <td>
        <S.ActionButton onClick={() => addToCart(product.id)}>
          +
        </S.ActionButton>
        <S.ActionButton 
          disabled={product.orderedQuantity <= 0} 
          onClick={() => removeFromCart(product.id)}>
          -
        </S.ActionButton>
      </td>
    </tr>
  )
}