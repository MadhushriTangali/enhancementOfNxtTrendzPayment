import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'
import PopupElement from '../PopupElement'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      let totalprice = 0
      cartList.forEach(each => {
        totalprice += each.price * each.quantity
      })

      return (
        <div className="checkout-container">
          <h1 className="order-heading">
            Order Total: <span className="total-price">Rs {totalprice}/-</span>
          </h1>
          <p className="item-length">{cartList.length} items in cart</p>
          <Popup
            trigger={
              <button type="button" className="checkout-button">
                Checkout
              </button>
            }
            modal
            position="top left"
          >
            {close => <PopupElement close={close} />}
          </Popup>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
