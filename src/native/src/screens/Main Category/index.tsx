import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Animated from 'react-native-reanimated';
import InputField from '../../components/InputField';
import { Colors } from '../../Constants/Color';
import { normalize } from '../../utils/commonStyle';
import { Props } from './IMainCategory';
import styles from './styles';
import Modal from "react-native-modal"
import { FlatList } from 'react-native-gesture-handler';
import Button from '../../components/Button';
import SmallModal from '../../components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { AddMainCategory, RootState, GetAllMainCategory, UpdateMainCategory, DeleteMainCategory } from 'core';
import showToast from '../../components/Toast';
import Loader from '../../components/Loader';

const MainCategory = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    console.log("User", user)
    getAllMainCategory()
  },[])
  // console.log("User isss", user)
  const [mnCategory, setMnCategory] = useState("")
  const [isVisible, setVisible] = useState(false)
  const [mnTitle, setMnTitle] = useState("")
  const [allCategory, setAllCategory] = useState<any>([])
  const [ctIndex, setCTIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
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

  const onSaveChanges = async () => {
      let mainCategory = {
        maincategoryName : mnTitle,
        authToken : user.token
      }
      console.log("Request parameter", mainCategory)
      let mainResponse = await dispatch<any>(AddMainCategory(mainCategory))
      console.log("Main res", mainResponse)
      if(mainResponse.status){
        showToast({type : "success", message : "Main category added successfully"})
        getAllMainCategory()
        setVisible(false)
        setMnTitle("")
      }
      else{
        showToast({type : "error", message : mainResponse.resultData })
        setVisible(false)
        setMnTitle("")
      }
  }

  const onEdit =  (item : any, ind) => {
    setMnTitle(item.mainCategory)
    setVisible(true)
    setIsEdit(true)
    setCTIndex(ind)
  }

  const onEditMainCategory = async () => {
    console.log("Item isssss", allCategory[ctIndex], ctIndex)
    let updateReq = {
      authToken : user.token,
      productid : allCategory[ctIndex]._id,
      upatedname : mnTitle
    }
     let updateMainCategory = await dispatch<any>(UpdateMainCategory(updateReq))
     console.log("Update main category is", updateMainCategory)
     if(updateMainCategory.status){
      showToast({type : "success", message : "Main category updated successfully"})
      setVisible(false)
      setIsEdit(false)
      getAllMainCategory()
     }
     else{
      showToast({type : "error", message : "Something went wrong"})
      setVisible(false)
      setIsEdit(false)
     }
  }

  const onDeleteMainCategory = async (item : any) => {
    let deleteReq = {
      authToken : user.token,
      productid : item._id
    }
    let deleteResponse = await dispatch<any>(DeleteMainCategory(deleteReq))
    if(deleteResponse.status){
      showToast({type : "success", message : "Main category deleted successfully"})
      getAllMainCategory()
    }
    console.log("Delete response is", deleteResponse)
  }

  const onDelete = (item : any) => {
    Alert.alert(
      "Are you sure want to remove this main category?",
      "",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => onDeleteMainCategory(item)}
      ]
    );
  }

  const renderItem = (item : any , ind : number) => {
    return(
      <View style={styles.detailHeader}>
      <View style={styles.detailDiv}>
        <Text style={styles.detailTxt}>{ind + 1}</Text>
      </View>
      <View style={styles.darkLine} />
      <View style={styles.subHeader}>
        <Text style={styles.detailTxt}>{item.mainCategory}</Text>
      </View>
      <View style={styles.darkLine} />
      <View style={styles.subHeader2}>
        <Icon name = "edit" type = "feather" onPress = {() => onEdit(item, ind)} />
      </View>
      <View style={styles.darkLine} />
      <View style={styles.subHeader3}>
      <Icon name = "delete" type = "antdesign" onPress = {() => onDelete(item)} />
      </View>
    </View>
    )
  }

  return (
    <Animated.View style={styles.container}>
      {
        isLoading && <Loader/>
      }
      <ScrollView style={{marginBottom : normalize(20)}}>
      <View style={styles.center}>
        <Button
        height={normalize(45)}
        onPress={() => setVisible(true)}
        bgColor="#ff3f6c"
          children={
            <View style={styles.btnContainer}>
             <Icon name="plus" type="antdesign" color={Colors.white} size={normalize(18)} tvParallaxProperties={undefined} />
          <Text style={styles.btnTxt}>Add Main Category</Text>
            </View>
          }
        />
        <Text style={styles.ctTxt}>MainCategory Name</Text>
        <View style={{ height: normalize(60), }}>
          <InputField
            value={mnCategory}
            onChange={(mnCategory: any) => setMnCategory(mnCategory)}
            top={10}
          />
        </View>

        <View style={styles.header}>
          <View style={styles.titleDiv}>
            <Text style={styles.titleTxt}>No</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.subHeader}>
            <Text style={styles.titleTxt}>Maincategory</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.subHeader2}>
            <Text style={styles.titleTxt}>Edit</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.subHeader3}>
            <Text style={styles.titleTxt}>Delete</Text>
          </View>
        </View>
        <FlatList
          data = {allCategory}
          renderItem = {({item , index }) => renderItem(item, index)}
        />
      </View>

      <SmallModal
        isVisible = {isVisible}
        children = {
          <View style={styles.mdContainer}>
          <View style={styles.mdSub}>
            <Text style={styles.mdTitle}>Add  Main Category</Text>
          </View>
          <View style={styles.mdSubContainer}>
            <Text style={styles.mdSubTxt}>Main Category Title</Text>
            <InputField
              value={mnTitle}
              onChange = {(mnTitle : any) => setMnTitle(mnTitle)}
              top={normalize(10)}
            />
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity onPress={() => setVisible(false)} style={styles.mdClose}>
              <Text style={styles.mdCloseTxt}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => isEdit ? onEditMainCategory() : onSaveChanges()} style={styles.mdSave}>
              <Text style={styles.mdCloseTxt}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
        }
      />
      </ScrollView>
    </Animated.View>
  );
};

export default MainCategory;
