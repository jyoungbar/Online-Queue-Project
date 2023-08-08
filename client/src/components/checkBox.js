import React, { useEffect, useState } from 'react';

const CheckBox = ({label, value, onChange}) => {
  // const [checked, setChecked] = useState(false);

  // const handleChange = () => {
  //   setChecked(!checked);
  // }

  return (
    <div>
      <label>
        <input 
          type="checkbox"
          checked={value}
          onChange={onChange}
        />
        {label}
      </label>
    </div>
  );
};
 
export default CheckBox;