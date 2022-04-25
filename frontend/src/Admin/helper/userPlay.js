import React, { useCallback, useEffect,useMemo,useState } from "react";
import { allActiveMusicArray, getAllProducts,sendbookmark} from ".";
import { isAuthenticated } from "../../Auth/helper"
import { API } from "../../backend"
import LoggedInNavbar from "./loggedInNavbar";
import ReactPlayer from 'react-player/lazy'





const UserPlay=()=>{
    let mediatype=1;
    
    let [products,setAllProducts]=useState([])
    let [playval,setplayval]=useState({
        isplay:false,
        itemid:"",
       
    });
    let [isReady,setReady]=useState(false);

 let [recentlyplayed ,setplayed]=useState([])
 let [bookmarkarray,setbookmark]=useState([])

    const {isplay,itemid}=playval;
   
    const playerref=React.useRef();


    useEffect(()=>{
     console.log("helly")
        showmyFav()
    },[bookmarkarray])

   const showmyFav=()=>{
       console.log("Hello")
       return(<>
    {bookmarkarray.map((item,key)=>{
        return(
       <>
        <span style={{cursor:"pointer",fontSize:"20px", height:"50px"}} >
          <div className=" card w-75" style={{backgroundColor:"#05445E" ,color:"white",cursor:"pointer"}} onClick={()=>{
console.log(item._id)
setplayval({isplay:true,itemid:item.prouctId,user:isAuthenticated().user._id});
setReady(false)
watchedvedio(item.prouctId,0)
getActiveMusicArray()
}}>
<div className="card-body">
<h6 className="card-title"> <i className="fa fa-play-circle"></i>{item.productName}</h6>
<p className="card-text">   </p>
</div>
</div>
</span>
 <br />
</>

        
      )

    })
   
}
</>)}
   
   
  
    const getActiveMusicArray=async()=>{

        let c=isAuthenticated();
    await allActiveMusicArray(c.user._id,c.token).then((as)=>{
      setplayed(as.ActiveMusic)
    }).catch((e)=>{
        alert("Failed to load resource");
        return false;
    })

    }


    const bookmark=async(uuid)=>{
        let cc=isAuthenticated();
        await sendbookmark(cc.user._id,cc.token,{"productId":uuid}).then(rep=>{
         setbookmark(rep)
        }).catch(e=>{
            console.log("error")
        })
    }

        const showMedia=(uid,iid)=>{
          //  console.log( isAuthenticated().user.ActiveMusic)
          // console.log("thi is  showmedia rnder")
          console.log(playval)
            return(
           <div>

            <abbr title="Bookmark this video"> <i className="fa fa-bookmark" style={{float:"right",fontSize:"25px",cursor:"pointer"}} onClick={()=>bookmark(iid)}></i> </abbr>
                <ReactPlayer
                           height={500}
                           ref={playerref}
                            url= {`${API}user/getproduct/${uid}/${iid}`}
                            playing={true}
                            controls={true}
                     
                            config={{ file: { 
                                attributes: {
                                  controlsList: 'nodownload'  //<- this is the important bit
                                }
                            }}}
                            onReady={readyState}
                            progressInterval={20000}
                             onProgress={(r)=>{
                              
                               
                               watchedvedio(itemid,r.playedSeconds)
                                 
                             }

                            }

                            onEnded={()=>{
                                watchedvedio(itemid,0)
                            }}

                         
                            
                        />
                             
                   
                            </div>

                         
                            
                            )
                    
            
        }
    
    
    const readyState=async()=>{
console.log("rerendering")
        
      let sec=0;
      console.log(itemid)
    
   await isAuthenticated().user.ActiveMusic.map((e)=>{
               
            if(e.itemid===itemid)
              {
              console.log(e.seconds)
              sec=parseInt(e.seconds)
              }
          })
        
   console.log(sec)
   
        if(!isReady ){
            console.log(sec)
         
     await  playerref.current.seekTo(parseInt(sec))
            setReady(!isReady)
        }
    }


    
     
     
        

    const watchedvedio=async(item_id,playedSeconds)=>{
      
        

     let getvalues= await isAuthenticated();

     let newvl={"itemid":item_id,"seconds":Math.floor(playedSeconds)};
 
        return await fetch(`${API}user/savedata/${getvalues.user._id}/${item_id}`,
        {
            method:"PATCH",
            headers:{
               Accept:"application/json",
               "Content-Type":"application/json",
               Authorization: `Bearer ${getvalues.token}`  
            },

            body: JSON.stringify({"ActiveMusic":newvl})
        }
        )
    }
 
    useEffect(()=>{
        console.log("This is useeffect")
        const fetchdata=async ()=>{
        try{
        let c=  await isAuthenticated();
        const {token,user}=c;
      
        
        
        let params = new URLSearchParams(document.location.search);
        let musicid = params.get("musicid"); // is the string "Jonathan"
      
       await getAllProducts(user._id,token,musicid).then(x=>{
         console.log(x)
          if(x[0].productCategory.categoryName=="Vedios")
           {
               mediatype=1
           }
           else{
               mediatype=0
           }

            setAllProducts(x)

        }).catch()

        await allActiveMusicArray(c.user._id,c.token).then((as)=>{
            console.log(as.Bookmark)
            let newBookmark=new Array();
          as.Bookmark.map((r,n)=>{
              console.log(r)
              if(r.CategoryName==mediatype){
                  console.log("helo")
                newBookmark.push(r)
              }
          })
          console.log(newBookmark)
          

            setplayed(as.ActiveMusic)
            setbookmark(newBookmark.reverse())
          }).catch((e)=>{
              alert("Failed to load resource");
              return false;
          })
    }
    catch{

    }
}

fetchdata()
//getActiveMusicArray()
    },[])


   


    

    return(
    
    <div>
    
    <LoggedInNavbar/>
    <br/>
    <div className="row">
 
 <div className="col-sm-6" >
     <center>  {
       isplay ? showMedia(isAuthenticated().user._id,itemid) : <center><h5 style={{padding:"100px"}}>Select Vedio from Playlist</h5></center>
   }

</center>
 
  
 
 </div>
 
<br />
 <div className="col-sm-6" style={{overflowY:"scroll",height:"500px",marginTop:"10px"}}>
    
     <center> <h3 style={{color:"white",fontWeight:"bolder"}}>Playlist</h3> <hr />
     <br />
     <span >     {products.map((item,key)=>
    {
    
        return(<div>
        <div  key={item.item_id}>
        <span   style={{cursor:"pointer",fontSize:"20px", height:"50px"}}  onClick={()=>{
 console.log(item._id)
 setplayval({isplay:true,itemid:item._id,user:isAuthenticated().user._id});
 setReady(false)
 watchedvedio(item._id,0)
 getActiveMusicArray()
}} >

        <div className="card w-75" style={{backgroundColor: isAuthenticated().user.ActiveMusic.some((q)=>{
            if(q.itemid===item._id){
             return true
            }
        }) || recentlyplayed.some((w)=>{
            if(w.itemid==item._id){
                return true
            }
        }) ? "#006400":"#FF1493" ,color:"white"}}>
  <div className="card-body">
    <h5 className="card-title"> <i className="fa fa-play-circle"></i>  {item.productName}</h5>
    <p className="card-text">    {isAuthenticated().user.ActiveMusic.map((playid)=>{
            
             return( playid.itemid==item._id ? <i style={{fontSize:"8px"}}> (recently played)</i> : "")
            })}</p>
  
  </div>
</div>

         </span>
       
        
          <br/>
         
      
          </div>


    
          
       
        </div>)
    })
}
</span>
 
</center>

 </div>


    </div>

 <br /><br/> <br /><br />

<div className="container">

<div className="row">
    <center><h3 style={{color:"white"}}>My Favourites</h3><hr />
      {showmyFav()}
    
    </center>
</div>

</div>

           
              
    




    </div>
    

 

)}

export default React.memo(UserPlay);
