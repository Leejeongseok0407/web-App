import { render } from "@testing-library/react";
import { Component } from "react";

//사용자 정의 태그를 제작 가능
//오브젝트 제작
class Subject extends Component {
  //클래스 내 함수
  render() {
    return (
      <header>
        <h1
          onClick={function (ev) {
            //이동동작 막음
            ev.preventDefault();
            this.props.onSelect(0);
          }.bind(this)}
        >
          {this.props.title}
        </h1>
        {this.props.sub}
      </header>
    );
  }
}

class Toc extends Component {
  //클래스 내 함수
  // var list = [
  //   <li>
  //     <a href="1.html">HTML</a>
  //   </li>,
  //   <li>
  //     <a href="2.html">CSS</a>
  //   </li>,
  //   <li>
  //     <a href="3.html">JavaScrip</a>
  //   </li>,
  // ];
  render() {
    var list = [];
    var i = 0;
    while (i < this.props.data.length) {
      var data = this.props.data[i++];
      list.push(
        <li key={data.id}>
          <a
            href={data.id + ".HTml"}
            //클릭 이벤트
            onClick={function (id, ev) {
              //이동동작 막음
              ev.preventDefault();
              this.props.onSelect(id);
            }.bind(this, data.id)}
          >
            {data.title}
          </a>
        </li>
      );
    }
    return (
      <nav>
        <ol>{list}</ol>
      </nav>
    );
  }
}

class Content extends Component {
  render() {
    console.log(this.props.data);
    return (
      <article>
        <h1>{this.props.data.title}</h1>
        {this.props.data.desc}
      </article>
    );
  }
}

class App extends Component {
  state = {
    selected_content_id: 2,
    contents: [
      { id: 0, title: "React", desc: "Wecolome" },
      { id: 1, title: "HTML", desc: "HTML is for information" },
      { id: 2, title: "CSS", desc: "CSS is for design" },
      { id: 3, title: "Js", desc: "Js is for interaction" },
    ],
  };

  getSeledContent() {
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      if (this.state.selected_content_id === data.id) {
        return data;
      }
      i++;
    }
  }

  render() {
    var content = this.getSeledContent();
    return (
      <div className="App">
        <Subject
          onSelect={function (id) {
            this.setState({ selected_content_id: id });
          }.bind(this)}
          title="React"
          sub="Hello"
        ></Subject>
        <Toc
          onSelect={function (id) {
            this.setState({ selected_content_id: id });
          }.bind(this)}
          data={this.state.contents}
        ></Toc>
        <Content data={this.getSeledContent()}></Content>
      </div>
    );
  }
}

export default App;
