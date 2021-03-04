import React, { Component } from "react";
import axios from "axios";

class TopTen extends Component {
  constructor(props) {
    super(props);

    this.fetchData = this.fetchData.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isFetching: false,
      data: null,
    };
  }

  componentDidMount() {
    this.fetchData();
    console.log("fetching...");
  }

  handleClick(e, url) {
    window.open(url, "Information", "width=1000,height=800");
  }

  fetchData() {
    this.setState({ ...this.state, isFetching: true });
    fetch("/wanted/v1/list", {
      method: "GET",
      headers: { Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState({ data: result, isFetching: false });
        console.log(result);
      })
      .catch((e) => {
        console.log(e);
        this.setState({ ...this.state, isFetching: false });
      });
  }

  render() {
    if (this.state.isFetching || !this.state.data) {
      return <h4>Collecting data from servers...</h4>;
    } else {
      return (
        <div>
          {this.state.data.items.map((item) => {
            return (
              <div> 
                <h4>{item.title}</h4>
                <img src={item.images[0].large} onClick={(e) => this.handleClick(e, item.url)}/>
                <h3>{item.description}</h3>
              <hr />
              </div>
            );
          })}
        </div>
      );
    }
  }
}

export default TopTen;
