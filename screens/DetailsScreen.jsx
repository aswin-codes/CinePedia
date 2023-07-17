import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState, useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import BackButton from './Components/BackButton';
import Rated from './Components/Rated';

const DetailsScreen = ({route}) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const {imdbId} = route.params;
    fetch(`http://www.omdbapi.com/?apikey=8c06a3cb&i=${imdbId}`)
      .then((response) => response.json())
      .then(i => {
        setData(i)
      })
      .catch(e => console.log(e));
  }, []);

  const errImg =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFPwqeHC8Hk-P_hzUHMZI2B2riRtscoijmxw&usqp=CAU';
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  return (
    <View style={styles.body}>
      {data.imdbRating  ? (
        <>
          <View style={styles.backButton}>
            <TouchableOpacity onPress={goBack}>
              <BackButton />
            </TouchableOpacity>
          </View>
          <View style={styles.rated}>
            <Rated rated={data.Rated} />
          </View>
          <ScrollView>
            <Image
              source={{uri: data.Poster != 'N/A' ? data.Poster : errImg}}
              style={styles.image}
            />
            <Text style={styles.title}>{data.Title}</Text>
            <Text style={styles.duration}>{data.Runtime}</Text>
            <Text style={styles.genre}>{data.Genre}</Text>
            <View style={styles.rating}>
              <Image
                style={{height: 20, width: 20}}
                source={require('../assets/star.png')}
              />
              <Text style={styles.ratingTex}> {data.imdbRating}/10 </Text>
              <Text style={styles.votesText}>
                {data.imdbVotes > 1000
                  ? data.imdbVotes.slice(0, -3) + 'k'
                  : data.imdbVotes}{' '}
                Votes
              </Text>
            </View>
            <View style={styles.dividerContainer}>
              <View style={styles.divider}></View>
            </View>
            <Text style={styles.title}>About the movie</Text>
            <Text style={styles.subTitle}>{data.Plot}</Text>
            <Text style={styles.title}>Cast</Text>
            <Text style={styles.subTitle}>{data.Actors}</Text>
            <Text style={styles.title}>Writer</Text>
            <Text style={styles.subTitle}>{data.Writer}</Text>
            <Text style={styles.title}>Director</Text>
            <Text style={styles.subTitle}>{data.Director}</Text>
            <Text style={styles.title}>Country</Text>
            <Text style={styles.subTitle}>{data.Country}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.title}>Released : </Text>
              <Text style={styles.sub}>{data.Released}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.title}>Awards : </Text>
              <Text style={styles.sub}>{data.Awards}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.title}>Box Office : </Text>
              <Text style={styles.sub}>{data.BoxOffice}</Text>
            </View>
            <View style={{height: 50}}></View>
          </ScrollView>
        </>
      ) : <Text style={{marginTop: 50, color: 'red', textAlign: 'center'}}> Loading...</Text>}
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#21242C',
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 20,
    zIndex: 1,
  },
  rated: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: 400,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    color: '#F5F6F8',
    fontSize: 25,
    fontWeight: '500',
    marginLeft: 24,
    marginTop: 24,
  },
  duration: {
    color: '#95989D',
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 24,
    marginBottom: 8,
  },
  genre: {
    fontSize: 14,
    color: '#95989D',
    fontWeight: '400',
    marginLeft: 24,
    marginBottom: 8,
  },
  rating: {
    marginLeft: 24,
    flexDirection: 'row',
    gap: 5,
  },
  ratingTex: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F5F6F8',
  },
  votesText: {
    color: '#95989D',
    fontSize: 14,
    fontWeight: '700',
  },
  dividerContainer: {
    height: 40,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 16,
  },
  divider: {
    borderWidth: 0.7,
    borderColor: 'white',
    width: '80%',
  },
  subTitle: {
    fontSize: 14,
    color: '#95989D',
    fontWeight: '700',
    marginLeft: 24,
    marginTop: 5,
  },
  sub: {
    fontSize: 14,
    color: '#95989D',
    fontWeight: '700',
    marginLeft: 24,
    marginTop: 24,
  },
});
