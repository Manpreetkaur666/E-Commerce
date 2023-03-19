import React, { useState, Fragment } from 'react'
import { useNavigate } from "react-router-dom";
import "./Products.css"

const Search = () => {

   
    let navigate = useNavigate();

    const [keyword,setKeyword] = useState("");

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()){
             navigate(`/search/products/${keyword}`)
        }else{
            navigate("/products");
        }
    }
   
  return (
    <Fragment>
      <div className='searchContainer'>
        <form className='searchBox' onSubmit={searchSubmitHandler}>
          <div className='round'>
          <input className='textBox' type="text" placeholder='search here..' onChange={(e) => setKeyword(e.target.value)}/>  
           <input className='searchbtn' type="submit" value="Search"/>    
          </div>          
        </form>
      </div>
    </Fragment>
  )
}

export default Search;
