import React, { useState, useEffect } from 'react';
import { InputAdornment, Input, Button, Card } from '@material-ui/core';
import { Add, Search, Close } from '@material-ui/icons';
import './Home.css';
import Header from '../components/Header';
import ModalComp from '../components/Modal';
import axios from 'axios';

export default function Home() {

  const [open, setOpen] = useState(false);
  const [toolsList, setToolsList] = useState([]);
  const [tagSearch, setTagSearch] = useState('');

  function recuperarDados(tag) {
    axios.get(`http://localhost:3000/tools`, {
      params: {
        tag: tag
      }
    }).then(
      response => {
        setToolsList(response.data);
      }
    )
  }

  const deleteTool = (item) => {
    axios.delete(`http://localhost:3000/tools/${item.id}`).then(response => {
      recuperarDados();
    })
  }

  useEffect(() => {
    recuperarDados();
  }, [])

  return (
    <>
      <Header />
      <div className="container-controller">
        <div className="container-input">
          <Input
            onChange={event => setTagSearch(event.target.value)}
            value={tagSearch}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                setTagSearch(event.target.value)
                recuperarDados(tagSearch)
              }
            }
            }
            startAdornment={
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            }
          />
        </div>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)} ><Add /> Add</Button>
      </div>
      <div className="container-lista">
        {toolsList && toolsList.length > 0 ?
          <>
            {
              toolsList.map(item =>
                <Card style={styleCard} key={String(item.id)}>

                  <div className="card-container-text">
                    <p className="title-card" style={{ fontSize: "18px", fontWeight: "bold", textDecoration: "underline", color: "blue", margin: "0px" }}>{item.title}</p>
                    <p className="description-card">{item.description}</p>
                    <div className="container-tags">
                      {item.tags.map(item => (
                        <label
                          style={{ margin: "4px", cursor: "pointer", fontWeight: "bold" }}
                          key={item}
                          onClick={event => {
                            setTagSearch(item)
                            recuperarDados(item)
                          }}
                        >#{item}</label>
                      ))}
                    </div>
                  </div>
                  <div className="remove-container" style={{ cursor: "pointer" }} onClick={() => deleteTool(item)}><p className="remove" style={{ display: "flex", justifyContent: "center" }}><Close />remove</p></div>
                </Card>

              )
            }
          </>
          :
          null
        }
      </div>
      <ModalComp
        open={open}
        handleClose={() => setOpen(false)}
        setOpen={setOpen}
        recuperarDados={recuperarDados}
      />
    </>

  )
}

const styleCard = { marginTop: "14px", marginBottom: "14px", padding: "14px", display: "flex", flexDirection: "row", justifyContent: "space-between" };