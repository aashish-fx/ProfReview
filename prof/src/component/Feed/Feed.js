import React ,{Component} from 'react';
import ErrorHandler from '../ErrorHandler/ErrorHandler';
import Loader from '../Loader/Loader';
import './feed.css';
import Paginator from '../Paginator/Paginator';
import Post from '../Post/Post';
import Footer from '../Footer/Footer';

import {Link} from 'react-router-dom';
class Feed extends Component{
    state= {
        isEditing:false,
        posts:[],
        totalPosts:0,
        editPosts:null,
        status:'',
        postPage:1,
        postsLoading:true,
        editLoading:false
    };
    userName = localStorage.getItem('userName')
    componentDidMount(){
        fetch('url').then(res=>{
            if(res.status!==200){
                throw new Error('Failed to fetch.');
            }
            return res.json();
        })
        .then(resData=>{
            this.setState({status:resData.status});
        })
        .catch(err=>{
            console.log(err);
        });
        this.loadPosts();
    }
    loadPosts = (dir)=>{
        if(dir){
            this.setState({postsLoading:true,posts:[]});
        }
        let page = this.state.postPage;
        if(dir==='next')
        {
            page++;
            this.setState({postPage:page});
        }
        if(dir==='previous'){
            page--;
            this.setSate({postPage:page});
        }
        console.log(1);
        fetch('http://localhost:8080/feed/posts')
        .then(res=>{
            
            if(res.status!==200 )
            {
                throw new Error('Failed to fetch posts.');
            }

            return res.json();
        })
        .then(resData=>{
            this.setState({
                posts:resData.posts.map(post=>{
                    return {
                        ...post
                    };
                }),
                
                totalPosts:resData.totalItems,
                postsLoading:false
            });
            
        })
        .catch(this.catchError);
    }
    newPostsHandler = ()=>{
        this.setState({isEditing:true});
    }
    cancelEditHandler = ()=>{
        this.setState({isEditing:false,editPost:null});
    };
    
    deletePostHandler = postId=>{
        this.setState({postsLoading:true});
        fetch('http://localhost:8080/feed/post/'+postId,{
            method:'DELETE'
        })
        .them(res=>{
            if(res.status!==200 && res.status!==201)
            {
                throw new Error('Deleting a post failed!');
            }
            return res.json();

        })
        .then(resData=>{
            console.log(resData);
            this.setState(prevState=>{
                const updatedPosts = prevState.posts.filter(p=>p._id!==postId);
                return {posts:updatedPosts,postLoading:false};
            });
        })
        .catch(err=>{
            console.log(err);
            this.setState({postsLoading:false});
        });
    };
    errorHandler = ()=>{
        this.setState({error:null});
    }
    catchError = error=>{
        this.setState({error:error});
    };
   render(){
       return (
           <React.Fragment>
                <div className="login1Header">
                    <Link to='/'><span>ProfReview</span></Link>
                    <p>Posts</p>
                </div>
               <ErrorHandler error={this.state.error} onHandle={this.errorHandler}></ErrorHandler>
               <section className="feed">
                    {this.state.postsLoading && (
                        <div style={{textAlign:'center',position:'relative',top:'5rem'}}>
                            <Loader/>
                        </div>
                    )}
                    {this.state.posts.length<=0 && !this.state.postsLoading?(
                        <p style={{textAlign:'center',marginTop:'2rem'}}>No post Found</p>
                    ):null}
                    {!this.state.postsLoading && 
                           <Paginator
                           onPrevious={this.loadPosts.bind(this, 'previous')}
                           onNext={this.loadPosts.bind(this, 'next')}
                           lastPage={Math.ceil(this.state.totalPosts / 2)}
                           currentPage={this.state.postPage}
                         >
                           {this.state.posts.map(post => (
                               
                             <Post
                               key={post._id}
                               id={post._id}
                               author={post.creator.name}
                               date={new Date(post.createdAt).toLocaleDateString('en-US')}
                               title={post.title}
                               
                               content={post.content}
                             />
                            
                           ))}
                         </Paginator>
                       
                        
                    }
               </section>
               <Footer/>
           </React.Fragment>
       );
   } 
}
export default Feed;