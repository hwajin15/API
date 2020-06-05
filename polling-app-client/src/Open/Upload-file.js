
import React, { Component } from "react";
import UploadService from "./Upload-service";
import Openapi from './Openapi';
import "bootstrap/dist/css//bootstrap.min.css"
import "./open.css"


export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);
    this.delete = this.delete.bind(this);

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",
      fileInfos: [],
      user: null
    };
  }

  
  componentDidMount() {
    let username = this.props.currentUser.username;

    UploadService.getFiles(username).then((response) => {

      this.setState({
        fileInfos: response.data,
      });
    });

  }

  selectFile(event) {
    this.setState({
      selectedFiles: event.target.files,
    });
  }

  upload() {
    
    let currentFile = this.state.selectedFiles[0];
    let username = this.props.currentUser.username;
    let userkey = this.props.currentUser.userkey;
    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    UploadService.upload(userkey,username,currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        
        this.setState({
          message: response.data.message,
        });
        return UploadService.getFiles(username, console.log("<<<" +username));
      })
      .then((files) => {
        this.setState({
          fileInfos: files.data,
        });
      })
      .catch(() => {
        this.setState({
          progress: 0,
          message: "Could not upload the file!",
          currentFile: undefined,
        });
      });

    this.setState({
      selectedFiles: undefined,
    });
  }

  delete(){
    let username = this.props.currentUser.username;
    
    UploadService.delete(username);

    UploadService.getFiles(username).then((files) => {

      this.setState({
        message: files.data.message,
        fileInfos: files.date
      });
      return UploadService.getFiles(username)
    });
    }

  render() {
    const {
      selectedFiles,
      currentFile,
      progress,
      message,
      fileInfos,
    } = this.state;

    return (
        <div className='container' style={{width: "600px"}}>
            <div style = {{margin : "30px"}}>
                <h3>원하는 파일을 업로드 해주세요</h3>
                {/* {this.props.currentUser.username} */}
            </div>
                <div>
                    {currentFile && (
                    <div className="progress">
                        <div
                        className="progress-bar progress-bar-info progress-bar-striped"
                        role="progressbar"
                        aria-valuenow={progress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: progress + "%" }}
                        >
                        {progress}%
                        </div>
                    </div>
                    )}

                    <label className="btn btn-default">
                    <input type="file" onChange={this.selectFile} />
                    </label>

                    <button className="btn btn-primary" disabled={!selectedFiles} onClick={this.upload}>
                    Upload
                    </button>
                    <button className="btn btn-danger" onClick={this.delete}>
                    All Delete
                    </button>

                    <div className="alert alert-light" role="alert">
                    {message}
                    </div>

                    <div className="card">
                    <div className="card-header">List of Files</div>
                    <ul className="list-group list-group-flush">
                        {fileInfos &&
                        fileInfos.map((file, index) => (
                            <li className="list-group-item" key={index}>
                               {file.name}
                            </li>
                        ))}
                    </ul>
                    </div>

                    <Openapi 
                             userfiles = {fileInfos &&
                              fileInfos.map((file, index) => (
                                  <li key={index}>
                                     {file.name}
                                  </li>
                              ))}
                             username={this.props.currentUser.username}
                             userkey = {this.props.currentUser.userkey}>
                    </Openapi>
                </div>
                </div>
                );
                
        }
    }
