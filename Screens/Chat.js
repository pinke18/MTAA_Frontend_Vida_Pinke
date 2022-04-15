import * as React from 'react';
import { View, Text , Button, FlatList, TouchableOpacity, StyleSheet, Alert, SafeAreaView} from 'react-native';


function ChatScreen({ route, navigation }) {
    const chatList = route.params;
    console.log(chatList.creator, chatList.worker, global.userid)
    let reciever = 0
    if(global.userid == chatList.worker){
      reciever = chatList.creator;
    }
    else if(global.userid == chatList.creator){
      reciever = chatList.worker;
    }
    console.log(reciever)
    console.log(chatList)
    return (

      <View style={{ flex: 1}}>
        <FlatList
                  data={chatList.chats}
                  renderItem={({ item, index }) => { if (item.from !== reciever) {
              
                    return (
        
                      <View style={{
                        backgroundColor: "#0078fe",
                        padding:10,
                        marginLeft: '45%',
                        borderRadius: 5,
                       
                        marginTop: 5,
                        marginRight: "5%",
                        maxWidth: '50%',
                        alignSelf: 'flex-end',
                        borderRadius: 20,
                      }} key={index}>
      
                        
                        <Text style={{ fontSize: 16, color: "#fff", }} key={index}> {item.message}</Text>
      
                          <View style={styles.rightArrow}>
      
                          </View>
                          <View style={styles.rightArrowOverlap}></View>
                        
                        
                        
                      </View>
                    )
    
                  
                  
                  
                } else {
    
                  
                    return (
                      <View style={{
                        backgroundColor: "#dedede",
                        padding:10,
                        borderRadius: 5,
                        marginTop: 5,
                        marginLeft: "5%",
                        maxWidth: '50%',
                        alignSelf: 'flex-start',
                        //maxWidth: 500,
                        //padding: 14,
                        
                        //alignItems:"center",
                        borderRadius: 20,
                      }} key={index}>
      
                        
                          
                          <Text style={{ fontSize: 16, color: "#000",justifyContent:"center" }} key={index}> {item.message}</Text>
                          <View style={styles.leftArrow}>
      
                          </View>
                          <View style={styles.leftArrowOverlap}></View>
                        
                        
                        
                      </View>
                    )
                  
                  
                }}}
              />
        <SafeAreaView style={styles.container}>
      <View>
              <TouchableOpacity onPress={() => navigation.navigate('SendMessageScreen', {to: reciever, from: global.userid, ticketID: chatList.ticketID})} style={styles.button}>
                <Text style={styles.buttonText}>Send message</Text>
              </TouchableOpacity>
      </View>
    </SafeAreaView>
      </View>
    );
  }
  const styles = StyleSheet.create({
    rightArrow: {
      position: "absolute",
      backgroundColor: "#0078fe",
      //backgroundColor:"red",
      width: 20,
      height: 25,
      bottom: 0,
      borderBottomLeftRadius: 25,
      right: -10
    },
    
    rightArrowOverlap: {
      position: "absolute",
      backgroundColor: "#eeeeee",
      //backgroundColor:"green",
      width: 20,
      height: 35,
      bottom: -6,
      borderBottomLeftRadius: 18,
      right: -20
    
    },
    
    /*Arrow head for recevied messages*/
    leftArrow: {
        position: "absolute",
        backgroundColor: "#dedede",
        //backgroundColor:"red",
        width: 20,
        height: 25,
        bottom: 0,
        borderBottomRightRadius: 25,
        left: -10
    },
    
    leftArrowOverlap: {
        position: "absolute",
        backgroundColor: "#eeeeee",
        //backgroundColor:"green",
        width: 20,
        height: 35,
        bottom: -6,
        borderBottomRightRadius: 18,
        left: -20
    
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
      },
      input: {
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
        },
       button: {
           backgroundColor: "red",
           padding: 15,
           borderRadius: 10,
           marginVertical: 16,
           marginHorizontal: 16,
       },
       buttonText: {
           color: "white",
           textAlign: 'center',
       },
       text: {
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
       }
    })
  export default ChatScreen