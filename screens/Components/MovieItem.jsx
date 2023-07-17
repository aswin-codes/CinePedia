import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

const MovieItem = ({imgUrl, movieName, type, year, imdbID}) => {

  const navigation = useNavigation();

    //Image for error like N/A
  const errImg =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFPwqeHC8Hk-P_hzUHMZI2B2riRtscoijmxw&usqp=CAU';

  const onPress = () =>{
    navigation.navigate('Details',{imdbId: imdbID})
  }

  return (
    <TouchableOpacity onPress ={onPress}>
    <View style={styles.container}>
      <Image source={{uri: imgUrl != "N/A" ? imgUrl : errImg}} style={styles.image} />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>
          {movieName.length > 18
            ? movieName.substring(0, 18) + '...'
            : movieName}
        </Text>
        <View style={styles.rowContainer}>
          <Icon name="video-camera" size={16} color="#CACBCE" />
          <Text style={styles.subTitle}>{type}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Icon name="calendar" size={16} color="#CACBCE" />
          <Text style={styles.subTitle}>{year}</Text>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );
};

export default MovieItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: 360,
    height: 136,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF1A',
    borderRadius: 12,
    padding: 8,
    gap: 20,
  },
  image: {
    height: 120,
    width: 100,
    borderRadius: 8,
    justifyContent: 'center',
    resizeMode: 'cover',
  },
  innerContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  title: {
    color: '#F5F6F8',
    fontSize: 20,
    fontWeight: '500',
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  subTitle: {
    color: '#CACBCE',
    fontSize: 14,
    fontWeight: '400',
  },
});
