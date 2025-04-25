
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


const searchImageFromWikimedia = async (query) => {
    try {
        console.log(`🔍 Wikimedia'da '${query}' için görsel aranıyor...`);
        const res = await fetchWithTimeout(`https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(query)}&origin=*`);
        const data = await res.json();
        const pages = data.query.pages;
        const firstPage = Object.values(pages)[0];
        const result = firstPage?.original?.source || null;
        console.log(`✅ Wikimedia sonucu:`, result);
        return result;
    } catch (err) {
        console.error("❌ Wikimedia görsel hatası (timeout olabilir):", err.name === 'AbortError' ? 'İstek zaman aşımına uğradı' : err);
        return null;
    }
};

const searchImageFromOpenverse = async (query) => {
    try {
        console.log(`🔍 Openverse'de '${query}' için görsel aranıyor...`);
        const res = await fetchWithTimeout(`https://api.openverse.engineering/v1/images?q=${encodeURIComponent(query)}&page_size=1`);
        const data = await res.json();
        const result = data?.results?.[0]?.url || null;
        console.log(`✅ Openverse sonucu:`, result);
        return result;
    } catch (err) {
        console.error("❌ Openverse görsel hatası (timeout olabilir):", err.name === 'AbortError' ? 'İstek zaman aşımına uğradı' : err);
        return null;
    }
};
// görsel bulmayı direkt çıkara da bilirsin çalışıyo denedim
//Yedek ikon belirleyici
const getFallbackImageForCategory = (category) => {
    const iconMap = {
        //buraya sana attığım defaultların pathini eklicez
        "natural": "https://example.com/icons/library.png",
        "historic": "https://example.com/icons/cinema.png",
        "cultural": "https://example.com/icons/religion.png",
        "tourism": "https://example.com/icons/theatre.png",
    };

    const fallback = iconMap[category] || iconMap["default"];
    console.log(`🖼️ Yedek ikon kullanıldı: [${category}] ->`, fallback);
    return fallback;
};

// 🌍 Overpass API'den POI verisi çekme
const fetchPOIData = async (query) => {
    try {
        const res = await fetchWithTimeout("https://overpass-api.de/api/interpreter", {
            method: "POST",
            body: query
        });
        return await res.json();
    } catch (err) {
        console.error("❌ Overpass POI arama hatası (timeout olabilir):", err.name === 'AbortError' ? 'İstek zaman aşımına uğradı' : err);
        return null;
    }
};

// 📍 Ana POI toplama fonksiyonu
export const fetchPOIs = async ({route, selectedCategories=[]}) => {
    const searchRadius = 5000;
    const defaultCultural = [
        "amenity=place_of_worship",
        "amenity=library",
        "amenity=theatre",
        "amenity=cinema"
    ];
    const activeCategories = selectedCategories.length > 0 ? selectedCategories : defaultCultural;
    const poiData = [];

    console.log("📍 POI araması başlatıldı. Kategoriler:", activeCategories);

    for (let i = 0; i < route.coordinates.length - 1;) {
        const [lat1, lon1] = route.coordinates[i];
        const [lat2, lon2] = route.coordinates[i + 1];
        const midpointLat = (lat1 + lat2) / 2;
        const midpointLon = (lon1 + lon2) / 2;

        console.log(`📌 ${i}. segmentin orta noktası: (${midpointLat}, ${midpointLon})`);

        const filters = activeCategories.map(
            cat => `node[${cat}](around:${searchRadius},${midpointLat},${midpointLon});`
        ).join("\n");

        const query = `[out:json];(${filters});out body;`;
        const data = await fetchPOIData(query);

        if (data && Array.isArray(data.elements)) {
            console.log(`✅ ${data.elements.length} POI bulundu.`);

            const pois = await Promise.all(
                data.elements.map(async item => {
                    const name = item.tags?.name;
                    if (!name) {
                        console.log("⚠️ İsimsiz POI atlandı.");
                        return null;
                    }

                    const type =
                        item.tags?.tourism || item.tags?.historic || item.tags?.natural ||
                        item.tags?.amenity || item.tags?.leisure || item.tags?.man_made ||
                        item.tags?.landuse || "Bilinmeyen";

                    const wikimediaImage = await searchImageFromWikimedia(name);
                    const openverseImage = wikimediaImage ? null : await searchImageFromOpenverse(name);
                    const fallbackImage = (!wikimediaImage && !openverseImage)
                        ? getFallbackImageForCategory(type.toLowerCase())
                        : null;

                    const imageUrl = wikimediaImage || openverseImage || fallbackImage;

                    // Puanlama burası biraz uydurma burayı revize etmem lazım ama karışık diye şuanlık gerek yok işimizi biraz uzatır araştırdım unescoda olanlara ekstra puan verme falan yapabiliriz
                    let score = 0;
                    if (name) score += 2;
                    if (wikimediaImage || openverseImage) score += 3;
                    if (type && type !== "Bilinmeyen") score += 1;

                    console.log(`📍 POI eklendi: ${name} (Type: ${type}, Score: ${score})`);

                    return {
                        id: item.id,
                        name,
                        type,
                        lat: item.lat,
                        lon: item.lon,
                        imageUrl,
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
    console.log("total: "+uniquePOIs.length)
    const sortedPOIs = uniquePOIs
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);

    console.log("🏆 En yüksek puanlı 10 POI:", sortedPOIs);
    return sortedPOIs;
};
