import React, { Component } from "react";
import "./App.css";


class Search extends Component{
  constructor(props)
  {
    super(props);
    this.state = {
      update : 0,
      uid:null,
      uhead:null,
      udescription:null,
      ustatus : null,
      page:1,
      num:0,
      filter:[],
      view:[],
      data:[],
      search:""
    }
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.searchButton = this.searchButton.bind(this);
    this.searchText = this.searchText.bind(this);
    this.isOpen = this.isOpen.bind(this);
    this.isClosed = this.isClosed.bind(this);
    this.updt = this.updt.bind(this);
    this.updateHead = this.updateHead.bind(this);
    this.updateDesc = this.updateDesc.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateIssue = this.updateIssue.bind(this);
    this.cancel = this.cancel.bind(this);
    this.newIssue = this.newIssue.bind(this);
    this.noob = this.noob.bind(this);
    this.delete = this.delete.bind(this);
    this.rendify = this.rendify.bind(this);
    this.all = this.all.bind(this);
  }

  updt(id,head,description,status)
  {
    this.setState({
      update : 1,
      uid : id,
      uhead : head,
      udescription:description,
      ustatus : status
    })
  }

  noob()
  {
    this.setState({
      update:2,
      uhead : "",
      udescription:"",
    })
  }

  updateHead(event)
  {
    console.log(event.target.value)
    this.setState({
        uhead : event.target.value
    });
  }

  updateDesc(event)
  {
    console.log(event.target.value)
    this.setState({
        udescription : event.target.value
    });
  }

  updateStatus()
  {
    this.setState({
        ustatus : (this.state.ustatus === 0)?(1):(0)
    });
  }

  updateIssue()
  {
    console.log(this.state.uid)
    fetch(`https://cors-anywhere.herokuapp.com/https://task-backend-newtonschool.herokuapp.com/update-issue/${this.state.uid}`,
        { 
          method: "PATCH",
          headers: 
          {
            "Content-Type": "application/json",
          },
          body:JSON.stringify({
            head:this.state.uhead,
            description : this.state.udescription,
            status : this.state.ustatus
          })
        }).then((res) => {
        res.json().then((data) => {
          console.log(data);
          if(data.success === true)
          {
            console.log("Updated info")
            window.location.reload();
          }
          else
          {
            alert("Failed to update");
          }
        })
      }).catch(
         console.log("Failed to update")
      );
  }

  newIssue()
  {
    if(this.state.uhead.length === 0 || this.state.udescription.length === 0)
    {
      alert("Field empty")
    }
    else
    {
      fetch(`https://cors-anywhere.herokuapp.com/https://task-backend-newtonschool.herokuapp.com/add-issue`,
        { 
          method: "POST",
          headers: 
          {
            "Content-Type": "application/json",
          },
          body:JSON.stringify({
            head:this.state.uhead,
            description : this.state.udescription,
          })
        }).then((res) => {
        res.json().then((data) => {
          console.log(data);
          if(data.success === true)
          {
            console.log("Created issue")
            window.location.reload();
          }
          else
          {
            alert("Failed to update");
          }
        })
      }).catch(
         console.log("Failed to update")
      );
    }
  }

  cancel()
  {
    this.setState({
      update : 0
    })
  }

  delete(id)
  {
    fetch(`https://cors-anywhere.herokuapp.com/https://task-backend-newtonschool.herokuapp.com/delete-issue/${id}`,
        { 
          method: "DELETE",
          headers: 
          {
            "Content-Type": "application/json",
          },
        }).then((res) => {
        res.json().then((data) => {
          console.log(data);
          if(data.success === true)
          {
            console.log("Updated info")
            window.location.reload();
          }
          else
          {
            alert("Failed to update");
          }
        })
      }).catch(
         console.log("Failed to update")
      );
  }

  searchText(event)
  {
    this.setState({
      search:event.target.value
    })
  }

