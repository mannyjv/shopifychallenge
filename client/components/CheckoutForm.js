import React, {useState} from 'react'
//import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import {connect} from 'react-redux'

const CheckoutForm = props => (
  <div className="checkout">
    <div className="checkout-container">
      <h3 className="heading-3">Credit Card Checkout</h3>
      <Input label="Cardholder's Name" type="text" name="name" />
      <Input
        label="Card Number"
        type="number"
        name="card_number"
        imgSrc="https://seeklogo.com/images/V/visa-logo-6F4057663D-seeklogo.com.png"
      />
      <div className="row">
        <div className="col">
          <Input label="Expiration Date" type="month" name="exp_date" />
        </div>
        <div className="col">
          <Input label="CVV" type="number" name="cvv" />
        </div>
      </div>
      {/* <Button text="Place order" /> */}
    </div>
  </div>
)

const Input = props => (
  <div className="input">
    <label>{props.label}</label>
    <div className="input-field">
      <input type={props.type} name={props.name} />
      <img src={props.imgSrc} />
    </div>
  </div>
)

// const Button = (props) => (
//   <button className="checkout-btn" type="button">
//     {props.text}
//   </button>
// )

// const CheckoutForm = ({user}) => {
//   const [isPaymentLoading, setPaymentLoading] = useState(false)
//   const stripe = useStripe()
//   const elements = useElements()
//   console.log('Elements var from Hook:', elements)
//   const payMoney = async (e) => {
//     e.preventDefault()
//     if (!stripe || !elements) {
//       return
//     }
//     setPaymentLoading(true)
//     const clientSecret = user.email
//     const paymentResult = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//         billing_details: {
//           name: user.email,
//         },
//       },
//     })
//     setPaymentLoading(false)
//     if (paymentResult.error) {
//       alert(paymentResult.error.message)
//     } else if (paymentResult.paymentIntent.status === 'succeeded') {
//       alert('Success!')
//     }
//   }

//   return (
//     <div
//       style={{
//         padding: '3rem',
//       }}
//     >
//       <div
//         style={{
//           maxWidth: '500px',
//           margin: '0 auto',
//         }}
//       >
//         <form
//           style={{
//             display: 'block',
//             width: '100%',
//           }}
//           onSubmit={payMoney}
//         >
//           <div
//             style={{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//             }}
//           >
//             <CardElement
//               className="card"
//               options={{
//                 style: {
//                   base: {
//                     backgroundColor: 'white',
//                   },
//                 },
//               }}
//             />
//             <button
//               className="pay-button"
//               disabled={isPaymentLoading}
//               type="submit"
//             >
//               {isPaymentLoading ? 'Loading...' : 'Complete Order'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(CheckoutForm)
