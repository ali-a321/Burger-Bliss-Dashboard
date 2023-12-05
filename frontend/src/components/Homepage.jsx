import React, { useState, useEffect,useRef  } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import Chart from 'chart.js/auto';

function Homepage() {
  //Chart 
  const orderchartContainer = useRef(null);
  const totalSaleschartContainer = useRef(null);
  const salesByCategorychartContainer = useRef(null);
  const totalSalesPerHrChart = useRef(null);
  const citychartContainer = useRef(null)
  const delpickChart = useRef(null)

  //Canvas Issue
  let orderChartInstance;
  let totalSalesChartInstance;
  let salesByCategoryChartInstance;
  let delPickupChartInstance;
  let salesPerHrChartInstance;
  let ordersByCityChartInstance;

  const [totalOrders, setTotalOrders] = useState([]);
  const [totalSales, setTotalSales] = useState([]);
  const [totalItems, setTotalItems] = useState([]);
  const [salesByCategory, setSalesByCategory] = useState([]);
  const [topSellingItems, setTopSellingItems] = useState([]);
  const [salesPerHr, setSalesPerHr] = useState([]);
  const [ordersByCity, setOrdersByCity] = useState([]);
  const [mostOrderedCity, setMostOrderedCity] = useState('');
  const [leastOrderedCity, setLeastOrderedCity] = useState('');
  const [ordersByDelPick, setOrdersByDelPick] = useState([]);

  const [costOfItem, setCostOfItem] = useState([]);

 
  useEffect(() => {
    let counter = 0;

    const backendURLs = [
      'http://localhost:8000/burgerbliss/data/get/totalOrders',
      'http://localhost:8000/burgerbliss/data/get/totalSales',
      'http://localhost:8000/burgerbliss/data/get/totalItems',
      'http://localhost:8000/burgerbliss/data/get/salesByCategory',
      'http://localhost:8000/burgerbliss/data/get/topSellingItems',
      'http://localhost:8000/burgerbliss/data/get/salesPerHr',
      'http://localhost:8000/burgerbliss/data/get/ordersByCity',
      'http://localhost:8000/burgerbliss/data/get/ordersByDelPick',
      'http://localhost:8000/burgerbliss/data/get/costOfItem',
    ];

    backendURLs.forEach(async (url, index) => {
      try {
        const response = await axios.get(url);
        counter++;
  
        if (counter === 1) {
          setTotalOrders(response.data);
          createChart(response.data)
        } else if (counter === 2) {
          setTotalSales(response.data);
          createSalesChart(response.data)
        } else if (counter === 3) {
          setTotalItems(response.data); 
        }else if (counter === 4) {
          setSalesByCategory(response.data); 
          createSalesByCategoryChart(response.data)
        }else if (counter === 5) {
           setTopSellingItems(response.data)
        }else if (counter === 6) {
          setSalesPerHr(response.data)
          createSalesPerHrChart(response.data)
        }else if (counter === 7) {
          setOrdersByCity(response.data);
          createCityChart(response.data)
          extractCities(response.data);
        }else if (counter === 8) {
          setOrdersByDelPick(response.data); 
          createDelPickChart(response.data)
        }
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
      }
    });

}, []);


const createSalesByCategoryChart = (datas) => {
  if (salesByCategoryChartInstance) {
    salesByCategoryChartInstance.destroy();
  }
  if (datas.length > 0 && salesByCategorychartContainer.current) {
    const labels = datas.map(item => item.item_category);
    const data = datas.map(item => item.total_sales_per_category);

    salesByCategoryChartInstance = new Chart(salesByCategorychartContainer.current, {
      type: 'pie', 
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Sales Per Category',
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 1)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
          
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        aspectRatio: 1, 
      },
    });
  }
};

const createSalesChart = (datas) => {
  if (totalSalesChartInstance) {
    totalSalesChartInstance.destroy();
  }

  if (datas.length > 0 && totalSaleschartContainer.current) {
    const labels = datas.map(item => item.item_name);
    const data = datas.map(item => item.total_sales_per_item);

     totalSalesChartInstance = new Chart(totalSaleschartContainer.current, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Sales Per Item',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        width: '50%', 
        height: '20vh',
        
        aspectRatio: 2, 
        scales: {
          x: {
            ticks: {
              color: 'black',
              font: {
                size: 14, 
              },
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value, index, values) {
                return '$' + value; 
              },
            },
          },
        },
      },
    });
  }
};

