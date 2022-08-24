import React from "react";
import Modal from 'react-native-modal'
import { View } from 'react-native'

export type Props = {
    isVisible: boolean,
    children: any
};

const SmallModal = (props: Props) => {

    return (
        <View style={{ flex: 1 }}>
            <Modal
                isVisible={props.isVisible}
                style={{ margin: 0, padding: 0 }}>
                    {props.children}
                </Modal>
        </View>
    )
}

export default SmallModal