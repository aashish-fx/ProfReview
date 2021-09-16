import React,{useState} from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
const Dashboard = (props)=>{
    const [posts,setPosts] = useState([]);
    
        fetch('http://localhost:8080/dashboard/:token')
        .then(res=>{
            if(res.status!==200){
                props.postCreated = false;
                return;
            }
            return res.json();
        })
        .then(resData=>{
            setPosts(resData.posts.map(post=>{return post}));
        })
        .catch(err=>{
            console.log(err);

        })
    
    console.log(posts)
    return (
        <div className="dashboard-container">
            <div className="profile-header"><Link to="/"><span>ProfReview</span></Link></div>
            <div className="dashboard-content">
                <div className="dashboard-text">Dashboard</div>
                <div className="dashboard-box-div">
                   <span>Posts</span> 
                    <div className="dashboard-box">
                       {!props.postCreated && <div className="dashboard-box-text">You do not have any post yet</div>} 
                        {!props.postCreated && <div className="dashboard-box-button"><Link to="/create-post"><button>Create yout first post</button></Link></div>}
                        
                    </div>
                   
                </div>
            </div>
            <Footer/>
        </div>
    ); 
};
export default Dashboard;