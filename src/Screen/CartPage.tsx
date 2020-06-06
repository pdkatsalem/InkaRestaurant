import * as React from 'react'
import { View,Text,TouchableOpacity, StyleSheet, ScrollView} from 'react-native'
import { connect } from 'react-redux'
import {  addItem,reduceItem, toggleReview, dineIn } from '../Store/actions'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppDefaults from '../Defaults/AppDefaults';
interface Props{
    navigation ?:any,
    incrementItem ?:any ,
    decrementItem ?:any ,
    itemList ?: any ,
    toggleReview ?:any ,
    chooseDineIn ?:any
}


const Footer =(props : any) => {
    return (
        <TouchableOpacity style={{ bottom : 0 
            ,position:"absolute",backgroundColor :"black",width:"100%"
            ,padding:10 }}
        activeOpacity={0.1} onPress={() => props.moveToOrderSuccess()} >
        <View  >
            
            <Text style={{ color:"white" ,textAlign:"center",fontSize:16}}>
             PLACE ORDER</Text>
            </View>
        </TouchableOpacity>
        
    )
    
}


const Product = (props : any) => {
    return(
        <View  >
        <View style={styles.itemList}>
            <View style={{ flexDirection : "column",flex:1,justifyContent:"center", alignItems:"center" }}> 
                <Icon name="alpha-n-box-outline" size={22} color="grey"></Icon>       
                <Icon name="alpha-d-box-outline" size={22} color="grey"></Icon>       
            </View>
            <View style={{ flexDirection : "column",flex:10 }}> 
                <Text style={{ fontSize:16,padding:2 }}>{props.item.name}</Text>  
                <Text style={{ fontSize:12,padding:2 }}>{props.item.itemDescription}</Text>
                <Text style={{ fontSize:14,color:AppDefaults.secondaryColor,padding:2 }}>{AppDefaults.currency} {props.item.sellingPrice}</Text>
            </View>
            <View style={{ flexDirection : "row",flex:3 ,alignItems:"center",justifyContent:"center" }}> 
            <View style={{ borderWidth:1,borderRadius:5 ,flexDirection : "row" ,paddingLeft:5,paddingRight:5,borderColor: AppDefaults.secondaryColor }}>
            
            {props.item.qty > 0 && 
            <TouchableOpacity 
            style={{ padding:5,alignContent:"center",justifyContent:"center",alignItems:"center" }}
            onPress={()=> props.decrease(props.item.itemId)}>
                <Icon name="minus"   ></Icon>
            </TouchableOpacity> }
            
            <Text style={{ padding:5,color :AppDefaults.secondaryColor }}>{props.item.qty > 0 ? props.item.qty : "ADD"}</Text>        
            <TouchableOpacity 
            style={{ padding:5,alignContent:"center",justifyContent:"center",alignItems:"center" }}
            onPress={()=> props.increase(props.item.itemId)}
            >
            <Icon name="plus"  ></Icon>      
            </TouchableOpacity>
            </View>
            </View>
        </View>
        </View>
    )
}

class CartPage extends React.Component<Props , {}>{

moveToOrderSuccess() {
    if(this.props.itemList.menuList.filter( (item:any) => item.qty >0 ).length  ==0) {
        this.props.navigation.navigate('MenuList')    
    }
    else {
        this.props.navigation.navigate('OrderConfirm')
    }
    
}

decrementItem(id :any) {
        this.props.decrementItem(id)
}

goBack(){
    this.props.navigation.goBack()
}

componentDidUpdate(){
    if(this.props.itemList.menuList.filter( (item:any) => item.qty >0 ).length  ==0) {
        this.props.navigation.navigate('MenuList')    
    }
}

