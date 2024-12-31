import { Image } from "react-native";

export const GetPlaceImg =  ({imgRef,style}) => {
       return <Image style={style}  source={{uri : `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${imgRef}&key=${process.env.MY_API_KEY}` }} />

}

export const getPlaceImgRef = async (placeName) => {
        const res = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json
?query=${placeName}& 
type={type}&
key=${process.env.MY_API_KEY}`)
       
       const data = await res.json();
       return data.results[0].photos[0].photo_reference;
}