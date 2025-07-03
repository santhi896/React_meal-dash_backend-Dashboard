import React ,{useState,useEffect}from 'react'
import { API_URL } from '../data/apiPath';

const AllProducts = () => {

    const [products,setProducts] = useState([]);

    const productHandler = async()=>{
        const firmId = localStorage.getItem('firmId');
        try{
         const response = await fetch(`${API_URL}/product/${firmId}/products`)
         const newProductData = await response.json();
         setProducts(newProductData.products);
         console.log(newProductData);
        }catch(error){
        console.error("failed to fetch products",error)
        alert("Failed to fetch products")
        }
    }

    useEffect(()=>{
          productHandler()
          console.log("This is useEffect")
    },[])

    const deleteProductById = async(productId)=>{
         try{
           const response = await fetch(`${API_URL}/product/${productId}`,{
            method:'DELETE'
           })
           if(response.ok){
            setProducts(products.filter(products=>products._id !== productId));
            confirm("Are you sure you want to delete")
            alert("product deleted successfully")
           }
         }catch(error){
             console.error("Failed to delete product")
             alert("failed to delete")
         }
    }
  return (
    <div>
      {!products?(
        <p>No Products  Added</p>
      ):(
        <table className="productTable">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Delete</th>
                    
                </tr>
            </thead>
            <tbody>
                {products.map((item)=>{
                  return(
                    <>
                    <tr key = {item._id}>
                      <td>{item.ProductName}</td>
                      <td>{item.Price}</td>
                      <td>
                        {item.Image && (
                            <img src={`${API_URL}/uploads/${item.image}`} alt={item.ProductName} style={{width:'50px',height:"50px"}}/>
                        )}
                      </td>
                      
                      <td>
                        <button onClick={()=>deleteProductById(item._id)}>Delete</button>
                      </td>
                    </tr>
                    </>
                  )
                })}
            </tbody>
        </table>
      )}
    </div>
  )
}

export default AllProducts
