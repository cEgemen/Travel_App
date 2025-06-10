import { amenityImg, historicImg, naturalImg, tourismImg } from "../assets";

const fetchWithTimeout = async (url, options = {}, timeout = 3000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const res = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(id);
        return res;
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
};

export const getFallbackImageForCategory = (category) => {
    const defaultImg = {
        "natural": naturalImg,
        "historic": historicImg,
        "amenity": amenityImg,
        "tourism": tourismImg,
    };

    const fallback = defaultImg[category] || defaultImg["tourism"];
    return fallback;
};


const searchImageFromOpenverse = async (name,type) => {
    try {
        const res = await fetchWithTimeout(`https://api.openverse.engineering/v1/images?q=${encodeURIComponent(name)}&page_size=1`);
 
        if(res.status !== 200)
        {
           return -1
        }
        const data = await res.json();
        let result = data?.results?.[0]?.url 
        if(result !== null)
        {
           const res = await fetch(result)
           if(res.status === 404)
           {
             result = -1
           }
        }
        else
        {
            result = -1
        }
        return result;
    } catch (err) {
        return -1;
    }
};

const fetchPOIData = async (query) => {
    try {
        const res = await fetchWithTimeout("https://overpass-api.de/api/interpreter", {
            method: "POST",
            body: query
        });
        return await res.json();
    } catch (err) {
        console.log("❌ Overpass POI arama hatası (timeout olabilir):", err.name === 'AbortError' ? 'İstek zaman aşımına uğradı' : err);
        return null;
    }
};

export const fetchLocationImg = async (name,type) => {
         
             const placeImg =  await searchImageFromOpenverse(name,type);
             return placeImg         
}

const dummyPOICategories = {
  tourism: [
    "tourism=museum",
    "tourism=artwork",
    "tourism=gallery",
    "tourism=viewpoint",
    "tourism=zoo"
  ],
  historic: [
    "historic",
  ],
  amenity: [
    "amenity=library",
    "amenity=theatre",
    "amenity=cinema",
  ]
};

export const fetchPOIs = async ({route, selectedCategories=[]}) => {
    const searchRadius = 5000;
    const defaultCultural = dummyPOICategories["amenity"]
                            
    const activeCategories = selectedCategories.length > 0 ? selectedCategories.flatMap((value,index) => dummyPOICategories[value]) : defaultCultural;
    const poiData = [];

    for (let i = 0; i < route.coordinates.length - 1;) {
        const [lat1, lon1] = route.coordinates[i];
        const [lat2, lon2] = route.coordinates[i + 1];
        const midpointLat = (lat1 + lat2) / 2;
        const midpointLon = (lon1 + lon2) / 2;

        const filters = activeCategories.map(
            cat => `node[${cat}](around:${searchRadius},${midpointLat},${midpointLon});`
        ).join("\n");

        const query = `[out:json];(${filters});out body;`;
        const data = await fetchPOIData(query);

        if (data && Array.isArray(data.elements)) {

            const pois = await Promise.all(
                data.elements.map(async item => {
                    let name = item.tags?.name;
                    if (!name) {
                        name = null
                    }

                    const type =
                        item.tags?.tourism || item.tags?.historic || item.tags?.natural ||
                        item.tags?.amenity || "UnKnown"
               
                    let score = 0;
                    if (name) {
                        score += 2
                     };
                    if (type && type !== "UnKnown") score += 1;

                    return {
                        id: item.id,
                        name,
                        type,
                        lat: item.lat,
                        lon: item.lon,
                        score
                    };
                })
            );

            poiData.push(...pois.filter(Boolean));
        }

        i += Math.round(searchRadius / 74);
    }

    const uniquePOIs = [];
    const seenPOIs = new Set();

    for (const poi of poiData) {
        const poiKey = `${poi.id}-${poi.lat}-${poi.lon}`;
        if (!seenPOIs.has(poiKey)) {
            seenPOIs.add(poiKey);
            uniquePOIs.push(poi);
        }
    }
 
    const sortedPOIs = uniquePOIs
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);

        return sortedPOIs;
};

