import { useContext } from "react"
import { CartContext, CartProps } from "../../contexts/CartContext"
import { Link } from "react-router-dom"

export default () => {
  const { cart, total, addItemCart, removeItemCart } = useContext(CartContext)

  function renderCartItem(data: Array<CartProps>) {
    if (data.length <= 0) {
      return (
        <div className="flex flex-col items-center justify-center">
          <p className="font-semibold">Ops seu carrinho está vazio...</p>
          <Link
            to='/'
            className="bg-slate-600 my-3 p-1 px-3 text-white font-semibold rounded"
          >
            Acessar produtos
          </Link>
        </div>
      )
    }

    return data.map((item) => (
      <section key={item.id} className="flex items-center justify-between border-b-2 border-gray-300">
        <img
          className="w-28"
          src={item.cover}
          alt={item.title}
        />

        <strong>Preço: {item.price}</strong>

        <div className="flex items-center justify-center gap-3">
          <button
            className="bg-slate-600 px-2 rounded text-white font-semibold items-center justify-center"
            onClick={() => removeItemCart(item)}
          >
            -
          </button>
          {item.amount}
          <button
            className="bg-slate-600 px-2 rounded text-white font-semibold items-center justify-center"
            onClick={() => addItemCart(item)}
          >
            +
          </button>
        </div>

        <strong
          className="float-right"
        >
          SubTotal:
          {item.total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })}
        </strong>
      </section>
    ))
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <h1 className="font-semibold text-2xl text-center my-4">Meu carrinho</h1>

      {renderCartItem(cart)}

      {cart.length !== 0 && <p className="font-bold mt-4">Total: {total}</p>}
    </div>
  )
}