import { useContext, useEffect, useState } from "react"
import { BsCartPlus } from "react-icons/bs"
import { api } from "../../services/api"
import { CartContext } from "../../contexts/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom'

export interface ProductsProps {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
}

export default () => {
  const { addItemCart } = useContext(CartContext)

  const navigate = useNavigate()

  const [products, setProducts] = useState<Array<ProductsProps>>([])

  useEffect(() => {
    async function getProducts() {
      const response = await api.get('/products')
      setProducts(response.data)
    }
    getProducts()
  }, [])

  function renderProducts(data: Array<ProductsProps>) {
    return data.map((product) => (
      <section key={product.id} className="w-full">
        <img
          onClick={() => navigate(`/products/${product.id}`, { replace: true })}
          className="w-full rounded-lg max-h-70 mb-2 hover:scale-110 transition-all"
          src={product.cover}
          alt={product.title}
        />
        <p className="font-semibold mt-1 mb-2">{product.title}</p>

        <div className="flex gap-3 items-center">
          <strong className="text-zinc-700/90">
            {product.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}
          </strong>
          <button className="bg-zinc-900 p-1 rounded">
            <BsCartPlus size={20} color="#FFF" onClick={() => handleCartItem(product)} />
          </button>
        </div>

      </section>
    ))
  }

  function handleCartItem(product: ProductsProps) {
    toast.success('Produto adicionado no carrinho', {
      style: {
        borderRadius: 10,
        backgroundColor: '#121212',
        color: '#FFF'
      }
    })
    addItemCart(product)
  }

  return (
    <div>
      <main className="w-full max-w-7xl px-4 mx-auto">
        <h1 className="font-bold text-2xl mb-4 mt-10 text-center">Produtos em alta</h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
          {renderProducts(products)}
        </div>
      </main>
    </div>
  )
}