/************************************************
 * SWIPER CONFIGURATION — Awards Page (robust)
 ************************************************/

/* Helper to safely call start/stop only if autoplay exists */
function safeStopAutoplay(swiper) {
  if (swiper && swiper.autoplay && typeof swiper.autoplay.stop === 'function') {
    swiper.autoplay.stop();
  }
}
function safeStartAutoplay(swiper) {
  if (swiper && swiper.autoplay && typeof swiper.autoplay.start === 'function') {
    swiper.autoplay.start();
  }
}

/* Create one inner-swiper instance per .innerSwiper element
   This ensures we control exactly the swiper that contains a playing video. */
const innerSwipers = []; // store instances if you need them later
document.querySelectorAll('.innerSwiper').forEach((container, idx) => {
  // Initialize Swiper for this container element (instance-scoped)
  const swiper = new Swiper(container, {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    pagination: {
      el: container.querySelector('.inner-pagination'), // scope pagination if present
      clickable: true,
    },
  });

  innerSwipers.push(swiper);

  // For all videos inside this specific inner-swiper, pause the swiper while video plays
  container.querySelectorAll('video').forEach(video => {
    // When video starts playing -> stop autoplay and lock sliding
    video.addEventListener('play', () => {
      safeStopAutoplay(swiper);

      // Prevent any sliding while video plays
      swiper.allowTouchMove = false;
      swiper.allowSlideNext = false;
      swiper.allowSlidePrev = false;

      // Also make sure Swiper won't advance via looped timers (extra safety)
      if (swiper.autoplay) swiper.autoplay.running = false;
    });

    // When paused or ended -> resume autoplay and unlock sliding
    const resumeHandler = () => {
      safeStartAutoplay(swiper);

      swiper.allowTouchMove = true;
      swiper.allowSlideNext = true;
      swiper.allowSlidePrev = true;

      if (swiper.autoplay) swiper.autoplay.running = true;
    };

    video.addEventListener('pause', resumeHandler);
    video.addEventListener('ended', resumeHandler);

    // Optional: if user seeks or timeupdate and video is not paused, ensure lock holds
    video.addEventListener('seeking', () => {
      if (!video.paused) {
        safeStopAutoplay(swiper);
        swiper.allowTouchMove = false;
      }
    });
  });
});

/* Outer Swiper */
const outerSwiper = new Swiper('.outerSwiper', {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: false,
  navigation: {
    nextEl: '.outer-next',
    prevEl: '.outer-prev',
  },
  pagination: {
    el: '.outer-pagination',
    clickable: true,
  },
});

/* BTP swiper */
const btpSwiper = new Swiper('.btpSwiper', {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  autoplay: false,
  pagination: {
    el: '.btp-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.btp-next',
    prevEl: '.btp-prev',
  },
});

/************************
   Testimonials Floating & Expand
*************************/

const boxes = document.querySelectorAll('.testimonial-box');
const container = document.querySelector('.testimonial-container');
const containerWidth = container.offsetWidth;
const containerHeight = container.offsetHeight;

const placedPositions = [];

// Initialize random positions avoiding overlap
boxes.forEach(box => {
  let x, y, safe;
  do {
    x = Math.random() * (containerWidth - box.offsetWidth);
    y = Math.random() * (containerHeight - box.offsetHeight);
    safe = true;

    for (let pos of placedPositions) {
      const dx = x - pos.x;
      const dy = y - pos.y;
      if (Math.sqrt(dx*dx + dy*dy) < 150) safe = false;
    }
  } while (!safe);

  placedPositions.push({ x, y });

  box.dataset.baseX = x;
  box.dataset.baseY = y;
  box.dataset.offsetX = Math.random() * 20 + 10;
  box.dataset.offsetY = Math.random() * 20 + 10;
  box.dataset.angleX = Math.random() * Math.PI * 2;
  box.dataset.angleY = Math.random() * Math.PI * 2;
  box.style.left = x + 'px';
  box.style.top = y + 'px';
});

