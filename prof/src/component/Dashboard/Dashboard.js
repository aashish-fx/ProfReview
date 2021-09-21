import React,{Component, useState} from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Paginator from '../Paginator/Paginator';
import DashboardPosts from '../DashboardPost/DashboardPosts';
class Dashboard extends Component{
    state = {
        posts:[],
        containPost:false,
        isDeleted:false
    };
    componentDidMount(){
        const userId = localStorage.getItem('userId');
        fetch('http://localhost:8080/feed/posts')
        .then(res=>{
            if(res.status!==200){
                return;
            }
            return res.json();
        })
        .then(resData=>{
            console.log("web");
            const updatedPosts = resData.posts.filter(post=>post.userId===userId);
            console.log(updatedPosts);
            this.setState({posts:updatedPosts});
        })
        .catch(err=>{
            console.log(err);

        })
        console.log(this.state.posts);
        if(this.state.posts.length>0)
        {
            console.log(this.state.posts);
            this.setState({containPost:true});
        }
    }
    deletePostHandler=(eve)=>{
        console.log(eve);
        fetch('http://localhost:8080/feed/post/'+eve,{
            method:'DELETE'
        })
        .then(res=>{
            if(res.status!==200 && res.status!==201)
            {
                return;
            }
            
            return res.json();

        })
        .then(resData=>{
            this.callBack();
            console.log(this.props);
        
            
        })
    }
    callBack = ()=>{
        const userId = localStorage.getItem('userId');
        fetch('http://localhost:8080/feed/posts')
        .then(res=>{
            if(res.status!==200){
                return;
            }
            return res.json();
        })
        .then(resData=>{
            console.log("web");
            const updatedPosts = resData.posts.filter(post=>post.userId===userId);
            console.log(updatedPosts);
            this.setState({posts:updatedPosts});
        })
        .catch(err=>{
            console.log(err);

        })
        console.log(this.state.posts);
        if(this.state.posts.length>0)
        {
            console.log(this.state.posts);
            this.setState({containPost:true});
        }
    }
    
    render(){
            return (
                <div className="dashboard-container">
                    <div className="profile-header"><Link to="/"><span>ProfReview</span></Link></div>
                    <div className="dashboard-content">
                        <div className="dashboard-text">Dashboard</div>
                        <div className="dashboard-box-div">
                        <span>Your Posts</span> 
                            <div className="dashboard-box">
                                {!this.state.posts.length && <div className="dashboard-box-text">You do not have any post yet</div>} 
                            
                                {!this.state.posts.length && <div className="dashboard-box-button"><Link to="/create-post"><button>Create yout first post</button></Link></div>}
                                { <Paginator>
                                        {this.state.posts.map(post=><DashboardPosts 
                                        key={post._id}
                                        id={post._id}
                                        title={post.title}
                                        deletePostId = {this.deletePostHandler}
                                        content={post.content}
                                        />)}
                                    </Paginator>
                                }
                            </div>
                        
                        </div>
                    </div>
                    <Footer/>
                </div>
            );
    } 
};
export default Dashboard;