import React ,{Component} from 'react';
import { Link } from 'react-router-dom';
import './SinglePost.css';
import Loader from '../../Loader/Loader';
class SinglePost extends Component{
    state={
        title:'',
        author:'',
        date:'',
        content:''
    };
    componentDidMount(){
        const postId = this.props.match.params.postId;
        console.log(postId);
        fetch('http://localhost:8080/feed/post/'+postId)
        .then(res=>{
            if(res.status!==200)
            {
                throw new Error('Failed to fetch status');
            }
            return res.json();
        })
        .then(resData=>{
            this.setState({
                title:resData.post.title,
                author:resData.post.creator.name,
                date:new Date(resData.post.createdAt).toLocaleDateString('en-us'),
                content:resData.post.content
            });
        })
        .catch(err=>{
            console.log(err);
        });
    }
    render(){
        return (
            <React.Fragment>
            <div className="login1Header">
                    <Link to='/'><span>ProfReview</span></Link>
                    
            </div>
            {this.state.title==='' && 
            (<div style={{textAlign:'center',position:'relative',top:'5rem'}}>
                    <Loader/>
            </div>)}
            {this.state.title!=='' &&
                <section className="single-post">
                    
                    <h1>{this.state.title}</h1>
                    <h2>Create by {this.state.author} on {this.state.date}</h2>
                    <div>
                        <p>{this.state.content}</p>
                    </div>
                </section>
            }
            </React.Fragment>
        );
    }
};
export default SinglePost;