
import { Tabs } from 'expo-router'
import CustomTab from "../../components/navigations/CustomTab"
import homeIcon from "../../assets/icons/home.png"
import userIcon from "../../assets/icons/user.png"
import mapIcon from "../../assets/icons/map.png"
import markIcon from "../../assets/icons/bookmark.png"
import notesIcon from "../../assets/icons/notes.png"

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
                name='guide'
                options={{
                    ...commonOptions,
                    tabBarIcon : ({focused,color})=> (<CustomTab focused={focused} icon={notesIcon} text={"Guide"} />)
                }} 
             /> 
             <Tabs.Screen 
                name='map'
                options={{
                    ...commonOptions,
                    tabBarIcon : ({focused,color})=> (<CustomTab focused={focused} icon={mapIcon} text={"Map"} />)
                }} 
             /> 
            <Tabs.Screen 
                name='favs'
                options={{
                    ...commonOptions,
                    tabBarIcon : ({focused,color})=> (<CustomTab focused={focused} icon={markIcon} text={"Saves"} />)
                }} 
             />  
             <Tabs.Screen 
           name='profile'
           options={{
               ...commonOptions,
               tabBarIcon : ({focused,color}) => ( <CustomTab  focused={focused} icon={userIcon} text={"Profile"} /> )
           }}
            />
             
       </Tabs>   
    </>
  )
}

export default TabLayout