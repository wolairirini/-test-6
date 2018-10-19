import {combineReducers} from "redux";
import globalreducers from "../globalreducers.js";
import home from "../pages/home/reducer";
import net_outside from "../pages/net_outside/reducer";
import net_inside from "../pages/net_inside/reducer";
import net_wifi from "../pages/net_wifi/reducer";
import upnp from "../pages/advanced_upnp/reducer";
import dmz from "../pages/advanced_dmz/reducer";
import static_host from "../pages/advanced_static_host/reducer";
import systemtools from "../pages/systemtools/reducer";
import infos_ip from "../pages/infos_ip/reducer";
import infos_detail from "../pages/infos_detail/reducer";
import infos_wan from "../pages/infos_wan/reducer";
import infos_js from "../pages/infos_js/reducer";

const reducers = combineReducers({
    ...globalreducers,
    home,
    net_outside,
    net_inside,
    net_wifi,
    upnp,
    dmz,
    static_host,
    systemtools,
    infos_ip,
    infos_detail,
    infos_wan,
    infos_js
})

export default reducers;