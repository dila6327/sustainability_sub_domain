// ===============================
// GLOBAL APP INITIALIZER
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    initNavbar();
    initDropdowns();
    initSDGGrid();
    initHeroSlider();
    initNewsSlider();
    initFAQ();
    initActivitiesNews();
 initAlumniPage(); 
  initSustainabilityNews();
  initAllNewsPage();
  initArticlePage();
});


// ===============================
// NAVBAR (Mobile Toggle)
// ===============================

function initNavbar() {
    const menuToggle = document.getElementById("menuToggle");
    const navbarRows = document.querySelector(".navbar-rows");

    if (!menuToggle || !navbarRows) return;

    menuToggle.addEventListener("click", () => {
        const isHidden = navbarRows.classList.contains("mobile-hidden");
        navbarRows.classList.toggle("mobile-hidden");

        const icon = menuToggle.querySelector("i");

        if (isHidden) {
            icon.className = "fas fa-times";
            navbarRows.style.display = "block";
        } else {
            icon.className = "fas fa-bars";
            navbarRows.style.display = "none";
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            navbarRows.classList.remove("mobile-hidden");
            navbarRows.style.display = "block";
            menuToggle.querySelector("i").className = "fas fa-bars";
        }
    });
}


// ===============================
// DROPDOWNS
// ===============================

function initDropdowns() {
    const dropdowns = document.querySelectorAll(".dropdown");
    if (!dropdowns.length) return;

    dropdowns.forEach(dropdown => {
        const btn = dropdown.querySelector(".dropdown-trigger");
        const menu = dropdown.querySelector(".dropdown-menu");

        if (!btn || !menu) return;

        btn.addEventListener("click", (e) => {
            e.stopPropagation();

            const isOpen = menu.classList.contains("show");

            // Close all other dropdowns
            document.querySelectorAll(".dropdown").forEach(d => {
                const m = d.querySelector(".dropdown-menu");
                const b = d.querySelector(".dropdown-trigger");
                if (m && b) {
                    m.classList.remove("show");
                    b.classList.remove("show");
                }
            });

            // Toggle current dropdown
            if (!isOpen) {
                menu.classList.add("show");
                btn.classList.add("show");
            } else {
                menu.classList.remove("show");
                btn.classList.remove("show");
            }
        });

        menu.addEventListener("click", e => e.stopPropagation());
    });

    document.addEventListener("click", () => {
        document.querySelectorAll(".dropdown").forEach(d => {
            const m = d.querySelector(".dropdown-menu");
            const b = d.querySelector(".dropdown-trigger");
            if (m && b) {
                m.classList.remove("show");
                b.classList.remove("show");
            }
        });
    });
}


// ===============================
// SDG GRID
// ===============================

function initSDGGrid() {
    const sdgGrid = document.getElementById("sdgGrid");
    if (!sdgGrid) return;

    const sdgColors = {
        1:'#E5243B',2:'#DDA63A',3:'#4C9F38',4:'#C5192D',5:'#FF3A21',
        6:'#26BDE2',7:'#FCC30B',8:'#A21942',9:'#FD6925',10:'#DD1367',
        11:'#FD9D24',12:'#BF8B2E',13:'#3F7E44',14:'#0A97D9',15:'#56C02B',
        16:'#00689D',17:'#19486A'
    };

    const sdgTitles = {
        1:'No Poverty',2:'Zero Hunger',3:'Good Health and Well-Being',
        4:'Quality Education',5:'Gender Equality',
        6:'Clean Water and Sanitation',
        7:'Affordable and Clean Energy',
        8:'Decent Work and Economic Growth',
        9:'Industry, Innovation and Infrastructure',
        10:'Reduced Inequalities',
        11:'Sustainable Cities and Communities',
        12:'Responsible Consumption and Production',
        13:'Climate Action',
        14:'Life Below Water',
        15:'Life on Land',
        16:'Peace, Justice and Strong Institutions',
        17:'Partnerships for the Goals'
    };

    for (let i = 1; i <= 17; i++) {
    const item = document.createElement("a");
    item.href = `/sdgs/sdg${i}.html`;   
    item.className = "sdg-item";
    item.innerHTML = `
        <div class="sdg-badge" style="background:${sdgColors[i]}">${i}</div>
        <div class="sdg-title">${sdgTitles[i]}</div>
    `;
    sdgGrid.appendChild(item);
}
  window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    navbarRows.classList.remove('mobile-hidden');
                    navbarRows.style.display = 'block';
                    menuToggle.querySelector('i').className = 'fas fa-bars';
                }
            });
}


