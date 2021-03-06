import fetch from 'cross-fetch';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import 'babel-polyfill';

export default function SearchPage(props) {

  const [input, setInput] = React.useState('');
  const [regionList, setRegionList] =React.useState([]);
  const config = require('../../../config/config');
  const LOCAL_API_KEY = config.LOCAL_API_KEY;

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const selectValue = (clickButton) => {

    let region = clickButton.target.innerText;
    props.reloadEventsFunc(props.rangeInfo.startStr, props.rangeInfo.endStr, region)
    .catch((error) => {
      alert('reload Error !!!')
      console.log(error)
    })
    // const label = document.getElementById('region-label');
    // let region = clickButton.target.firstChild.innerText;
    // label.innerText = region;
    setInput('');
    setRegionList([]);
  };

  React.useEffect(() => {

    if (input.length === 0){
      setRegionList([]);
    }
    
    (async () => {
      const response = await fetch("https://dapi.kakao.com/v2/local/search/address.json?size=10&query=''+"+input+"'&page=1", {
        headers: {
          Authorization: `KakaoAK ${LOCAL_API_KEY}`
        }
      })

      const result = await response.json();

      if (result.documents.length > 0 ){

        let regionInfos = result.documents;
        let setArr = [];
        let finalArr = [];

        regionInfos.forEach(info => {
          let obj = info.address
          if (obj === null){
            obj = info.road_address;
          }
          let sido = obj.region_1depth_name;

          if (sido === '경기')
            sido = '경기도';
          
          setArr.push(sido + ' ' + obj.region_2depth_name + ' ' + obj.region_3depth_name)
        })

        let set = new Set(setArr);
        setArr = [...set];
     
        setArr.forEach((data, index) => {
          finalArr.push(<Button 
                          key={index} 
                          color="primary" 
                          variant="contained" 
                          style={{'display': "block", 'marginTop': "10px"}}
                          onClick={selectValue}
                        >
                            {data}
                        </Button>)
        })
        setRegionList(finalArr);
      }
    })();
  }, [input]);


  return (
    <div>
    <TextField
    id="region"
    label="지역 검색"
    value={input}
    onChange={handleInput}
    multiline
    fullWidth
  />
  <div id='regionList'>
    {regionList}
  </div>
</div>
  );
}