// Floating animation
function animate() {
  boxes.forEach(box => {
    if (!box.classList.contains('expanded')) {
      const baseX = parseFloat(box.dataset.baseX);
      const baseY = parseFloat(box.dataset.baseY);
      const offsetX = parseFloat(box.dataset.offsetX);
      const offsetY = parseFloat(box.dataset.offsetY);
      let angleX = parseFloat(box.dataset.angleX);
      let angleY = parseFloat(box.dataset.angleY);

      angleX += 0.002;
      angleY += 0.0015;

      box.style.left = baseX + Math.sin(angleX)*offsetX + 'px';
      box.style.top  = baseY + Math.sin(angleY)*offsetY + 'px';

      box.dataset.angleX = angleX;
      box.dataset.angleY = angleY;
    }
  });
  requestAnimationFrame(animate);
}
animate();

// Expand on click
boxes.forEach(box => {
  box.addEventListener('click', e => {
    e.stopPropagation();
    boxes.forEach(b => b.classList.remove('expanded'));
    box.classList.add('expanded');
  });
});

// Collapse when clicking outside
document.addEventListener('click', () => {
  boxes.forEach(b => b.classList.remove('expanded'));
});

/************************     Projects Section     *************************/

document.addEventListener("DOMContentLoaded", () => {
// ✅ 1. Define Projects
  const projects = [
    {
      id: 1,
      title: "Employee Self-Service and Management Application",
      shortSkills: "SAP ABAP",
      fullSkills: "SAP ABAP, SQL, Smart Forms, Reports, Module Pool Programming, Background Jobs, Image Upload Functionality",
      tools: "SAP GUI, ABAP Workbench (SE80), Data Dictionary, Job Scheduler (SM36/SM37), Debugger",
      previewImage: "Images/Ess1.png",
      description: "Developed centralized system for employees and managers to manage leaves, attendance, payroll, and approvals efficiently.",
      summary: "Many organizations, especially in the IT sector, struggle with inefficient systems for handling essential employee needs such as leave requests, attendance, payroll, and personal information management. These fragmented processes often cause delays, confusion, and lack of transparency, negatively impacting employee satisfaction and productivity. Managers also face challenges in tracking team attendance and managing approvals effectively. To address these issues, I developed an Employee Self-Service and Management Application aimed at streamlining operations for both employees and managers, improving efficiency, accuracy, and overall user experience.",
      functionalities: `The application is a centralized Employee Self-Service and Management System
  with two user roles — Employee and Manager, enabling secure and efficient task management.<br><br>
  Employee Features:<br>
  • Update personal, official, and address details<br>
  • Apply for leave and view balances<br>
  • Track attendance records<br>
  • View and download pay slips<br><br>
  Manager Features:<br>
  • Review and approve/reject employee leave requests<br>
  • Access leave and attendance records for the team<br>
  • Filter and monitor employee performance data`,
      demoVideos: [
        "Videos/ABAP1.mp4",
        "Videos/ABAP2.mp4",
        "Videos/ABAP3.mp4",
        "Videos/ABAP4.mp4"
      ],
      flowchart: "Images/ABAP Flowchart.png",
      screenshots: [
        "Images/Dow1.JPG",
        "Images/Dow2.JPG",
        "Images/dow3.jpg"
      ]
    },
    {
      id: 2,
      title: "Library Management System",
      shortSkills: "Python",
      fullSkills: "Python, SQL",
      tools: "VS Code, Git, GitHub, MySQL, Figma",
      concepts: "OOP, Data Visualization",
      libraries: "customtkinter, Tkinter, Pillow, pandas, numpy, matplotlib, reportlab, hashlib",
      previewImage: "Images/library.png",
      description: "Developed a full-featured Library Management System with distinct interfaces and functionality for Users, Librarians, and Admins.",
      summary: "The Library Management System allows Users, Librarians, and Admins to manage books, borrowings, and user accounts efficiently. It ensures secure login, smooth book searches and reservations, and powerful reporting for admins.",
      functionalities: `User Features:<br>
  • Create an account and log in securely (passwords hashed using hashlib)<br>
  • Search for books and place reservations<br>
  • Pay fines, view borrowing history, and update personal information<br><br>
  Librarian Features:<br>
  • Manage book inventory (add, update, delete books)<br>
  • View statistics on books, users, and fines<br>
  • Process book borrowings and returns<br><br>
  Admin Features:<br>
  • Manage system users, including patrons and librarians<br>
  • Access and monitor complete inventory data<br>
  • Generate detailed reports for analysis and recordkeeping`,
      demoVideos: [
        "Videos/Library.mp4"
      ],
      screenshots: [
        "Images/Lib1.JPG",
        "Images/Lib2.JPG"
      ]
    },
    {
      id: 3,
      title: "Portfolio Website",
      shortSkills: "HTML, CSS, JS",
      fullSkills: "HTML, CSS, JavaScript",
      tools: "VS Code, GitHub",
      concepts: "Responsive Design, Personal Branding, UI/UX Principles",
      previewImage: "Images/Website.jpg",
      description: "A responsive portfolio website to showcase my academic and professional projects, skills, certifications, and contact information. Designed with focus on clean UI, easy navigation, and professional presentation.",
      summary: "This website demonstrates my personal branding and technical skills. It includes sections like Home, About, Projects, Skills, Certifications, and Contact. Each section is designed to highlight my achievements, competencies, and personality.",
      functionalities: `<ul>
        <li>Responsive multi-section layout (Home, About, Projects, Skills, Contact)</li>
        <li>Smooth scrolling navigation</li>
        <li>Project showcase with modal details for each project</li>
        <li>Contact form with email integration</li>
        <li>Integration of LinkedIn</li>
        <li>Footer with copyright and custom branding</li>
      </ul>`
    },
    {
      id: 4, // new ID
      title: "Banking Application",
      shortSkills: "Python",
      fullSkills: "Python",
      tools: "VS Code, SQLite Studio",
      concepts: "GUI Development, Database Management, Object-Oriented Programming (OOP)",
      libraries: "Tkinter, Ttkbootstrap, Datetime, Pillow, Pandas",
      previewImage: "Images/bank1.png", // replace with actual image path
      description: "A secure and user-friendly banking application developed in Python. The application provides functionalities like secure login, fund transfers, transaction history viewing, and user account management. Built with a focus on reliability, ease of use, and data integrity.",
      summary: "This project demonstrates my ability to design and implement a functional banking system. It integrates GUI, database management, and Python libraries to deliver a seamless experience. The project highlights core skills in Python programming, database handling, and application development.",
      functionalities: `
        • Secure login for multiple users<br>
        • Account creation and management<br>
        • Fund transfer between accounts<br>
        • Transaction history display and tracking<br>
        • Data storage and retrieval using SQLite database<br>
        • Interactive GUI with Tkinter and Ttkbootstrap<br>
        • Data handling with Pandas<br>
        • Image handling with Pillow
      `,
      demoPPT: "https://docs.google.com/presentation/d/e/2PACX-1vQLNtpgOHP7nzPkZ1Zqr6SPjn5XESTTf10WxkOMRDN1QiRILIel3av1z_5CNu5n5w/embed?start=false&loop=false",
    },
    {
   id: 5,
  title: "Configuration of Vendor Evaluation System in SAP",
  previewImage: "Images/vendoreval.png",
  shortSkills: "SAP Configuration",
  fullSkills: "SAP MM, SAP SPRO, SAP Functional Proficiency",
  tools: "SAP GUI, SPRO",
  transactionCodes: "ME6H, ME6F, ME65, ME6B, ME6G, QA11, MM01, MIGO, ME21N",
  concepts: "Vendor Evaluation, Functional Design, Automation of Evaluation Process, Data Capture & Analysis",
  description: "This project involves developing and configuring a Vendor Evaluation Plan in SAP to streamline the assessment process for vendor performance. The system is designed to evaluate vendors on three criteria: Quality, Delivery, and Price. Scores are automatically calculated based on equal weighting, and vendor evaluations can be performed individually or comparatively using SAP transactions. Background execution of evaluations allows continuous monitoring and analysis to improve procurement decisions.",
  summary: "This project demonstrates my SAP functional skills, especially in SAP MM and SPRO. It highlights my ability to configure business processes, automate vendor evaluations, and analyze results to enhance decision-making. The project emphasizes functional design, practical SAP configuration, and process optimization.",
  key: [
    "Configure Vendor Evaluation Plans in SAP",
    "Define and capture evaluation criteria for vendors",
    "Conduct evaluations automatically using SAP transactions",
    "Analyze vendor performance reports for informed procurement decisions",
    "Background evaluation scheduling for continuous monitoring",
    "Equal weighting for all criteria with auto-calculation of overall vendor score"
  ],
  functionalFlow: [
  "Images/FunctionalFlow.png"
],
  snapshots: [
    "Images/config1.png",
    "Images/config2.png",
    "Images/config3.png",
    "Images/config4.png"
  ]
}
  ];

// ✅ 2. Render Cards
  const container1 = document.getElementById("projectsContainer");

  projects.forEach(project => {
    const card = document.createElement("div");
    card.classList.add("project-card");

    card.innerHTML = `
      <div class="card-content">
      <img src="${project.previewImage}" alt="${project.title}">
      <h3>${project.title}</h3>
      <p class="skills"><strong>Skills:</strong> ${project.shortSkills}</p>
      <button class="btn details-btn" data-id="${project.id}">Details</button>
     </div>
  `;
    container1.appendChild(card);
  });

// ✅ 3. Modal Logic (optimized & structured)
const modal = document.getElementById("projectModal");
const closeModal = modal.querySelector(".close");

// 🔹 Helper function to toggle any section dynamically
function toggleSection(headerId, contentId, value) {
  const header = document.getElementById(headerId);
  const content = document.getElementById(contentId);

  if (value && value.trim() !== "") {
    header.style.display = "block";
    content.style.display = "block";
    content.innerHTML = `<li>${value}</li>`; // single list item, comma-separated text
  } else {
    header.style.display = "none";
    content.style.display = "none";
    content.innerHTML = "";
  }
}

// 🔹 Function to open modal with project data
function openModal(project) {
  const modalContent = modal.querySelector(".modal-content");
  modalContent.scrollTop = 0;

  // Clear everything initially
  [
    "modalsummary", "modalSkills", "modalTools",
    "modallanguage", "modallibrary", "modalconcepts",
    "modalfunctionalities", "modalDemoVideos", "modalflowImage"
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = "";
  });

  document.getElementById("modalTitle").textContent = project.title || "";
  document.getElementById("modalDescription").textContent = project.description || "";

  // 🔹 Summary section
  toggleSection("modalSummaryHeader", "modalsummary", project.summary);

  // 🔹 Skills sections
  toggleSection("modalSkillsHeader", "modalSkills", project.fullSkills || project.shortSkills);
  toggleSection("modalToolsHeader", "modalTools", project.tools);
  toggleSection("modallangageHeader", "modallanguage", project.languages);
  toggleSection("modallibraryHeader", "modallibrary", project.libraries);
  toggleSection("modalconceptsHeader", "modalconcepts", project.concepts);

  // 🔹 Functionalities
  const func = document.getElementById("modalfunctionalities");
  if (project.functionalities) {
    document.getElementById("modalFunctionalitiesHeader").style.display = "block";
    func.style.display = "block";
    func.innerHTML = project.functionalities;
  } else {
    document.getElementById("modalFunctionalitiesHeader").style.display = "none";
    func.style.display = "none";
  }

  // 🔹 Key Functionalities (vertical bullets)
  const funcContainer = document.getElementById("modalkey");
  funcContainer.innerHTML = ""; // clear previous

  if (project.key && project.key.length > 0) {
      project.key.forEach(item => {
          const li = document.createElement("li");
          li.textContent = item;
          li.style.marginBottom = "6px"; // spacing
          funcContainer.appendChild(li);
      });
      document.getElementById("modalkey").style.display = "block";
  } else {
      document.getElementById("modalkey").style.display = "none";
  }
  
  // 🔹 Flowchart
  const flowImg = document.getElementById("modalflowImage");
  const flowHeader = document.getElementById("modalFlowchart");

  if (project.flowchart) {
    flowHeader.style.display = "block";
    flowImg.style.display = "block";
    flowImg.src = project.flowchart;

    // Click-to-zoom functionality
    flowImg.onclick = () => {
      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.top = 0;
      overlay.style.left = 0;
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.background = "rgba(0,0,0,0.8)";
      overlay.style.display = "flex";
      overlay.style.alignItems = "center";
      overlay.style.justifyContent = "center";
      overlay.style.cursor = "zoom-out";
      overlay.style.zIndex = 2000;
      const zoomImg = document.createElement("img");
      zoomImg.src = flowImg.src;
      zoomImg.style.maxWidth = "90%";
      zoomImg.style.maxHeight = "90%";
      zoomImg.style.borderRadius = "10px";
      overlay.appendChild(zoomImg);
      overlay.onclick = () => overlay.remove();
      document.body.appendChild(overlay);
    };
  } else {
    flowHeader.style.display = "none";
    flowImg.style.display = "none";
  }

  // Functional Flow (image)
  const flowContainer = document.getElementById("modalfunctionalflow");
  flowContainer.innerHTML = ""; // clear previous

  if (project.functionalFlow && project.functionalFlow.length > 0) {
      document.getElementById("modalFunctionalFlowHeader").style.display = "block";

      project.functionalFlow.forEach(flowImgSrc => {
          const img = document.createElement("img");
          img.src = flowImgSrc;
          img.style.width = "100%"; // responsive
          img.style.maxWidth = "600px"; 
          img.style.borderRadius = "8px";
          img.style.marginTop = "10px";

          // optional: click to zoom
          img.onclick = () => {
              const overlay = document.createElement("div");
              overlay.style.position = "fixed";
              overlay.style.top = 0;
              overlay.style.left = 0;
              overlay.style.width = "100%";
              overlay.style.height = "100%";
              overlay.style.background = "rgba(0,0,0,0.8)";
              overlay.style.display = "flex";
              overlay.style.alignItems = "center";
              overlay.style.justifyContent = "center";
              overlay.style.cursor = "zoom-out";
              overlay.style.zIndex = 2000;

              const zoomImg = document.createElement("img");
              zoomImg.src = flowImgSrc;
              zoomImg.style.maxWidth = "90%";
              zoomImg.style.maxHeight = "90%";
              zoomImg.style.borderRadius = "10px";

              overlay.appendChild(zoomImg);
              overlay.onclick = () => overlay.remove();
              document.body.appendChild(overlay);
          };

          flowContainer.appendChild(img);
      });
  } else {
      document.getElementById("modalFunctionalFlowHeader").style.display = "none";
  }

  // 🔹 Transaction codes
  const transactionHeader = document.getElementById("modalTransactionHeader");
  const transactionContainer = document.getElementById("modalTransaction");
  transactionContainer.innerHTML = "";
  if (project.transactionCodes && project.transactionCodes.length > 0) {
    transactionHeader.style.display = "block";
    transactionContainer.innerHTML = `<li>${project.transactionCodes}</li>`;
  } else {
    transactionHeader.style.display = "none";
    transactionContainer.innerHTML = "";
  }

    // 🔹 Sample SAP Snapshots (vertical)
  const snapshotsContainer = document.getElementById("modalSnapshots");
  snapshotsContainer.innerHTML = ""; // clear previous

  if (project.snapshots && project.snapshots.length > 0) {
      project.snapshots.forEach(imgSrc => {
          const img = document.createElement("img");
          img.src = imgSrc;
          img.style.width = "100%";   // full container width
          img.style.maxWidth = "600px"; 
          img.style.borderRadius = "8px";
          img.style.marginTop = "10px";

          // Optional: click to zoom
          img.onclick = () => {
              const overlay = document.createElement("div");
              overlay.style.position = "fixed";
              overlay.style.top = 0;
              overlay.style.left = 0;
              overlay.style.width = "100%";
              overlay.style.height = "100%";
              overlay.style.background = "rgba(0,0,0,0.8)";
              overlay.style.display = "flex";
              overlay.style.alignItems = "center";
              overlay.style.justifyContent = "center";
              overlay.style.cursor = "zoom-out";
              overlay.style.zIndex = 2000;

              const zoomImg = document.createElement("img");
              zoomImg.src = imgSrc;
              zoomImg.style.maxWidth = "90%";
              zoomImg.style.maxHeight = "90%";
              zoomImg.style.borderRadius = "10px";

              overlay.appendChild(zoomImg);
              overlay.onclick = () => overlay.remove();
              document.body.appendChild(overlay);
          };

          snapshotsContainer.appendChild(img);
      });
      document.getElementById("modalSnapshotsHeader").style.display = "block";
  } else {
      document.getElementById("modalSnapshotsHeader").style.display = "none";
  }

  // 🔹 Demo Videos 
  const demoContainer = document.getElementById("modalDemoVideos");
  const demoHeader = document.getElementById("modalDemoVideosHeader");
  demoContainer.innerHTML = "";

  if (project.demoVideos && project.demoVideos.length > 0) {
    demoContainer.style.display = "block";

    // ✅ Hide header if only one video, show if multiple
    if (project.demoVideos.length === 1) {
      demoHeader.style.display = "none";
    } else {
      demoHeader.style.display = "block";
    }
    project.demoVideos.forEach((videoSrc, index) => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("video-wrapper");

      // ✅ Add title only when there are multiple videos
      if (project.demoVideos.length > 1) {
        const title = document.createElement("p");
        title.textContent = `Demo Part ${index + 1}`;
        title.style.fontWeight = "bold";
        title.style.marginTop = "15px";
        wrapper.appendChild(title);
      }

      const videoEl = document.createElement("video");
      videoEl.controls = true;
      videoEl.controlsList = "nodownload";
      videoEl.oncontextmenu = e => e.preventDefault();
      videoEl.style.width = "100%";

      const sourceEl = document.createElement("source");
      sourceEl.src = videoSrc;
      sourceEl.type = "video/mp4";
      videoEl.appendChild(sourceEl);

      const watermark = document.createElement("div");
      watermark.classList.add("watermark-text");
      watermark.textContent = "© Nirav Patel - Confidential";

      wrapper.appendChild(videoEl);
      wrapper.appendChild(watermark);
      demoContainer.appendChild(wrapper);
    });
  } else {
    demoHeader.style.display = "none";
    demoContainer.style.display = "none";
  }

    // 🔹 Demo / PPT
  const pptContainer = document.getElementById("modalPPT");
  const pptHeader = document.getElementById("modalPPTHeader");

  if (project.demoPPT) {
    pptHeader.style.display = "block";
    pptContainer.style.display = "block";

    // Clear any old content
    pptContainer.innerHTML = "";

    // Create iframe dynamically
    const iframe = document.createElement("iframe");
    iframe.src = project.demoPPT;  // 👈 this should be your Google Slides embed URL
    iframe.width = "960";
    iframe.height = "569";
    iframe.allowFullscreen = true;
    iframe.mozallowfullscreen = true;
    iframe.webkitallowfullscreen = true;
    iframe.style.border = "0";
    iframe.style.display = "block";
    iframe.style.margin = "0 auto";

    pptContainer.appendChild(iframe);
  } else {
    pptHeader.style.display = "none";
    pptContainer.style.display = "none";
  }

  modal.style.display = "block"; /* Show modal */

}