// ===============================
// HERO SLIDER
// ===============================

function initHeroSlider() {
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");

    if (!slides.length) return;

    let current = 0;

    function update(n) {
        slides.forEach(s => s.classList.remove("active"));
        dots.forEach(d => d.classList.remove("active"));
        slides[n].classList.add("active");
        if (dots[n]) dots[n].classList.add("active");
    }

    function next() {
        current = (current + 1) % slides.length;
        update(current);
    }

    function prev() {
        current = (current - 1 + slides.length) % slides.length;
        update(current);
    }

    if (nextBtn) nextBtn.addEventListener("click", next);
    if (prevBtn) prevBtn.addEventListener("click", prev);

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            current = i;
            update(current);
        });
    });

    setInterval(next, 5000);
}


// ===============================
// HOMEPAGE NEWS CAROUSEL
// ===============================

function initNewsSlider() {
    const cards = document.querySelectorAll(".news-card");
    const carousel = document.getElementById("newsCarousel");
    const prevBtn = document.getElementById("newsNavPrev");
    const nextBtn = document.getElementById("newsNavNext");

    if (!cards.length || !carousel) return;

    let current = 0;
    const perView = 3;
    const max = Math.max(cards.length - perView, 0);

    function update() {
        const cardWidth = cards[0].offsetWidth + 24;
        carousel.style.transform = `translateX(${-current * cardWidth}px)`;

        if (prevBtn) prevBtn.disabled = current === 0;
        if (nextBtn) nextBtn.disabled = current === max;
    }

    if (prevBtn) prevBtn.addEventListener("click", () => {
        if (current > 0) current--;
        update();
    });

    if (nextBtn) nextBtn.addEventListener("click", () => {
        if (current < max) current++;
        update();
    });

    update();
}


// ===============================
// FAQ
// ===============================

function initFAQ() {
    const questions = document.querySelectorAll(".faq-question");
    if (!questions.length) return;

    questions.forEach(q => {
        q.addEventListener("click", () => {
            const answer = q.nextElementSibling;
            const icon = q.querySelector(".faq-icon");

            answer.classList.toggle("show");
            if (icon) icon.classList.toggle("active");
        });
    });
}


// ===============================
// ACTIVITIES PAGE NEWS + FILTER + MODAL
// ===============================

