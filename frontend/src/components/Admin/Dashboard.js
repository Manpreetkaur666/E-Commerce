import React from 'react'
import Sidebar from './Sidebar';
import './dashboard.css';
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
// import {CategoryScale} from 'chart.js';
import Chart from 'chart.js/auto';
import { useSelector, useDispatch } from "react-redux";

const Dashboard = () => {

  // Chart.register(CategoryScale);

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 4000],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [2, 10],
      },
    ],
  };


  return (
    <div className='dashboard'>
      <MetaData title="Dashboard - Admin Panel" />
        <Sidebar />
        <div className='dashboardContainer'>
          <Typography component="h1">Dashboard</Typography>

          <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹50
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>10</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>5</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>2</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>

        </div>
    </div>
  )
}

export default Dashboard