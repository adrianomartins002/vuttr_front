import React, { useState } from 'react';
import { Input, Button, Modal } from '@material-ui/core';
import './Modal.css';
import axios from 'axios';

export default function ModalComp(props) {

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);

  const createTool = (tool) => {
    axios.post(`http://localhost:3000/tools`, tool, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.status === 200) {
        props.recuperarDados();
        props.setOpen(false)
      }
    }).catch(err => {

    });
  }


  const handleSubmit = (teste) => {
    teste.preventDefault();
    let tool = {
      title,
      link,
      description,
      tags
    }

    createTool(tool);

  }


  const changeTags = event => {
    if (event.target.value.split(" ").length > 0) {
      let values = event.target.value.split(" ");
      setTags(values);
    }
  }

  return (
    <>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        style={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div className="container-modal">
          <h1>Add new tool</h1>
          <div className="container-inputs">
            <form onSubmit={handleSubmit}>
              <p>Tool Name</p>
              <Input placeholder="Hotel" type="text" onChange={event => setTitle(event.target.value)}></Input>
              <p>Tool Link</p>
              <Input placeholder="http://example.com.br" type="text" onChange={event => setLink(event.target.value)}></Input>
              <p>Tool Description</p>
              <Input placeholder="asdfasndfjknas djfnaslkdf" type="text" onChange={event => setDescription(event.target.value)}></Input>
              <p>Tags</p>
              <Input placeholder="node organizing webapps https proxys" type="text" onChange={changeTags}></Input>
              <div className="container-button">
                <Button variant="contained" color="primary" type="submit" > Add Tool</Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  )
}