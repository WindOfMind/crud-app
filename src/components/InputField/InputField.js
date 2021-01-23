const InputField = ({value, onChange, labelText, id}) => {
    return (
        <div className="field is-horizontal">
            <div className="field-label is-normal" style={{ "flex": "1", "textAlign": "left" }}>
                <label htmlFor={id} className="label">{labelText}</label>
            </div>
            <div className="field-body" style={{ "flex": "4" }}>
                <div className="field">
                    <div className="control">
                        <input id={id} className="input" type="text" value={value} onChange={(e) => onChange(e.target.value)}></input>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputField;