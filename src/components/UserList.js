import React,{Component} from 'react';

export default class UserList extends Component{
static displayName='User-List'
 constructor(){
   super()
     this.state={
      selectedUserArray:[]
     };
     this.handleDelete=this.handleDelete.bind(this)
   }
 handleDelete(){
   this.props.handleDelete(this.state.selectedUserArray)
 }
  handleSelectedUser(obj){
  var selectedUserArray=this.state.selectedUserArray;
  if(obj.checkBoxValue==false){
    obj.checkBoxValue=!obj.checkBoxValue;
    selectedUserArray.push(obj);
  }
  else{
    obj.checkBoxValue=!obj.checkBoxValue;
    selectedUserArray.splice(obj,1);
  }
  this.setState({
    selectedUserArray:selectedUserArray
  })
  }

 handleActiveUser(user){
  this.props.activeUserProp(user)
 }
 renderListItems(){
   return this.props.userList.map((user,index)=>{
     var checkId=index+1;
      return(
        <div className="col-xs-12" key={index+1}>
            <li className=" userlist" onClick={this.handleActiveUser.bind(this,user)} >
            <input  type="checkbox" checked={user.checkBoxValue} id={checkId} onClick={this.handleSelectedUser.bind(this,user)} name="vehicle1" value="Bike"/>
              {user.name}
            </li><br/>
        </div>
      );
    });
 }

   render(){
     return(
         <div className="col-xs-12">
              <div className="col-xs-12">
                <div  className="col-xs-2 People">People</div>
                <div  className="col-xs-8 delete-icon">
                  <i onClick={this.handleDelete} className="delete fas fa-trash-alt"></i>
                </div>
              </div>
          <ul className="col-xs-12">
          {this.renderListItems()}
          </ul>
        </div>
     );
   }
 }
