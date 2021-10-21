import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { FactionContext } from "../Servers,Factions,Settlements/FactionProvider";
import { ServerContext } from "../Servers,Factions,Settlements/ServerProvider";
import { useEffect } from "react";
import { Dropdown, Option } from "../dropdown/DropDown";
import "./Auth.css"

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
    console.log(`Faction`, e.target.value);
    setOptionValueFaction(e.target.value);
  };
  const handleSelectServers = (e) => {
    console.log(`Server`, e.target.value);
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
    <main>

      <form className="form--login" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
        <section>
        <label htmlFor="username"> Username </label>
        <input
          ref={username}
          type="text"
          name="username"
          className="textfield"
          placeholder="Username"
          required
        />
        <div>
        <label htmlFor="inputEmail"> Email address </label>
        <input
        ref={email}
        type ="email"
        name="email"
        className="textfield"
        placeholder="Email address"
        required
        />
        </div>
        <div>
        <label htmlFor="inputinGamename"> In Game Name </label>
        <input
        ref={inGamename}
        type ="text"
        name="inGamename"
        className="textfield"
        placeholder="inGamename"
        required
        />
        </div>
        <div>
        <label htmlFor="inputDiscord"> discord </label>
        <input
        ref={discord}
        type ="text"
        name="discord"
        className="textfield"
        placeholder="discord"
        required
        />
        </div>

        <div>
        <label htmlFor="Factions">Faction: </label>
        <Dropdown onChange={handleSelectFactions}>
        <option id="faction" value="0" >Select</option>
      {Factions.map(faction => { return (<Option value={faction.id}  name={faction.factionName} />) })}
        </Dropdown>
        </div>

        <div >
        <label htmlFor="Servers">Server: </label>
        <Dropdown onChange={handleSelectServers}>
        <option id="server" value="0" >Select</option>
      {Servers.map(server => { return (<Option value={server.id}  name={server.serverName} />) })}
        </Dropdown>
        </div>

        <div>
        <label htmlFor="inputPassword">password: </label>
        <input
        ref={password}
        type ="password"
        name="password"
        className="textfield"
        placeholder="password"
        required
        />
        </div>
        <button className="btn btn-1 btn-sep icon-send" type ="submit">
        Register
        </button>
        </section>
      </form>
    </main>
  );
};
