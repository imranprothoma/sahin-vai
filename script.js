document.addEventListener("DOMContentLoaded", function () {

    /* ================= JS READY ================= */

    document.body.classList.add("js-ready");


    /* ================= MOBILE MENU ================= */

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", function () {
            navMenu.classList.toggle("show");

            if (navMenu.classList.contains("show")) {
                menuBtn.textContent = "✕";
            } else {
                menuBtn.textContent = "☰";
            }
        });


        document.querySelectorAll("#navMenu a").forEach(function (link) {

            link.addEventListener("click", function () {
                navMenu.classList.remove("show");
                menuBtn.textContent = "☰";
            });

        });

    }


    /* ================= SCROLL ANIMATION ================= */

    const animatedElements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
    );

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
            threshold: 0.12
        }
    );


    animatedElements.forEach(function (element) {
        observer.observe(element);
    });


    /* ================= QUANTITY ================= */

    const minusBtn = document.getElementById("minus");
    const plusBtn = document.getElementById("plus");
    const quantityInput = document.getElementById("quantity");
    const total = document.getElementById("total");

    const productPrice = 999;


    function updateTotal() {

        let quantity = parseInt(quantityInput.value);

        if (isNaN(quantity) || quantity < 1) {
            quantity = 1;
        }

        if (quantity > 10) {
            quantity = 10;
        }

        quantityInput.value = quantity;

        total.textContent = (
            productPrice * quantity
        ).toLocaleString("en-BD");

    }


    if (minusBtn) {

        minusBtn.addEventListener("click", function () {

            let quantity = parseInt(quantityInput.value);

            if (quantity > 1) {
                quantity--;
            }

            quantityInput.value = quantity;

            updateTotal();

        });

    }


    if (plusBtn) {

        plusBtn.addEventListener("click", function () {

            let quantity = parseInt(quantityInput.value);

            if (quantity < 10) {
                quantity++;
            }

            quantityInput.value = quantity;

            updateTotal();

        });

    }


    /* ================= ORDER FORM ================= */

    const orderForm = document.getElementById("orderForm");
    const successMessage = document.getElementById("successMessage");
    const newOrderBtn = document.getElementById("newOrder");


    if (orderForm) {

        orderForm.addEventListener("submit", function (event) {

            event.preventDefault();


            const name =
                document.getElementById("name").value.trim();

            const phone =
                document.getElementById("phone").value.trim();

            const address =
                document.getElementById("address").value.trim();

            const quantity =
                parseInt(document.getElementById("quantity").value);


            /* Bangladesh phone validation */

            const phonePattern = /^01[3-9]\d{8}$/;


            if (!phonePattern.test(phone)) {

                alert(
                    "Please enter a valid Bangladesh phone number.\nExample: 01712345678"
                );

                return;
            }


            const order = {

                id: Date.now(),

                name: name,

                phone: phone,

                quantity: quantity,

                address: address,

                total: productPrice * quantity,

                date: new Date().toLocaleString("en-BD")

            };


            /* Save order in browser */

            let orders =
                JSON.parse(
                    localStorage.getItem("dragonPowarOrders")
                ) || [];


            orders.push(order);


            localStorage.setItem(
                "dragonPowarOrders",
                JSON.stringify(orders)
            );


            /* Show success */

            orderForm.style.display = "none";

            successMessage.style.display = "block";

            successMessage.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        });

    }


    /* ================= NEW ORDER ================= */

    if (newOrderBtn) {

        newOrderBtn.addEventListener("click", function () {

            orderForm.reset();

            quantityInput.value = 1;

            updateTotal();

            successMessage.style.display = "none";

            orderForm.style.display = "block";

        });

    }


    /* ================= CURRENT YEAR ================= */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* ================= INITIAL TOTAL ================= */

    updateTotal();

});
