const toRad = (value) => (value * Math.PI) / 180;

const calculateDistances = (location, userLocation) => {
  
  let distance = 0;
  const R = 6371;

  const dLat = toRad(userLocation.lat - location.lat);
  const dLon = toRad(userLocation.lng - location.lng);
  const lat1 = toRad(location.lat);
  const lat2 = toRad(userLocation.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  distance = R * c;

  if (distance < 1000) {
    distance *= 1000;
  }

  return { ...location, distance };
};

export default calculateDistances;