function initActivitiesNews() {

    const grid = document.getElementById("newsGrid");
    if (!grid) return;

    const API_URL = "https://jsonplaceholder.typicode.com/posts";

    // ===== YOUR CURRENT DATA (NOW USED AS FALLBACK) =====
    const fallbackData = [
        { id:1,title:'Seminar on "Healthy Foundation - Healthy Future"',link:'https://asoiu.edu.az/single_news/3470',img:"https://asoiu.edu.az/upload/news/4516e1d7f9e34250acf0ac7cd4fbb29d.JPG",content:`<p>Full real article text goes here...</p>`, sdgs:[3]},
        { id:2,title:'Information Session on Healthy Lifestyle Among Students',link:'https://asoiu.edu.az/single_news/3469',img:"https://asoiu.edu.az/upload/news/5af12918ac3d665f350eed1e0361641b.jpeg",content:`<p>Full real article text goes here...</p>`, sdgs:[3]},
        { id:3,title:'Volunteer Blood Donation Campaign Held',link:'https://asoiu.edu.az/single_news/3376',img:"https://asoiu.edu.az/upload/news/99570c4af33a4b964780cabebc76e3ea.jpeg",content:`<p>Full real article text goes here...</p>`, sdgs:[1]},
        { id:4,title:'Training on "First Aid" Conducted',link:'https://asoiu.edu.az/single_news/3372',img:"https://asoiu.edu.az/upload/news/0ed6d2de44a24259a45109806768e132.JPG",content:`<p>Full real article text goes here...</p>`, sdgs:[3]},
        { id:16,title:'Civil Protection Day Events Organized',link:'https://asoiu.edu.az/single_news/2490',img:"https://asoiu.edu.az/upload/news/5fd87c10c03de677252242b3219869da.JPG",content:`<p>Full real article text goes here...</p>`, sdgs:[16]}
    ];

    let newsData = [];
    let activeFilter = "all";

    // ===== FETCH WITH FALLBACK =====
    async function getData() {
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error("API failed");

            const data = await res.json();

            const mapped = data.slice(0, 12).map((item, index) => ({
                id: item.id,
                title: item.title,
                link: "#",
                img: "https://via.placeholder.com/400x250?text=ASOIU+Activity",
                content: `<p>${item.body}</p>`,
                sdgs: [(index % 16) + 1]
            }));

            localStorage.setItem("activitiesData", JSON.stringify(mapped));
            return mapped;

        } catch (err) {
            console.log("Using fallback activity data");
            localStorage.setItem("activitiesData", JSON.stringify(fallbackData));
            return fallbackData;
        }
    }

    // ===== RENDER =====
    function renderNews() {
        grid.innerHTML = "";

        newsData.forEach(item => {

            if (activeFilter !== "all" &&
                !item.sdgs.includes(parseInt(activeFilter))) return;

            const card = document.createElement("div");
            card.className = "news-card";

            card.innerHTML = `
                <div class="news-image">
                    <img src="${item.img}" alt="${item.title}">
                </div>
                <div class="news-content">
                    <h3 class="news-title">${item.title}</h3>
                    <a href="#" class="read-more">Read More →</a>
                </div>
            `;

            card.querySelector(".read-more").addEventListener("click", (e) => {
                e.preventDefault();
                openModal(item);
            });

            grid.appendChild(card);
        });
    }

    // ===== MODAL =====
    const modal = document.getElementById("activityModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalLink = document.getElementById("modalLink");

    function openModal(item) {
        if (!modal) return;

        modalTitle.textContent = item.title;
        modalDescription.innerHTML = item.content || "<p>No content available.</p>";
        modalLink.href = item.link;

        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
    }

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") closeModal();
        });
    }

    // ===== FILTER =====
    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            activeFilter = btn.getAttribute("data-filter");
            renderNews();
        });
    });

    // ===== INIT =====
    getData().then(data => {
        newsData = data;
        renderNews();
    });
}
// ===============================
// ALUMNI PAGE (FAKE API + FALLBACK)
// ===============================