    render(){
        
        return(
            < View style={styles.container}>
                <View style={styles.topContainer} >
                        <View style={{ flexDirection:"row" ,flex:1 
                        ,maxHeight:40,
                        alignItems:"center"}}>
                            <View style={{flex:2}}>
                            <Icon size={20} name ="arrow-left" onPress={this.goBack.bind(this)} color="white" />
                            </View>
                            <View style={{flex:6}}>
                                <Text style={{ color:"white",fontSize:20}}>My Cart</Text>
                            </View>
                        </View>
                        <View style={{ backgroundColor :"white",padding:20,marginTop:10,alignItems:"center",borderRadius:5 }} >
                            <Text style={{color:AppDefaults.secondaryColor}}>Total Cost</Text>
                            <Text>{AppDefaults.currency} 
                                {this.props.itemList.totalAmount}
                            </Text>
                        </View>
                </View>
                <View style={styles.bottomContainer} >
                <View >
                    <Text style={{padding:5,fontSize:16 }}>Review order</Text>
                    <ScrollView style={{ maxHeight: this.props.itemList.isReviewOrder ?200 : 330 }}  scrollEnabled={!this.props.itemList.isReviewOrder}>
                    <View >
                        {this.props.itemList.menuList
                        .filter((item :any) => item.qty >0)
                        .map((item:any) =>
                            <View key={item.itemId}>
                                <Product item={item} 
                                         increase ={this.props.incrementItem.bind(this)}
                                         decrease ={this.decrementItem.bind(this)}
                                         />
                            </View>
                        )}
                        </View>
                    </ScrollView>
                    {(this.props.itemList.isReviewOrder && this.props.itemList.menuList
                        .filter((item :any) => item.qty >0).length > 2) &&
                        <TouchableOpacity onPress={()=>{this.props.toggleReview()}} >
                                <Text style={{padding:5,fontSize:16,textDecorationLine:"underline",textAlign:"right"}}>Show more</Text>
                        </TouchableOpacity>
                    
                }

                </View>
                <View >
                    <Text style={{padding:5,fontSize:16 }}>Delivery Options</Text>
                    </View>
                    <View style={{ flexDirection:"row",flex:1 }}>
                    <TouchableOpacity style={{ flex:1 }} onPress={()=>this.props.chooseDineIn(true)}>
                    <Text style={{ fontSize:15,color:"grey" }}>   Dine in  <Icon name="adjust"  size={20} color={ this.props.itemList.isDinein ? AppDefaults.secondaryColor : "grey"}  />   </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex:1 }} onPress={()=>this.props.chooseDineIn(false)}>
                        <Text style={{ fontSize:15,color:"grey" }}>   Take Away  <Icon name="adjust" color={ !this.props.itemList.isDinein ? AppDefaults.secondaryColor : "grey"}  size={20} />   </Text>
                        </TouchableOpacity>
                    </View> 
                </View>


                <Footer  moveToOrderSuccess={this.moveToOrderSuccess.bind(this)}/>
                
            </ View>

        )
    }
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: "center",
      height: "100%",
      color: "white"
    },
    topContainer: {
      flex: 1,
      height: "25%",
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "column",
      width: "100%",
      backgroundColor:"black"
    },
    bottomContainer: {
      height: "75%",
      backgroundColor: "white",
      width: "100%"
    },
    itemList : {
        paddingTop:20,
        paddingBottom:10,
        paddingLeft:10,
        paddingRight:10, 
        flexDirection : "row",
        flex:1,
        borderBottomWidth:0.2,
        borderBottomColor:"#ccc" 
    }
  });
  


const mapStateToProps = (state : any) => {
    return { 
        itemList : state.Cart,
    }
  };

  const mapDispatchToProps = (dispatch :any) => {
    return {
        incrementItem : (itemId : any) =>dispatch(addItem(itemId)),
        decrementItem : (itemId : any) =>dispatch(reduceItem(itemId)),
        toggleReview : () => dispatch(toggleReview()),
        chooseDineIn : (isDineIn: any) =>dispatch(dineIn(isDineIn))
    }
    
  }

  export default connect(
    mapStateToProps,mapDispatchToProps
  )(CartPage);