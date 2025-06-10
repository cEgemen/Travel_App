import { TOMTOM_API_KEY } from "../secret";

export const generateRoute = async (
    startCoord,
    destCoord,
    routePreference,
    TravelMode,
  ) => {
    try {
      const bbox = [
        Math.min(startCoord[1], destCoord[1]),
        Math.min(startCoord[0], destCoord[0]),
        Math.max(startCoord[1], destCoord[1]),
        Math.max(startCoord[0], destCoord[0])
      ].join(",");
 
      const url = `https://api.tomtom.com/routing/1/calculateRoute/${startCoord.join(",")}:${destCoord.join(",")}/json?key=${TOMTOM_API_KEY}&traffic=true&maxAlternatives=2&routeType=fastest&travelMode=${TravelMode}&computeTravelTimeFor=all&routeRepresentation=polyline&instructionsType=tagged&language=tr-TR${routePreference === "free" ? "&avoid=tollRoads" : "" 
      }`
      const response = await fetch(url)
      const textResponse = await response.text()
      if (!response.ok) {
        console.error("API isteği başarısız oldu:", textResponse)
        throw new Error("Rota hesaplama API isteği başarısız oldu")
      }
      let data
      try {
        data = JSON.parse(textResponse)
      } catch (error) {
        console.error("JSON parse hatası:", error)
        throw new Error("API yanıtı JSON formatında değildi")
      }
      if (!data.routes) throw new Error("Rota bilgisi alınamadı");
      return {
        routes: data.routes.map((route, index) => {
         return {
          id: `route-${index}-${Date.now()}`,
          distance: (route.summary.lengthInMeters / 1000).toFixed(1),
          distanceMeters: route.summary.lengthInMeters,
          duration: Math.round(route.summary.travelTimeInSeconds / 60),
          durationSeconds: route.summary.travelTimeInSeconds,
          coordinates: route.legs[0].points.map(point => [point.latitude, point.longitude]),
          isPaid: (route.summary.tollCost || 0) > 0,
          trafficLevel: Math.floor(Math.random() * 3),
          cost: route.summary.tollCost || 0,
          steps: route.guidance?.instructions?.map(inst => ({
            instruction: inst.message || "Talimat yok",
            distance: `${(inst.routeOffsetInMeters / 1000).toFixed(1)} km`,
            duration: `${Math.round(inst.travelTimeInSeconds / 60)} min`,
            latitude: inst.point?.latitude,
            longitude: inst.point?.longitude
          })) || []
                }
                                                 }
                             ),
        bbox
      };
    } catch (error) {
      console.error("Rota hesaplama hatası:", error);
      throw error;
    }
  };


  export const getBestRouteSteps = async (startCoord, destCoord) => {
  try {
    const url = `https://api.tomtom.com/routing/1/calculateRoute/${startCoord.join(",")}:${destCoord.join(",")}/json?` +
      new URLSearchParams({
        key: TOMTOM_API_KEY,
        travelMode: "car",
        routeType: "fastest",
        instructionsType: "tagged",
        language: "tr-TR",
        traffic: "false"
      });

    const response = await fetch(url);
    const text = await response.text();

    if (!response.ok) {
      console.error("Rota alma hatası:", text);
      throw new Error("API başarısız");
    }

    const data = JSON.parse(text);
    const route = data.routes?.[0];

    if (!route) throw new Error("Rota bulunamadı");

    const steps = route.guidance?.instructions?.map((step) => ({
      instruction: step.message || "Talimat yok",
      distance: `${(step.routeOffsetInMeters / 1000).toFixed(1)} km`,
      duration: `${Math.round(step.travelTimeInSeconds / 60)} dk`,
      location: [step.point.latitude, step.point.longitude]
    })) || [];

    return steps;

  } catch (err) {
    console.error("Rota steps alınamadı:", err);
    throw err;
  }
};
