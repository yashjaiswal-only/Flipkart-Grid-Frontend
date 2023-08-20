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
  const getProducts = async ()=>{
    console.log('get')
    try {
        const res =await axios.get(process.env.REACT_APP_BASE_URL+"/products/");
        console.log(res.data)
        setProducts(res.data);
    } catch (err) { }
  }
  const searchProducts = async ()=>{
    console.log('search')
    try {
        const res =await axios.get(process.env.REACT_APP_BASE_URL+"/products/search?search="+query);
        console.log(res.data)
        setProducts(res.data);
    } catch (err) { }
  }
  useEffect(()=>{
    if(query) searchProducts(query);
    else    getProducts();  //call the function on changing dependency cat
  },[query])

  return (
    <Container>
          { all && products.map((item)=>(<Product key={item._id} item={item}  /> ))}
          
          {!products.length && <CircularProgress/> } 

    </Container>
  )
}

export default Products;
