import { useEffect, useState } from "react"
import styled from "styled-components"
import { popularProducts } from "../data"
import Product from "./Product"
import axios from "axios"
import { CircularProgress } from "@mui/material"

const Container=styled.div`
    padding:20px;
    display:flex;
    flex-wrap:wrap;
    justify-content: center;
  `

const Products = ({query,all}) => {

  const [products,setProducts]=useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const getProducts = async ()=>{
    console.log('get')
    try {
        const res =await axios.get(process.env.REACT_APP_BASE_URL+"/products/");
        console.log(res.data)
        setProducts(res.data);
    } catch (err) { }
  }
  const searchProducts = async (query)=>{
    console.log('search'+query)
    try {
        const res =await axios.get(process.env.REACT_APP_BASE_URL+"/products/search?search="+query);
        const simRes =await axios.get(process.env.REACT_APP_BASE_URL+"/products/getSimilar?search="+query);
        console.log(res.data)
        setProducts(res.data)
        setSimilarProducts(simRes.data)
    } catch (err) { }
  }
  useEffect(()=>{
    if(query) searchProducts(query);
    else    getProducts();  //call the function on changing dependency cat
  },[query])

  return (
    <>
      <span style={{margin:'20px',fontSize:'1.5rem',fontWeigh:'600'}}>Searched Products</span>
    <Container>
        {products.length?products.map((item)=>(<Product key={item._id} item={item}/>)):<CircularProgress/>}
    </Container>
      <span style={{margin:'20px',fontSize:'1.5rem',fontWeigh:'600'}}>Similar Products</span>
    <Container>
        { similarProducts.length?similarProducts.map((item)=>(<Product key={item._id} item={item}/>)):<CircularProgress/>}
    </Container>
    </>
  )
}

export default Products;
