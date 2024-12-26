
import { Tabs } from 'expo-router'
import { colors } from '../../constands/appConstand'
import CustomTab from '../../components/customTabBar/customTab' 
import homeIcon from "../../assets/icons/home.png"
import userIcon from "../../assets/icons/user.png"

const TabLayout = () => {
  const commonOptions = {
               headerShown:false,
               tabBarShowLabel:false,
               tabBarHideOnKeyboard:true,
               tabBarActiveTintColor:colors.background,
               tabBarInactiveTintColor:"rgba(0,0,0,.2)", 
               tabBarIconStyle: {
                   width:"100%",
                   height:"100%"
               }
  }

  return (
    <>
       <Tabs>
           <Tabs.Screen 
           name='home'
           options={{
               title:"Home",
               ...commonOptions,
               tabBarIcon : ({focused,color}) => (<CustomTab color={color} focused={focused} icon={homeIcon} text={"Home"} />)
           }}
            />
             <Tabs.Screen 
           name='profile'
           options={{
               title:"Profile",
               ...commonOptions,
               tabBarIcon : ({focused,color}) => ( <CustomTab color={color} focused={focused} icon={userIcon} text={"User"} /> )
           }}
            />
       </Tabs>   
    </>
  )
}

export default TabLayout