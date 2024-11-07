<template>
  <div id="map" class="relative" ref="map_ref">
    <!-- <input type="search" v-model="search" class="bg-black" /> -->
  </div>
</template>

<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import * as GeoSearch from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
const map_ref = ref(null);
interface CenterLocation {
  lat: number;
  lng: number;
}

interface Point {
  icon?: string;
  lng: number;
  lat: number;
  popup_info?: any;
  tooltip?: any;
}

interface InformationInterface {
  id?: number | string;
  lat: number;
  lng: number;
  icon?: string;
  tooltip?: any;
  isPersistenceTooltip: boolean;
  popup?: any;
}

interface PropsInterface {
  center: CenterLocation;
  information?: Array<InformationInterface>;
  maxZoom: number;
  minZoom?: number;
  polylinePoints?: Array<Point>;
  polylineColor?: string;
  toTrackWithRealAddressLine?: boolean;
  isToAddLocation?: boolean;
  isSearchLocation?: boolean;
}
const props = withDefaults(defineProps<PropsInterface>(), {
  toTrackWithRealAddressLine: false,
  isSearchLocation: false,
  isToAddLocation: false,
});

const search = GeoSearch.GeoSearchControl({
  provider: new GeoSearch.OpenStreetMapProvider(),
  style: "bar",
  autoComplete: true, // optional: true|false  - default true
  autoCompleteDelay: 250, // optional: true|false  - default true
  showPopup: true,
  showMarker: true,
});

watch(
  () => props.center,
  (newValue) => {
    map.removeLayer(selected_marker);
    selected_marker = L.marker(newValue, { draggable: true });
    map.panTo(new L.LatLng(newValue.lat, newValue.lng));
    selected_marker.addTo(map);
  }
);

let map: any;
let selected_marker = L.marker(props.center, { draggable: true });
const emits = defineEmits(["getLocation"]);

selected_marker.on("drag", function (e: any) {
  selected_marker.bindTooltip(
    `latitude: ${e.target._latlng.lat}  Longitude: ${e.target._latlng.lng}`,
    { permanent: true, direction: "top" }
  );

  emits("getLocation", {
    lat: e.target._latlng.lat,
    lng: e.target._latlng.lng,
  });
});

// onMounted(() => {
//   console.log(map_ref.value);
//   mapBind();
// });
watch(map_ref, () => {
  if (map_ref.value) {
    mapBind();
  }
});

const mapBind = () => {
  if (props.toTrackWithRealAddressLine) {
    const baseLayer = L.tileLayer(
      "http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}",
      {
        maxZoom: props.maxZoom,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }
    );

    map = L.map(map_ref.value, {
      center: [props.center.lat, props.center.lng],
      zoom: 12,
      zoomControl: true,
      layers: [baseLayer],
    });
    map.addControl(search);

    selected_marker.addTo(map);

    map.on("geosearch/showlocation", getResult);
    if (props.isToAddLocation)
      map.on("click", (e: any) => {
        selected_marker.remove();
        selected_marker.setLatLng(e.latlng);

        selected_marker.addTo(map);
        selected_marker.bindPopup("add the Value", { autoPan: true });
        // selected_marker.bindTooltip(
        //   `latitude: ${e.latlng.lat}  Longitude: ${e.latlng.lng}`,
        //   { permanent: true, direction: "top" }
        // );
        emits("getLocation", e.latlng);
      });

    const waypoints = computed(() => {
      return props.polylinePoints?.map((element) => {
        return L.latLng(element.lat, element.lng);
      });
    });

    let control = L.Routing.control({
      plan: L.Routing.plan(waypoints.value, {
        createMarker: (i: any, wp: any) => {
          if (props.polylinePoints) {
            if (props.polylinePoints[i].icon) {
              return L.marker(wp.latLng, {
                draggable: false,

                icon: L.icon({
                  iconUrl: props.polylinePoints[i].icon,
                  iconSize: [20, 24],
                }),
              }).bindPopup(props.polylinePoints[i].popup_info.name);
            } else {
              return L.marker(wp.latLng, {
                draggable: false,
              }).bindPopup(props.polylinePoints[i].popup_info.name);
            }
          }
        },
        draggableWaypoints: false,
      }),
      addWaypoints: false,

      show: true,
      collapsible: false,
      showAlternatives: true,
      autoRoute: true,

      alternativeClassName: "alternative",
      fitSelectedRoutes: true,
      router: L.Routing.osrmv1({
        serviceUrl: "http://router.project-osrm.org/route/v1",
        profile: "driving",
      }),
    });

    control.on("routeselected", function (e: any) {
      e.route.itinerary.createHTML = function () {};
    });

    control.addTo(map).on("click", (e: any) => {});
  }
};

const getResult = (e: any) => {
  emits("getLocation", { lat: e.location.x, lng: e.location.y });
};
</script>