// 🔹 Event listeners for buttons
document.querySelectorAll(".details-btn").forEach(btn => {
  btn.addEventListener("click", e => {
    const id = e.target.dataset.id;
    const project = projects.find(p => p.id == id);
    openModal(project);
  });
});

// 🔹 Close modal
closeModal.onclick = () => (modal.style.display = "none");
window.onclick = e => {
  if (e.target == modal) modal.style.display = "none";
};
});

// ====================== Skills Bubbles JS ======================
const bubbles = document.querySelectorAll(".bubble");

bubbles.forEach((bubble) => {
  bubble.addEventListener("click", () => {

    // Remove active class from all bubbles
    bubbles.forEach(b => b.classList.remove("active"));

    // Activate clicked bubble
    bubble.classList.add("active");

    // Get sub-container inside this bubble group
    const subContainer = bubble.parentElement.querySelector(".sub-container");
    if (!subContainer) return;

    const subs = subContainer.querySelectorAll(".sub-bubble");

    // ====================== Show Sub-Bubbles ======================
    subs.forEach((sub, index) => {
      setTimeout(() => {
        sub.style.opacity = 1;
        sub.style.transform = "scale(1)";
      }, index * 100); // staggered appearance
    });

    // ====================== Particle Burst ======================
    setTimeout(() => {
      subs.forEach(sub => {
        const rect = sub.getBoundingClientRect();
        const containerRect = document.body.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2 - containerRect.left;
        const centerY = rect.top + rect.height / 2 - containerRect.top;

        // create 20 small particles per sub-bubble
        for (let i = 0; i < 20; i++) {
          const particle = document.createElement("div");
          particle.classList.add("particle");

          // random trajectory
          const x = (Math.random() - 0.5) * 200 + "px";
          const y = (Math.random() - 0.5) * 200 + "px";
          particle.style.setProperty("--x", x);
          particle.style.setProperty("--y", y);

          // random size
          const size = 5 + Math.random() * 6 + "px";
          particle.style.width = size;
          particle.style.height = size;

          // position particle at sub-bubble center
          particle.style.left = centerX - parseFloat(size)/2 + "px";
          particle.style.top = centerY - parseFloat(size)/2 + "px";

          document.body.appendChild(particle);

          // remove particle after 15 seconds
          setTimeout(() => particle.remove(), 15000);
        }

        // hide original sub-bubble visually
        sub.style.opacity = 0;
        sub.style.transform = "scale(0)";
      });

      // deactivate main bubble
      bubble.classList.remove("active");

    }, 15000); // delay before particle burst
  });
});

