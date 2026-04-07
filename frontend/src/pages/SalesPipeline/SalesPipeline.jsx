import { useState, useEffect } from "react";
import "./SalesPipeline.css";

function SalesPipeline() {

  const [deals, setDeals] = useState([]);

  const stages = ["New Lead", "Qualified", "Proposal", "Negotiation", "Closed"];

  // Fetch deals from backend
  useEffect(() => {

    fetch("/api/deals")
      .then(res => res.json())
      .then(data => setDeals(data))
      .catch(err => console.log(err));

  }, []);

  // Add new deal
  const addDeal = async () => {

    const newDeal = {
      customer: "New Customer",
      value: 1000,
      stage: "New Lead"
    };

    const res = await fetch("/api/deals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newDeal)
    });

    const data = await res.json();

    setDeals([...deals, data]);

  };

  return (
    <div>

      <h2>Sales Pipeline</h2>

      <button onClick={addDeal}>Add Deal</button>

      <div className="pipeline-container">

        {stages.map(stage => (

          <div key={stage} className="pipeline-column">

            <h3>{stage}</h3>

            {deals
              .filter(deal => deal.stage === stage)
              .map(deal => (

                <div key={deal._id} className="deal-card">

                  <p>{deal.customer}</p>
                  <p>${deal.value}</p>

                </div>

              ))}

          </div>

        ))}

      </div>

    </div>
  );
}

export default SalesPipeline;