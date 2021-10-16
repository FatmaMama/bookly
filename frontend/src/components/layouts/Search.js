import React, { useState, useEffect } from 'react';

function SearchHandler(keyword, history) {
    useEffect(() => {
        if(keyword.trim()){
                    history.push(`/search/${keyword}`)
                } else {
                    history.push('/')
                }
    }
    , [keyword, history])}

export default function Search({ history }) {

    const [keyword, setKeyword] = useState('')
    SearchHandler(keyword, history)
   
    return (
        
            <div className="input-group">
                <input
                    type="text"
                    id="search_field"
                    className="form-control"
                    placeholder="Enter Product Name ..."
                    onChange ={(e) => setKeyword(e.target.value)}
                />
                <div className="input-group-append">
                    <button id="search_btn" className="btn">
                    <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
      
    )
}
