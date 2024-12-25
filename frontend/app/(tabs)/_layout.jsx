
import { Tabs } from 'expo-router'
import { colors } from '../../constands/appConstand'

const TabLayout = () => {
  return (
    <>
       <Tabs screenOption={{
               tabBarHideOnKeyboard:true
       }}>
           <Tabs.Screen 
           name='home'
           options={{
               title:"Home",
               headerShown:false,
               tabBarShowLabel:false,
               tabBarActiveTintColor:colors.secondary,
               tabBarInactiveTintColor:colors.text,
               tabBarIcon : ({focused,color}) => { }
           }}
            />
             <Tabs.Screen 
           name='profile'
           options={{
               title:"Profile",
               headerShown:false
           }}
            />
       </Tabs>   
    </>
  )
}

export default TabLayout