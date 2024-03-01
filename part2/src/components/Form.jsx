const Form = ({ onSubmit, nameValue, nameOnChange, numberValue, numberOnChange }) => {
    return (
      <div>
        <form onSubmit={onSubmit}>
          <FormInput
              name='name'
              value={nameValue}
              onChange={nameOnChange}
          />
          <FormInput
            name='number'
            value={numberValue}
            onChange={numberOnChange}
          />
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
    )
}
  
const FormInput = ({ name, value, onChange }) => (
<div>
    {name}: <input
    value={value}
    onChange={onChange}
    />
</div>
)

export default Form