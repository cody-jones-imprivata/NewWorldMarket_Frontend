import React, { useRef } from "react";
import {useHistory } from "react-router-dom";
import { useContext } from "react";
import { FactionContext } from "../Servers,Factions,Settlements/FactionProvider";
import { ServerContext } from "../Servers,Factions,Settlements/ServerProvider";
import { useEffect } from "react";

export const Register = () => {
  const { Factions, getFactions } = useContext(FactionContext)
  const { Servers, getServers } = useContext(ServerContext)
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const inGamename = useRef();
  const Server = useRef();
  const discord = useRef();
  const Faction = useRef();
  const passwordDialog = useRef();
  const history = useHistory();

  useEffect(() => {
    getFactions()
    getServers()
}, []);
  const handleRegister = (e) => {
    e.preventDefault();


    if (password.current.value === password.current.value) {
      const new_user = {
        username: username.current.value,
        first_name: "",
        last_name: "",
        email: email.current.value,
        password: password.current.value,
        inGamename: inGamename.current.value,
        discord: discord.current.value,
        faction: parseInt(Faction.current.value),
        server: parseInt(Server.current.value)
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
    } else {
      passwordDialog.current.showModal();
    }
  };

  return (
    <main style={{ textAlign: "center" }}>
      <dialog className="dialog dialog--password" ref={passwordDialog}>
        <div>Passwords do not match</div>
        <button
          className="button--close"
          onClick={(e) => passwordDialog.current.close()}
        >
          Close
        </button>
      </dialog>

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
                <select id="faction" name="faction">
                    {Factions.map(faction => { return (<option id="faction" value={faction.id} ref={Faction}>{faction.factionName}</option>) })}
                </select>
            </form>

        <form action="/">
                <label htmlFor="Servers">Choose a Server:</label>
                <select id="server" name="server">
                    {Servers.map(server => { return (<option id="server" value={server.id} ref={Server}>{server.serverName}</option>) })}
                </select>
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