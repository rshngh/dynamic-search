import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import Select from "react-select";
const MyComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const baseurl =
    import.meta.env.MODE === "development"
      ? "http://localhost:8080/api"
      : `${window.location.origin}/api`;

  var url = window.location.origin;
  console.log("url", url);

  console.log("baseurl", baseurl);
  console.log("inputValue", inputValue);

  const handleChange = (option) => {
    setSelectedOption(option);
    console.log(`Option selected:`, option);
  };

  const handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, "");
    setInputValue(inputValue);
    return inputValue;
  };

  const loadOptions = async (inputValue) => {
    const response = await fetch(`${baseurl}/cities/city?search=${inputValue}`);

    const data = await response.json();
    console.log("data", data);
    return data.map((city) => ({ label: city.name, value: city.name }));
  };

  return (
    <div>
      <AsyncSelect
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            primary25: "black",
            primary: "black",
          },
        })}
        value={selectedOption}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        loadOptions={loadOptions}
      />
    </div>
  );
};
export default MyComponent;
