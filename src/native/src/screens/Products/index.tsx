import { GetAllCategory, GetAllMainCategory, GetProductBrandActionCreator, RootState } from 'core';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View, Image } from 'react-native';
import { Icon, CheckBox, BottomSheet } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Animated from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import SmallModal from '../../components/Modal';
import { Colors } from '../../Constants/Color';
import { String } from '../../Constants/String';
import { commonStyles, normalize } from '../../utils/commonStyle';
import { Props } from './IProducts';
import styles from './styles';
import * as ImagePicker from "react-native-image-picker"


const Dropdown = ({
  label,
  value,
  onPress
}) => {
  return (
    <View style={{ marginTop: normalize(15) }}>
      <Text style={styles.labelTxt}>{label}</Text>
      <TouchableOpacity onPress={() => onPress()} style={styles.dropView}>
        <View style={styles.firstDiv}>
          <Text style={styles.placeTxt}>{value}</Text>
        </View>
        <View style={styles.secondDiv}>
          <Icon name='chevron-down' type='feather' size={normalize(20)} color={Colors.grayDark} tvParallaxProperties={undefined} />
        </View>
      </TouchableOpacity>
    </View>
  )
}


const Products: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth);


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
  const [allMain, setAllMain] = useState([])
  const [pCategory, setPCategory] = useState([])
  const [brandData, setBrandData] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [data, setData] = useState<any>("")
  const [isBottom, setIsBottom] = useState(false)
  const [images, setImages] = useState([])

  const checkData = [
    {
      title: "True"
    },
    {
      title: "False"
    }
  ]


  const onCheck = (index: number) => {
    let data = checkData.map((item, ind) => {
      if (ind == index) {
        setIsChecked(!isChecked)
      }
    })
  }

  const mainCategory = async () => {
    let mainRequest = {
      authToken: user.token
    }
    const mainCategoryResponse = await dispatch<any>(GetAllMainCategory(mainRequest))
    setAllMain(mainCategoryResponse.resultData)
  }

  const productCategory = async () => {
    let userToekn = {
      authToken: user.token
    }
    let allCategory = await dispatch<any>(GetAllCategory(userToekn))
    setPCategory(allCategory.resultData)
  }

  const getAllBrand = async () => {
    let userToekn = {
      authToken: user.token
    }
    let brandResponse = await dispatch<any>(GetProductBrandActionCreator(userToekn))
    console.log("Data ", brandResponse.resultData)
    setBrandData(brandResponse.resultData)
  }

  useEffect(() => {
    mainCategory()
    productCategory()
    getAllBrand()
  }, [])

  const onMainCategory = (number: number) => {
    // setMnCategory()
    if (number == 1) {
      setData("MainCategory")
      setIsVisible(true)
    }
    else if (number == 2) {
      setData("Category")
      setIsVisible(true)
    }
    else {
      setData("Brand")
      setIsVisible(true)
    }
  }

  const onSelect = (data: string, item: any) => {
    console.log("Item", item)
    console.log("data", data)
    if (data == "MainCategory") {
      setMnCategory(item.mainCategory)
      setIsVisible(false)
    }
    else if (data == "Category") {
      setCategory(item.Categoryname)
      setIsVisible(false)
    }
    else {
      setBrand(item.brandname)
      setIsVisible(false)
    }
  }

  const launchImageLibrary = () => {
    let options: any = {
      mediaType: "photo",
      maxWidth: "400",
      maxHeight: "400",
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response: any) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
        setIsBottom(false)
      } else {
        // console.log('response', JSON.stringify(response.assets));
        var image = images
        let img = response.assets
        image = [...images, img]
        console.log(">>>>>>>Image", image)
        setImages(image)
        setIsBottom(false)
      }
    });

  }

  return (
    <Animated.View style={styles.container}>
      <KeyboardAwareScrollView bounces={false} scrollIndicatorInsets={{ right: 1 }} enableOnAndroid={true} style={{ ...commonStyles.scrollviewContainer }}>
        <View style={styles.center}>
          <Dropdown
            value={mnCategory}
            label={"Select Main Category"}
            onPress={() => onMainCategory(1)}
          />
          <Dropdown
            label={"Select Category"}
            value={category}
            onPress={() => onMainCategory(2)}
          />
          <Dropdown
            label={"Select Brand"}
            value={brand}
            onPress={() => onMainCategory(3)}
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
            <View style={{flexDirection : "row", alignItems : "center", }}>
            <Text style={styles.labelTxt}>{"Product Image"}</Text>
            <TouchableOpacity onPress={() => setIsBottom(true)} style={{ height: normalize(28), width: normalize(130), borderRadius: normalize(6), flexDirection : "row",justifyContent: "center", alignItems: "center", borderWidth: 1, borderStyle: "dashed", marginLeft: normalize(15) }}>
                    <Icon tvParallaxProperties={undefined} name="plus" type='antdesign' size={normalize(16)}  />
                    <Text style={{fontSize : normalize(14), color : Colors.black, paddingLeft : normalize(5)}}>Upload Images</Text>
                  </TouchableOpacity>
            </View>
            {
              images.length >= 1 &&
                <View style={{flexDirection : "row",marginTop: normalize(15)}}>
                  <FlatList
                    data={images}
                    renderItem={({ item, index }) => {
                      return (
                        <>
                          <View style={{ flexDirection: "row", justifyContent : "space-between" }}>
                            <Image source={{ uri: item[0].uri }} style={{ height: normalize(100), width: normalize(100), borderRadius: normalize(6) }} />
                            <View style={{marginLeft : normalize(15)}} />
                          </View>
                        </>
                      )
                    }}
                    horizontal={true}
                  />

                </View>
            }
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
                    <View style={{ width: "42%", flexDirection: "row" }}>
                      <TouchableOpacity onPress={() => onCheck(index)} style={styles.check}>
                        {isChecked && <Icon name='check' type='antdesign' size={normalize(20)} color={"green"} tvParallaxProperties={undefined} />}
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
          <View style={{ marginTop: normalize(20) }}>
            <Button
              bgColor={Colors.pink}
              height={normalize(45)}
              onPress={() => Alert.alert("Hey")}
              children={
                <View style={styles.touchContainer}>
                  <Text style={styles.touchTxt}>Add Product</Text>
                </View>
              }
            />
          </View>

        </View>
      </KeyboardAwareScrollView>
      <SmallModal
        isVisible={isVisible}
        children={
          <View style={{ backgroundColor: Colors.white, padding: normalize(10), width: "90%", alignSelf: "center", borderRadius: normalize(6) }}>
            <Text style={{ fontSize: normalize(16), color: Colors.black, paddingBottom: normalize(10) }}>List of all</Text>
            <FlatList
              data={data == "MainCategory" ? allMain : data == "Category" ? pCategory : brandData}
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => onSelect(data, item)} style={{ height: normalize(25), width: "100%" }}>
                  <Text style={{ fontSize: normalize(14), color: Colors.black, }}>{data == "MainCategory" ? item.mainCategory : data == "Category" ? item.Categoryname : item.brandname}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        }
      />
      <BottomSheet isVisible={isBottom}>
        <View style={{ height: normalize(130), width: "100%", borderTopLeftRadius: normalize(10), borderTopRightRadius: normalize(10), backgroundColor: Colors.white }}>
          <TouchableOpacity onPress={() => launchImageLibrary()} style={{ height: normalize(40), width: "100%", alignItems: "center", paddingTop: normalize(10), paddingLeft: normalize(10), flexDirection: "row" }}>
            <Icon name='clouduploado' type='antdesign' size={normalize(25)} tvParallaxProperties={undefined} />
            <Text style={{ fontSize: normalize(14), color: Colors.black, paddingLeft: normalize(15) }}>Upload Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ height: normalize(40), width: "100%", alignItems: "center", paddingTop: normalize(10), paddingLeft: normalize(10), flexDirection: "row" }}>
            <Icon name='camera' type='entypo' size={normalize(25)} tvParallaxProperties={undefined} />
            <Text style={{ fontSize: normalize(14), color: Colors.black, paddingLeft: normalize(15) }}>Click Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsBottom(false)} style={{ height: normalize(40), width: "100%", backgroundColor: Colors.pink, marginTop: normalize(10), justifyContent: "center", paddingLeft: normalize(20) }}>
            <Text style={{ fontSize: normalize(16), color: Colors.white, fontWeight: "bold" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </Animated.View>
  );
};

export default Products;
