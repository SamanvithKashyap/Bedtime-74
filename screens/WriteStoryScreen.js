import * as React from "react";
import { Header } from "react-native-elements";
import {View,StyleSheet,Text,TextInput,TouchableOpacity,KeyboardAvoidingView,ToastAndroid} from "react-native";
import db from "../config";
import firebase from "firebase";
import Constants from "expo-constants";

export default class WriteStoryScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      title: "",
      author: "",
      story: "",
    }
  }

  submitStory = () => {
    db.collection("stories").add({
      "title": this.state.title,
      "author": this.state.author,
      "date": firebase.firestore.Timestamp.now().toDate(),
      "story": this.state.story,
    });

    this.setState({
      title: "",
      author: "",
      story: "",
    });
    ToastAndroid.show("Story Submitted",ToastAndroid.SHORT)
  };

  render() {
    return (
      
         <View
        style={{
          flex: 1,
          backgroundColor: "#fce38a",
        }}
      >
        <KeyboardAvoidingView>
        <Header
          backgroundColor={"#f38181"}
          centerComponent={{
            text: "Story Hub",
            style: { fontSize: 28, color: "#fff" }
          }}
        />
        <TextInput 
        style={styles.inputBox} 
        placeholder="Story Title" 
        onChangeText={(text) => {
          this.setState({ title: text });
        }}
        value={this.state.title}
        />
        <TextInput 
        style={styles.inputBox} 
        placeholder="Author" 
        onChangeText={(text) => {
          this.setState({ author: text });
        }}
        value={this.state.author}
        />
        <TextInput
          style={styles.inputBoxMultiline}
          placeholder="Write your Story"
          multiline={true}
          onChangeText={(text) => {
            this.setState({ story: text });
          }}
          value={this.state.story}
        />

        <TouchableOpacity style={styles.button} onPress={this.submitStory}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    width: "90%",
    height: 50,
    borderWidth: 2,
    marginTop:30,
    padding: 5,
    alignSelf:'center',
    textAlign:'center'
  },
  inputBoxMultiline: {
    width: "90%",
    height: "35%",
    borderWidth: 2,
    marginTop: 30,
    padding: 5,
    alignSelf:'center',
    textAlign:'center'
  },
  button: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#95e1d3",
    width: 200,
    height: 50,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
