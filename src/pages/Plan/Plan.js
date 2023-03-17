import "./Plan.css";

import { BiCheck, BiX } from "react-icons/bi";
import { useState } from "react";

import PlanPaymentForm from "../PlanPaymentForm/PlanPaymentForm";

function Plan() {
  const [amount, setAmount] = useState(9.99);
  const [activePlan, setActivePlan] = useState("Basic");
  const [open, setOpen] = useState(false);

  const handleButton = (event) => {
    setOpen(true);
    setActivePlan(event);
    if (event === "starter") {
      setAmount(9.99);
      console.log("THIS IS EVEBT " + event);
    } else if (event === "professional") {
      setAmount(19.99);
    } else if (event === "organization") {
      setAmount(49.99);
    }
  };
  return (
    <>
      <div style={{ marginTop: "50px" }} className="App">
        <header className="App-header"></header>
        <div className="table centered">
          <div className="row">
            <div className="column">
              <ul className="price">
                <li className="header">
                  <br />
                  <br />
                  Features
                </li>
                <li>Version History</li>
                <li>Domain version</li>
                <li>Plugin Administrator</li>
                <li>Premium Templates</li>
                <li>Unlimited Domain Hosting</li>
                <li>Domain Name</li>
              </ul>
            </div>

            <div className="column">
              <ul className="price">
                <li className="header">
                  Starter
                  <br />
                  <span className="dollar">9.99</span>
                
                  <div
                    value="starter"
                    onClick={() => {
                      handleButton("starter");
                    }}
                    className="button_cont"
                    align="center"
                  >
                    <a className="button" target="_blank" rel="nofollow noopener">
                      Go Starter
                    </a>
                  </div>
                </li>
                <li>
                  <BiCheck color="green" />
                </li>
                <li>
                  <BiCheck color="green" />
                </li>
                <li>
                  <BiCheck color="green" />
                </li>
                <li>
                  <BiX color="red" />
                </li>
                <li>
                  <BiX color="red" />
                </li>
                <li>
                  <BiX color="red" />
                </li>
              </ul>
            </div>

            <div className="column">
              <ul className="price">
                <li className="header">
                  Professional
                  <br />
                  <span className="dollar">19.99</span>
                
                  <div
                    value="Professional"
                    onClick={() => {
                      handleButton("professional");
                    }}
                    className="button_color"
                    align="center"
                  >
                    <a className="button" target="_blank" rel="nofollow noopener">
                      Go Professional
                    </a>
                  </div>
                </li>
                <li>
                  <BiCheck color="green" />
                </li>
                <li>
                  <BiCheck color="green" />
                </li>
                <li>
                  <BiCheck color="green" />
                </li>
                <li>
                  <BiCheck color="green" />
                </li>
                <li>
                  <BiCheck color="green" />
                </li>
                <li>
                  <BiX color="red" />
                </li>
              </ul>
            </div>

            <div className="column">
              <ul className="price">
                <li className="header">
                  Organization
                  <br />
                  <span className="dollar">49.99</span>
              
                  <div
                    value="Organization"
                    onClick={() => {
                      handleButton("organization");
                    }}
                    className="button_cont"
                    align="center"
                  >
                    <a className="button" target="_blank" rel="nofollow noopener">
                      Go Organization
                    </a>
                  </div>
                </li>
                <li>
                  <BiCheck color="green" />
                </li>
                <li>
                  <BiCheck color="green" />
                </li>
                <li>
                  <BiCheck color="green" />
                </li>
                <li>
                  <BiCheck color="green" />
                </li>
                <li>
                  <BiCheck color="green" />
                </li>
                <li>
                  <BiCheck color="green" />
                </li>
              </ul>
            </div>
          </div>
        </div>
        {open && (
          <PlanPaymentForm
            setOpen={setOpen}
            activePlan={activePlan}
            amount={amount}
          ></PlanPaymentForm>
        )}
      </div>
    </>
  );
}

export default Plan;
