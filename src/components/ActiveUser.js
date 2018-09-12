import React,{Component} from 'react';
 export default class ActiveUser extends Component{
   static displayName='Active-User'
   constructor(props){
     super(props)
       this.state={
          user:this.props.activeUser,
          DislikesVal:'',
          LikesVal:''

       };
     }
     componentWillReceiveProps(nextProps) {
      var DislikesVal='';
      var LikesVal='';
      var Dislikes=JSON.stringify(nextProps.activeUser.Dislikes);
      var Likes=JSON.stringify(nextProps.activeUser.Likes);
      if(Dislikes!=undefined && Likes!=undefined){
        DislikesVal=Dislikes.substring(1,Dislikes.length-1);
        LikesVal=Likes.substring(1,Likes.length-1)
      }
    this.setState({
      DislikesVal:DislikesVal,
      LikesVal:LikesVal
    })
        }
    render(){
      var activeUser=this.props.activeUser;

      return(
      <div>
      {activeUser.hasOwnProperty("name")?
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="table-title">Name</td>
              <td>{activeUser.name}</td>
            </tr>
            <tr>
              <td className="table-title">Rating</td>
              <td>{activeUser.rating}</td>
            </tr>
            <tr>
              <td className="table-title">Description</td>
              <td>{activeUser.Description}</td>
            </tr>
            <tr>
              <td className="table-title">Likes</td>
              <td>{this.state.LikesVal}</td>
            </tr>
            <tr>
              <td className="table-title">Disikes</td>
              <td>{this.state.DislikesVal}</td>
            </tr>
          </tbody>
        </table>:
        <div className="table_none">User Information will be displayed here when u click on particular user </div>}
      </div>
      );
    }
  }
