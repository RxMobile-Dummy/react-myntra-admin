import React, { useState } from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Icon, CheckBox } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Animated from 'react-native-reanimated';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import { Colors } from '../../Constants/Color';
import { String } from '../../Constants/String';
import { commonStyles, normalize } from '../../utils/commonStyle';
import { Props } from './IProducts';
import styles from './styles';



const Products: React.FC<Props> = ({ navigation }) => {

  const [mnCategory, setMnCategory] = useState("Select Main Category")
  const [category, setCategory] = useState("Select Category")
  const [brand, setBrand] = useState("Select Brand")
  const [product, setProduct] = useState("")
  const [productDetails, setProductDetails] = useState("")
  const [productPrize, setProductPrize] = useState("")
  const [productSize, setProductSize] = useState("")
  const [pincode, setPincode] = useState("")
  const [isChecked, setIsChecked] = useState(false)
  const [offer, setOffer] = useState("")

  const data = [
    {
      label: "Select MainCategory",
      placeholder: mnCategory,
    },
    {
      label: "Select Category",
      placeholder: category,
    },
    {
      label: "Select Brand",
      placeholder: brand,
    }
  ]

  const checkData = [
    {
      title: "True"
    },
    {
      title: "False"
    }
  ]


  const onCheck = (index : number) => {
    let data = checkData.map((item, ind) => {
      if(ind == index){
        setIsChecked(!isChecked)
      }
    })
  }

  return (
    <Animated.View style={styles.container}>
      <KeyboardAwareScrollView bounces={false} scrollIndicatorInsets={{ right: 1 }} enableOnAndroid={true} style={{ ...commonStyles.scrollviewContainer }}>
        <View style={styles.center}>
          <FlatList
            data={data}
            renderItem={({ item, index }) => {
              return (
                <View style={{ marginTop: normalize(15) }}>
                  <Text style={styles.labelTxt}>{item.label}</Text>
                  <TouchableOpacity style={styles.dropView}>
                    <View style={styles.firstDiv}>
                      <Text style={styles.placeTxt}>{item.placeholder}</Text>
                    </View>
                    <View style={styles.secondDiv}>
                      <Icon name='chevron-down' type='feather' size={normalize(20)} color={Colors.grayDark} />
                    </View>
                  </TouchableOpacity>
                </View>
              )
            }}
          />
          <View style={{ marginTop: normalize(15) }}>
            <Text style={styles.labelTxt}>{"Product Name"}</Text>
            <InputField
              value={product}
              onChange={(product: string) => setProduct(product)}
              top={normalize(6)}
              isProduct={true}
              placeholder={"Product Name"}
              placeholderColor={Colors.grayDark}
            />
          </View>
          <View style={{ marginTop: normalize(15) }}>
            <Text style={styles.labelTxt}>{"Product Details"}</Text>
            <InputField
              value={productDetails}
              onChange={(productDetails: string) => setProductDetails(productDetails)}
              top={normalize(6)}
              isProduct={true}
              placeholder={"Product Details"}
              placeholderColor={Colors.grayDark}
              isMultiline={true}
            />
          </View>
          <View style={{ marginTop: normalize(15), }}>
            <Text style={styles.labelTxt}>{"Product Image"}</Text>
            <TouchableOpacity style={styles.upload}>
              <Text style={styles.labelTxt}>Upload Image</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: normalize(15) }}>
            <Text style={styles.labelTxt}>{"Product Price"}</Text>
            <InputField
              value={productPrize}
              onChange={(productPrize: string) => setProductPrize(productPrize)}
              top={normalize(6)}
              isProduct={true}
              placeholder={"Product Price"}
              placeholderColor={Colors.grayDark}
            />
          </View>
          <View style={{ marginTop: normalize(15) }}>
            <Text style={styles.labelTxt}>{"Product Size"}</Text>
            <InputField
              value={productSize}
              onChange={(productSize: string) => setProductSize(productSize)}
              top={normalize(6)}
              isProduct={true}
              placeholder={"Product Size"}
              placeholderColor={Colors.grayDark}
            />
          </View>
          <View style={{ marginTop: normalize(15) }}>
            <Text style={styles.labelTxt}>{"Delivery Pincode"}</Text>
            <InputField
              value={pincode}
              onChange={(pincode: string) => setPincode(pincode)}
              top={normalize(6)}
              isProduct={true}
              placeholder={"Delivery Pincode"}
              placeholderColor={Colors.grayDark}
            />
          </View>
          <View style={{ marginTop: normalize(15) }}>
            <Text style={styles.labelTxt}>{"Returnable"}</Text>
            <View style={styles.checkContainer}>
              {
                checkData.map((item, index) => {
                  return (
                    <View style={{width : "42%", flexDirection : "row"}}>
                      <TouchableOpacity onPress={() => onCheck(index)} style={styles.check}>
                        {isChecked && <Icon name='check' type='antdesign' size={normalize(20)} color={"green"} />}
                      </TouchableOpacity>
                      <Text style={{ fontSize: normalize(14), color: Colors.black }}>{item.title}</Text>
                    </View>
                  )
                })
              }
            </View>
          </View>
          <View style={{ marginTop: normalize(15) }}>
            <Text style={styles.labelTxt}>{"Offer"}</Text>
            <InputField
              value={offer}
              onChange={(offer: string) => setOffer(offer)}
              top={normalize(6)}
              isProduct={true}
              placeholder={"Offer"}
              placeholderColor={Colors.grayDark}
            />
          </View>
          <View style={{marginTop : normalize(20)}}>
          <Button
            bgColor={Colors.pink}
            height = {normalize(45)}
            onPress = {() => Alert.alert("Hey")}
            children = {
              <View style={styles.touchContainer}>
                <Text style={styles.touchTxt}>Add Product</Text>
              </View>
            }
          />
          </View>

        </View>
      </KeyboardAwareScrollView>
    </Animated.View>
  );
};

export default Products;