  searchButton()
  {
    this.setState({
      view : []
    })
    var temp = [];
    console.log(this.state.search)
    this.state.data.forEach((item)=>{
      if(item.head.toLowerCase().includes(this.state.search.toLowerCase()))
      {
        temp.push(item);
      }
    });
    console.log(temp)
    this.setState({
     view : temp,
     num:Math.ceil((temp.length)/10)
    },this.rendify)
  }

  isOpen()
  {
    this.setState({
      view : []
    })
    var temp = [];
    this.state.data.forEach((item)=>{
      if(item.status === 0)
      {
        temp.push(item);
      }
    });
    this.setState({
     view : temp,
     num:Math.ceil((temp.length)/10)
    },this.rendify)
  }

  isClosed()
  {
    this.setState({
      view : []
    })
    var temp = [];
    this.state.data.forEach((item)=>{
      if(item.status === 1)
      {
        temp.push(item);
      }
    });
    this.setState({
     view : temp,
     num:Math.ceil((temp.length)/10)
    },this.rendify)
  }

  all()
  {
    this.setState({
      view : this.state.data,
      num:Math.ceil((this.state.data.length)/10)
    },()=>{
      console.log(this.state.view);
      this.rendify()
    })
  }

  prev()
  {
    console.log("prev")
    let t = this.state.page-1;
    this.setState({
      page : t,
      filter : this.state.view.slice((t-1)*10,t*10)
    });
  }

  next()
  {
    console.log("next")
    let t = this.state.page+1;
    this.setState({
      page : t,
      filter : this.state.view.slice((t-1)*10,t*10)
    });
  }

  rendify()
  {
    console.log("Rendify called")
    this.setState({
      filter : this.state.view.slice(0,10)
    })
  }

  componentDidMount()
  {
    this.setState({
      data : this.state.data.reverse(),
      filter : this.state.view.slice(0,10)
    })
  }

