import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSpecialty.scss";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { LANGUAGES, CommonUtils, CRUD_ACTIONS } from "../../../utils";
import { createNewSpecialtyService } from "../../../services/userService";
import { toast } from "react-toastify";
import TableManageSpecialty from "../Admin/TableManageSpecialty";
import * as actions from "../../../store/actions";

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",

      specialtyEditId: "",
    };
  }
  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionMarkdown: text,
      descriptionHTML: html,
    });
  };

  handleSaveNewSpecialty = async () => {
    let res = await createNewSpecialtyService(this.state);
    let { action } = this.state;
    if (res && res.errCode === 0) {
      toast.success("Lưu thành công !");
      this.setState({
        name: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.error("Lưu thất bại !");
      console.log("Check res ==>:  ", res);
    }
    if (action === CRUD_ACTIONS.EDIT) {
      this.props.editASpecialtyRedux({
        id: this.state.specialtyEditId,
        name: this.state.name,
        image: this.state.imageBase64,
        descriptionHTML: this.state.descriptionHTML,
        descriptionMarkdown: this.state.descriptionMarkdown,
      });
    }
  };
  handleEditSpecialtyFromParent = async (specialty) => {
    let imageBase64 = "";
    if (specialty.image) {
      imageBase64 = new Buffer(specialty.image, "base64").toString("binary");
    }
    this.setState({
      name: specialty.name,
      descriptionMarkdown: specialty.descriptionMarkdown,
      descriptionHTML: specialty.descriptionHTML,
      imageBase64: specialty.image,
      previewImgURL: imageBase64,
      specialtyEditId: specialty.id,
      action: CRUD_ACTIONS.EDIT,
    });
  };

  onChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeImg = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };

  openPreviewImg = () => {
    if (!this.state.imageBase64) return;
    this.setState({ isOpen: true });
  };
  // handleSaveNewSpecialty = async (specialty) => {
  //   this.props.createNewSpecialty({
  //     name: this.state.name,
  //     image: this.state.image,
  //     descriptionMarkdown: this.state.descriptionMarkdown,
  //     descriptionHTML: this.state.descriptionHTML,
  //   });
  // };

  render() {
    let { name } = this.state;
    return (
      <div className="manage-specialty-container">
        <div className="ms-title">
          <FormattedMessage id="manage-specialty.title" />
        </div>
        <div className="add-new-specialty row">
          <div className="col-6 form-group ">
            <label htmlFor="">
              <FormattedMessage id="manage-specialty.nameSpecialty" />
            </label>
            <input
              className="form-control"
              type="text"
              value={name}
              onChange={(event) => this.onChangeInput(event, "name")}
            />
          </div>
          <div className="col-6 form-group ">
            <label htmlFor="">
              <FormattedMessage id="manage-specialty.img" />
            </label>
            <div className="add-img-specialty">
              <input
                id="previewImg"
                type="file"
                hidden="hidden"
                onChange={(event) => this.handleOnChangeImg(event)}
              />
              <label className="label-upload" htmlFor="previewImg">
                <i className="fas fa-arrow-circle-up"></i>
                <FormattedMessage id="manage-specialty.load" />
              </label>
              <div
                className="previewImg"
                style={{
                  backgroundImage: `url(${this.state.imageBase64})`,
                }}
                onClick={() => this.openPreviewImg()}
              ></div>
            </div>
          </div>

          <div className="col-12">
            <MdEditor
              style={{ height: "350px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div>
          <div className="col-12 my-3">
            <button
              className={
                this.state.action === CRUD_ACTIONS.EDIT
                  ? "btn btn-warning"
                  : "btn btn-primary"
              }
              onClick={() => this.handleSaveNewSpecialty()}
            >
              {this.state.action === CRUD_ACTIONS.EDIT ? (
                <FormattedMessage id="manage-specialty.edit" />
              ) : (
                <FormattedMessage id="manage-specialty.save" />
              )}
            </button>
          </div>
          <div className="col-12 mb-5">
            <TableManageSpecialty
              handleEditSpecialtyFromParent={this.handleEditSpecialtyFromParent}
              action={this.state.action}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listSpecialty: state.admin.allSpecialty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editASpecialtyRedux: (data) => dispatch(actions.editASpecialty(data)),
    createNewSpecialty: (data) => dispatch(actions.createNewSpecialty(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
