import React,{Component} from 'react';
import  {Modal} from 'react-bootstrap';
import TextField from 'material-ui/TextField';

class AddUserModal extends Component{
    constructor(){
        super()
            this.state={
                showModal:'',
                newObj:{
                    'name':'',
                    'rating':'',
                    'Description':'',
                    'Dislikes':'',
                    'Likes':'',
                    'checkBoxValue':false
                },
                newUser:{}
            }
            this.handleAdd=this.handleAdd.bind(this)
            this.handlevalidate=this.handlevalidate.bind(this)
            this.handleClose=this.handleClose.bind(this)

    }
  componentWillReceiveProps(nextProps){
    this.setState({
        showModal:nextProps.showModal
    })
  }
  handleField(ref,e){
    var obj=this.state.newObj
        obj[ref]=e.target.value;
        this.setState({
            newUser:obj
        })
  }
  handlevalidate(){
      var data=JSON.parse(JSON.stringify(this.state.newUser));
      if(data.name===undefined ||data.name==='' ){
          alert("please fill name")
          return false;
      }
      else if(data.rating===undefined ||data.rating===''){
          alert("please fill rating")
          return false;
      }
      else if(data.Description===undefined ||data.Description===''){
          alert("please fill Description")
          return false;
      }
      else if(data.Likes===undefined ||data.Likes===''){
          alert("please fill Likes")
          return false;
      }
      else if(data.Dislikes===undefined ||data.Dislikes===''){
          alert("please fill Dislikes")
          return false;
      }else{
        return true;
      }
  }
  handleAdd(){
      var res=this.handlevalidate();
      if(res===true){
        this.setState({
            showModal:false
          })
          this.props.handleAddUser(this.state.newUser)
      }
  }
  handleClose(){
    this.setState({
      showModal:false
    })
  }
    render(){
        return(
            <div>
                 <Modal className="col-xs-12" show={this.state.showModal}>
                 <Modal.Body>
                     <div className="col-xs-8">
                        <div className="col-xs-12">
                            <div className="col-xs-12 modalHeader" >Please Enter User Details</div>
                            <div>
                                <span className="col-xs-6 fields" >User Name :</span>
                                <span className="col-xs-6">
                                <TextField
                                        onChange={this.handleField.bind(this,"name")}
                                />
                                </span>
                            </div>
                            <div>
                                <span className="col-xs-6 fields" >Rating :</span>
                                <span className="col-xs-6">
                                <TextField
                                onChange={this.handleField.bind(this,"rating")}
                                />
                                </span>
                            </div>
                            <div>
                                <span className="col-xs-6 fields" >Description :</span>
                                <span className="col-xs-6">
                                <TextField
                                    onChange={this.handleField.bind(this,"Description")}
                                />
                                </span>
                            </div>
                            <div>
                                <span className="col-xs-6 fields" >Likes :</span>
                                <span className="col-xs-6">
                                <TextField
                                onChange={this.handleField.bind(this,"Likes")}
                                />
                                </span>
                            </div>
                            <div>
                                <span className="col-xs-6 fields" >Dislikes :</span>
                                <span className="col-xs-6">
                                <TextField
                                onChange={this.handleField.bind(this,"Dislikes")}
                                />
                                </span>
                            </div>
                        </div>

                        <div className="col-xs-12 loginBtn">
                            <button type="button" onClick={this.handleAdd} className="btn btn-success submitModal ">Submit</button>
                            <button type="button" onClick={this.handleClose} className="btn btn-warning ">Close</button>
                        </div>
                     </div>

                </Modal.Body>
                 </Modal>
            </div>
        )
    }
}
export default AddUserModal;
