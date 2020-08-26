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

    if (!loading) {
      return undefined;
    }

    (async () => {


      // const response = await fetch('https://country.register.gov.uk/records.json?page-size=5000');
      // await sleep(1e3); // For demo purposes.
      // const countries = await response.json();

      // if (active) {
      //   setOptions(Object.keys(countries).map((key) => {
      //       console.log('countries['+key+'].item[0] : ' + JSON.stringify(countries[key]) + ' type : ' + typeof countries[key])
      //       countries[key].item[0]
      //     })
      //   );
      // }

      const response = await fetch("https://dapi.kakao.com/v2/local/search/address.json?size=10&query='구성로'&page=1", {
        headers: {
          Authorization: `KakaoAK ${REST_API_KEY}`
        }
      })

      const result = await response.json();

      let regionInfos = result.documents;
      let setArr = [];
      let finalSetArr = [];

      regionInfos.forEach(info => {
        setArr.push(info.road_address.region_1depth_name + ' ' + info.road_address.region_2depth_name + ' ' + info.road_address.region_3depth_name);
      })

      let set = new Set(setArr);
      setArr = [...set];

      setArr.forEach(data => {
        console.log('data : ' + JSON.stringify(data))
        finalSetArr.push({
          'region' : data
        })
      })

      console.log('finalSetArr : ' + JSON.stringify(finalSetArr))
      
      if (active) {
        setOptions(finalSetArr)
      }



    })();
    

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: 260 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.region}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Asynchronous"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
