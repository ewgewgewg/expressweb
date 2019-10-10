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
        mo: null
    };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value, output: true});
      }
    
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);

        fetch("http://localhost:3434/student/",{
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({firstName: "happy",
            lastName: this.state.value,
            age: 9
          })
        })


        event.preventDefault();
      }

    componentDidMount(){
      fetch("http://localhost:3434/student/mo")
      .then(res => res.json())
      .then(student => {
        console.log(student)
        this.setState({mo: student.age})
      })

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
        <div>Welcome to quesfdstions! Type 'question' to get started.</div>
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