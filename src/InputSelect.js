import React from 'react'

function InputSelect({name, options, defaultOption, ...restProps}) {
  return (
    <select name={name} id={name} {...restProps}>
      {defaultOption && <option value="">{defaultOption}</option>}
      {options.map(option => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default InputSelect
