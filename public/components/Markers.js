import React, { Children } from 'react';
import {Marker} from "react-google-maps";
import {InfoWindow} from "react-google-maps";
var myInit ={
    method : 'GET'
}
var proxyUrl = 'https://cors-anywhere.herokuapp.com/';

 module.exports = class Markers extends React.Component{
    constructor(){
        super();
        this.fetchMarks = this.fetchMarks.bind(this);
        this.onToggleOpen = this.onToggleOpen.bind(this);
        this.isOpen = [false, false];
        this.isOpen.fill(false);
        this.state ={data : [{latitude: 45.971427, longitude: 24.803049 }] };

    }

    onToggleOpen (index) {
        this.isOpen[index]=!this.isOpen[index];
        this.forceUpdate();
    }

    fetchMarks () {
        //return fetch(proxyUrl+'https://datc-api.herokuapp.com',myInit)
        return fetch('/giveMeData',myInit)
            .then((response) => {
                if (response.ok) {
                    console.log('response ok from fetch');
                    console.log(response.type);
                    return response.json();
                }
                else {
                    console.log('response NOT ok from fetch ');
                    console.log(response.type);
                    console.log(response);
                    return Promise.reject(response.statusText);
                }
            })
            .then( (data) => { 
                console.log('this is data');
                console.log(data);
                var forState = { "data" : data };
                this.setState(forState);
                console.log(this.state);
            })
            .catch(e => {
                console.log('There is an error ');
                console.log(e);
            });
    }
    componentDidMount() {
        setInterval( this.fetchMarks, 2000);
    }

    render(){
        return(
            <div>
            {this.state.data.map( (item,index) => {
                if( item.temperature ){
                    return(
                        <Marker key={item+index} position={{ lat: item.latitude, lng: item.longitude }} onClick={this.onToggleOpen.bind(null,index)}>
                            {
                                this.isOpen[index] && <InfoWindow >
                                <view>
                                <p>{new Date().toDateString()}</p>
                                <p>{"Temp : "}{item.temperature}</p>
                                <p>{"Lat : "}{item.latitude}</p>
                                <p>{"Lgt : "}{item.longitude}</p>
                                <p>{"Humidity : "}{item.humidity}</p>
                                <p>{"Pressure : "}{item.pressure}</p>
                                </view>
                                </InfoWindow>
                            }
                        </Marker>
                    )
                }
                else{
                    return (   
                        <Marker key={item+index} position={{ lat: 45.971427, lng: 24.803049 }} onClick={this.onToggleOpen}>
                        {
                            <InfoWindow >
                            <p>Loading data... </p>
                            </InfoWindow>
                        }
                        </Marker>
                    )
                }
            })
            }
            </div>
        )
    }
}
