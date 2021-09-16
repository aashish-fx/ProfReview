import React from 'react';
import {Link} from 'react-router-dom';
import './CreatePost.css';
import useInput from '../../Hooks/use-input';

const CreatePost = (props)=>{
    
    const {value:enteredTitle,
        isValid:enteredTitleIsValid,
        hasError:titleHasError,
        valueChangeHandler:titleChangeHandler,
        inputBlurHandler:titleBlurHandler,
        reset:resetTitleInput} = useInput((value)=>value.trim().length>=6);
    
    const {value:enteredContent,
        isValid:enteredContentIsValid,
        hasError:contentHasError,
        valueChangeHandler:contentChangeHandler,
        inputBlurHandler:contentBlurHandler,
        reset:resetContentInput} = useInput((value)=>value.trim().length>=6);

    const formSubmitHandler = (event)=>{
        
        props.updatePost(event,{title:enteredTitle,content:enteredContent});
        
    }    
       return (
        <React.Fragment>
            
            <div className="createpost-container">
                <div className="profile-header"><Link to="/"><span>ProfReview</span></Link></div>
                <div className="createpost-form-container">
                    <div className="createpost-form">
                        <form onSubmit={formSubmitHandler}>
                            <textarea placeholder="New post title..." 
                            value={enteredTitle}
                            onChange={titleChangeHandler}
                            onBlur={titleBlurHandler}/>
                            
                            <textarea placeholder="Write your post here..."
                             value={enteredContent}
                             onChange={contentChangeHandler}
                             onBlur={contentBlurHandler}
                            />
                            <button type="submit">Publish</button>
                        </form>
                        
                    </div>
                </div>
            </div>
            
        </React.Fragment>
       )
   
};
export default CreatePost;
