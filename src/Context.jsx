import React, { useContext, useReducer, useEffect } from "react";
import axios from 'axios'
import reducer from "./reducer";

let API = "https://hn.algolia.com/api/v1/search?";

const initialState = {
    isLoading: true,
    query: "css",
    nbPages: 0,
    page: 0,
    hits: [],
};

const AppContext = React.createContext();

const AppProvider = ({children}) => {

  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchData = async (url) => {
    dispatch({type: "SET_LOADING"})
    
    try {
        const response = await axios.get(url);
        const data = response.data;
        console.log(data);
        dispatch({
            type: "GET_STORIES",
            payload: {
                hits: data.hits,
                nbPages: data.nbPages,
            }
        });
    } catch (error) {
        console.log(error);
    }
}

// remove post 

const removePost = (post_idz) => {
    dispatch({type: "REMOVE_POST", payload: post_idz});
}

// Search to call api fun

const searchPost = (searchQuery) => {
    dispatch({ type: "SEARCH_QUERY", payload: searchQuery, });
}


// pagination 

const getNextPage = () => {
    dispatch({
        type: "NEXT_PAGE"
    })
}

const getPrevPage = () => {
    dispatch({
        type: "PREV_PAGE"
    })
}
  useEffect( () => {
      fetchData(`${API}query=${state.query}&page=${state.page}`)
  }, [state.query, state.page]);

    return (
    <AppContext.Provider value={{...state, removePost, searchPost, getNextPage, getPrevPage}}>
        {children}
    </AppContext.Provider>
    );
};

const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider, useGlobalContext };