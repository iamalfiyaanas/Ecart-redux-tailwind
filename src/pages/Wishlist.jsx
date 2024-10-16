import React from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { removeWishlistItem } from '../redux/slices/wishlistSlice'
import { addToCart } from '../redux/slices/cartSlice'

const Wishlist = () => {
  const myCart = useSelector(state=>state.cartReducer)
  const myWishlist = useSelector(state=>state.wishlistReducer)
  const dispatch = useDispatch()
  const handleAddToCart = (product)=>{
    const existingProduct = myCart?.find(item=>item.id==product.id)
    if(existingProduct){
      dispatch(addToCart(product))
      dispatch(removeWishlistItem(product.id))
      alert("product quantity is incrementing!!!")
    }else{
      dispatch(addToCart(product))
      dispatch(removeWishlistItem(product.id))
    }
  }
  
  return (
    <>
      <Header />
      <div style={{marginTop:'80px'}} className='container mx-auto px-4'>
        {
          myWishlist.length>0 ?
          <>
            <h1 className='text-red-500 text-3x1 font-bold mb-5'>Your Wishlist</h1>
            <div className="grid grid-cols-4 gap-4">
              {
                myWishlist?.map(product=>(
                  <div className="rounded border p-2 shadow">
                    <img  style={{width:'100%',height:'200px'}} src={product?.thumbnail} alt="" />
                    <div className="text-center">
                      <div className="text-xl font-bold">{product?.title}</div>
                      <div className="flex justify-evenly mt-3">
                        <button onClick={()=>dispatch(removeWishlistItem(product?.id))} className='text-xl'><i className='fa-solid fa-heart-circle-xmark text-red-600'></i></button>
                        <button onClick={()=>handleAddToCart(product)} className='text-xl'><i className='fa-solid fa-cart-plus text-green-600'></i></button>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </>
          :
          <div style={{height:'70vh'}} className="flex flex-col items-center justify-center w-full">
            <img src="https://th.bing.com/th/id/OIP.hTTKzM4EA3Url3cAhI_8QQHaHa?rs=1&pid=ImgDetMain" alt="" />
            <h1 className='text-3xl font-bold text-blue-600'>Your wishlist is Empty!!!</h1>
          </div>
        }
      </div>
    </>
  )
}

export default Wishlist