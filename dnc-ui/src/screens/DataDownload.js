/*###############################################################################
// Module: DataDownload.js
// 
// Function:
//      Function to DataDownload  module
// 
// Version:
//    V1.0.2  Tue Dec 01 2021 10:30:00  Seenivasan   Edit level 2
// 
//  Copyright notice:
//       This file copyright (C) 2021 by
//       MCCI Corporation
//       3520 Krums Corners Road
//       Ithaca, NY 14850
//       An unpublished work. All rights reserved.
// 
//       This file is proprietary information, and may not be disclosed or
//       copied without the prior permission of MCCI Corporation.
// 
//  Author:
//       Seenivasan, MCCI July 2021
// 
//  Revision history:
//       1.0.1 Fri aug 19 2022 10:00:00 seenivasan
//       Module created.
/*###############################################################################*/


import { StylesContext } from '@material-ui/styles';
import React, {useState } from 'react';
import {View, Text, Picker,ActivityIndicator} from 'react-native'
import { Button } from 'react-native';
import Animated, { set } from 'react-native-reanimated';
import { DatePicker } from 'react-rainbow-components';


// const BASE_URL = "http://localhost:8891/"
const BASE_URL = "https://www.cornellsaprun.com/dncserver/"

export default function App(props)
{
    
    const [location, setLocation] = useState("Arnot");
    const [frmDate, setFrmDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    
    async function onDownload()
    {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var query = JSON.stringify({"loc": location, "fmdate": frmDate, "todate": toDate});
        var requestOptions = 
        {
            method: 'POST',
            headers: myHeaders,
            body: query
        };
        fetch(BASE_URL+"getld", requestOptions)
        .then(response => response.text())
        .then(result => {
            let resobj = JSON.parse(result)
            let fname = resobj["message"]
            
            var anchor = document.createElement('a');
            anchor.href = BASE_URL+"download/"+fname;
            anchor.download = fname;
            anchor.click();
            setLoading(false);
        })
        .catch(error => console.log('error', error));

    }
    const onHandleDnload = () =>
    {
        setLoading(true);
        onDownload();
    }
    
    const onHandleBack = () => 
    {    
        props.navigation.navigate('LoginScreen');
    }

    const onLocationChange = (e) => 
    {
        setLocation( e.target.value)
    }

    return (
        <View style={{
            backgroundColor: "lightGray",
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 30
             }}>
            <Text style ={{
                color: "black",
                fontSize: 25,
                fontFamily:"Helvetica"
            }}>
            Cornell Maple Data Download</Text>
            <View style = {{
                backgroundColor: "lightGray",
                fontFamily:"Helvetica",
                flex: 0.1,
                flexDirection: "row",
                marginTop: 60,
            }}>

                <Text style ={{
                    color: "black",
                    fontFamily:"Helvetica",
                    fontSize: 20,
                    paddingRight: 30
                }}>
                Select the Location</Text>
                <Picker style = {{
                    fontSize: 20,
                    fontFamily:"Helvetica",
                    paddingLeft: 10,
                    height: 30
                }} 
                onChange = {(e) => onLocationChange(e)}>

                    <Picker.Item label="Arnot" value="Arnot"></Picker.Item>
                    <Picker.Item label="Uihlein" value="Uihlein"></Picker.Item>
                    <Picker.Item label="UVM" value="UVM"></Picker.Item>
                </Picker>
                
            </View>
            
            <View style = {{
                backgroundColor: "lightGray",
                flex: 0.1,
                flexDirection: "row"
            }}>
                <Text style ={{
                    color: "Blue",
                    fontSize: 20,
                    paddingTop: 5,
                    fontFamily:"Helvetica",
                }}>
                From Date</Text>
                <DatePicker style={{paddingLeft: 20,  width: 200}} value={frmDate} onChange={value =>setFrmDate(value)}>
                    </DatePicker>

                    <Text style ={{
                    color: "black",
                    fontSize: 20,
                    paddingTop: 5,
                    paddingLeft: 30,
                    fontFamily:"Helvetica",

                }}>
                To Date</Text>
                <DatePicker style={{paddingLeft: 20,  width: 200}} value={toDate} onChange={value =>setToDate(value)}>
                </DatePicker>
                
        </View>{ loading && 
            <View style={{height:"20%" , width:"50%" ,backgroundColor:"lightGray",justifyContent : "center",alignItems:"center"}}>

                <ActivityIndicator size="large" color ="blue" />


                <Text style ={{
                    fontFamily:"Helvetica",
                    }}>
                    Data downloading, please wait ...
                </Text>
            </View>}
            
            { !loading &&
            <View style ={{
                
                flex: 0.1,
                marginTop: 30
                }}>
                    <Button style={{paddingTop: 10,fontFamily:"Helvetica"}} title="Download" onPress = {onHandleDnload}/>
            </View>
            }
            
            <View style = {{
                flex: 0.1,
                marginTop: 50
                }}>
                    <Button style={{paddingTop: 10, fontFamily:"Helvetica"}}  title="Back" onPress = {onHandleBack}/>
            </View>
        </View>

    );
}