import { StyleSheet,FlatList,Text} from 'react-native';
import { ActivityIndicator } from 'react-native';
import { View } from '../../../../components/Themed';
import Tweet from '../../../../components/Tweet';
import { Entypo } from '@expo/vector-icons';
import {Link} from 'expo-router';
import { useEffect,useState } from 'react';
import { useTweetsApi } from '../../../../lib/api/tweets';
import { useQuery } from '@tanstack/react-query';
import User from '../../../../assets/assets/data/users';

export default function FeedScreen() {
 
  const {listTweets}=useTweetsApi();
  const {data,isLoading,error} = useQuery({
    queryKey:['tweets'],
    queryFn:listTweets,
  })
 
//   const[tweets,setTweets] = useState([]);
// // fetch tweets:http://localhost:3000/tweet
//   useEffect(()=>{
//     const fetchTweets = async () =>{
//      const res = await listTweets();
//      setTweets(res);
//     }

//     fetchTweets();
//   },[]);

if(isLoading){
  return <ActivityIndicator />;
}
if(error){
  return <Text>{error.message}</Text>
}

function random(){
  return Math.ceil(Math.random() * (User.length - 0)) + 0 - 1;
}



  return (
    <View style={styles.page}> 
      <FlatList
     data={data}
     renderItem={({ item }) => {
      let no = random(); // Call the random function here for each item
      return <Tweet tweet={item} num={no}/>;
  }}
/>

              <Link href="/new-tweet" asChild>
                <Entypo 
                name="plus" 
                size={24} 
                color="white" 
               style= {styles.floatingButton}
                />
              </Link>
         </View >
  );
}
const styles = StyleSheet.create({
  page:{
    flex: 1,
    backgroundColor: 'white',
  },
  floatingButton:{
    backgroundColor:'#F486E0',
    width:50,
    height:50,
    borderRadius:25,
    lineHeight:50,
    textAlign:'center',
    position:'absolute',
    right:15,
    bottom:15,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 5,
},
shadowOpacity: 0.34,
shadowRadius: 6.27,

elevation: 10,
overflow:'hidden'

  }
})
