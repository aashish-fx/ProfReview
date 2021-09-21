import React, { Component } from "react";
import "./Template.css";
import { Link } from "react-router-dom";
//import Header from '../../Header/Header';
import Footer from "../../Footer/Footer";

class Template extends Component {
  state = {
    image: "",
    name: "",
    domain: "",
    college: "",
    breif: "",
    details: "",
    researchgate: "",
    email_id: "",
  };
  componentDidMount() {
    const profileId = this.props.match.params.profileId;
    console.log(profileId);
    fetch("http://localhost:4000/search/" + profileId)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch Profile");
        }
        console.log(res, "*");
        return res.json();
      })
      .then((resData) => {
        console.log(resData.post.image);
        this.setState({
          image: resData.post.image,
          name: resData.post.name,
          domain: resData.post.domain.split("\n"),
          college: resData.post.college,
          breif: resData.post.breif,
          details: resData.post.details,
          researchgate: resData.post.researchgate,
          email_id: resData.post.email_id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({ domainarray: this.state.domain.split("") });
  }
  render() {
    return (
      <React.Fragment>
        <div className="template_header">
          <div className="template-header-link1">
            <Link to="/">
              <span>ProfReview</span>
            </Link>
          </div>
          <div className="template-header-link2">
            <Link to="/search">
              <span>Search</span>
            </Link>
          </div>
        </div>
        <div className="templateResearchFaculty">
          <p>Research Faculty</p>
        </div>
        <div className="templatediv">
          <div className="templateContent">
            <div className="templateContent1">
              <img
                src={`/uploads/${this.state.image}`}
                alt="..."
                className="templateImage"
              ></img>
              <p>{this.state.name}</p>
              <span className="spn_domain">
                Domains: <br></br>
              </span>
              <span className="spn_domain1">
                {" "}
                {this.state.domain[0]}
                <br></br>
                {this.state.domain[1]}
                <br></br>
                {this.state.domain[2]}
              </span>
            </div>
            <div className="templateContent2">
              <span>College:{this.state.college}</span>

              <p>{this.state.details}</p>
              <div className="templateContent2Links">Useful Links </div>
              <ul>
                <li>
                  Profile: <a href={this.state.email_id}> {this.state.name}</a>
                </li>
                <li>
                  google schlr:
                  <a href={this.state.researchgate}>{this.state.name}</a>
                </li>
                <li>
                  College Site:
                  <a href="https://www.iiitkottayam.ac.in/#!/home">
                    {this.state.college}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Footer />
      </React.Fragment>
    );
  }
}
export default Template;

/*
<div className="templateReview">
                        Rate Us
                        <div class="rate">
                            <input type="radio" id="star5" name="rate" value="5" />
                            <label for="star5" title="text">5 stars</label>
                            <input type="radio" id="star4" name="rate" value="4" />
                            <label for="star4" title="text">4 stars</label>
                            <input type="radio" id="star3" name="rate" value="3" />
                            <label for="star3" title="text">3 stars</label>
                            <input type="radio" id="star2" name="rate" value="2" />
                            <label for="star2" title="text">2 stars</label>
                            <input type="radio" id="star1" name="rate" value="1" />
                            <label for="star1" title="text">1 star</label>
                        </div>
                    </div>
                    <div className="templateTextArea">
                        <textarea  required placeholder="write your message"></textarea>
                    </div>
                    <div className="templateSubmit">
                        <input type="submit" value="send">
                        </input>
                    </div>
*/
