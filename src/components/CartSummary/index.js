import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      let totalprice = 0
      cartList.forEach(each => {
        totalprice += each.price*each.quantity
      })

      return (
        <div className="checkout-container">
          <h1 className="order-heading">
            Order Total: <span className="total-price">Rs {totalprice}/-</span>
          </h1>
          <p className="item-length">{cartList.length} items in cart</p>
          <button type="button" className="checkout-button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
