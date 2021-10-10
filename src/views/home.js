import React, { Fragment, useRef, useState, useEffect } from "react";
import { supabase } from "../client";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import {
  PermMedia,
  Cancel,
} from "@material-ui/icons";
import { NotificationManager} from 'react-notifications';
import { useAuth0 } from "@auth0/auth0-react";


export default function Home() {
  const desc = useRef("");
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth0();
  const { picture, nickname, sub } = user;

  const getAllImages = async() => {
    const {data} = await supabase.from('Image').select();
    let newData = data.reverse();
    console.log("new",newData)
    setData(newData);
  }
  const createPost = async() => {
    if (file === null) {
      return NotificationManager.error("Please select a picture", "Error");
    }
    setLoading(true);
    let newPost = {
      image: file,
      desc: desc.current.value,
      likes: 0,
      dislikes: 0,
      userId: sub,
      userimage: picture,
      name: nickname,
    }
    await supabase.from('Image').insert(newPost).single();
    setFile(null);
    setLoading(false);
    getAllImages();
  }

  const myWidget = window.cloudinary.createUploadWidget({
    cloudName: 'josh4324', 
    uploadPreset: 'hq1e5jub'}, (error, result) => { 
      if (!error && result && result.event === "success") { 
        console.log(result);
        console.log('Done! Here is the image info: ', result.info); 
        setFile(result.info.secure_url)
      }
    }
  )

  const showWidget = () => {
    setFile(null);
    myWidget.open();
  }

  useEffect(() => {
    getAllImages();
    return () => {
    }
  }, [file])
  return (
    <Fragment>
    
    <div className="share" >
      <div className="shareWrapper">
        <div className="shareTop">
          <textarea
            placeholder={"Share your picture with awesome captions"}
            className="shareInput"
            ref={desc}
          >
          </textarea>
        </div>
      </div>
      <hr/>
      {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={file} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        {
           <div className={ loading === true ? "loader" : "none"}>
              
          </div>

        }
      <div class="post-actions__attachments" style={{display:"flex",justifyContent:"space-between" }}>
        <button type="button" onClick={showWidget} class="btn post-actions__upload attachments--btn">
          <label for="upload-image" class="post-actions__label" style={{cursor:"pointer"}}>
          <PermMedia htmlColor="tomato" className="shareIcon" />
            <span style={{padding:"5px"}}>Photo</span>
          </label>
        </button>
        <button className="shareButton" type="submit" onClick={createPost}>
            Share
          </button>
      </div>
      
    </div>
    
    <div class="post-list" >
      <div style={{width:"100%"}}>
      {
        data.length === 0 ? ( <div className={ loading === true ? "loader" : "none"}>
              
        </div>) : (null)
          

        }

        {
          data.map((item) => {
            return (
              <div class="col-md-12 grid-margin">
              <div class="card rounded" style={{marginBottom:"20px", width:"100%"}}>
                  <div class="card-header">
                      
                      <div class="d-flex align-items-start justify-content-between">
                          <div class="d-flex align-items-start">
                              <img class=" rounded-circle" style={{width:"50px", height:"50px"}} src={item.userimage} alt=""/>
                              <div class="ml-2">
                                  <p style={{margin:0}}>{item.name}</p>
                                  <p class="">{formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}</p>
                              </div>
                              
                          </div>
                         
                      </div>
                  </div>
                  <div class="card-body">

                      <img class="img-fluid mb-2" src={item.image} alt=""/>
                      <p class="">{item.desc}</p>
                      

                  </div>
                  
              </div>
          </div>
          
          
            )
          })
        }
          
      </div>
    </div>
    
  </Fragment>
  )
}



