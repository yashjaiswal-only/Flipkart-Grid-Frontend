import styled from "styled-components"
import Navbar from "../components/Navbar"
import Announcement from "../components/Announcement"
import Products from "../components/Products"
import Newsletter from "../components/Newsletter"
import Footer from "../components/Footer"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const Container = styled.div`
   
`
const Title = styled.h1`
    margin: 20px;
    text-align:center;
`

const BackBtn =styled.button`
    position:absolute;
    font-size: 15px;
    margin:10px;
    background:none;
    border-color:teal;
    border-radius:10%;
    cursor:pointer;
    &:hover{
        background-color: #f8f4f4;
    }
`
const Option=styled.option``
const ProductList = () => {
    //to get category value from url
    const location = useLocation();
    const query=(location.pathname.split("/")[2]);
    const navigate=useNavigate();
    console.log(query)

    //to get to top on rendering
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

  return (
    <>
      <Navbar />
        <Announcement/>
    <Container>
        <BackBtn onClick={()=>navigate('/')}>Back</BackBtn>
        <Title>{query?query.charAt(0).toUpperCase()+query.slice(1):"Products"}</Title>  
    
        {query?<Products query={query} />:<Products all={true}/>}
    </Container>
        <Newsletter/>
        <Footer/>
    </>

  )
}

export default ProductList
