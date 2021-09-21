import React, { useRef,useState } from "react";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { FactionContext } from "../Servers,Factions,Settlements/FactionProvider";
import { ServerContext } from "../Servers,Factions,Settlements/ServerProvider";
import { useEffect } from "react";
import { Dropdown,Option } from "../dropdown/DropDown";


export const Register = () => {
  const [optionValueFaction, setOptionValueFaction] = useState("");
  const [optionValueServer, setOptionValueServer] = useState("");
  const { Factions, getFactions } = useContext(FactionContext)
  const { Servers, getServers } = useContext(ServerContext)
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const inGamename = useRef();
  const discord = useRef();
  const history = useHistory();


  const handleSelectFactions = (e) => {
    console.log(`Faction`,e.target.value);
    setOptionValueFaction(e.target.value);
  };
  const handleSelectServers= (e) => {
    console.log(`Server`,e.target.value);
    setOptionValueServer(e.target.value);
  }; 
  


    
  useEffect(() => {
    getFactions()
    getServers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRegister = (event) => {

    event.preventDefault();

    const new_user = {
      username: username.current.value,
      first_name: "",
      last_name: "",
      email: email.current.value,
      password: password.current.value,
      inGamename: inGamename.current.value,
      discord: discord.current.value,
      server: parseInt(optionValueServer),
      faction: parseInt(optionValueFaction)
    };

    return fetch("http://127.0.0.1:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(new_user),
    })
      .then((res) => res.json())
      .then((res) => {
        if ("token" in res) {
          localStorage.setItem("newworld_token", res.token);
          history.push("/");
        }
      });
  }



  return (
    <main style={{ textAlign: "center" }}>

      <form className="form--login" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
        <fieldset>
          <label htmlFor="username"> User Name </label>
          <input
            ref={username}
            type="text"
            name="username"
            className="form-control"
            placeholder="Choose a user name"
            required
          />
        </fieldset>

        <fieldset>
          <label htmlFor="inputEmail"> Email address </label>
          <input
            ref={email}
            type="email"
            name="email"
            className="form-control"
            placeholder="Email address"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="inputinGamename"> In Game Name </label>
          <input
            ref={inGamename}
            type="text"
            name="inGamename"
            className="form-control"
            placeholder="inGamename"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="inputDiscord"> discord </label>
          <input
            ref={discord}
            type="text"
            name="discord"
            className="form-control"
            placeholder="discord"
            required
          />
        </fieldset>

        <form action="/">
          <label htmlFor="Factions">Choose a Faction:</label>
          <Dropdown onChange={handleSelectFactions}>
            <option id="faction" value="0" >Select</option>
            {Factions.map(faction => { return (<Option value={faction.id}  name={faction.factionName} />) })}
          </Dropdown>
        </form>
        <form action="/">
          <label htmlFor="Servers">Choose a Server:</label>

          <Dropdown onChange={handleSelectServers}>
            <option id="server" value="0" >Select</option>
            {Servers.map(server => { return (<Option value={server.id}  name={server.serverName} />) })}
            </Dropdown>
        </form>

        <fieldset>
          <label htmlFor="inputPassword">password: </label>
          <input
            ref={password}
            type="password"
            name="password"
            className="form-control"
            placeholder="password"
            required
          />
        </fieldset>

        <fieldset
          style={{
            textAlign: "center",
          }}
        >
          <button className="btn btn-1 btn-sep icon-send" type="submit">
            Register
          </button>
        </fieldset>
      </form>

    </main>
  );
};