  render(){
    if(this.state.update === 0)
    {
      return(
      <>
      <div className = "search row" >
              <div className = "search col-12 col-sm-6" >
                    <div className = "row py-3" >
                          <div className = "col-6 text-center my-auto" >
                                <div class = "input-group input-group-sm" >
                                      <input type = "text"
                                      class = "form-control"
                                      onChange={this.searchText}
                                      aria-label = "Small"
                                      aria-describedby = "inputGroup-sizing-sm" / >
                                </div>
                          </div>
                          <div className = "col-3 text-center my-auto" >
                                <div class = "input-group input-group-sm" >
                                      <button type = "submit"
                                      value = "Is Open"
                                      onClick={this.searchButton}
                                      class = "form-control btn btn-primary"
                                      aria-label = "Small"
                                      aria-describedby = "inputGroup-sizing-sm" > Search </button>
                                </div>
                          </div>
                          <div className = "col-3" >
                                <div class = "input-group input-group-sm" >
                                      <button type = "submit"
                                      value = "Is Open"
                                      onClick={this.noob}
                                      class = "form-control btn btn-primary"
                                      aria-label = "Small"
                                      aria-describedby = "inputGroup-sizing-sm" > New </button>
                                </div>
                          </div>
                    </div>
              </div>
              <div className = "buttons col-12 col-sm-6" >
                    <div className = "row py-3" >
                          <div className = "col-4" >
                                <div class = "input-group input-group-sm" >
                                      <button type = "submit"
                                      value = "Is Open"
                                      onClick={this.isOpen}
                                      class = "form-control btn btn-primary"
                                      aria-label = "Small"
                                aria-describedby = "inputGroup-sizing-sm" > Is Open </button> </div>
                          </div>
                          <div className = "col-4" >
                                <div class = "input-group input-group-sm" >
                                      <button type = "submit"
                                      value = "Is Open"
                                      onClick={this.isClosed}
                                      class = "form-control btn btn-primary"
                                      aria-label = "Small"
                                aria-describedby = "inputGroup-sizing-sm" > Is Closed </button> </div>
                          </div>
                          <div className = "col-4" >
                                <div class = "input-group input-group-sm" >
                                      <button type = "submit"
                                      value = "Is Open"
                                      onClick={this.all}
                                      class = "form-control btn btn-primary"
                                      aria-label = "Small"
                                      aria-describedby = "inputGroup-sizing-sm" > All </button>
                                </div>
                          </div>
                    </div>
              </div>
        </div>
        <div className="issues px-3">
             {this.state.filter.map((item,index)=>(
                 <div className="row border border-light rounded my-1 mb-2">
                  <div className="col-12">
                     <div className="row">
                       <div className="col-6" onClick={()=>{this.updt(item.id,item.head,item.description,item.status)}}>
                         <h5 className="mt-2">{item.head.slice(0,50)}</h5>
                         <p className="">{item.description.slice(0,50)}...</p>
                       </div>
                       <div className="col-4 pt-2" onClick={()=>{this.updt(item.id,item.head,item.description,item.status)}}>
                         {(item.status === 0)?(<><span class="badge badge-success">Open</span></>):(<><span class="badge badge-danger">Closed</span></>)}
                       </div>
                       <div className="col-2 text-right py-3 d-flex flex-row-reverse">
                         <button type="button" onClick={()=>{this.delete(item.id)}} class="btn btn-light my-1">Delete</button>
                       </div>
                     </div>
                  </div>
               </div>
             ))}
        </div>
        <div className="pgnum px-5 py-3 mb-3">
          <div className="row">
            <div className="col-3">
              {(this.state.page === 1)?(<></>):(<button type="button" onClick={this.prev} class="btn btn-light">Prev</button>)}
            </div>
            <div className="offset-1 col-4 text-center">
              {this.state.page}/{this.state.num}
            </div>
            <div className="offset-1 col-3 text-right">
              {(this.state.page === this.state.num)?(<></>):(<button type="button" onClick={this.next} class="btn btn-light">Next</button>)}
            </div>
          </div>
        </div>
      </>
      );
    }
    else if(this.state.update === 1)
    {
      return(
        <>
          <div className="my-3">
            <label for="inputPassword5">Head</label>
            <input type="text" id="inputPassword5" onChange={this.updateHead} class="form-control" aria-describedby="passwordHelpBlock" value={this.state.uhead}/>
          </div>
          <div className="my-3 mb-4">
            <label for="inputPassword5">Description</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" onChange={this.updateDesc} value={this.state.udescription} rows="3"></textarea>
          </div>
          <div className="pb-4">
            <label for="inputPassword5">Status</label><br/>
            <div class="btn-group btn-group-toggle" data-toggle="buttons">
              <label class="btn btn-secondary active">
                <input type="radio" onClick={this.updateStatus} name="options" id="option1" autocomplete="off"/> {(this.state.ustatus === 0)?"Open":"Closed"}
              </label>
            </div>
            <small id="emailHelp" class="form-text text-muted">Click to toggle.</small>
          </div>
          <div className="row">
            <div className="col-3 col-sm-1">
              <button type="button" onClick={this.updateIssue} class="btn btn-light">Update</button>
            </div>
            <div className="col-3 col-sm-1">
              <button type="button" onClick={this.cancel} class="btn btn-light">Cancel</button>
            </div>
          </div>
        </>
      );
    }
    else
    {
       return(
        <>
          <div className="my-3">
            <label for="inputPassword5">Head</label>
            <input type="text" id="inputPassword5" onChange={this.updateHead} class="form-control" aria-describedby="passwordHelpBlock" value={this.state.uhead}/>
          </div>
          <div className="my-3 mb-4">
            <label for="inputPassword5">Description</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" onChange={this.updateDesc} value={this.state.udescription} rows="3"></textarea>
          </div>
          <div className="row">
            <div className="col-3 col-sm-1">
              <button type="button" onClick={this.newIssue} class="btn btn-light">Add</button>
            </div>
            <div className="col-3 col-sm-1">
              <button type="button" onClick={this.cancel} class="btn btn-light">Cancel</button>
            </div>
          </div>
        </>
      ); 
    }
  }
}

export default Search;