import React,{useState,Component} from "react";
import "./Cards1.css";

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

//Owl Carousel Settings
const options = {
  margin: 30,
  responsiveClass: true,
  loop:true,
  autoplay: true,
  autoplayTimeout:3000,
  autoplayHoverPause:true,
  stagePadding:1,
  smartSpeed: 1000,
  responsive: {
      0: {
          items: 1,
      },
      300: {
          items: 2,
      },
      650: {
          items: 3,
      },
      1000: {
          items: 4,
      }
  },
};

class Cards1 extends  Component{
    state={
        data:[],
        name:''
    }

    componentDidMount(){
        
        this.setState({name:localStorage.getItem("userName")});
        fetch("http://localhost:8080/rating")
        .then(res=>{
            if(res.status!==200)
            { console.log("error");
                return;
            }
            return res.json();
        })
        .then(resData=>{
          this.setState({data:resData.ratings})    
        
        })
        .catch(err=>{
            console.log(err);

        })
        console.log(this.state.data,"****");
    }
    render(){
  return (
        <React.Fragment>
        <div className="card1-container">
    
            {this.state.data.map(post=>{
             console.log(post.rating,"as");
              return  <div className="card1-main">
                <div className="card1-heading">
                    <h1 className="profile1-name">{post.user}</h1>
                    
                    {post.rating===1 && 
                        <p className="profile1-position">
                        <i class="fa fa-star" aria-hidden="true"></i>
                        
                        </p>
                     }
                    {post.rating===2 && 
                        <p className="profile1-position">
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        </p>
                     }
                     {post.rating===3 && 
                        <p className="profile1-position">
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        </p>
                     }
                     {post.rating===4 && 
                        <p className="profile1-position">
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        </p>
                     }
                     {post.rating===5 && 
                        <p className="profile1-position">
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        </p>
                     }
                </div>
                <p className="profile1-body">
                    {post.message}
                </p>
                </div>
                    
            })}
        
            
            

       
        </div>
        </React.Fragment>
    );
    }
};
export default Cards1;