// ====================== Activity JS ======================
 document.addEventListener('DOMContentLoaded', () => {
  // Outer Swiper
  const activitiesSwiper = new Swiper('#activities .outerSwiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '#activities .outer-next',
      prevEl: '#activities .outer-prev',
    },
    pagination: {
      el: '#activities .outer-pagination',
      clickable: true,
    },
  });

  // Initialize inner swipers and store reference
  const innerSwipers = [];
  document.querySelectorAll('#activities .innerSwiper').forEach(innerEl => {
    const slides = innerEl.querySelectorAll('.swiper-slide');
    const inner = new Swiper(innerEl, {
      slidesPerView: 1,
      loop: slides.length > 1,
      autoplay: slides.length > 1 ? {
        delay: 4000,
        disableOnInteraction: false,
        waitForTransition: true, // important for smoothness
      } : false,
      pagination: {
        el: innerEl.querySelector('.inner-pagination'),
        clickable: true,
      },
      autoHeight: false, // prevent flicker due to image height changes
    });
    innerSwipers.push(inner);
  });

  // Outer slide change: restart only active inner swiper
  activitiesSwiper.on('slideChange', () => {
    const activeSlide = document.querySelector('#activities .swiper-slide-active');
    const activeInner = activeSlide?.querySelector('.innerSwiper')?.swiper;

    innerSwipers.forEach(sw => {
      if (sw === activeInner) {
        if (sw.params.autoplay) sw.autoplay.start();
      } else {
        if (sw.params.autoplay) sw.autoplay.stop();
      }
    });
  });

  // Global Pause/Play button for outer swiper
  const activitiesBtn = document.getElementById('activities-toggle-btn');
  let isPlaying = true;
  activitiesBtn.addEventListener('click', () => {
    if (isPlaying) {
      activitiesSwiper.autoplay.stop();
      activitiesBtn.textContent = 'Play';
    } else {
      activitiesSwiper.autoplay.start();
      activitiesBtn.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
  });
});

