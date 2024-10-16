import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { fetchAllProducts } from '../redux/slices/productSlice'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
  const dispatch = useDispatch()
  const {allProducts,loading,error} = useSelector(state=>state.productReducer)
  //console.log(allProducts);

  const [CurrentPage,setCurrentPage] = useState(1)
  const productPerPage = 8
  const totalPages = Math.ceil(allProducts?.length/productPerPage)
  const currentPageLastProductIndex = CurrentPage * productPerPage
  const currentPagestartProductIndex = currentPageLastProductIndex - productPerPage
  const visibleProductCards = allProducts?.slice(currentPagestartProductIndex,currentPageLastProductIndex)
  
  useEffect(()=>{
    dispatch(fetchAllProducts())
  },[])

  const navigateToNextPage = ()=>{
    if(CurrentPage!=totalPages){
      setCurrentPage(CurrentPage+1)
    }
  }
  const navigateToPrevPage = ()=>{
    if(CurrentPage!=1){
      setCurrentPage(CurrentPage-1)
    }
  }

  return (
    <>
      <Header insideHome={true}/>
      <div style={{marginTop:'80px'}} className='container mx-auto px-4'>
        {
          loading ?
          <div style={{height:'60vh'}} className="flex justify-center items-center font-bolder">
            <img width={'90px'} height={'90px'} src="https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif" className='me-2' alt="" />
            Loading...
          </div>
          :
          <>
            <div className="grid grid-cols-4 gap-4">
            {
              allProducts.length>0 ?
                visibleProductCards?.map(product=>(
                  <div key={product?.id} className="rounded border p-2 shadow">
                    <img  style={{width:'100%',height:'200px'}} src={product?.thumbnail} alt="" />
                    <div className="text-center">
                      <h3 className="text-xl font-bold">{product?.title}</h3>
                      <Link className='bg-blue-500 text-white p-1 inline-block rounded' to={`/${product?.id}/view`}>View More</Link>
                    </div>
                  </div>
                  
                ))
              :
              <div className="fond-bolder text-center mt-5 mb-5 text-red-600">
                Product Not Found!!!
              </div> 

            }

            </div>
            {/* pagenation */}
            <div className="flex justify-center items-center mt-5 mb-5">
              <span onClick={navigateToPrevPage} style={{cursor:'pointer'}}><i className="fa-solid fa-backword me-5 "></i></span>
              <span className='font-bold'>{CurrentPage} of {totalPages}</span>
              <span onClick={navigateToNextPage} style={{cursor:'pointer'}}><i className="fa-solid fa-forword ms-5"></i></span>
            </div>
          </>
        }
      </div>
    </>
  )
}

export default Home