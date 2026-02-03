

 /* 
  document.addEventListener("DOMContentLoaded", () => {
    const ordersList = document.getElementById("ordersList");
    const statusFilter = document.getElementById("statusFilter");
    const scrollBtn = document.getElementById("scrollTopBtn");

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    // Järjestys uusimmat ensin
    orders.sort((a, b) => b.id - a.id);

    function renderOrders(filterStatus = "all") {
      ordersList.innerHTML = "";

      const filteredOrders = filterStatus === "all" ? orders : orders.filter(order => order.status === filterStatus);

      if (filteredOrders.length === 0) {
        ordersList.innerHTML = "<p>Ei tilauksia.</p>";
        return;
      }

      filteredOrders.forEach(order => {
        const orderDiv = document.createElement("div");
        orderDiv.className = `order ${order.status}`;

        orderDiv.innerHTML = `
          <h3>Tilaus #${order.id}</h3>
          <p><strong>Asiakas:</strong> ${order.customerName}</p>
          <p><strong>Tyyppi:</strong> ${order.selectedPancake}</p>
          <p><strong>Täytteet:</strong> ${order.toppings.join(", ") || "Ei"}</p>
          <p><strong>Lisukkeet:</strong> ${order.extras.join(", ") || "Ei"}</p>
          <p><strong>Toimitus:</strong> ${order.deliveryMethod}</p>
          <p><strong>Hinta:</strong> ${order.totalPrice}€</p>
          <label>Tila:
            <select data-id="${order.id}">
              <option value="waiting" ${order.status === "waiting" ? "selected" : ""}>🟡 waiting</option>
              <option value="ready" ${order.status === "ready" ? "selected" : ""}> 🔵 ready</option>
              <option value="delivered" ${order.status === "delivered" ? "selected" : ""}>🟢 delivered</option>
            </select>
          </label>
          <button class="deleteBtn" data-id="${order.id}">🗑 Poista</button>
        `;
        ordersList.appendChild(orderDiv);
      });
    }

    // Tilan päivitys
    ordersList.addEventListener("change", (e) => {
      if (e.target.tagName === "SELECT") {
        const id = parseInt(e.target.dataset.id);
        const newStatus = e.target.value;
        const order = orders.find(o => o.id === id);
        if (order) {
          order.status = newStatus;
          localStorage.setItem("orders", JSON.stringify(orders));
          renderOrders(statusFilter.value);
        }
      }
    });

    // Poistopainike
    ordersList.addEventListener("click", (e) => {
      if (e.target.classList.contains("deleteBtn")) {
        const id = parseInt(e.target.dataset.id);
        orders = orders.filter(order => order.id !== id);
        localStorage.setItem("orders", JSON.stringify(orders));
        renderOrders(statusFilter.value);
      }
    });

    // Suodatus
    statusFilter.addEventListener("change", () => {
      renderOrders(statusFilter.value);
    });

    


  //scroll button
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.style.display = "flex";
    } else {
      scrollBtn.style.display = "none";
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  renderOrders();
});
*/



/*
        
      // 1. Kysy salasanaa heti
const correctPassword = "salasana123"; // Voit vaihtaa tämän haluamaasi
const userPassword = prompt("Syötä salasana nähdäksesi tilaukset:");

if (userPassword !== correctPassword) {
  document.body.innerHTML = "<h1>Pääsy evätty</h1><p>Väärä salasana.</p>";
  throw new Error("Väärä salasana");
}

// 2. Jos salasana oikein, jatketaan vasta nyt
document.addEventListener("DOMContentLoaded", () => {
  const ordersList = document.getElementById("ordersList");
  const statusFilter = document.getElementById("statusFilter");
  const scrollBtn = document.getElementById("scrollTopBtn");

  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  // Järjestetään: waiting -> ready -> delivered
  const statusOrder = { waiting: 1, ready: 2, delivered: 3 };
  orders.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);

  const searchInput = document.createElement("input");
  searchInput.placeholder = "Etsi nimellä tai ID:llä";
  searchInput.id = "searchInput";
  searchInput.style.margin = "10px";
  document.querySelector(".header").appendChild(searchInput);

  function renderOrders(filterStatus = "all", searchTerm = "") {
    ordersList.innerHTML = "";

    let filteredOrders = orders;

    if (filterStatus !== "all") {
      filteredOrders = filteredOrders.filter(order => order.status === filterStatus);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filteredOrders = filteredOrders.filter(order =>
        order.customerName.toLowerCase().includes(term) || order.id.toString().includes(term)
      );
    }

    if (filteredOrders.length === 0) {
      ordersList.innerHTML = "<p>Ei tilauksia.</p>";
      return;
    }

    filteredOrders.forEach(order => {
      const orderDiv = document.createElement("div");
      orderDiv.className = `order ${order.status}`;

      orderDiv.innerHTML = `
        <h3>Tilaus #${order.id}</h3>
        <p><strong>Asiakas:</strong> ${order.customerName}</p>
        <p><strong>Tyyppi:</strong> ${order.selectedPancake}</p>
        <p><strong>Täytteet:</strong> ${order.toppings.join(", ") || "Ei"}</p>
        <p><strong>Lisukkeet:</strong> ${order.extras.join(", ") || "Ei"}</p>
        <p><strong>Toimitus:</strong> ${order.deliveryMethod}</p>
        <p><strong>Hinta:</strong> ${order.totalPrice}€</p>
        <label>Tila:
          <select data-id="${order.id}">
            <option value="waiting" ${order.status === "waiting" ? "selected" : ""}>🟡 waiting</option>
            <option value="ready" ${order.status === "ready" ? "selected" : ""}> 🔵 ready</option>
            <option value="delivered" ${order.status === "delivered" ? "selected" : ""}>🟢 delivered</option>
          </select>
        </label>
        <button class="deleteBtn" data-id="${order.id}">🗑 Poista</button>
      `;
      ordersList.appendChild(orderDiv);
    });
  }

  // Päivitä tila
  ordersList.addEventListener("change", (e) => {
    if (e.target.tagName === "SELECT") {
      const id = parseInt(e.target.dataset.id);
      const newStatus = e.target.value;
      const order = orders.find(o => o.id === id);
      if (order) {
        order.status = newStatus;
        localStorage.setItem("orders", JSON.stringify(orders));
        renderOrders(statusFilter.value, searchInput.value);
      }
    }
  });

  // Salli poistaminen vain jos "delivered"
  ordersList.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteBtn")) {
      const id = parseInt(e.target.dataset.id);
      const order = orders.find(o => o.id === id);
      if (order && order.status === "delivered") {
        orders = orders.filter(o => o.id !== id);
        localStorage.setItem("orders", JSON.stringify(orders));
        renderOrders(statusFilter.value, searchInput.value);
      } else {
        alert("Vain toimitetut tilaukset voidaan poistaa.");
      }
    }
  });

  // Suodatus
  statusFilter.addEventListener("change", () => {
    renderOrders(statusFilter.value, searchInput.value);
  });

  // Haku
  searchInput.addEventListener("input", () => {
    renderOrders(statusFilter.value, searchInput.value);
  });

  // Scroll-nappi
  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  renderOrders();
});
   
    */