// ====================== Quotes JS ======================
document.addEventListener('DOMContentLoaded', () => {
  const p = document.querySelector('#quote p');
  const text = p.textContent.trim();  // get text and remove leading/trailing spaces
  p.innerHTML = '';                    // clear paragraph

  text.split(' ').forEach((word, wIndex) => {
    const wordSpan = document.createElement('span');
    wordSpan.classList.add('word');  // use CSS class
    word.split('').forEach((char, cIndex) => {
      const charSpan = document.createElement('span');
      charSpan.textContent = char;
      wordSpan.appendChild(charSpan);

      setTimeout(() => {
        charSpan.style.opacity = 1;
        charSpan.style.transform = 'translateY(0)';
      }, (wIndex * 200) + (cIndex * 20)); // stagger letters
    });

    p.appendChild(wordSpan);

    // Add a normal space between words (not inside wordSpan)
    p.appendChild(document.createTextNode(' '));
  });
});


// ====================== Contact & Feedback JS ======================
const contactForm = document.getElementById('contactForm');

// make sure there is a message element
let responseMsg = document.getElementById('responseMsg');
if (!responseMsg) {
  responseMsg = document.createElement('p');
  responseMsg.id = 'responseMsg';
  responseMsg.style.marginTop = '0.5rem';
  contactForm.parentNode.insertBefore(responseMsg, contactForm.nextSibling);
}

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  responseMsg.style.color = 'black';
  responseMsg.textContent = 'Sending...';

  const formData = new FormData(contactForm);
  const data = new URLSearchParams();
  for (const pair of formData) data.append(pair[0], pair[1]);

  try {
    const res = await fetch('https://script.google.com/macros/s/AKfycbx383CIWGGPSr_NMp6sD7Ik85cCXb0y9Zl8OENminbE7gPbA2KF5-dVFC-vcAjBzzco/exec', {      // <-- REPLACE
      method: 'POST',
      body: data
    });

    if (!res.ok) {
      responseMsg.style.color = 'red';
      responseMsg.textContent = `Submission failed (network).`;
      return;
    }

    // try parse JSON safely
    let json;
    try { json = await res.json(); } catch (err) { json = null; }

    // Accept multiple possible response shapes: {status:'success'} or {result:'success'} or {success:true}
    const ok =
      (json && (json.status === 'success' || json.result === 'success' || json.success === true)) ||
      (!json && res.status === 200);

    if (ok) {
      responseMsg.style.color = 'green';
      responseMsg.textContent = 'Message sent successfully!';
      contactForm.reset();              // <-- clears fields visually and actually
      // remove message after short time
      setTimeout(() => { responseMsg.textContent = ''; }, 3000);
    } else {
      responseMsg.style.color = 'red';
      // show returned error if any
      responseMsg.textContent = (json && (json.error || json.message)) || 'Unknown issue.';
    }
  } catch (err) {
    responseMsg.style.color = 'red';
    responseMsg.textContent = 'Submission failed (exception).';
    console.error('Contact submit error:', err);
  }
});