function initAlumniPage() {

    const grid = document.getElementById("alumniGrid");
    if (!grid) return;

    const API_URL = "https://jsonplaceholder.typicode.com/users";

    const fallbackData = [
        { id: "ayaz-mutallibov", name: "Ayaz", surname: "Mutallibov", category: "domestic", position: "Former President of Azerbaijan", img: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Ayaz_Mutalibov_1992.jpg" },
        { id: "nariman-isayev", name: "Nariman", surname: "Isayev", category: "domestic", position: "Minister of Construction Materials Industry", img: "https://upload.wikimedia.org/wikipedia/az/b/b9/N%C9%99riman_%C4%B0sayev.jpg" },
        { id: "nasrulla-nasrullayev", name: "Nasrulla", surname: "Nasrullayev", category: "domestic", position: "Minister of Light Industry", img: "https://upload.wikimedia.org/wikipedia/az/thumb/d/d1/N%C9%99srulla_N%C9%99srullayev.jpg/250px-N%C9%99srulla_N%C9%99srullayev.jpg" },
        { id: "farid-musabayev", name: "Farid", surname: "Musabayev", category: "domestic", position: "Minister of Construction Materials Industry", img: "https://upload.wikimedia.org/wikipedia/az/thumb/8/8f/Farid_Musabayev.jpg/250px-Farid_Musabayev.jpg" }
    ];

    let alumniData = [];
    let activeFilter = "domestic";

    // =========================
    // FETCH WITH CACHE + FALLBACK
    // =========================
    async function getData() {

        const stored = localStorage.getItem("alumniData");
        if (stored) return JSON.parse(stored);

        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error("API failed");

            const data = await res.json();

            const mapped = data.slice(0, 8).map((user, index) => ({
                id: user.username.toLowerCase(),
                name: user.name.split(" ")[0],
                surname: user.name.split(" ")[1] || "",
                category: index % 2 === 0 ? "domestic" : "international",
                position: user.company.name,
                img: "https://via.placeholder.com/400x300?text=ASOIU+Alumni"
            }));

            localStorage.setItem("alumniData", JSON.stringify(mapped));
            return mapped;

        } catch (err) {
            console.warn("Using fallback alumni data");
            localStorage.setItem("alumniData", JSON.stringify(fallbackData));
            return fallbackData;
        }
    }

    // =========================
    // RENDER
    // =========================
    function render() {

        grid.innerHTML = "";

        const filtered = alumniData.filter(a => a.category === activeFilter);

        if (!filtered.length) {
            grid.innerHTML = "<p>No alumni found.</p>";
            return;
        }

        filtered.forEach(a => {

            const card = document.createElement("a");
            card.href = `biography.html?id=${a.id}`;
            card.className = "news-card";

            card.innerHTML = `
                <img src="${a.img}" class="news-image">
                <div class="news-content">
                    <div class="news-title">${a.name} ${a.surname}</div>
                    <p class="news-pos">${a.position}</p>
                </div>
            `;

            grid.appendChild(card);
        });
    }

    // =========================
    // FILTER
    // =========================
    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {

            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            activeFilter = btn.id.includes("international")
                ? "international"
                : "domestic";

            render();
        });
    });

    // =========================
    // INIT
    // =========================
    getData().then(data => {
        alumniData = data;
        render();
    });
}
function initSustainabilityNews() {
    const container = document.getElementById("newsCardsContainer");
    const prevBtn = document.getElementById("newsNavPrev");
    const nextBtn = document.getElementById("newsNavNext");

    if (!container) return;

    const API_URL = "https://jsonplaceholder.typicode.com/posts"; // Local JSON file with fallback data

    const fallbackData = [
        { id:1, title:"ASOIU Launches New Renewable Energy Lab", link:`article.html?id=1`, img:"https://asoiu.edu.az/upload/news/2791.jpg", content:"Cutting-edge facility dedicated to solar and wind energy research opens its...", category:"RESEARCH", date:"12-15-2025" },
        { id:2, title:"Sustainability Summit 2025", link:`article.html?id=2`, img:"https://asoiu.edu.az/upload/news/2791.jpg", content:"Global leaders gather to discuss climate action and sustainable development...", category:"EVENTS", date:"12-10-2025" },
        { id:3, title:"Student Green Initiative Winner", link:`article.html?id=3`, img:"https://asoiu.edu.az/upload/news/2639.jpg", content:"ASOIU students win international award for innovative campus sustainability...", category:"ACHIEVEMENT", date:"12-05-2025" },
        { id:4, title:"Partnership with Leading Energy Companies", link:`article.html?id=4`, img:"https://asoiu.edu.az/upload/news/2638.jpg", content:"ASOIU partners with global leaders to advance sustainable energy solutions", category:"PARTNERSHIP", date:"11-28-2025" }
    ];

    let newsData = [];

    async function getData() {
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error("API failed");
            const data = await res.json();
            return data.slice(0,4).map((item,index)=>({
                id:item.id,
                title:item.title,
                link:item.id ? `article.html?id=${item.id}` : "#",
                img:item.image,
                content:item.body.length > 60 
    ? item.body.substring(0, 60) + "..." 
    : item.body,
                category:["RESEARCH","EVENTS","ACHIEVEMENT","PARTNERSHIP"][index],
                date: "2025-12-"+(15-index)
            }));
        } catch(err) {
            console.warn("Using fallback data");
            return fallbackData;
        }
    }

    function renderNews(news) {
        container.innerHTML = "";
        news.forEach(item=>{
            const card = document.createElement("div");
            card.className = "news-card";
            card.innerHTML = `
                <div class="news-image">
                    <img src="${item.img}" alt="${item.title}">
                </div>
                <div class="news-header">
                    <span class="news-category">${item.category}</span>
                    <span class="news-date">${item.date}</span>
                </div>
                <div class="news-content">
                    <h3 class="news-title">${item.title}</h3>
                    <p class="news-description">${item.content}</p>
                    <a href="${item.link}" class="news-read-more">Read More <i class="fas fa-arrow-right"></i></a>
                </div>
            `;
            container.appendChild(card);
        });

        initCarousel();
    }

    function initCarousel() {
        if (!container) return;

        const cards = container.querySelectorAll(".news-card");
        let current = 0;
        const perView = 3; // number of cards visible
        const gap = 24; // space between cards
        let autoSlideInterval;

        function update() {
    const cardWidth = cards[0].offsetWidth + gap;
    container.style.transition = "transform 0.5s ease"; // ✨ smooth animation
    container.style.transform = `translateX(${-current * cardWidth}px)`;
}

        function next() {
            current++;
            if(current > cards.length - perView) current = 0; // cycle back
            update();
        }

        function prev() {
            current--;
            if(current < 0) current = cards.length - perView; // cycle backward
            update();
        }

        if(nextBtn) nextBtn.addEventListener("click", () => { next(); resetAutoSlide(); });
        if(prevBtn) prevBtn.addEventListener("click", () => { prev(); resetAutoSlide(); });

        // Auto-slide every 4s
        function startAutoSlide() {
            autoSlideInterval = setInterval(next, 4000);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        startAutoSlide();
        window.addEventListener("resize", update); // recalc widths on resize
        update();
    }

    getData().then(data=>{
        newsData = data;
        renderNews(newsData);
    });
}
async function initAllNewsPage() {
    const gridContainer = document.getElementById("newsArchiveGrid");
    if (!gridContainer) return;

    const API_URL = "https://jsonplaceholder.typicode.com/posts"; // Local JSON file with fallback data

    // Manual fallback data
    const manualData = [
        { 
            id: 1, 
            title: "ASOIU student successfully represented our ...", 
            date: "17.01.2026", 
            img: "https://asoiu.edu.az/upload/news/2791.jpg", 
            excerpt: "A third-year Mechatronics and Robotics Engineering student of the SABAH groups at ASOIU..." 
        },
        { 
            id: 2, 
            title: "ADNSU tələbələri “WaterTech Bootcamp 2025”də iştirak etdi", 
            date: "17.01.2026", 
            img: "https://asoiu.edu.az/upload/news/2639.jpg", 
            excerpt: "Students of the Petroleum, Oil and Mining Faculty of the SABAH groups at ASOIU..." 
        },
        { 
            id: 3, 
            title: "ASOIU's \"HealWith\" startup presented at Innovation Expo", 
            date: "17.01.2026", 
            img: "https://asoiu.edu.az/upload/news/2638.jpg", 
            excerpt: "ASOIU's innovative startup 'HealWith' was presented at the Innovation Expo..." 
        }
    ];

    let newsData = [];
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();

        // Map API data to your UI structure
        newsData = data.slice(0, 9).map(post => ({
            id: post.id,
            title: post.title.length > 50 ? post.title.substring(0, 50) + "..." : post.title,
            date: "17.01.2026",
            img: "https://via.placeholder.com/400x250?text=ASOIU+News",
            excerpt: post.body.length > 100 ? post.body.substring(0, 100) + "..." : post.body
        }));
    } catch (err) {
        console.warn("Fetch failed, using manual fallback data:", err);
        newsData = manualData;
    }

    // Render grid
    gridContainer.innerHTML = "";
    newsData.forEach(item => {
        const card = document.createElement("div");
        card.className = "archive-card";
        card.innerHTML = `
            <a href="article.html?id=${item.id}" style="text-decoration: none; color: inherit;">
                <div class="archive-card-image">
                    <img src="${item.img}" alt="${item.title}">
                </div>
                <div class="archive-card-content">
                    <span class="archive-date">${item.date}</span>
                    <h3 class="archive-title">${item.title}</h3>
                    <p class="archive-text">${item.excerpt}</p>
                    <span class="read-more-link" style="color: #ffc107; font-weight: bold;">Read More →</span>
                </div>
            </a>
        `;
        gridContainer.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", initAllNewsPage);
async function initArticlePage() {
    const titleEl = document.getElementById('art-title');
    if (!titleEl) return; 

    // Get ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (!id) return;

    const API_URL = "https://jsonplaceholder.typicode.com/posts";

    // Fallback data
    const fallbackNews = [
        { id: 1, title: "ASOIU Launches New Renewable Energy Lab", date: "17.01.2026", img: "https://via.placeholder.com/800x400?text=News", body: "Details about the renewable energy lab project at ASOIU..." },
        { id: 2, title: "ADNSU tələbələri “WaterTech Bootcamp 2025”də iştirak etdi", date: "16.01.2026", img: "https://via.placeholder.com/800x400?text=News", body: "Students participated in WaterTech Bootcamp 2025, learning innovative solutions..." },
        { id: 3, title: "ASOIU's \"HealWith\" startup presented at Innovation Expo", date: "15.01.2026", img: "https://via.placeholder.com/800x400?text=News", body: "ASOIU students showcased their startup 'HealWith' at the Innovation Expo..." }
    ];

    let apiData = [];
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Network error");
        apiData = await response.json();
    } catch (err) {
        console.warn("API failed, using fallback data:", err);
        // apiData = fallbackNews;
    }

    // Find the article by ID
    const post = apiData.find(item => item.id == id) || fallbackNews[0];

    // Update UI
    document.getElementById('art-title').innerText = post.title;
    document.getElementById('art-date').innerText = post.date || "17.01.2026";
    document.getElementById('art-image').src = post.img || "https://via.placeholder.com/800x400?text=ASOIU+News";
    document.getElementById('art-content').innerHTML = `<p>${post.body}</p>`;
    document.title = `${post.title} - ASOIU`;

    // Populate Latest News Sidebar
    const sidebarList = document.getElementById("sidebar-list");
    if (sidebarList) {
        sidebarList.innerHTML = "";
        const latestNews = apiData.slice(0, 5); // first 5 items
        latestNews.forEach(item => {
            const link = document.createElement("a");
            link.href = `article.html?id=${item.id}`;
            link.className = "sidebar-item";
            link.innerHTML = `
                <img src="${item.img || 'https://via.placeholder.com/100x70'}" alt="${item.title}">
                <div class="sidebar-item-info">
                    <h4>${item.title}</h4>
                    <span>${item.date || "17.01.2026"}</span>
                </div>
            `;
            sidebarList.appendChild(link);
        });
    }
}
  function setupDropdowns() {
            const dropdowns = document.querySelectorAll('.dropdown');

            dropdowns.forEach(dropdown => {
                const btn = dropdown.querySelector('.dropdown-trigger');
                const menu = dropdown.querySelector('.dropdown-menu');

                if (btn && menu) {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const isShow = menu.classList.contains('show');
                        document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));
                        if (!isShow) {
                            menu.classList.add('show');
                        }
                    });

                    // Prevent dropdown menu from closing when clicking inside it
                    menu.addEventListener('click', (e) => {
                        e.stopPropagation();
                    });
                }
            });

            document.addEventListener('click', (e) => {
                if (!e.target.closest('.dropdown')) {
                    document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));
                }
            });
        }

        
