import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, Platform, FlatList, TouchableOpacity, ActivityIndicator, Image, TextInput } from 'react-native';
import {getposts,getMoreposts, searchBasedOnTitle} from "./redux_store/action/postAction"

export class test extends Component {
  state={
    searchTitle: ''
  }
  componentDidMount(){
    this.props.getposts();
  }

  FlatListItemSeparator =()=> {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }

  render() {
   
    let data=[{id:1},{id:2}]
    return (
<View style = { styles.MainContainer }>
      <View style={{height: 60, backgroundColor: 'white', borderBottomWidth:0.5, borderBottomColor: '#999999'}}>  
              
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  style={{width:'80%', left: 20}}
                  value={this.state.searchTitle}
                  onChangeText={(text) => {
                    this.setState({searchTitle: text});
                    this.props.searchTitle(text)
                  }}
                />
                <View style={{padding: 5, backgroundColor: 'white', justifyContent: 'flex-end', left: 20}}>
                  <Image 
                    source={require('./Images/search.png')}
                    style={{width: 30, height: 30}}
                    resizeMode={'contain'}
                  />
                  </View>

              </View>                

              
              </View>
              
              <FlatList
                  style={{width: '100%'}}
                  keyExtractor = {( item, index ) => index }
                  onEndReached={()=>this.state.searchTitle.length <= 0 && this.props.getMoreposts(this.props.page)}
                  onEndReachedThreshold={0.7}
                  data = {this.state.searchTitle.length > 0 ? this.props.filteredArray : this.props.postData}
                  ItemSeparatorComponent = {this.FlatListItemSeparator}
                  renderItem = {({ item, index }) => 
                  <View>
                  <Text style = { styles.flatList_items }> 
                  { item.id }
                   </Text>
                   <Text style = { styles.flatList_items }>{ item.title }</Text>
               
                
                   <Image source = {{ uri: item.thumbnailUrl }} style={styles.imageView} />
                   </View>
                  }
    
              />   
 
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    postData: state.postData,
    filteredArray: state.filteredArray,
    page:state.page
  }
}

const mapDispatchToProps = dispatch=>{
  return{
    getposts:()=>dispatch(getposts()),
    getMoreposts:(page)=>dispatch(getMoreposts(page)),
    searchTitle:(searchTitle) => dispatch(searchBasedOnTitle(searchTitle))
  }
}
const styles = StyleSheet.create(
  {
    MainContainer:
    {
      flex: 1,
      justifyContent: 'center',
      margin: 5,
      paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
    },
   
    footerStyle:
    {
      padding: 7,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopWidth: 2,
      borderTopColor: '#009688'
    },
   
    TouchableOpacity_style:
    {
      padding: 7,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F44336',
      borderRadius: 5,
    },
   
    TouchableOpacity_Inside_Text:
    {
      textAlign: 'center',
      color: '#fff',
      fontSize: 18
    },
   
    flatList_items:
    {
      fontSize: 20,
      color: '#000',
      padding: 10
    },
    imageView: {
 
      width: '50%',
      height: 100 ,
      margin: 7,
      borderRadius : 7
   
  },
  });
export default connect(mapStateToProps, mapDispatchToProps)(test)
