const db = require('../db');

//burgerbliss/data/get/totalOrders
const getTotalOrders = async (req, res) => {
  try {
 
    const query = `
      SELECT o.item_id, i.item_name, SUM(o.quantity) AS total_quantity
      FROM orderz o
      JOIN item i ON o.item_id = i.item_id
      GROUP BY o.item_id, i.item_name
      LIMIT 0, 50000;
    `;

    db.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching total orders:', error);
        res.status(500).json({ message: 'Failed to get total orders' });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

//burgerbliss/data/get/totalSales
const getTotalSales = async (req, res) => {
  try {

    const query = `
      SELECT o.item_id, i.item_name, i.item_price, SUM(o.quantity) AS total_quantity, SUM(o.quantity * i.item_price) AS total_sales_per_item
      FROM orderz o
      JOIN item i ON o.item_id = i.item_id
      GROUP BY o.item_id, i.item_name
      LIMIT 0, 50000;
    `;

    db.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching total sales:', error);
        res.status(500).json({ message: 'Failed to get total sales' });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

//burgerbliss/data/get/totalItems
const getTotalItems = async (req, res) => {
  try {

    const query = `
      SELECT SUM(total_quantity) AS total_items_quantity
      FROM (
        SELECT i.item_id, i.item_name, SUM(o.quantity) AS total_quantity
        FROM orderz o
        JOIN item i ON o.item_id = i.item_id
        GROUP BY o.item_id, i.item_name
        LIMIT 0, 50000
      ) AS subquery;
    `;

    db.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching total items:', error);
        res.status(500).json({ message: 'Failed to get total items' });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

//burgerbliss/data/get/orderQuantityOfEachItem
const getOrderQuantityOfEachItem = async (req, res) => {
    try {
      
    } catch (error) {
      console.error('Error fetching Order Quantity Of Each Item:', error);
      res.status(500).json({ message: 'Failed to get Order Quantity Of Each Item' });
    }


}

//burgerbliss/data/get/averageOrderValue
//Need to divide by sales function
const getAverageOrderValue = async (req, res) => {
  try {

    const query = `
      SELECT MAX(order_id) AS max_order_id FROM orderz;
    `;

    db.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching average order value:', error);
        res.status(500).json({ message: 'Failed to get average order value' });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

//burgerbliss/data/get/salesByCategory
const getSalesByCategory = async (req, res) => {
  try {
    const query = `
      SELECT i.item_category, SUM(o.quantity * i.item_price) AS total_sales_per_category
      FROM orderz o
      JOIN item i ON o.item_id = i.item_id
      GROUP BY i.item_category;
    `;

    db.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching sales by category:', error);
        res.status(500).json({ message: 'Failed to get sales by category' });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

//burgerbliss/data/get/ordersByCity
const getOrdersByCity = async (req, res) => {
  try {

    const query = `
      SELECT 
          a.delivery_city AS city,
          COUNT(*) AS order_count
      FROM 
          orderz o
      JOIN 
          address a ON o.address_id = a.address_id
      GROUP BY 
          a.delivery_city
      ORDER BY 
          order_count DESC;
    `;

    db.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching orders by city:', error);
        res.status(500).json({ message: 'Failed to get orders by city' });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

//burgerbliss/data/get/topSellingItems
const getTopSellingItems = async (req, res) => {
  try {

    const query = `
      SELECT 
          i.item_id, 
          i.item_name, 
          SUM(o.quantity) AS total_quantity,
          SUM(o.quantity * i.item_price) AS total_sales_per_item
      FROM 
          orderz o
      JOIN 
          item i ON o.item_id = i.item_id
      GROUP BY 
          i.item_id, i.item_name
      ORDER BY 
          total_quantity DESC
      LIMIT 3;
    `;

    db.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching top selling items:', error);
        res.status(500).json({ message: 'Failed to get top selling items' });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

//burgerbliss/data/get/ordersByDelPick
const getOrdersByDelPick = async (req, res) => {
  try {
    const query = `
      SELECT 
          o.delivery AS pickup_or_delivery,
          COUNT(*) AS order_count
      FROM 
          orderz o
      GROUP BY 
          o.delivery
      ORDER BY 
          o.delivery;
    `;

    db.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching delivery/pickup ratio:', error);
        res.status(500).json({ message: 'Failed to get delivery/pickup ratio' });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

//burgerbliss/data/get/salesPerHr
const getSalesPerHr = async (req, res) => {
  try {

    const query = `
      SELECT 
          HOUR(created_at) AS hour_of_day,
          COUNT(*) AS total_sales
      FROM 
          orderz
      GROUP BY 
          HOUR(created_at)
      ORDER BY 
          HOUR(created_at);
    `;

    db.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching sales per hour:', error);
        res.status(500).json({ message: 'Failed to get sales per hour' });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

//burgerbliss/data/get/costOfItem
const getCostOfItem = async (req, res) => {
  try {

    const query = `
      SELECT
          o.item_id,
          i.stock_keeping,
          i.item_name,
          SUM(o.quantity) AS order_quantity
      FROM
          orderz o
      LEFT JOIN
          item i ON o.item_id = i.item_id
      GROUP BY
          o.item_id, i.stock_keeping, i.item_name;
    `;

    db.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching cost of items:', error);
        res.status(500).json({ message: 'Failed to get cost of items' });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};





module.exports = {getTotalOrders, getTotalSales, getTotalItems, getOrderQuantityOfEachItem,
    getAverageOrderValue,getSalesByCategory,getTopSellingItems,getOrdersByCity,
    getOrdersByDelPick,getCostOfItem,getSalesPerHr   } 