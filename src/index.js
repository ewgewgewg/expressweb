import React from 'react';
import ReactDOM from 'react-dom';

class Index extends React.Component {
    constructor(props){
        super(props);
        this.state = {value: '', output: false,
        questions: ["What is the famous moon of Saturn? Answer the question for another secret question.",
        "What is the famous moon of Pluto?",
        "Both correct."],
        immi: null,
        mo: "no answers yet"
    };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value, output: true});
        const makeString = "http://localhost:3434/student/"+this.state.value
        fetch(makeString).then(res => res.json())
        .then(more => {
          console.log("fetch body ",this.state.mo)
          this.setState({mo : more.firstName})
          console.log("expect flavio", more.username)
          console.log("expect flavio", this.state.no)
        })

      }
    
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        

        fetch("http://localhost:3434/student/",{
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({firstName: this.state.value,
            lastName: "happy",
            age: 9
          })
        })
        console.log("this happens");
        
       
        console.log("this still happens");

        event.preventDefault();
      }

    componentDidMount(){
      // fetch("http://localhost:3434/student/mo")
      // .then(res => res.json())
      // .then(student => {
      //   console.log(student)
      //   this.setState({mo: student.age})
      // })

      fetch("http://localhost:3434/more")
      .then(res => res.json())
      .then(more => {
        console.log("expect null: ",this.state.immi)
        this.setState({immi : more.username})
        console.log("expect flavio", more.username)
        console.log("expect flavio", this.state.immi)
      })

    }

    render(){
      console.log('bi')




  return (
      <div>
        <div>Welcome to questions! Type 'question' to get started.</div>
        <div>Your last answer can be submitted below.</div>
        <form onSubmit={this.handleSubmit}>
        <label>Answer: <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div>{this.state.value == "question" ? this.state.questions[0] :
       this.state.value == "Titan" ? this.state.questions[1] :
        this.state.value == "Charon" ? this.state.questions[2]: "" }</div>
        <div>{this.state.mo}</div>
      </div>
      
    )
    }
};

ReactDOM.render(<Index />, document.getElementById('root'));