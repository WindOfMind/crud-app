const PrefixSearchBar = ({ prefix, setPrefix, width }) => {
    return (
        <div className="field is-horizontal" style={{ "width": width}}>
            <div className="field-label is-normal mr-0" style={{ "flex": "1", "textAlign": "left" }} >
                <label className="label">Filter prefix: </label>
            </div>
            <div className="field-body" style={{ "flex": "2.5", "paddingRight": "12px" }}>
                <div className="field">
                    <div className="control">
                        <input className="input" type="text" id="prefix-filter" value ={prefix} onChange={(e) => setPrefix(e.target.value)}></input>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrefixSearchBar;