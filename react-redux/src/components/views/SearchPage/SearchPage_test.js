// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import fetch from 'cross-fetch';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import 'babel-polyfill';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function Asynchronous() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const REST_API_KEY = '';

  React.useEffect(() => {
    let active = true;

    (async () => {
      // const response = await fetch('https://country.register.gov.uk/records.json?page-size=5000');
      const response = await fetch("https://dapi.kakao.com/v2/local/search/address.json?size=10&query='구성로'&page=1", {
        headers: {
          Authorization: `KakaoAK ${REST_API_KEY}`
        }
      })

      const result = await response.json();

      let regionInfos = result.documents;

      if (active) {
        setOptions(() => {
          regionInfos.map(info => {
            console.log(info.road_address.region_1depth_name + ' ' + info.road_address.region_2depth_name + ' ' + info.road_address.region_3depth_name);
          })
        })
      }

      console.log('options.. ' + JSON.stringify(options));
    })();

    return () => {
      active = false;
    };
  }, [loading]);


  return (
    <div>
      here
    </div>
  );
}
