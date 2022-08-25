import React, { useState } from 'react';
import { Alert, FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Animated from 'react-native-reanimated';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import SmallModal from '../../components/Modal';
import { Colors } from '../../Constants/Color';
import { String } from '../../Constants/String';
import { normalize } from '../../utils/commonStyle';
import { Props } from './ICategories';
import styles from './styles';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';


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

const Categories: React.FC<Props> = ({ navigation }) => {
  const [mnCategory, setMnCategory] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [category, setCategory] = useState("Select Main Category")
  const [addIsVisible, setAddIsVisible] = useState(false)
  const [visible, setVisible] = useState(false);
  const [cTitle, setCTitle] = useState("")
  const [bagData, setBagData] = useState([
    {
      ctTitle: "",
      mnTitle: "",
    }
  ])

  const [cTIndex, setCTIndex] = useState(0)

  const hideMenu = (name: string) => {
    setCategory(name)
    setVisible(false)
  };

  const showMenu = () => setVisible(true);

  const onCategorySelect = (name: string) => {
    setCategory(name)
    setIsVisible(false)
  }

  const onSave = () => {
    let category = { ctTitle: "", mnTitle: "" }
    let data = [...bagData, category]
    setCTIndex(cTIndex + 1)
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


  return (
    <Animated.View style={styles.container}>
      <ScrollView style={{ marginBottom: normalize(20) }}>
        <View style={styles.center}>
          <Button
            height={normalize(45)}
            onPress={() => setAddIsVisible(true)}
            bgColor="#ff3f6c"
            children={
              <View style={styles.btnContainer}>
                <Icon name="plus" type="antdesign" color={Colors.white} size={normalize(18)} />
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
                <Icon type='material' name="keyboard-arrow-down" size={30} />
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
          </View>
          {
            bagData.length > 0 &&
            bagData.map((item, ind) => {
              if (item.mnTitle == "") {

              }
              else {
                return (
                  <View style={styles.subTb}>
                    <View style={styles.tbCol1}>
                      <Text style={styles.subTbDetail}>{ind + 1}</Text>
                    </View>
                    <View style={styles.subLine} />
                    <View style={styles.tbCol2}>
                      <Text style={styles.mnTxt}>{item.mnTitle}</Text>
                    </View>
                    <View style={styles.subLine} />
                    <View style={styles.tbCol2}>
                      <Text style={styles.mnTxt}>{item.ctTitle}</Text>
                    </View>
                  </View>
                )
              }
            })
          }

        </View>
      </ScrollView>
      <SmallModal
        isVisible={isVisible}
        children={
          <View style={styles.smContainer}>
            <Text style={styles.liTxt}>List of Main Category</Text>
            <FlatList
              data={MainCategory}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity onPress={() => onCategorySelect(item.title)} style={styles.smTouch}>
                    <Text style={styles.title}>{item.title}</Text>
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
                  data={MainCategory}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={styles.smCenter}>
                        <TouchableOpacity onPress={() => hideMenu(item.title)}>
                          <Text style={{ fontSize: normalize(14), color: Colors.black }}>{item.title}</Text>
                        </TouchableOpacity>
                      </View>
                    )
                  }}
                />
              </Menu>
              <View style={{ marginTop: normalize(15) }}>
                <Text style={styles.title}>Category Title</Text>
                <InputField
                  value={bagData[cTIndex].ctTitle}
                  onChange={(ctTitle: any) => onAdd(ctTitle)}
                  top={normalize(10)}
                />
              </View>
            </View>
            <View style={styles.bottom}>
              <TouchableOpacity onPress={() => setAddIsVisible(false)} style={styles.close}>
                <Text style={styles.closeTxt}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onSave()} style={styles.save}>
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
