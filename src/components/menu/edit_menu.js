import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import Loader from "react-loader-spinner";
import SimpleReactValidator from "simple-react-validator";
import {url} from "../../url"
class EditMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: "",
      description: "",
      url: "",
      date: Date.now(),
      mobile_message: "",
      validError: false,
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.validator = new SimpleReactValidator({
      className: "text-danger",
      validators: {
        passwordvalid: {
          message:
            "The :attribute must be at least 6 and at most 30 with 1 numeric,1 special charac" +
            "ter and 1 alphabet.",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(
                val,
                /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{6,30}$/i
              ) && params.indexOf(val) === -1
            );
          },
        },
        passwordMismatch: {
          message: "confirm password must match with password field.",
          rule: function (val, params, validator) {
            return document.getElementById("password_input").value === val
              ? true
              : false;
          },
        },
        whitespace: {
          message: "The :attribute not allowed first whitespace   characters.",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /[^\s\\]/) &&
              params.indexOf(val) === -1
            );
          },
        },
        specialChar: {
          message: "The :attribute not allowed special   characters.",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /^[ A-Za-z0-9_@./#&+-]*$/i) &&
              params.indexOf(val) === -1
            );
          },
        },
        specialCharText: {
          message: "The :attribute may only contain letters, dot and spaces.",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /^[ A-Za-z_@./#&+-]*$/i) &&
              params.indexOf(val) === -1
            );
          },
        },

        zip: {
          message: "Invalid Pin Code",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /^(\d{5}(\d{4})?)?$/i) &&
              params.indexOf(val) === -1
            );
          },
        },
        website: {
          message: "The Url should be example.com ",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(
                val,
                /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
              ) && params.indexOf(val) === -1
            );
          },
        },
        Fax: {
          message: "Invalid fax number ",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(
                val,
                /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i
              ) && params.indexOf(val) === -1
            );
          },
        },
      },
    });
  }
  componentDidMount() {
    const { _id } = this.props.match.params;
    console.log(_id);
    axios.get(`admin/update_menu/${_id}`).then((res) => {
      console.log(res.data);
      const menu = {
        menu: res.data.menu,
        date: res.data.date,
        url: res.data.url,
      };
      console.log(menu.menu);
      this.setState({
        menu: menu.menu,
        description: menu.description,
        date: menu.date,
        url: postMessage.url,
        loading: true,
      });
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(e) {
    const { _id } = this.props.match.params;
    e.preventDefault();
    if (this.validator.allValid()) {
      const { token } = JSON.parse(localStorage.getItem("auth"))
      const menu = {
        menu: this.state.menu,
        description: this.state.description,
        date: this.state.date,
        url: this.state.url,
      };
      axios.put(`admin/update_menu_patch/${_id}`, menu,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
        }
      ).then((res) => {
        console.log(res.data);
        this.props.history.push("/menu");
      })
      .catch(function (error) {
        // handle error
        if(window.confirm("Your session expired.Please login to proceed"))

        // window.location.href = "https://admin.cie.telangana.gov.in/videos"
        window.location.href = `${url}/`
          else
          window.location.reload()

      });
      this.forceUpdate();
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render() {
    return (
      <div>
        <Sidebar></Sidebar>
        <div className="admin-wrapper col-12">
          <div className="admin-content">
            <div className="admin-head">Edit Menu</div>
            {this.state.loading ? (
              <div className="admin-data">
                <div className="col-lg-12 p-0 text-right mb-30">
                  <a href="/menu">
                    <button className="button button-contactForm boxed-btn">
                      Back
                    </button>
                  </a>
                </div>
                <div className="container-fluid p-0">
                  <form
                    className="form-contact contact_form"
                    onSubmit={this.handleSubmit}
                  >
                    <div className="row m-0">
                      <div className="col-lg-12 p-0"></div>
                      <div className="col-lg-12 p-0">
                        <div className="form-group tags-field row m-0">
                          <label className="col-lg-2 p-0"> Menu Name</label>
                          <input
                            className="form-control col-lg-10"
                            name="menu"
                            onChange={this.handleChange}
                            value={this.state.menu}
                            type="text"
                            onfocus="this.placeholder = 'Menu Name'"
                            onblur="this.placeholder = ''"
                            placeholder=""
                          />
                          {this.validator.message(
                            " Menu Name",
                            this.state.menu,
                            "required|whitespace|min:1|max:30"
                          )}
                          {this.state.mobile_message}
                        </div>
                        <div className="form-group tags-field row m-0">
                          <label className="col-lg-2 p-0">
                            {" "}
                            Menu URL(OPTIONAL)
                          </label>
                          <input
                            className="form-control col-lg-10"
                            name="url"
                            onChange={this.handleChange}
                            value={this.state.url}
                            type="text"
                            onfocus="this.placeholder = 'Menu Name'"
                            onblur="this.placeholder = ''"
                            placeholder=""
                          />
                          {this.validator.message(
                            "url",
                            this.state.url,
                            "whitespace|min:1|max:100"
                          )}
                          {this.state.mobile_message}
                        </div>
                        {/* <div className="form-group tags-field row m-0">
                          <label className="col-lg-2 p-0">Description</label>
                          <textarea
                            className="form-control col-lg-10"
                            name="description"
                            onChange={this.handleChange}
                            value={this.state.description}
                            type="text"
                            onfocus="this.placeholder = 'Menu Name'"
                            onblur="this.placeholder = ''"
                            placeholder=""
                          />
                          {this.validator.message(
                            "Description",
                            this.state.description,
                            "required|whitespace|min:40|max:200"
                          )}
                        </div> */}
                      </div>

                      <div className="col-lg-12 p-0">
                        <div className="form-group tags-field  row m-0">
                          <label className="col-lg-2 p-0" />
                          <div className="col-lg-6 p-0">
                            <button
                              className="button button-contactForm boxed-btn"
                              type="submit"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div style={{ marginLeft: "500px", marginTop: "200px" }}>
                {" "}
                <Loader
                  type="Circles"
                  color="#0029ff"
                  height={100}
                  width={100}
                  timeout={3000} //3 secs
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default EditMenu;
