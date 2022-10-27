import React from 'react';
import { FlatList, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { Props } from './IHome';
import styles from './styles';
import { normalize, commonStyles } from "../../utils/commonStyle"
import { Colors } from '../../Constants/Color';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { RootState } from 'path-redux/lib/store/reducer';


const Home: React.FC<Props> = ({ navigation }) => {

  const data = [
    {
      name: "Product",
      icon_name: "home",
      type: "entypo",
      empty: false,
      onPress : () => navigation.navigate("Products")
    },
    {
      name: "Main Category",
      icon_name: "home",
      type: "entypo",
      empty: false,
      onPress : () => navigation.navigate("Main Category")
    },
    {
      name: "Categories",
      icon_name: "home",
      type: "entypo",
      empty: false,
      onPress : () => navigation.navigate("Categories")
    },
    {
      name: "Brands",
      icon_name: "home",
      type: "entypo",
      empty: false,
      onPress : () => navigation.navigate("Brands")
    },
    {
      name: "Offers",
      icon_name: "home",
      type: "entypo",
      empty: false,
      onPress : () => navigation.navigate("Offers")
    }
  ]

  const state = useSelector((state: RootState) => state.auth);

  // console.log("State is", state)

  const numberOfColumn = 2
  const WIDTH = Dimensions.get("window").width

  const renderItem = (item: any, index: number) => {
    if (item.empty) {
      return (
        <View style={[styles.item, styles.blankDiv]} />
      )
    }
    return (
     <TouchableOpacity onPress={() => item.onPress()} activeOpacity={.7} style={styles.item}>
      <LinearGradient colors={["#FEEDF4", "#FDEFE6"]} style={styles.linear}>
        <View style={styles.item}>
          <Icon name={item.icon_name} type={item.type} size={normalize(35)} color={Colors.pink} />
          <Text style={{ paddingTop: normalize(8), fontSize: normalize(14), color: Colors.pink }}>{item.name}</Text>
        </View>
      </LinearGradient>
      </TouchableOpacity>
    )
  }

  const formateData = (data: any, numColums: number) => {
    const totalRows = Math.floor(data.length / numColums)
    let lastRows = data.length - (totalRows * numColums)
    while (lastRows !== 0 && lastRows !== numColums) {
      data.push({
        name: "",
        icon_name: "",
        type: "",
        empty: true
      })
      lastRows++
    }
    return data
  }

  return (
    <Animated.View style={styles.container}>
      <View style={styles.flContainer}>
        <FlatList
          data={formateData(data, numberOfColumn)}
          renderItem={({ item, index }) => renderItem(item, index)}
          numColumns={numberOfColumn}
        />
      </View>
    </Animated.View>
  );
};

export default Home;
