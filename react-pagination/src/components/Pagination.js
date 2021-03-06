import React, { useState, useEffect }from 'react'
import axios from "axios"
import { FadeLoader } from "react-spinners";
import ReactPaginate from "react-paginate";
function Pagination() {
    const [users, setUsers ] = useState([]);
    const [loading, setLoading ] = useState(false);
    const [pageNumber, setPageNumber ] = useState(0);
    const usersPerPage = 3;
    const pagesVisited = pageNumber * usersPerPage;
    useEffect(()=>{
        const showUsers = async()=>{
            setLoading(true);
            const res = await axios.get("https://jsonplaceholder.typicode.com/users");
            setUsers(res.data);
            setLoading(false)
        }
         showUsers();
    },[])

    if(loading) {
        return <h2>{<FadeLoader />}</h2>
    }

  const displayUsers = users.slice(pagesVisited, pagesVisited + usersPerPage).map(user => {
        return (
             <ul className = "list-style">
                    {
                    <li key={user.id} className = "individual-user">
                        <h2>{user.name}</h2>
                        <p>{user.username}</p>
                        <h2>{user.email}</h2>
                        </li>
                    
                    }
                </ul>
    
        )
        
    })

    const pageCount = Math.ceil(users.length/usersPerPage);
    const change = ({selected})=>{
      setPageNumber (selected);
    }
    return (
        <>
           {displayUsers}
           <ReactPaginate
           previousLabel = {"Prev"}
           nextLabel = {"Next"}
           pageCount = {pageCount}
           onPageChange = {change}
           containerClassName = {"paginationBtns"}
           previousLinkClassName = {"prevBtn"}
           nextLinkClassName = {"nextBtn"}
           disabledClassName = {"paginationDesabled"}
           activeClassName = {"paginationActive"}
           />
        </>
    )

    
}

export default Pagination
