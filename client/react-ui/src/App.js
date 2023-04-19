import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
//
function App() {

  const [data, setData] = useState({
    sepal_length: '',
    sepal_width: '',
    petal_length: '',
    petal_width: '',
    epochs: '',
    learning_rate: '',
  });
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = "http://localhost:3000/run";

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setPrediction(null);
    axios.post(apiUrl, data)
      .then(res => {
        setPrediction(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      })
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="input-form App">
            <h1 className='form-title'>Flower Species Prediction</h1>
            <Form onSubmit={onSubmit}>

              <Form.Group controlId="sepal_length" className='space-between d-flex align-items-start' required>
                <Form.Label className='label-form'>Sepal Length</Form.Label>
                <Form.Control className="control-form" type="number" placeholder='Enter a number more than 0' name="sepal_length" value={data.sepal_length} onChange={onChange} required />
              </Form.Group>

              <Form.Group controlId="sepal_width" className='space-between d-flex align-items-start' required>
                <Form.Label className='label-form'>Sepal Width</Form.Label>
                <Form.Control className="control-form" type="number" placeholder='Enter a number more than 0' name="sepal_width" value={data.sepal_width} onChange={onChange} required />
              </Form.Group>

              <Form.Group controlId="petal_length" className='space-between d-flex align-items-start' required>
                <Form.Label className='label-form'>Petal Length</Form.Label>
                <Form.Control className="control-form" type="number" placeholder='Enter a number more than 0' name="petal_length" value={data.petal_length} onChange={onChange} required />
              </Form.Group>

              <Form.Group controlId="petal_width" className='space-between d-flex align-items-start' required>
                <Form.Label className='label-form'>Petal Width</Form.Label>
                <Form.Control className="control-form" type="number" placeholder='Enter a number more than 0' name="petal_width" value={data.petal_width} onChange={onChange} required />
              </Form.Group>

              <Form.Group controlId="epochs" className='space-between d-flex align-items-start' required>
                <Form.Label className='label-form'>Epochs</Form.Label>
                <Form.Control className="control-form" type="number" placeholder='Enter a number between 0 and 100' name="epochs" value={data.epochs} onChange={onChange} min={0} max={100} required />
              </Form.Group>

              <Form.Group controlId="learning_rate" className='space-between d-flex align-items-start' required>
                <Form.Label className='label-form'>Learning Rate</Form.Label>
                <Form.Control className="control-form" type="number" placeholder='Enter a number between 0 and 1' name="learning_rate" value={data.learning_rate} onChange={onChange} min={0} max={1} required />
              </Form.Group>

              <Button onClick={onSubmit} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Predict'}
              </Button>

            </Form>
          </div>
        </div>
        <div className="col-md-6 App" style={{ marginLeft: '-20px' }}>
          <div className="prediction-result">
            <h1>Prediction</h1>
            <h4>The species with the highest prediction is: </h4>
            <h3 className='species-result'>
              {prediction && prediction.row1 && prediction.row1.length > 0
                ? `${prediction.row1.indexOf(Math.max(...prediction.row1)) === 0
                  ? 'Setosa'
                  : prediction.row1.indexOf(Math.max(...prediction.row1)) === 1
                    ? 'Versicolor'
                    : 'Virginica'
                }`
                : 'Unknown'}
            </h3>
            {prediction && (
              <div>
                <hr />
                {/* <h3 className='species-result'>
                  {`${prediction.row1.indexOf(Math.max(...prediction.row1)) === 0
                    ? 'Setosa'
                    : prediction.row1.indexOf(Math.max(...prediction.row1)) === 1
                      ? 'Versicolor'
                      : 'Virginica'
                    }`}
                </h3> */}
                <h4>Probability of each class:</h4>
                <Table>
                  <thead>
                    <tr>
                      <th>Setosa</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{prediction.row1[0]}</td>
                    </tr>
                  </tbody>
                </Table>

                <Table>
                  <thead>
                    <tr>
                      <th>Versicolor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{prediction.row1[1]}</td>
                    </tr>
                  </tbody>
                </Table>

                <Table>
                  <thead>
                    <tr>
                      <th>Virginica</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{prediction.row1[2]}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
//
export default App;