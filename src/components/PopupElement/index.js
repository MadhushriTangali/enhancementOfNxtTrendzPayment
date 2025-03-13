import {Component} from 'react'
import CartContext from '../../context/CartContext'

import './index.css'

const paymentOptions = [
  {id: 'Card', displayText: 'CARD', disabled: true},
  {id: 'Net Banking', displayText: 'NET BANKING', disabled: true},
  {id: 'Upi', displayText: 'UPI', disabled: true},
  {id: 'Wallet', displayText: 'WALLET', disabled: true},
  {id: 'Cash on Delivery', displayText: 'CASH ON DELIVERY', disabled: false},
]

class PopupElement extends Component {
  state = {payment: '', isOrderPlaced: false}

  onChangePayment = event => {
    this.setState({payment: event.target.id})
  }

  updateIsOrderPlaced = () => {
    this.setState({isOrderPlaced: true})
  }

  renderPaymentView = () => (
    <ul className="payment-ul-container">
      {paymentOptions.map(each => (
        <li className="payment-li-container" key={each.id}>
          <input
            type="radio"
            name="payment"
            onChange={this.onChangePayment}
            id={each.id}
            disabled={each.disabled}
          />
          <label className="display-text" htmlFor={each.id}>
            {each.displayText}
          </label>
        </li>
      ))}
    </ul>
  )

  renderSuccessView = () => {
    const {payment} = this.state
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          let totalPrice = 0
          cartList.forEach(each => {
            totalPrice += each.quantity * each.price
          })
          return (
            <div>
              <h1>Order Details:</h1>
              <p>{cartList.length} Items</p>
              <h1>Total price: {totalPrice}/-</h1>
              {this.renderPaymentView()}
              <button
                type="button"
                className="confirm-button"
                onClick={this.updateIsOrderPlaced}
                disabled={payment === ''}
              >
                Confirm Order
              </button>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }

  render() {
    const {isOrderPlaced} = this.state
    return (
      <div>
        {isOrderPlaced ? (
          <h1 className="order-placed-heading">
            Your order has been placed successfully
          </h1>
        ) : (
          <div>{this.renderSuccessView()}</div>
        )}
      </div>
    )
  }
}

export default PopupElement
