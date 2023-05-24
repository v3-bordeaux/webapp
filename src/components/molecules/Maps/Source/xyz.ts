import {XYZ} from "ol/source";

function xyz({url, attributions, maxZoom}) {
    return new XYZ({url, attributions, maxZoom});
}

export default xyz;
