
import { Tabs } from 'expo-router'
import { colors } from '../../constands/appConstand'
import CustomTab from "../../components/navigations/CustomTab"
import homeIcon from "../../assets/icons/home.png"
import userIcon from "../../assets/icons/user.png"

const TabLayout = () => {
  const commonOptions = {
               tabBarHideOnKeyboard:true,
               tabBarLabel:"",
               tabBarIconStyle: {
                   width:"100%",
                   height:"100%",
               }   
  }

  return (
    <>
       <Tabs >
           <Tabs.Screen 
           name='home'
           options={{
               ...commonOptions,
               tabBarIcon : ({focused,color}) => (<CustomTab  focused={focused} icon={homeIcon} text={"Home"} />)
           }}
            />
             <Tabs.Screen 
           name='profile'
           options={{
               ...commonOptions,
               tabBarIcon : ({focused,color}) => ( <CustomTab  focused={focused} icon={userIcon} text={"User"} /> )
           }}
            />
       </Tabs>   
    </>
  )
}

export default TabLayout