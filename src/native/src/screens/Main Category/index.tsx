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

const MainCategory: React.FC<Props> = ({ navigation }) => {
  const [mnCategory, setMnCategory] = useState("")
  const [isVisible, setVisible] = useState(false)
  const [mnTitle, setMnTitle] = useState("")
  const [allCategory, setAllCategory] = useState([
    {
      id: "",
      title: "",
      mnTitle: ""
    }
  ])
  const [ctIndex, setCTIndex] = useState(0)

  const onSaveChanges = () => {
    let category = { id: "", title: "", mnTitle: "" }
    let data = [...allCategory, category]
    setCTIndex(ctIndex + 1)
    setAllCategory(data)
    setVisible(false)
  }

  const onCategoryChange = (mnTxt: any) => {
    let allData = [...allCategory].reduce((acc: any, cur: any, index) => {
      if (index == ctIndex) {
        cur.mnTitle = mnTxt
        cur.title = mnTxt
      }
      acc.push(cur)
      return acc
    }, [])
    setAllCategory(allData)
  }

  return (
    <Animated.View style={styles.container}>
      <ScrollView style={{marginBottom : normalize(20)}}>
      <View style={styles.center}>
        <Button
        height={normalize(45)}
        onPress={() => setVisible(true)}
        bgColor="#ff3f6c"
          children={
            <View style={styles.btnContainer}>
             <Icon name="plus" type="antdesign" color={Colors.white} size={normalize(18)} />
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
        </View>
        {
          allCategory.length > 0 &&
          allCategory.map((item, ind) => {
            if (item.title == "") {

            }
            else {
              return (
                <View style={styles.detailHeader}>
                  <View style={styles.detailDiv}>
                    <Text style={styles.detailTxt}>{ind + 1}</Text>
                  </View>
                  <View style={styles.darkLine} />
                  <View style={styles.detailView}>
                    <Text style={styles.detailTxt}>{item.title}</Text>
                  </View>
                </View>
              )
            }
          })
        }
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
              value={allCategory[ctIndex].mnTitle}
              onChange={(mnTitle: string) => onCategoryChange(mnTitle)}
              top={normalize(10)}
            />
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity onPress={() => setVisible(false)} style={styles.mdClose}>
              <Text style={styles.mdCloseTxt}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onSaveChanges()} style={styles.mdSave}>
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
