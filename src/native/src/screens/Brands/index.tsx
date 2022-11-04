import React, { useEffect, useState } from 'react';
import { Alert, FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Animated from 'react-native-reanimated';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import SmallModal from '../../components/Modal';
import { Colors } from '../../Constants/Color';
import { String } from '../../Constants/String';
import { normalize } from '../../utils/commonStyle';
import styles from './styles';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { useDispatch, useSelector } from 'react-redux';
import { AddProductBrand, GetAllMainCategory, GetMainCategoryById, GetProductBrandActionCreator, GetProductCategoryByIDQuery, RootState, UpdateBrand, } from 'core';
import showToast from '../../components/Toast';
import Loader from '../../components/Loader';


const MainCategory = [
  {
    title: "Mens"
  },
  {
    title: "Womens"
  },
  {
    title: "Accessories"
  },
  {
    title: "Home Products"
  },
  {
    title: "Jewellery"
  },
  {
    title: "Beauty Products"
  }
]

const categoryData = [
  {
    title : "Jeans"
  },
  {
    title : "Shirt"
  },
  {
    title : "T-shirt"
  },
  {
    title : "Kurtas"
  },
  {
    title : "Sweat-shirts"
  }
]

const Brands: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth);

  const [mnCategory, setMnCategory] = useState("Select Main Category")
  const [isVisible, setIsVisible] = useState(false)
  const [category, setCategory] = useState("Select Main Category")
  const [addIsVisible, setAddIsVisible] = useState(false)
  const [visible, setVisible] = useState(false);
  const [cTitle, setCTitle] = useState("")
  const [brandName, setBrandName] = useState("")
  const [ctIsvisible, setCtIsVisible] = useState(false)
  const [bagData, setBagData] = useState([
    {
      ctTitle: "",
      mnTitle: "",
    }
  ])

  const [cTIndex, setCTIndex] = useState(0)
  const [allMain, setAllMain] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [subCa, setSuCa] = useState("Select Category")
  const [subIsVisible, setSubIsVisible] = useState(false)
  const [brand, setBrand] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const allMainCategory = async () => {
    let userToekn = {
      authToken : user.token
    }
    let allMaincategoryResponse = await dispatch<any>(GetAllMainCategory(userToekn))
    console.log("All main category", allMaincategoryResponse.resultData)
    setAllMain(allMaincategoryResponse.resultData)
  }

  const allProductBrands = async () => {
    let userToekn = {
      authToken : user.token
    }
      let brandResponse = await dispatch<any>(GetProductBrandActionCreator(userToekn))
      console.log("Data ", brandResponse)
      if(brandResponse.status){
        setBrand(brandResponse.resultData)
      }
  }

  useEffect(() => {
    allProductBrands()
    allMainCategory()
  },[])

  const hideMenu = async (name: any) => {
    console.log("Name is", name)
    setCategory(name.mainCategory)

    let userRequest = {
      authToken : user.token,
      productid : name._id
    }
    console.log("User rrrrr", userRequest)
    let categoryResponse = await dispatch<any>(GetProductCategoryByIDQuery(userRequest))
    console.log("Category response is", categoryResponse.resultData.category)
    setVisible(false)
    if(categoryResponse.status){
      setSubCategory(categoryResponse.resultData.category)
    }
  };

  const hideSubCategory = (name : any) => {
    setSuCa(name)
    setSubIsVisible(false)
  }

  const showMenu = () => setVisible(true);

  const onCategorySelect = (name: any) => {
    console.log("Name is", name)
    setMnCategory(name.mainCategory)
    setIsVisible(false)
  }

  const onSave = () => {
    let category = { ctTitle: "", mnTitle: "" }
    let data = [...bagData, category]
    // setCTIndex(cTIndex + 1)
    setBagData(data)
    setAddIsVisible(false)
  }


  const onAdd = (ctTitle: string) => {
    let data = [...bagData].reduce((acc: any, cur: any, ind) => {
      if (ind === cTIndex) {
          cur.ctTitle = ctTitle,
          cur.mnTitle = category
      }
      acc.push(cur)
      return acc
    }, [])
    setBagData(data)
  }

  const onCategory = (name : string) => {
    setCategory(name)
    setCtIsVisible(false)
  }

  const AddBrand = async () => {
     setIsLoading(true)
    if(isEdit){
    let updateBrandRequest = {
      authToken : user.token,
      brandid : brand[cTIndex]._id ,
      updatedname : brandName
    }
     let updateBrand = await dispatch<any>(UpdateBrand(updateBrandRequest))
    console.log("Updated brand", updateBrand)
    if(updateBrand.status){
      showToast({type : "success", message : "Brand name updated successfully"})
      setAddIsVisible(false)
      setCategory("")
      setBrandName("")
      allProductBrands()
      setIsEdit(false)
      setIsLoading(false)
    }
    else{
      showToast({type : "error",message : "something went wrong"})
      setIsLoading(false)
      setAddIsVisible(false)
    }
    }
    else{
      let brandRequest = {
        authToken : user.token,
        mainCategory : category,
        category : subCa,
        brandname : brandName
      }
     let addBrandResponse = await dispatch<any>(AddProductBrand(brandRequest))
     if(addBrandResponse.status){
      setAddIsVisible(false)
      showToast({type : "success", message : "Brand Added successfully"})
      allProductBrands()
      setIsLoading(false)
     }
     else{
      showToast({type : "error",message : "something went wrong"})
      setIsLoading(false)
      setAddIsVisible(false)
     }
    }
  }

  const onEditClick = async (item : any, index : number) => {
    console.log("Ite is", item)
    setAddIsVisible(true)
    setIsEdit(true)
    setCTIndex(index)
    setCategory(item.mainCategory.mainCategory)
    setBrandName(item.brandname)
  }


  return (
    <Animated.View style={styles.container}>
      {isLoading && <Loader/>}
      <ScrollView style={{ marginBottom: normalize(20) }}>
        <View style={styles.center}>
          <Button
            height={normalize(45)}
            onPress={() => setAddIsVisible(true)}
            bgColor="#ff3f6c"
            children={
              <View style={styles.btnContainer}>
                <Icon name="plus" type="antdesign" color={Colors.white} size={normalize(18)} />
                <Text style={styles.btnTxt}>Add Brand</Text>
              </View>
            }
          />
          <Text style={styles.ctTxt}>Brand Name</Text>
          <View style={{ height: normalize(60), }}>
            <InputField
              value={brandName}
              onChange={(brandName: any) => setBrandName(brandName)}
              top={10}
            />
          </View>
          {/* <Text style={styles.ctTxt}>Main Category</Text>
          <View style={{ height: normalize(60), }}>
            <TouchableOpacity onPress={() => setIsVisible(true)} style={styles.touchContainer}>
              <Text style={{ fontSize: normalize(14), color: Colors.grayDark }}>{mnCategory}</Text>
              <View style={styles.iconDown}>
                <Icon type='material' name="keyboard-arrow-down" size={30} />
              </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.ctTxt}>Category</Text>
          <View style={{ height: normalize(60), }}>
            <TouchableOpacity onPress={() => setCtIsVisible(true)} style={styles.touchContainer}>
              <Text style={{ fontSize: normalize(14), color: Colors.grayDark }}>{category}</Text>
              <View style={styles.iconDown}>
                <Icon type='material' name="keyboard-arrow-down" size={30} />
              </View>
            </TouchableOpacity>
          </View> */}
          <ScrollView scrollEnabled horizontal >
            <View style = {{flexDirection : "column"}}>
            <View style={styles.tbHeader}>
            <View style={styles.tbCol1}>
              <Text style={styles.tbDetail}>No</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.tbCol2}>
              <Text style={styles.tbDetail}>Main Category</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.tbCol2}>
              <Text style={styles.tbDetail}>Category</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.tbCol2}>
              <Text style={styles.tbDetail}>Brand</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.tbCol1}>
              <Text style={styles.tbDetail}>Edit</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.tbCol3}>
              <Text style={styles.tbDetail}>Delete</Text>
            </View>
          </View>
            <FlatList
              data={brand}
              renderItem = {({item,index}) => (

          <View style={styles.tbSubDetails}>
            <View style={styles.tbCol1}>
              <Text style={styles.tbSubTxtDetail}>{index + 1}</Text>
            </View>
            <View style={styles.lineDivider} />
            <View style={styles.tbCol2}>
              <Text style={styles.tbSubTxtDetail}>{item.mainCategory.mainCategory}</Text>
            </View>
            <View style={styles.lineDivider} />
            <View style={styles.tbCol2}>
              <Text style={styles.tbSubTxtDetail}>Category</Text>
            </View>
            <View style={styles.lineDivider} />
            <View style={styles.tbCol2}>
              <Text style={styles.tbSubTxtDetail}>{item.brandname}</Text>
            </View>
            <View style={styles.lineDivider} />
            <View style={styles.tbCol1}>
            <Icon name = "edit" type = "feather" onPress = {() => onEditClick(item, index)} />
            </View>
            <View style={styles.lineDivider} />
            <View style={styles.tbCol3}>
            <Icon name = "delete" type = "antdesign" />
            </View>
          </View>
              )}
            />
            </View>
          </ScrollView>
        </View>
      </ScrollView>
      <SmallModal
        isVisible={isVisible ? isVisible : ctIsvisible}
        children={
          <View style={styles.smContainer}>
            <Text style={styles.liTxt}>List of Main Category</Text>
            <FlatList
              data={isVisible ? allMain : categoryData}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity onPress={() => isVisible ? onCategorySelect(item) : onCategory(item)} style={styles.smTouch}>
                    <Text style={styles.title}>{item.mainCategory}</Text>
                  </TouchableOpacity>
                )
              }}
            />

          </View>
        }
      />
      <SmallModal
        isVisible={addIsVisible}
        children={
          <View style={styles.sm2Container}>
            <View style={styles.sm2Sub}>
              <Text style={styles.sm2Txt}>Add Category</Text>
            </View>
            <View style={styles.sm2}>
              <Text style={styles.title}>Main Category</Text>
              <Menu
                style={styles.sm2Menu}
                visible={visible}
                anchor={<TouchableOpacity onPress={() => setVisible(true)} style={styles.menu}>
                  <Text style={styles.title}>{category}</Text>
                  <View style={{ position: "absolute", right: 10 }}>
                    <Icon type='material' name="keyboard-arrow-down" size={30} />
                  </View>
                </TouchableOpacity>}
              >
                <FlatList
                  data={allMain}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={styles.smCenter}>
                        <TouchableOpacity onPress={() => hideMenu(item)}>
                          <Text style={{ fontSize: normalize(14), color: Colors.black }}>{item.mainCategory}</Text>
                        </TouchableOpacity>
                      </View>
                    )
                  }}
                />
              </Menu>
              <Text style={{...styles.title, marginTop : normalize(10)}}>Category</Text>
              <Menu
                style={styles.sm2Menu}
                visible={subIsVisible}
                anchor={<TouchableOpacity onPress={() => setSubIsVisible(true)} style={styles.menu}>
                  <Text style={styles.title}>{subCa}</Text>
                  <View style={{ position: "absolute", right: 10 }}>
                    <Icon type='material' name="keyboard-arrow-down" size={30} />
                  </View>
                </TouchableOpacity>}
              >
                <FlatList
                  data={subCategory}
                  renderItem={({ item, index }) => {
                    console.log("Item", item)
                    return (
                      <View style={styles.smCenter}>
                        <TouchableOpacity onPress={() => hideSubCategory(item.Categoryname)}>
                          <Text style={{ fontSize: normalize(14), color: Colors.black }}>{item.Categoryname}</Text>
                        </TouchableOpacity>
                      </View>
                    )
                  }}
                />
              </Menu>
              <View style={{ marginTop: normalize(15) }}>
                <Text style={styles.title}>Brand Name</Text>
                <InputField
                  value={brandName}
                  onChange={(brandName: any) => setBrandName(brandName)}
                  top={normalize(10)}
                />
              </View>
            </View>
            <View style={styles.bottom}>
              <TouchableOpacity onPress={() => setAddIsVisible(false)} style={styles.close}>
                <Text style={styles.closeTxt}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => AddBrand()} style={styles.save}>
                <Text style={styles.closeTxt}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    </Animated.View>
  );
};

export default Brands;
