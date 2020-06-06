import * as React from 'react'
import { View,Text,StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity,Modal } from 'react-native'
import AppDefaults from '../Defaults/AppDefaults';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {  addItem,reduceItem, enableShowmore, toggleModal, selectMenu } from '../Store/actions'



interface Props{
    navigation ?:any,
    mainStore ?:any,
    incrementItem ?:any ,
    decrementItem ?:any ,
    itemList ?: any ,
    toggleReview?:any,
    toggleModal?:any,
    selectMenu ?:any
}


let arr :any 
let scrollViewRef : any


const Footer =(props : any) => {
    return (
        <TouchableOpacity style={{ bottom : 0 
            ,position:"absolute",backgroundColor :"black",width:"100%"
            ,padding:10 }}
        activeOpacity={0.1} onPress={() => props.moveToCartPage()} >
        <View  >
            
            <Text style={{ color:"white" ,textAlign:"center",fontSize:16}}>
            <Icon name ="cart-outline" color="white" size={16} /> View cart ({props.count} items)</Text>
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
            {
                props.item.qty > 0 && <Text style={{ padding:5,color :AppDefaults.secondaryColor }}>{props.item.qty}</Text>  
            }
            {
                props.item.qty <=0 && <TouchableOpacity>
                <Text style={{ padding:5,color :AppDefaults.secondaryColor }}>{"ADD"}</Text>  
                </TouchableOpacity>
            }

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

const HotelDetails =(props : any) => {

    return (
        <View style={styles.titleContainer}>
        <View style={styles.titleContent} >
            <View >
                <Text style={styles.restaurantName}>{AppDefaults.restaurantData.name}</Text>
                <Text style={styles.restaurantData}>
                    <Icon name="star-outline" size={14} />
                    {AppDefaults.restaurantData.description}
                </Text>
                <Text style={styles.restaurantData}>
                    <Icon name="phone-outgoing" size={14}/>
                    Reach Us at : {AppDefaults.restaurantData.mobileNumber}
                </Text>
                <View style={{ paddingTop:12 ,alignItems:"center" }}>
                    <TouchableOpacity activeOpacity={0.7} 
                        onPress={()=>props.scrollTo() }  
                        style={{ width:"50%",borderRadius:5,backgroundColor:"black",padding:10 }}>
                        <Text style={{ color:"white",textAlign:"center" }}>Book Table </Text>
                    </TouchableOpacity>
                </View>

                
            </View>
        </View>

        
    </View>
    )
}

const MenuModal =(props :any) =>{
    return(
    //     <Modal
    //     animationType="slide"
    //     transparent={true}
    //     visible={props.store.isModalOpen}
    //     onRequestClose={()=>props.toggleModal()}
    //   >
    
    <View style={{ left:0,right:0,bottom:0,top:0,position:"absolute",justifyContent:"center",alignItems:"center"}}>
        <View style={{ elevation:20, width:"50%",backgroundColor:"white",position:"absolute",bottom:80,borderRadius:10 }}>
        
        {props.store.menuHeader.map((menu : any) => 
        <TouchableOpacity key={menu.id} style={{ padding:10 ,flexDirection:"row" ,flex:1}} onPress={()=> props.scrollTo(menu.id) } >
        <View style={{ flex:1}}>
        <Text style={{ fontWeight: menu.isSelected ? "bold" :"normal" }}>{menu.name}</Text>
        </View>
        <View style={{ flex:1}}>
        <Text style={{ textAlign:"right",color:AppDefaults.secondaryColor }}>{props.store.menuList.filter( (list :any) => list.category ==menu.id ).length}</Text>
        </View>
        
        </TouchableOpacity>
        )}
      </View>
  
    
  </View>
// </Modal>
    )
}

const Fssai =() => {
    return ( <View>
        <Text style={{color:"green" }} onLayout={ (event :any) =>{ 
            const layout = event.nativeEvent.layout
            arr = layout.y
         } }  >fssai</Text>
        <Text style={{color:"grey" }}>LIC : 128715312838</Text>
        <Text style={{color:"#ccc" }}>copyrights : Dinesh</Text>
        </View>)
    
}

class MenuList extends React.Component<Props , {}>{
    positionArr : any = []


    constructor(props :any){
        super(props)
        arr = []
    }

    // componentDidUpdate(){
    //     this.scrollTo(this.props.mainStore.filter((header:any) => header.isSelected)[0].id)
    // }
    moveToCartPage() {
        this.props.toggleReview()
        this.props.navigation.navigate('CartPage')
    }

    scrollTo (idx ?: any){
        if (idx && idx >=0){
            this.props.selectMenu(idx)
            this.props.toggleModal()
        }
        scrollViewRef.scrollTo({x: 0 ,y: (idx && idx >=0) ? this.positionArr[idx] : 0 } )
    }
    render(){

        return(            

            < View style={styles.container}>
                <View style={styles.topContainer} >
                        <Image style={{
                            width: Dimensions.get("window").width,
                            height: Dimensions.get("window").height,
                            borderWidth: 1
                        }}
                            source={require('../assets/img/bg.jpg')}
                        />
                </View>
                <View style={styles.bottomContainer} >
                <View style={{ top:100,marginBottom:100 }}>
                <ScrollView ref={ (ref:any)=> scrollViewRef =ref }>

                    {this.props.mainStore.map( (header : any) => 
                    <View 
                    key={header.id}
                    onLayout={ (event :any) => { 
                        const layout = event.nativeEvent.layout
                        this.positionArr[header.id] = layout.y
                     } }>
                        <Text 
 
                        key={header.id} style={{ fontSize:18,fontWeight:"500" }} >{header.name}</Text>
                        {this.props.itemList.menuList
                        .filter((item :any) => item.category == header.id)
                        .map((item:any) =>
                            <View key={item.itemId}>
                                <Product item={item} 
                                         increase ={this.props.incrementItem.bind(this)}
                                         decrease ={this.props.decrementItem.bind(this)}
                                         />
                            </View>
                        )}
                        </View>
                     ) }
                    
                    <Fssai />
                </ScrollView>
                </View>

                </View>
                

                {this.props.itemList.isModalOpen &&  <MenuModal store={this.props.itemList}  
                scrollTo={this.scrollTo.bind(this)}
                toggleModal={this.props.toggleModal.bind(this)} />}

                {!this.props.itemList.isModalOpen && 
                <TouchableOpacity onPress={ () =>this.props.toggleModal()} style={{ position:"absolute",bottom:60,backgroundColor:AppDefaults.secondaryColor,padding:5,borderRadius:50 }}>
                    <Text><Icon name="silverware-fork-knife" />  Menu</Text>
                </TouchableOpacity>    
            }

                <HotelDetails scrollTo={this.scrollTo.bind(this)} />

                {this.props.itemList.menuList.filter((item :any) => item.qty >0).length > 0 && 
                <Footer moveToCartPage={this.moveToCartPage.bind(this)} count={this.props.itemList.menuList.filter((item :any) => item.qty >0).length}/> }
                
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
      width: "100%"
    },
    bottomContainer: {
      height: "75%",
      backgroundColor: "white",
      width: "100%"
    },
    titleContainer: {
      height: 150,
      backgroundColor: "white",
      width: "90%",
      zIndex: 1,
      borderRadius: 5,
      elevation: 5,
      position:"absolute",
      top:"16%"
    },
    titleContent: {
      justifyContent: "center",
      flexDirection: "column",
      width: "100%",
      padding: 20
    },
    restaurantName :{
        fontSize:20,
        fontWeight:"600",
        textAlign:"center",
        paddingBottom:5
    },
    restaurantData:{
        fontSize:14,
        textAlign:"center",
        color:"grey"
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
        mainStore  : state.Cart.menuHeader
    }
  };

  const mapDispatchToProps = (dispatch :any) => {
    return {
        incrementItem : (itemId : any) =>dispatch(addItem(itemId)),
        decrementItem : (itemId : any) =>dispatch(reduceItem(itemId)),
        toggleReview : () => dispatch(enableShowmore()),
        toggleModal : () => dispatch(toggleModal()),
        selectMenu : (id : any) => dispatch(selectMenu(id))
    }
    
  }

  export default connect(
    mapStateToProps,mapDispatchToProps
  )(MenuList);
  