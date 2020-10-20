import React, { Component } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Search from "./search"
import Loader from "./loader"


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading  : 0,
          data : []
        };
        this.loader = this.loader.bind(this);
    }
    loader()
    {
      console.log("Loader called");
      fetch("https://cors-anywhere.herokuapp.com/https://task-backend-newtonschool.herokuapp.com/",
        { 
          method: "get",
          headers: 
          {
            "Content-Type": "application/json",
          },
        }).then((res) => {
        res.json().then((data) => {
          console.log(data);
          if(data.success === true)
          {
            this.setState({
              loading : 1,
              data : data.data
            })
          }
          else
          {
            this.setState({
              loading : 2,
            }) 
          }
        })
      }).catch(
         this.setState({
            loading : 2,
         }) 
      );
    }
    componentDidMount()
    {
      this.loader();
    }
    render() {
      if(this.state.loading === 0)
      {
         return ( 
            <>
              <Loader/>
            </>
        ); 
      }
      else if(this.state.loading === 1)
      {
        return ( 
            <div>
            <BrowserRouter >
            <div className = "main" >
                  <div className = "head row pt-3" >
                        <div className = "col-12" >
                              ISSUES
                        </div>
                  </div>
                  <Search data={this.state.data}/>
            </div>
            </BrowserRouter>
            </div>
        );
      }
      else
      {
        return ( 
            <>
              <Loader/>
            </>
        ); 
      }
    }
}

export default App;