import React, { useEffect, useState } from 'react';
import { Alert, FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Animated from 'react-native-reanimated';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import SmallModal from '../../components/Modal';
import { Colors } from '../../Constants/Color';
import { normalize } from '../../utils/commonStyle';
import { Props } from './ICategories';
import styles from './styles';
import { Menu } from 'react-native-material-menu';
import { useDispatch, useSelector } from 'react-redux';
import { AddCategory, DeleteCategory, GetAllCategory, GetAllMainCategory, RootState, UpdateCategory } from 'core';
import showToast from '../../components/Toast';
import { useIsFocused } from "@react-navigation/native";

const Categories: React.FC<Props> = (props : any) => {
  const dispatch = useDispatch()
  const isFocused = useIsFocused();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    console.log("User is", user)
    if(isFocused){
      console.log("Inside")
      getAllMainCategory()
      getAllCategory()
    }

  },[isFocused])

  const [mnCategory, setMnCategory] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [category, setCategory] = useState("Select Main Category")
  const [addIsVisible, setAddIsVisible] = useState(false)
  const [visible, setVisible] = useState(false);
  const [cTitle, setCTitle] = useState("")
  const [bagData, setBagData] = useState<any>([])
  const [allCategory, setAllCategory] = useState<any>([])
  const [cTIndex, setCTIndex] = useState("")
  const [isEdit, setIsEdit] = useState(false)


  const getAllMainCategory = async () => {
    let userToekn = {
      authToken : user.token
    }
   let allMainCategory = await dispatch<any>(GetAllMainCategory(userToekn))
   if(allMainCategory.status){
    setAllCategory(allMainCategory.resultData)
    showToast({type : "success" , message : "All main category fetch successfully"})
   }
   else{
    showToast({type : "error", message : allMainCategory.resultData})
   }
  }

  const getAllCategory = async () => {
    let userToekn = {
      authToken : user.token
    }
    let allCategory = await dispatch<any>(GetAllCategory(userToekn))
    if(allCategory.status){
      showToast({type : "success", message : "All category fetch successfully"})
      setBagData(allCategory.resultData)
    }
    else{
      showToast({type : "error", message : "Something went wrong"})
    }
  }

  const hideMenu = (name: string) => {
    setCategory(name)
    setVisible(false)
  };

  const onCategorySelect = (name: string) => {
    setCategory(name)
    setIsVisible(false)
  }

  const onSave = async () => {
    let addCategoryReq = {
      categoryname : cTitle,
      maincategoryname : category,
      authToken : user.token
    }
   let addCategoryRes = await dispatch<any>(AddCategory(addCategoryReq))
   if(addCategoryRes.status){
     setCategory("Select Main Category")
      setAddIsVisible(false)
      getAllCategory()
      showToast({type :"success", message : "Category added successfully"})
   }
   else{
    showToast({type :"success", message : addCategoryRes.resultData})
   }
  }


  const renderItem = (item : any, ind : number) => {
    return (
      <View style={styles.smCenter}>
        <TouchableOpacity onPress={() => hideMenu(item.mainCategory)}>
          <Text style={{ fontSize: normalize(14), color: Colors.black }}>{item.mainCategory}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const onEdit = (item : any, ind : string) => {
    setAddIsVisible(true)
    setIsEdit(true)
    setCTIndex(ind)
    setCategory(item.mainCategory.mainCategory)
    setCTitle(item.Categoryname)
  }

  const onEditPress = async () => {
    let editReq = {
      categoryid : cTIndex,
      updatedcategoryname : cTitle,
      authToken : user.token
    }
    let editResponse = await dispatch<any>(UpdateCategory(editReq))
    if(editResponse.status){
      showToast({type : "success", message : "Category edited successfully"})
       getAllCategory()
      setIsEdit(false)
      setAddIsVisible(false)
    }
    else{
      showToast({type : "error", message : "Something went wrong"})
      setAddIsVisible(false)
    }
  }

  const onAddCategory = () => {
    setAddIsVisible(true)
    setCTitle("")
    setIsEdit(false)
    setCategory("Select Main Category")
  }

  const onDeleteCategory = async (item : any) => {
    let deleteCategoryRequest = {
      authToken : user.token,
      categoryid : item._id
    }
    const deleteCategoryResponse = await dispatch<any>(DeleteCategory(deleteCategoryRequest))
    if(deleteCategoryResponse.status){
      showToast({type : "success", message : "Category deleted successfully"})
      getAllCategory()
    }
    else{
      showToast({type : "error", message : "something went wrong"})
    }
  }

  const onDelete = (item : any) => {
    // console.log("Item is", item)
    Alert.alert(
      "Are you sure want to remove this main category?",
      "",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => onDeleteCategory(item)}
      ]
    );
  }

  return (
    <Animated.View style={styles.container}>
      <ScrollView style={{ marginBottom: normalize(30) }}>
        <View style={styles.center}>
          <Button
            height={normalize(45)}
            onPress={() => onAddCategory()}
            bgColor="#ff3f6c"
            children={
              <View style={styles.btnContainer}>
                <Icon name="plus" type="antdesign" color={Colors.white} size={normalize(18)} tvParallaxProperties = {undefined} />
                <Text style={styles.btnTxt}>Add Category</Text>
              </View>
            }
          />
          <Text style={styles.ctTxt}>Category Name</Text>
          <View style={{ height: normalize(60), }}>
            <InputField
              value={mnCategory}
              onChange={(mnCategory: any) => setMnCategory(mnCategory)}
              top={10}
            />
          </View>
          <Text style={styles.ctTxt}>Main Category</Text>
          <View style={{ height: normalize(60), }}>
            <TouchableOpacity onPress={() => setIsVisible(true)} style={styles.touchContainer}>
              <Text style={{ fontSize: normalize(14), color: Colors.grayDark }}>{category}</Text>
              <View style={styles.iconDown}>
                <Icon type='material' name="keyboard-arrow-down" size={30} tvParallaxProperties = {undefined} />
              </View>
            </TouchableOpacity>
          </View>

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
            <View style={styles.tbCol3}>
              <Text style={styles.tbDetail}>Edit</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.tbCol4}>
              <Text style={styles.tbDetail}>Delete</Text>
            </View>
          </View>
          <FlatList
            data={bagData}
            renderItem = {({item , index}) => (
              <View style={styles.subTb}>
              <View style={styles.tbCol1}>
                <Text style={styles.subTbDetail}>{index + 1}</Text>
              </View>
              <View style={styles.subLine} />
              <View style={styles.tbCol2}>
                <Text style={styles.mnTxt}>{item.mainCategory == null ? "" : item.mainCategory.mainCategory}</Text>
              </View>
              <View style={styles.subLine} />
              <View style={styles.tbCol2}>
                <Text style={styles.mnTxt}>{item.Categoryname}</Text>
              </View>
              <View style={styles.subLine} />
              <View style={styles.tbCol3}>
              <Icon name = "edit" type = "feather" onPress = {() => onEdit(item, item._id)} tvParallaxProperties={undefined} />
              </View>
              <View style={styles.subLine} />
              <View style={styles.tbCol4}>
              <Icon name = "delete" type = "antdesign" onPress = {() => onDelete(item)} tvParallaxProperties={undefined} />
              </View>
            </View>
            )}
          />
        </View>
      </ScrollView>
      <SmallModal
        isVisible={isVisible}
        children={
          <View style={styles.smContainer}>
            <Text style={styles.liTxt}>List of Main Category</Text>
            <FlatList
              data={allCategory}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity onPress={() => onCategorySelect(item.mainCategory)} style={styles.smTouch}>
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
                    <Icon type='material' name="keyboard-arrow-down" size={30} tvParallaxProperties = {undefined} />
                  </View>
                </TouchableOpacity>}
              >
                <FlatList
                  data={allCategory}
                  renderItem={({ item, index }) => renderItem(item, index)}
                />
              </Menu>
              <View style={{ marginTop: normalize(15) }}>
                <Text style={styles.title}>Category Title</Text>
                <InputField
                  value={cTitle}
                  onChange={(ctTitle: any) => setCTitle(ctTitle)}
                  top={normalize(10)}
                />
              </View>
            </View>
            <View style={styles.bottom}>
              <TouchableOpacity onPress={() => setAddIsVisible(false)} style={styles.close}>
                <Text style={styles.closeTxt}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => isEdit ? onEditPress() :  onSave()} style={styles.save}>
                <Text style={styles.closeTxt}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    </Animated.View>
  );
};

export default Categories;
