import PropTypes from 'prop-types';
import * as React from "react";
import {Form, FormControl} from "react-bootstrap";
import Button from "react-bootstrap/es/Button";

class LoadTourney extends React.Component {


    constructor(props) {
        super(props);

        this.fileChange = this.fileChange.bind(this);
        this.onLoadTourney = this.onLoadTourney.bind(this);

        this.state = {fileName: ''}
    }

    fileChange(e) {
        this.setState({fileName: e.target.value, file: e.target.files[0]});
    }

    onLoadTourney(e) {
        e.preventDefault();

        if(this.state.file === '') {
            return;
        }

        if (this.state.file) {
            const file = this.state.file;
            const reader = new FileReader();

            const loadTourney = this.props.loadTourney;

            reader.onload = function (event) {
                loadTourney(event.target.result);
            };

            reader.readAsText(file);
        }
    }

    render() {
        return <Form className={'border border-primary p-3'}
                     onSubmit={this.onLoadTourney}>
            <h2 className='border-bottom mb-3'>Wczytaj istniejący turniej</h2>
            <Form.Group controlId="formBasicText">
                <FieldGroup
                    type="file"
                    label="Wybierz plik z zapisanym turniejem"
                    value={this.state.fileName}
                    onChange={this.fileChange}
                />

            </Form.Group>
            <Button type="submit">Wczytaj</Button>
        </Form>
    }
}

function FieldGroup({id, label, ...props}) {
    return (
        <Form.Group controlId={id}>
            <Form.Label>{label}</Form.Label>
            <FormControl {...props} />
        </Form.Group>
    );
}

export default LoadTourney;

LoadTourney.propTypes = {
    loadTourney: PropTypes.func
};