const createChart = (datas) => {
  if (orderChartInstance) {
    orderChartInstance.destroy();
  }
  if (datas.length > 0 && orderchartContainer.current) {
    const labels = datas.map(item => item.item_name);
    const data = datas.map(item => item.total_quantity);
    orderChartInstance = new Chart(orderchartContainer.current, {
    
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Total Quantity',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        width: '50%', 
        height: '20vh',
        
        aspectRatio: 2, 
        scales: {
          x: {
            ticks: {
              color: 'black',
              font: {
                size: 14, 
              },
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
};
const createCityChart = (datas) => {
  if (ordersByCityChartInstance) {
    ordersByCityChartInstance.destroy();
  }
  if (datas.length > 0 && citychartContainer.current) {
    const labels = datas.map(item => item.city);
    const data = datas.map(item => item.order_count);

    ordersByCityChartInstance = new Chart(citychartContainer.current, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Total Orders Per City',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        width: '50%', 
        height: '20vh',
        
        aspectRatio: 2, 
        scales: {
          x: {
            ticks: {
              color: 'black',
              font: {
                size: 14, 
              },
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
};

const createDelPickChart = (datas) => {
  if (delPickupChartInstance) {
    delPickupChartInstance.destroy();
  }

  if (datas.length > 0 && delpickChart.current) {
    const labels = datas.map(item => {
      return item.pickup_or_delivery === 0 ? 'Pickup' : 'Delivery';
    });

    const data = datas.map(item => item.order_count);

    delPickupChartInstance = new Chart(delpickChart.current, {
      type: 'pie', 
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Pickup/Delivery Ratio',
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 1)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        aspectRatio: 1,
        plugins: {
          legend: {
            labels: {
              // Generate the labels for the legend based on the mapped labels
              generateLabels: chart => {
                const data = chart.data;
                if (data.labels.length && data.datasets.length) {
                  return data.labels.map((label, index) => ({
                    text: `${label}: ${data.datasets[0].data[index]}`,
                    fillStyle: data.datasets[0].backgroundColor[index],
                  }));
                }
                return [];
              },
            },
          },
        },
      },
    });
  }
};

const createSalesPerHrChart = (datas) => {
  if (salesPerHrChartInstance) {
    salesPerHrChartInstance.destroy();
  }
  
  if (datas.length > 0 && totalSalesPerHrChart.current) {
      const labels = datas.map(item => item.hour_of_day);
      const data = datas.map(item => item.total_sales);

      salesPerHrChartInstance = new Chart(totalSalesPerHrChart.current, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Orders Per Hr',
              data: data,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          width: '50%', 
          height: '20vh',
          
          aspectRatio: 2, 
          scales: {
            x: {
              ticks: {
                color: 'black',
                font: {
                  size: 14, 
                },
              },
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  };


const extractCities = (data) => {
  if (data.length >= 2) {
    setMostOrderedCity(data[0].city);
    setLeastOrderedCity(data[data.length - 1].city);
  }
};
  

// Functions for stats
const totalSalesForAllItems = totalSales.reduce((total, currentItem) => {
  return total + currentItem.total_sales_per_item;
}, 0);
const totalOrdersForAllItems = totalOrders.reduce((total, currentItem) => {
  return total + currentItem.total_quantity;
}, 0);
const sortedByQuantityAscending = totalOrders.slice().sort((a, b) => a.total_quantity - b.total_quantity);
const mostOrderedItemName = sortedByQuantityAscending[sortedByQuantityAscending.length - 1]?.item_name;
const leastOrderedItemName = sortedByQuantityAscending[0]?.item_name;
const top3Items = topSellingItems.map(item => item.item_name);
const pickupOrders = ordersByDelPick.find(item => item.pickup_or_delivery === 0)?.order_count || 0;
const deliveryOrders = ordersByDelPick.find(item => item.pickup_or_delivery === 1)?.order_count || 0;
const totalOnlineOrders = pickupOrders + deliveryOrders;
const pickupPercentage = ((pickupOrders / totalOnlineOrders) * 100).toFixed(1);


  return (
    <div>
      <Header />
      <div className='dashboardContainer'>
      <div className='sidebar'>
        <div className='sidebarTable'>
          <div className='sidebarRow header'>
            <div className='sidebarCell'> Title </div>
            <div className='sidebarCell'>Value</div>
          </div>
          <div className='sidebarRow'>
            <div className='sidebarCell'>Total Menu Items Sold:</div>
            <div className='sidebarCell'>{totalOrdersForAllItems}</div>
          </div>
          <div className='sidebarRow'>
            <div className='sidebarCell'>Total Sales:</div>
            <div className='sidebarCell'>${totalSalesForAllItems}</div>
          </div>
          <div className='sidebarRow'>
            <div className='sidebarCell'>Average Order Value:</div>
            <div className='sidebarCell'>
              ${Math.round((totalSalesForAllItems / totalOnlineOrders) * 100) / 100}
            </div>
          </div>
          <div className='sidebarRow'>
            <div className='sidebarCell'>Most Ordered Item:</div>
            <div className='sidebarCell'>{mostOrderedItemName}</div>
          </div>
          <div className='sidebarRow'>
            <div className='sidebarCell'>Top 3 Ordered Items:</div>
            <div className='sidebarCell'>
              {top3Items.map((item, index) => (
                <div key={index}>{`${index + 1}) ${item}`}</div>
              ))}
            </div>
          </div>
          <div className='sidebarRow'>
            <div className='sidebarCell'>Least Ordered Item:</div>
            <div className='sidebarCell'>{leastOrderedItemName}</div>
          </div>
          <div className='sidebarRow'>
            <div className='sidebarCell'>City with Most Orders:</div>
            <div className='sidebarCell'>{mostOrderedCity}</div>
          </div>
          <div className='sidebarRow'>
            <div className='sidebarCell'>City with Least Orders:</div>
            <div className='sidebarCell'>{leastOrderedCity}</div>
          </div>
          <div className='sidebarRow'>
            <div className='sidebarCell'>Online Order Pick-up Ratio:</div>
            <div className='sidebarCell'>{pickupPercentage}%</div>
          </div>
        </div>
      </div>

        <div className='mainContent'>
        <div className='chartRow'>
          <div className='wideChart'>
            <canvas ref={orderchartContainer}></canvas>
          </div>
        </div>

        <div className='chartRow'>
          <div className='wideChart'>
            <canvas ref={totalSaleschartContainer}></canvas>
          </div>
        </div>

        <div className='chartRow'>
          <div className='chart'>
            <canvas ref={salesByCategorychartContainer}></canvas>
          </div>
          <div className='chart'>
            <canvas ref={delpickChart}></canvas>
          </div>
        </div>

        <div className='chartRow'>
          <div className='wideChart'>
            <canvas ref={totalSalesPerHrChart}></canvas>
          </div>
        </div>
        <div className='chartRow'>
        <div className='wideChart'>
            <canvas ref={citychartContainer}></canvas>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);
}

export default Homepage;
