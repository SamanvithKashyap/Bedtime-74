import React from 'react';
import { StyleSheet, Text, View ,FlatList,ScrollView} from 'react-native';
import {SearchBar,Header} from 'react-native-elements';
import db from '../config'

export default class ReadStoryScreen extends React.Component {
  constructor(){
    super();
    this.state ={
      allStories:[],
      dataSource:[],
      search : ''
    }
  }
  componentDidMount(){
    this.fetchStories()
  }

  updateSearch = search => {
    this.setState({ search: search });
  };


  fetchStories=()=>{
    try {
      var allStories= [];
      var stories = db.collection("stories").get()
      .then((querySnapshot)=> {
          querySnapshot.forEach((doc)=> {
              // doc.data() is never undefined for query doc snapshots              
              allStories.push(doc.data())
          })
          this.setState({allStories: allStories})
        })
    }
    catch (error) {
      console.log(error);
    }
  };


  SearchFilterFunction(text) {
    const newData = this.state.allStories.filter((story)=> {

      const storyData = story.title ? story.title.toUpperCase() 
      : ''.toUpperCase();
      const data = story.author ? story.author.toUpperCase() 
      : ''.toUpperCase();
      const textData = text.toUpperCase();
      return storyData.indexOf(textData) > -1;
      return data.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }

    render(){
      return(
        <View>
           <Header
          backgroundColor={"#f38181"}
          centerComponent={{
            text: "Story Hub",
            style: { fontSize: 28, color: "#fff" }
          }}
        />
          <ScrollView>
          <View styles ={{height:20,width:'100%'}}>
              <SearchBar
                  placeholder="Search for any story title"
                  onChangeText={text => this.SearchFilterFunction(text)}
                  onClear={text => this.SearchFilterFunction('')}
                  value={this.state.search}
                  backgroundColor = "white"
            />
          </View>
          
          
            {this.state.dataSource.map((story)=>{
              return (
                <View style={styles.storyContainer}>
                  <Text style={{fontSize: 20}}>  TITLE:  {story.title}</Text>
                  <Text style={{fontSize: 20}}>  AUTHOR :  {story.author}</Text>
                </View>
              )
            })}
            </ScrollView> 
          
          
          
        </View>  
      );      
    }
}


const styles = StyleSheet.create({
  story: {
    backgroundColor: 'pink',
    padding:10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  storyContainer: {
    height: 80,
    width:'100%',
    borderWidth: 2,
    backgroundColor: "lightgrey",
    borderColor: 'black',
    justifyContent:'center',
    alignSelf: 'center',
  }
});
