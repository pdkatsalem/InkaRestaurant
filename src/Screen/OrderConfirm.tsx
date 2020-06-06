import * as React from 'react'
import { View,Text,Image,Button } from 'react-native'
import { connect } from 'react-redux'
import { resetState } from '../Store/actions';
interface Props{
    navigation ?:any,
    resetAll ?: any, 
    itemList?:any
}
class OrderConfirm extends React.Component<Props , {}>{

moveToHome(){
    this.props.resetAll()
    this.props.navigation.navigate('MenuList')
}

    render(){

        return(
            <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent',
                elevation : 9999
            }} >
                <Image style={{ height: 100, width: 100 }}
                    source={require('../assets/img/orderplaced.png')}
                />
                <Text style={{ color:"grey",fontSize:20,paddingBottom:20 }}>Order Placed Successfully</Text>
                <Button title="Order Again" onPress={()=>this.moveToHome()} color="black" ></Button>
                </View>
        )
    }
}



const mapStateToProps = (state : any) => {
    return { 
        itemList : state.Cart
    }
  };

const mapDispatchToProps =(dispatch :any) => {
    return {
        resetAll : () => dispatch(resetState())
    }
    
}

export default connect(mapStateToProps,mapDispatchToProps)(OrderConfirm)