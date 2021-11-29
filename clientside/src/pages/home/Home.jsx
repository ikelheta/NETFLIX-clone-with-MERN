import React, {useState, useEffect} from 'react'
import "./home.scss"
import Navbar from "../../components/navbar/Navbar"
import Featured from '../../components/featered/Feature'
import List from '../../components/list/List'
import axios from "axios"

const Home = ({type}) => {
  const [lists , setlists]= useState([])
  const [genre, setGenre] = useState(null)
  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/list${type ? "?type=" + type + "&" : "" }${genre ? "genre=" + genre : ""}`,
          {
            headers: {
              token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTRjNzVlMWNkOTczNTY0NDQxY2E3NiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2Mzc0MDQ1NTIsImV4cCI6MTYzNzY2Mzc1Mn0.KRpjf_aymtK25YuVY4gl7ZSjXMmUNpfCJxzaqoJY4Hw"
            },
          }
        );
        setlists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
    
  }, [type, genre]);
  console.log(lists)
  return (
    <div className="home">
      <Navbar/>
      <Featured type= {type}/>
      {lists.map((list) => (
        <List list={list} key={list._id}/>
      ))}
    </div>
  )
}

export default Home