document.addEventListener("DOMContentLoaded", () => {
    const ordersList = document.getElementById("ordersList");
    const statusFilter = document.getElementById("statusFilter");
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    const searchInput = document.getElementById("searchInput");
  
    const password = prompt("Syötä salasana päästäksesi tilauksiin:");
    const correctPassword = "pannukakku123"; // Vaihda halutessasi
  
    if (password !== correctPassword) {
      document.body.innerHTML = "<h2>Pääsy evätty. Väärä salasana.</h2>";
      return;
    }
  
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
  
    const statusOrder = {
      "waiting": 1,
      "ready": 2,
      "delivered": 3
    };
  
    function renderOrders(filterStatus = "all", searchTerm = "") {
      ordersList.innerHTML = "";
  
      // Suodatus ja haku
      let filteredOrders = orders.filter(order => {
        const matchesStatus = filterStatus === "all" || order.status === filterStatus;
        const matchesSearch =
          order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.id.toString().includes(searchTerm);
        return matchesStatus && matchesSearch;
      });
  
      // Järjestys: ensin statusjärjestys, sitten uusin ensin
      filteredOrders.sort((a, b) => {
        const statusComparison = statusOrder[a.status] - statusOrder[b.status];
        if (statusComparison !== 0) return statusComparison;
        return b.id - a.id;
      });
  
      if (filteredOrders.length === 0) {
        ordersList.innerHTML = "<p>Ei tilauksia.</p>";
        return;
      }
  
      filteredOrders.forEach(order => {
        const orderDiv = document.createElement("div");
        orderDiv.className = `order ${order.status}`;
  
        orderDiv.innerHTML = `
          <h3>Tilaus #${order.id}</h3>
          <p><strong>Asiakas:</strong> ${order.customerName}</p>
          <p><strong>Tyyppi:</strong> ${order.selectedPancake}</p>
          <p><strong>Täytteet:</strong> ${order.toppings.join(", ") || "Ei"}</p>
          <p><strong>Lisukkeet:</strong> ${order.extras.join(", ") || "Ei"}</p>
          <p><strong>Toimitus:</strong> ${order.deliveryMethod}</p>
          <p><strong>Hinta:</strong> ${order.totalPrice}€</p>
          <label>Tila:
            <select data-id="${order.id}">
              <option value="waiting" ${order.status === "waiting" ? "selected" : ""}>🟡 waiting</option>
              <option value="ready" ${order.status === "ready" ? "selected" : ""}>🔵 ready</option>
              <option value="delivered" ${order.status === "delivered" ? "selected" : ""}>🟢 delivered</option>
            </select>
          </label>
          <button class="deleteBtn" data-id="${order.id}" ${order.status !== "delivered" ? "disabled" : ""}>🗑 Poista</button>
        `;
        ordersList.appendChild(orderDiv);
      });
    }
  
    // Tilan päivitys
    ordersList.addEventListener("change", (e) => {
      if (e.target.tagName === "SELECT") {
        const id = parseInt(e.target.dataset.id);
        const newStatus = e.target.value;
        const order = orders.find(o => o.id === id);
        if (order) {
          order.status = newStatus;
          localStorage.setItem("orders", JSON.stringify(orders));
          renderOrders(statusFilter.value, searchInput.value);
        }
      }
    });
  
    // Poisto (vain delivered)
    ordersList.addEventListener("click", (e) => {
      if (e.target.classList.contains("deleteBtn")) {
        const id = parseInt(e.target.dataset.id);
        const order = orders.find(o => o.id === id);
        if (order && order.status === "delivered") {
          orders = orders.filter(o => o.id !== id);
          localStorage.setItem("orders", JSON.stringify(orders));
          renderOrders(statusFilter.value, searchInput.value);
        }
      }
    });
  
    // Suodatus
    statusFilter.addEventListener("change", () => {
      renderOrders(statusFilter.value, searchInput.value);
    });
  
    // Haku
    searchInput.addEventListener("input", () => {
      renderOrders(statusFilter.value, searchInput.value);
    });
  
    // ScrollUp-nappi
    window.addEventListener("scroll", () => {
        scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
      });
  
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  
    renderOrders();
  });
  