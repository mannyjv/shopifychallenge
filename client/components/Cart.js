import React from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'
import {loadCart, checkout} from '../store/cart'
import {me} from '../store'
import {CheckoutForm} from './index.js'
//import {loadStripe} from '@stripe/stripe-js'
// const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)
// import axios from 'axios'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.checkoutCart = this.checkoutCart.bind(this)
  }
  async componentDidMount() {
    // Need to wait for user in order to pass userId to getCart
    await this.props.loadInitialData()
    await this.props.getCart(this.props.user.id)
  }

  checkoutCart(cart, total, userId) {
    this.props.checkout(cart, total, userId)
    this.props.history.push('/thank-you', total)
  }
  // async handleStripe() {
  //   const stripe = await stripePromise

  //   // Call your backend to create the Checkout Session
  //   const {data} = await axios.post('/stripe/create-session')
  //   console.log(data.id)
  //   //const session = await response.json();

  //   // When the customer clicks on the button, redirect them to Checkout.
  //   const result = await stripe.redirectToCheckout({
  //     sessionId: data.id,
  //   })

  //   if (result.error) {
  //     // If `redirectToCheckout` fails due to a browser or network
  //     // error, display the localized error message to your customer
  //     // using `result.error.message`.
  //   }
  // }

  render() {
    const {cart} = this.props

    const total =
      Number(
        cart.reduce(
          (accumulator, product) =>
            accumulator +
            product.productOrder.savedPrice * product.productOrder.quantity,
          0
        )
      ) *
      100 /
      100
    return (
      <div>
        {!cart.length ? (
          <h1>No Items In Cart!</h1>
        ) : (
          <div id="main-cart-container">
            <div id="total-container">
              <CheckoutForm />
              <h3>Total: ${total}</h3>
              <button
                type="button"
                onClick={
                  () => this.checkoutCart(cart, total, this.props.user.id)
                  //this.handleStripe()
                }
              >
                Checkout
              </button>
            </div>
            <div className="cart-item-container-on-cart-view">
              <h2 className="cart-title">Images Shopping Cart</h2>
              {cart.map(product => (
                <CartItem
                  product={product}
                  remove={this.props.removeItem}
                  key={product.id}
                  userId={this.props.userId}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart,
  user: state.user
})

const mapDispatch = dispatch => ({
  getCart: userId => dispatch(loadCart(userId)),
  loadInitialData: () => dispatch(me()),
  checkout: (cart, total, userId) => dispatch(checkout(cart, total, userId))
})

export default connect(mapState, mapDispatch)(Cart)
