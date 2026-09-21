document.addEventListener("DOMContentLoaded", function () {

    /* ================= MOBILE MENU ================= */

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", function () {
            navMenu.classList.toggle("show");

            menuBtn.textContent =
                navMenu.classList.contains("show") ? "✕" : "☰";
        });

        const navLinks = document.querySelectorAll("#navMenu a");

        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                navMenu.classList.remove("show");
                menuBtn.textContent = "☰";
            });
        });
    }


    /* ================= SCROLL ANIMATION ================= */

    const elements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.1
            }
        );

        elements.forEach(function (element) {
            observer.observe(element);
        });

    } else {

        /* Old browser হলে সবকিছু visible থাকবে */

        elements.forEach(function (element) {
            element.classList.add("active");
        });
    }


    /* ================= QUANTITY ================= */

    const minus = document.getElementById("minus");
    const plus = document.getElementById("plus");
    const quantity = document.getElementById("quantity");
    const total = document.getElementById("total");

    const price = 999;


    function updateTotal() {

        if (!quantity || !total) return;

        let qty = parseInt(quantity.value);

        if (isNaN(qty) || qty < 1) {
            qty = 1;
        }

        if (qty > 10) {
            qty = 10;
        }

        quantity.value = qty;

        total.textContent =
            (price * qty).toLocaleString("en-BD");
    }


    if (minus && quantity) {

        minus.addEventListener("click", function () {

            let qty = parseInt(quantity.value);

            if (qty > 1) {
                qty--;
            }

            quantity.value = qty;

            updateTotal();
        });
    }


    if (plus && quantity) {

        plus.addEventListener("click", function () {

            let qty = parseInt(quantity.value);

            if (qty < 10) {
                qty++;
            }

            quantity.value = qty;

            updateTotal();
        });
    }


    /* ================= ORDER FORM ================= */

    const orderForm = document.getElementById("orderForm");
    const successMessage =
        document.getElementById("successMessage");

    if (orderForm) {

        orderForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const name =
                document.getElementById("name").value.trim();

            const phone =
                document.getElementById("phone").value.trim();

            const address =
                document.getElementById("address").value.trim();

            const qty =
                parseInt(quantity.value);


            const phonePattern = /^01[3-9]\d{8}$/;

            if (!phonePattern.test(phone)) {

                alert(
                    "সঠিক বাংলাদেশি মোবাইল নম্বর দিন।\nউদাহরণ: 01712345678"
                );

                return;
            }


            const order = {

                id: Date.now(),

                name: name,

                phone: phone,

                quantity: qty,

                address: address,

                total: price * qty,

                date: new Date().toLocaleString("en-BD")
            };


            let orders = [];

            try {

                orders =
                    JSON.parse(
                        localStorage.getItem("dragonPowarOrders")
                    ) || [];

            } catch (error) {

                orders = [];
            }


            orders.push(order);


            try {

                localStorage.setItem(
                    "dragonPowarOrders",
                    JSON.stringify(orders)
                );

            } catch (error) {

                console.log("Storage error:", error);
            }


            orderForm.style.display = "none";

            if (successMessage) {
                successMessage.style.display = "block";
            }

        });
    }


    /* ================= NEW ORDER ================= */

    const newOrder =
        document.getElementById("newOrder");

    if (newOrder) {

        newOrder.addEventListener("click", function () {

            if (orderForm) {
                orderForm.reset();
                orderForm.style.display = "block";
            }

            if (quantity) {
                quantity.value = 1;
            }

            updateTotal();

            if (successMessage) {
                successMessage.style.display = "none";
            }

        });
    }


    /* ================= YEAR ================= */

    const year =
        document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* ================= TOTAL ================= */

    updateTotal();

});
