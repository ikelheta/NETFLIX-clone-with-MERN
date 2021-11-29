import "./listitem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import  axios  from "axios";
import { Link } from "react-router-dom";

export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [video, setVideo] = useState({});
  
useEffect(() =>{
  const fetchMovies = async () =>{
    const res = await axios.get(`http://localhost:5000/movies/find/${item}`,
    {
      headers: {
        token:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTRjNzVlMWNkOTczNTY0NDQxY2E3NiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2Mzc0MDQ1NTIsImV4cCI6MTYzNzY2Mzc1Mn0.KRpjf_aymtK25YuVY4gl7ZSjXMmUNpfCJxzaqoJY4Hw"
      },
    }
    )
    setVideo(res.data)
  }
  fetchMovies()
},[item])

  return (
  <Link to={{pathname: "/watch", video: video}} >
    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={video.image}
        alt=""
      />
      {isHovered && (
        <>
          <video src={"https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761"} autoPlay={true} loop />
          <div className="itemInfo">
            <div className="icons">
              <PlayArrow className="icon" />
              <Add className="icon" />
              <ThumbUpAltOutlined className="icon" />
              <ThumbDownOutlined className="icon" />
            </div>
            <div className="itemInfoTop">
              <span>{Math.floor(video.limit / 60) } hour {video.limit % 60} mins</span>
              <span className="limit">+16</span>
              <span>{video.year}</span>
            </div>
            <div className="desc">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Praesentium hic rem eveniet error possimus, neque ex doloribus.
            </div>
            <div className="genre">Action</div>
          </div>
        </>
      )}
    </div>
  </Link>
  );
}