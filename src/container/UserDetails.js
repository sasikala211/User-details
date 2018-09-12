import React,{Component}  from 'react';
import superagent from 'superagent';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import UserList from '../components/UserList.js';
import ActiveUser from '../components/ActiveUser.js';
import AddUserModal from  './AddUserModal.js';

export default class UserDetails extends Component{
  static displayName='User-Details';
  constructor(props){
    super(props)
      this.state={
        userListArray:[],
        showModal:false,
        activeUser:{},
        ar:[],
        addedWithInitial:[],
        temp : []
      };
          this.getPreLoadedData=this.getPreLoadedData.bind(this)
          this.handleActiveUsers=this.handleActiveUsers.bind(this)
          this.handleDeleteusers=this.handleDeleteusers.bind(this)
          this.handleAddUser=this.handleAddUser.bind(this)
  }
componentWillMount(){
  this.getPreLoadedData();
}
getPreLoadedData(){
  if(sessionStorage.getItem("Users")!=null){
    this.setState({
      userListArray:JSON.parse(sessionStorage.getItem("Users"))
    })
  }else{
  let preLoadedData={};
  superagent
       .get('http://localhost:3001/People')
       .end((err, res) => {
         preLoadedData=(res.body);
         preLoadedData.map((obj)=>{
         obj.checkBoxValue=false;
         })
          this.setState({
            userListArray:preLoadedData
          })
       });
}
}
showUserModal(){
    this.setState({
        showModal:true
    })
}
handleActiveUsers(param){
  this.setState({
      activeUser:param,
      showModal:false
  })
}
handleAddUser(obj){
  var arr=this.state.userListArray;
    let data=JSON.parse(JSON.stringify((obj)))
    arr.push(data);
    sessionStorage.setItem("Users",JSON.stringify(arr))
    this.setState({
      userListArray:arr,
      showModal:false
    })
}
handleDeleteusers(usersArray){
  let deleteObj=usersArray;
  let intialData=this.state.userListArray;
  deleteObj.map((deteObj,index1)=>{
    intialData.map((wholeobj,index2)=>{
      if(deteObj==wholeobj){
        intialData.splice(index2,1);
      }
    })
  })
  sessionStorage.setItem("Users",JSON.stringify(intialData))
    this.setState({
      userListArray:intialData
    })
}
render(){
     return(
      <div className="col-lg-12 col-md-12 col-xs-12">
        <div>
          <div className="col-xs-12 col-md-12">
            <div className="col-xs-10 col-md-8 heading">User Details</div>
            <div className="col-xs-2 col-md-4 add-text">
              <div className="col-xs-4 ">Add User</div>
              <div className="col-xs-8 add-icon">
                <Button onClick={this.showUserModal.bind(this)} variant="fab" color="primary" aria-label="Add" >
                  <AddIcon />
                </Button>
              </div>
            </div>
          </div>
          <hr/>
        </div>
           <div className="col-lg-4 col-md-4 col-xs-4 right-border" >
              <UserList userList={this.state.userListArray} handleDelete={this.handleDeleteusers} activeUserProp={this.handleActiveUsers}/>
           </div>
           <div className=" col-lg-1 col-md-1 col-xs-1"></div>
           <div className="col-lg-5 col-md-5 col-xs-5">
              <ActiveUser activeUser={this.state.activeUser}/>
           </div>
           <AddUserModal showModal={this.state.showModal} handleAddUser={this.handleAddUser}/>
      </div>
     );
   }
}
