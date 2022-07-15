import './index.css';
import './Explanation.css';
import './NavigationBar.css';
import React from "react";
import handshake from "./material/icon_handshake_light.png";
import wheel from "./material/icon_wheel_light.png";

class Explanation extends React.Component {
    render() {
        return (
            <Features/>
        );
    }
}
class Features extends React.Component{
    render(){
        return(
            <div className="dropDownList">{this.featureList()}</div>
        );
    }
    featureList(){
        let features = [];
        features.push(this.feature(handshake, "Navigation Bar: Hilfe zu den Websitefunktionen und Impressum"));
        features.push(this.feature(wheel, "Navigation Bar: Einstellungen wie Autoplay ein und ausschalten"))
        return(features);
    }
    feature(symbol, explanation){
        return(
            <li className="feature">
                <div className="symbol"><img src={symbol} class="symbolIcon"/></div>
                <div className="explanation">{explanation}</div>
            </li>
        );
    }
}




export default Explanation;