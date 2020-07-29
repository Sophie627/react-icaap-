import React from "react";
import { Button } from "@material-ui/core";
import * as XLSX from "xlsx";
import Dropzone from "react-dropzone";
import ncdf from "../utils/normal_dist";

class FileUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = { file: {}, test: "Test" };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        console.log(this.state);
        var files = this.state.file,
            f = files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            var data = e.target.result;
            let readedData = XLSX.read(data, { type: "binary" });
            const wsname = readedData.SheetNames[0];
            const ws = readedData.Sheets[wsname];
            /* Convert array to json*/
            const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
            console.log(dataParse);
            // setFileUploaded(dataParse);
        };
        reader.readAsBinaryString(f);
    }
    render() {
        return (
            <div>
                <Dropzone onDrop={(acceptedFiles) => this.setState({ file: acceptedFiles })}>
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>Drag 'n' drop some files here, or click to select files</p>
                            </div>
                        </section>
                    )}
                </Dropzone>
                <Button onClick={this.handleClick} variant="contained">
                    ADD DATA
                </Button>
            </div>
        );
    }
}

export default FileUpload;