const likeButton = document.getElementById('likeButton');
const likeCount = document.getElementById('likeCount');
const likeScriptURL = 'https://script.google.com/macros/s/AKfycbzu1COF52ih_taOQwrttiEC_Dn7vPgDi2MUAbW5KJCVyNNTAQhYRfZACx_9PeB_WNAy/exec';

// --- Check if user already liked on page load ---
if (localStorage.getItem('liked') === 'true') {

  likeButton.disabled = true;
  likeButton.textContent = 'Thank you! ❤️';
  likeButton.style.opacity = 0.5;
  likeButton.style.cursor = 'not-allowed';
}

// --- Fetch current likes ---
fetch(likeScriptURL)
  .then(res => res.json())
  .then(data => {
    likeCount.textContent = `${data.likes} Likes`;
  })
  .catch(() => {
    likeCount.textContent = "⚠️ Couldn't load likes";
  });

// --- Handle Like button click ---
likeButton.addEventListener('click', async () => {
  if (localStorage.getItem('liked') === 'true') return;

  likeButton.disabled = true;
  likeButton.style.opacity = 0.5;
  likeButton.style.cursor = 'not-allowed';
  releaseHearts();

  try {
    const res = await fetch(likeScriptURL, { method: 'POST' });
    const result = await res.json();
    likeCount.textContent = `${result.likes} Likes`;
    localStorage.setItem('liked', 'true');
    likeButton.textContent = 'Thank you!❤️';
  } catch {
    likeCount.textContent = "Error saving like.";
  }
});

