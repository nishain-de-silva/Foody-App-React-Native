import React, { useContext, useState } from "react";
import { Button, FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomSearchBar from "./common/SearchBar";
import theme from "./common/theme";
import Icon from 'react-native-vector-icons/FontAwesome'
import KeyValueText from "./common/KeyValueText";
import CustomCard from "./common/CustomCard";
import { SafeAreaView } from "react-native-safe-area-context";
import CartContext from "./CartContext";
import TextInput from "./common/TextInput";
import CustomButton from "./common/CustomButton";
export default function CategoryScreen({navigation}) {

   
    const cartContext = useContext(CartContext)
    const [searchCriteria,setSearchCriteria] = useState(undefined)
    const qtyChangeHandler = (mode, item) => {
        item.quantity += mode == 'add' ? 1 : -1 // item is originally belong to cart variable so changes happens reflectively....
        cartContext.setCart([...cartContext.cart])
    }
    const removeItem = (index) => {
        cartContext.cart.splice(index, 1)
        cartContext.setCart([...cartContext.cart])
    }
    const changeDiscountAmount = (text,item) => {
        if(text == "")
            item.discount = undefined
        else
            item.discount = parseFloat(text)    
        cartContext.setCart([...cartContext.cart])    
    }
    const renderItem = (value) => {
        const item = value.item
        return <CustomCard>
            <View>
                <View style={{ alignSelf: 'flex-start' }}>
                    <Text style={theme.foodTitle}>{item.name}</Text>
                    <View style={theme.underline} />
                </View>
                <KeyValueText description="Description" value={item.description} isVerical />
                <KeyValueText description='Price' value={item.price} />
                <TextInput description="Discount (%)"  placeholder="Discount %" keyboardType='number-pad' maxLength={2}
                onChangeText={(text)=>{changeDiscountAmount(text, item)}}/>
                <KeyValueText qtyEditable={true} qtyChangeHandler={(mode) => { qtyChangeHandler(mode, item) }} description='Quantity' value={item.quantity} />
            </View>
            <View style={styles.iconPadding}>
                <Icon onPress={() => { removeItem(value.index) }} name='trash-o' size={25} color={'red'} />
            </View></CustomCard>

    }

    return <View style={styles.container}>
        <Text style={theme.headerStyle}>Cart</Text>
        <CustomSearchBar placeholder='Search Items' onSearch={setSearchCriteria}/>
        <SafeAreaView style={{ flex: 1 }}>
            {cartContext.cart.length == 0 ?
                <Text style={styles.cartEmptyLabel}>Your Cart is empty</Text>
                : <FlatList data={searchCriteria ? cartContext.cart.filter(item => item.name.toLowerCase().includes(searchCriteria.toLowerCase())) : cartContext.cart} renderItem={renderItem} keyExtractor={(value) => cartContext.cart.indexOf(value)} />}
        </SafeAreaView>
        <CustomButton buttonStyle={{margin : 10}} title="Generate Bill" mode="outlined" onPress={()=>{navigation.jumpTo('Generate Bill')}}/>
    </View>
}
const styles = StyleSheet.create({
    iconPadding: {
        height: 50,
        borderRadius: 50,
        backgroundColor: '#F5B5A8',
        alignItems: 'center',
        padding: 10,
        aspectRatio: 1
    },
    cartEmptyLabel: {
        fontSize: 20,
        margin: 10,
        alignSelf: 'center'
    },
    underline: {
        flex: 0,
        marginTop: 2,
        marginBottom: 2,
        backgroundColor: 'black',
        height: 3,
        borderRadius: 100
    },
    foodTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },


    container: {
        height: '100%'
    }
})