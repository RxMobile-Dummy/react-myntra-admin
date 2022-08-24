import React from "react";
import { TextInput, View } from "react-native";
import { normalize } from "../../utils/commonStyle";

export type Props = {
    value : any,
    onChange : any,
    // isPassword : boolean,
    // showPassord : boolean,
    top : number
  };

const InputField = (props : Props) => {
    return(
        <View style={{flex : 1}}>
            <TextInput
                value={props.value}
                onChangeText = {(val) => props.onChange(val)}
                style = {{width : "100%", height : normalize(40), borderWidth : .6, borderColor : "#585757",borderRadius : normalize(4), marginTop : props.top, paddingLeft : normalize(10)}}
            />
        </View>
    )
}

export default InputField