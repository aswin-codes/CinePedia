import {SafeAreaView, Text, StyleSheet,TextInput, View, ScrollView, FlatList } from 'react-native'
import React,{ useState, useEffect } from 'react'
import MovieItem from './Components/MovieItem'
import localData from '../assets/homepage.json';
import { debounce } from 'lodash';


const HomeScreen = () => {

  //State variables
  const [query, setQuery] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [err,setErr] = useState(null);

  //Debouncd search for making less number of request per time
  const debouncedSearch = debounce((searchQuery) => {
    if (searchQuery === '') {
      setErr(null);
      setMovieList(localData);
    } else {
      const encodedURI = encodeURIComponent(searchQuery);
      fetch(`http://www.omdbapi.com/?apikey=8c06a3cb&s=${encodedURI}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.Response === 'True') {
            setErr(null);
            setMovieList(data.Search);
          } else {
            setMovieList([]);
            setErr(data.Error);
          }
        });
    }
  }, 500); // Adjust the debounce delay time (in milliseconds) as needed
  

  useEffect(()=>{
    debouncedSearch(query)
  },[query])

  useEffect(()=>{
    setMovieList(localData);
  },[]);

  return (
    <SafeAreaView style={styles.body}>
      <TextInput  placeholderTextColor={'#676767'}  placeholder='Search' style={styles.input} value={query} onChangeText={setQuery}/>
      <View style={{height:20}}></View>
      {
        (movieList.length !=0 )
        ? 
        <FlatList 
        data={movieList} 
        keyExtractor={item => item.imdbID} 
        renderItem={({item}) => <MovieItem type={item.Type} year={item.Year} movieName={item.Title} imdbID={item.imdbID} imgUrl={item.Poster}/>}
      />
      :
      <Text style={styles.errStyle}>Error : {err}</Text>
      }
    </SafeAreaView>
  )
}

export default HomeScreen 

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#21242C",
    alignItems: 'center'
  },
  input: {
    fontSize: 16,
    color: "#000",
    paddingLeft: 20,
    backgroundColor: '#FFF',
    width: 360,
    height: 46,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#F6B027'
  },
  errStyle: {
    color: 'red'
  }
});