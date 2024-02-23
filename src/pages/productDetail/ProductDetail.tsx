import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../services/api'
import { ProductsProps } from '../home/Home';
import toast from "react-hot-toast";
import { CartContext } from "../../contexts/CartContext";
import { BsCartPlus } from "react-icons/bs"
import { useNavigate, Link } from 'react-router-dom'

export default () => {
  const { id } = useParams()
  const { addItemCart } = useContext(CartContext)
  const navigate = useNavigate()
  const [product, setProduct] = useState<ProductsProps>()

  useEffect(() => {
    async function getProductDetails(id: number) {
      await api.get(`/products/${id}`).then((response) => {
        setProduct({
          id: id,
          title: response.data.title,
          description: response.data.description,
          price: response.data.price,
          cover: response.data.cover
        })
      }).catch((_) => {
        toast.error('Produto Não Encontrado')
        setProduct({
          cover: '',
          description: '',
          id: 0,
          price: 0,
          title: ''
        })
      })
    }
    getProductDetails(Number(id))
  }, [])

  function handleCartItem(product: ProductsProps) {
    toast.success('Produto adicionado no carrinho', {
      style: {
        borderRadius: 10,
        backgroundColor: '#121212',
        color: '#FFF'
      }
    })
    addItemCart(product)
    navigate('/cart', { replace: true })
  }

  return (
    <div className='w-full max-w-7xl py-12 px-4 mx-auto flex'>
      {product && product?.id > 0 && (
        <div className='flex flex-col lg:flex-row'>
          <img
            className='w-full flex-1 max-h-72 object-contain'
            src={product?.cover}
            alt={product?.title}
          />
          <div className='flex flex-col flex-1 gap-4'>
            <span className='font-semibold text-2xl'>{product?.title}</span>
            <p className='text-gray-700 flex-wrap'>{product?.description}</p>
            <div className='flex gap-2'>
              <strong className="text-zinc-700/90">
                {product?.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </strong>
              <button className="bg-zinc-900 p-1 rounded">
                <BsCartPlus size={20} color="#FFF" onClick={() => handleCartItem(product!)} />
              </button>
            </div>
          </div>
        </div>
      )}
      {product && product.id <= 0 && (
        <div className="w-full flex flex-col items-center justify-center">
          <strong className="text-4xl">Produto não encontrado</strong>
          <Link
            to='/'
            className="bg-slate-600 my-3 p-1 px-3 text-white font-semibold rounded"
          >
            Acessar produtos
          </Link>
        </div>
      )}
    </div>
  )
}