function releaseHearts(count = 5) {
  const rect = likeButton.getBoundingClientRect();

  for (let i = 0; i < count; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = '❤️';
    document.body.appendChild(heart);

    // Slightly randomize start position
    heart.style.left = `${rect.left + rect.width / 2 + (Math.random() * 40 - 20)}px`;
    heart.style.top = `${rect.top}px`;

    // Slightly randomize animation speed and direction
    heart.style.animationDuration = `${0.8 + Math.random() * 0.7}s`;
    heart.style.fontSize = `${1.2 + Math.random() * 0.8}rem`;

    // Remove heart after animation ends
    setTimeout(() => heart.remove(), 1500 + i * 100);
  }
}

// Feedback submission to Google Sheets
const feedbackForm = document.getElementById("feedbackForm");
const feedbackStatus = document.getElementById("feedbackStatus");

feedbackForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const feedback = document.getElementById("feedbackInput").value;

    // Replace with your Google Apps Script Web App URL
    const scriptURL = "https://script.google.com/macros/s/AKfycby1PhNGI__84W66csKK4EJjGNmvFhCKHEv7A1OYPgU6x3ZJkdsa0LD8iy_h8ZJvcSFb/exec";

    fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify({ feedback: feedback }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.text()) // <-- changed to text to see error
    .then(data => {
        console.log("Server response:", data);
        feedbackStatus.textContent = "Thank you for your feedback!";
        feedbackStatus.classList.remove("error");
        feedbackForm.reset();
    })
    .catch(error => {
        feedbackStatus.textContent = "Error! Please try again.";
        feedbackStatus.style.color = "red";
        console.error(error);
    });
});
