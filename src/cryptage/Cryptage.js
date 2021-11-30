import { React, Component } from "react";
import './Cryptage.css';

class Cryptage extends Component {
    constructor() {
        super();
        this.state = {
           userinput: '',
           offset:0,
           crypted:''
        }
    }

    onUserInputChange(event) {
        this.setState({
            userinput: event.target.value,
        })
    }

    onOffsetChange(event) {
        console.log("changed")
        let off = parseInt(event.target.value);
        if (!isNaN(off))
            this.setState({
                offset: parseInt(event.target.value)
            })

        console.log(this.state.offset);
    }

    cryptChanged(event) {
        event.preventDefault();
        this.setState({crypted:event.target.value});
    }

    decrypted() {
        if (this.state.offset === null || this.state.crypted === "")
            return "";


        var offset = this.state.offset;
        var word = this.state.crypted;

        const newArray = [];
        for (var i = 0; i < word.length; i++) {
            if (word.charCodeAt(i) >= 65 && word.charCodeAt(i) <= 90) {
                newArray.push((((word.charCodeAt(i) - 65) - offset) % 26) + 65);
            }
            else {
                newArray.push((((word.charCodeAt(i) - 97) - offset) % 26) + 97);
            }
        }

        let newWords = [];

        for (var j = 0; j < newArray.length; j++) {
            newWords += String.fromCharCode(newArray[j]);
        }

        return newWords;
    }

    encrypt() {

        if (this.state.offset === null || this.state.userinput === "")
            return "";

        console.log(this.state.offset);
        var offset = this.state.offset;
        var word = this.state.userinput;

        const newArray = [];
        for (var i = 0; i < word.length; i++) {
            if (word.charCodeAt(i) >= 65 && word.charCodeAt(i) <= 90) {
                newArray.push((((word.charCodeAt(i) - 65) + offset) % 26) + 65);
            }
            else {
                newArray.push((((word.charCodeAt(i) - 97) + offset) % 26) + 97);
            }
        }

        let newWords = [];

        for (var j = 0; j < newArray.length; j++) {
            newWords += String.fromCharCode(newArray[j]);
        }

        return newWords;
    }

    render() {
        return (
            <div className="general" >
                <div style={{textAlign:'center'}} >
                <label> Let's begin </label>
                </div>
                <form>
                
                    <input placeholder="key" onChange={this.onOffsetChange.bind(this)} className="key" />
                    <p>encryption </p>
                    <input type="text" placeholder="enter your sentences to encrypt" className="pushhub"
                        onChange={this.onUserInputChange.bind(this)} />
                    <div>
                        {this.encrypt()}
                    </div>
                    <p>decryption</p>
                    <input type="text" placeholder="Enter your words to decrypt"  onChange={this.cryptChanged.bind(this)}/>
                    <div>
                        {this.decrypted()}
                    </div>
                </form>
                <div style={{textAlign:'center',paddingTop:'150px'}} >
                <label> caesar cipher</label></div>
            </div>
        );
    }
}
export default Cryptage;