import React, { Component } from 'react';
import { StyleSheet, View, Text, Platform, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';


class Home extends Component {
constructor() {
      super();
      this.state = {
          isLoading: true,
          JSON_from_server: [],
          fetching_Status: false,

        //  list: [], 
        //  offset: 0, 
        //  limit: 100 
      }
 this.page = 0
  }
 


  componentDidMount() {
    console.log(`http://jsonplaceholder.typicode.com/posts?_start=${this.page}&_limit=15`);
        // this.page = this.page + 1;
     
       fetch(`http://jsonplaceholder.typicode.com/posts?_start=${this.page}&_limit=15`)
      
        .then((response) =>  response.json())
        .then((responseJson) =>
        {
         

            this.setState({ JSON_from_server: [ ...this.state.JSON_from_server, ...responseJson ], isLoading: false 
              
            });
        }
       
        
        )
      .catch((error) =>{
          console.log("entered catch",error);
          console.log("response json2",responseJson);
            console.error(error);
        });
        // this.fetchResult();
        
        
    }



fetch_more_data_from_server =()=> { 
  
  console.log(`http://jsonplaceholder.typicode.com/posts?_start=${this.page}&_limit=15`);
  
  
      this.page = this.page + 15;
 
   
             // fetch('https://reactnativecode.000webhostapp.com/counting_table.php?page=' + this.page)
             fetch(`http://jsonplaceholder.typicode.com/posts?_start=${this.page}&_limit=15`)
              .then((response) => response.json())
              
              .then((responseJson) =>
              {
                console.log(responseJson,"responseJson")
                  this.setState({ JSON_from_server: [ ...this.state.JSON_from_server, ...responseJson ], fetching_Status: false });
              })

             
              .catch((error) =>
              {
                 
                  console.error(error);
              });
    
      // console.log("response",response);
      //             console.log("response json",responseJson);
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


Render_Footer=()=>
  {
    return (
        <View style = { styles.footerStyle }>
 
            <TouchableOpacity 
                activeOpacity = { 0.7 } 
                style = { styles.TouchableOpacity_style }
                onPress = { this.fetch_more_data_from_server } 
                >
 
                <Text style = { styles.TouchableOpacity_Inside_Text }>Load More Data From Server</Text>
                {
                    ( this.state.fetching_Status )
                    ?
                        <ActivityIndicator color = "#fff" style = {{ marginLeft: 6 }} />
                    :
                        null
                }
 
            </TouchableOpacity> 
 
        </View>
    )
  }
//   fetchResult = () => {
//     const { offset, limit, list } = this.state;
//     fetchModeDateFromAPI(offset, limit).then(res => {
//     if (!res.list) return;
//     this.setState({
//         list: list.concat(res.list),
//         offset: offset + 100,
//         limit: limit
//     });
//     });
// };


render() {
  console.log("renderrenderrender");
  console.log(this.state.JSON_from_server.length,"state--->111")
  
    return(
 <View style = { styles.MainContainer }>
      {
        ( this.state.isLoading ) ? ( <ActivityIndicator size = "large" /> ):
          (
              <FlatList
                  style={{width: '100%'}}
                  keyExtractor = {( item, index ) => index }
                  extraData={this.state}
            onEndReached={this.fetch_more_data_from_server}
            onEndReachedThreshold={0.7}
                  data = { this.state.JSON_from_server }
                  ItemSeparatorComponent = {this.FlatListItemSeparator}
                  renderItem = {({ item, index }) => <Text style = { styles.flatList_items }> { item.id } </Text>}
                 // ListFooterComponent = { this.Render_Footer }


                 
            
           
          
              />
          )
      }    
 
      </View>
 
    );
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
  }
});

export default Home