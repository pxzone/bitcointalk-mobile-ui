// ==UserScript==
// @name         Bitcointalk Mobile-Friendly Enhancements
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Make Bitcointalk website mobile-friendly
// @author       PX-Z
// @match        https://bitcointalk.org/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // get avatar, username and uid
    const avatarImage = document.querySelector('.avatar');
    const avatarSrc = avatarImage.getAttribute('src');
    const uidMatch = avatarSrc.match(/(\d+)/); 
    const helloElement  = document.getElementById('hellomember');

    if (uidMatch) {
        var uid = uidMatch[1]; // The first match group will contain the number
    } 
    if (helloElement) {
        let usernameTextContent  = helloElement.innerHTML;
        usernameTextContent = usernameTextContent.replace(/^Hello\s*/, '');
        const usernameText = usernameTextContent.match(/<b>(.*?)<\/b>/);
        var username = usernameText[1];
    };
    

    if (!document.querySelector('meta[name="viewport"]')) {
        const viewportMeta = document.createElement('meta');
        viewportMeta.name = "viewport";
        viewportMeta.content = "width=device-width, initial-scale=1";
        document.head.appendChild(viewportMeta);
    }

    const bootstrapCSS = document.createElement('link');
    bootstrapCSS.rel = 'stylesheet';
    bootstrapCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
    document.head.appendChild(bootstrapCSS);

    const bootstrapJS = document.createElement('script');
    bootstrapJS.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js';
    document.body.appendChild(bootstrapJS);

    const bootstrapIcons = document.createElement('link');
    bootstrapIcons.rel = 'stylesheet';
    bootstrapIcons.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css';
    document.head.appendChild(bootstrapIcons);

    document.querySelectorAll('.menu').forEach(el => el.classList.add('nav', 'nav-pills', 'flex-column'));

  	document.querySelectorAll('table').forEach(table => {
        table.style.width = "100%";
        table.style.overflowX = "auto";
        table.style.display = "block";
    });


    // Stylesheets
    const stylesheet = (css) => {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.textContent = css;
        document.head.appendChild(style);
    };

    stylesheet(`
        body {
            transform: scale(0.8);
            transform-origin: top left;
            width: 100vw;
            overflow-x: hidden;
            background: #e9eef2;
        }
        #smfheader {
            background: url(/Themes/custom1/images/catbg.jpg) #88A6C0 repeat-x;
            color: #ffffff;
            padding-left: 10px;
            padding-right: 10px;
            
        }
        #smfheader h1 {
            font-size: 2.2rem;
            font-weight: 600;
            color: #fff;
        }
        .btt-navbar .dropdown-menu {
            width: 270px;
        }
        .news-area{
            padding: 10px;
            margin: 0;
        }
        .header-recent-posts {
            padding: 0px 10px 0px 10px;
            margin: 0;
            list-style-type: none;
        }
        .header-recent-posts li {
            display: inline-block; /* Make list items inline */
            margin-right: 10px;
        }
        .btt-title-area {
            padding: 0px 10px 0px 10px;
        }
        .hr {
            border-bottom: 1px solid #E0E1E8;
            margin: 10px;
        }
        .tborder {
            padding: 0px;
            border: none;
            background-color: #FFFFFF;
            border-radius: 10px;
            box-shadow: 1px 2px 23px 0px rgba(0,0,0,0.05);
            -webkit-box-shadow: 1px 2px 23px 0px rgba(0,0,0,0.05);
            -moz-box-shadow: 1px 2px 23px 0px rgba(0,0,0,0.05);
        }
            
        #bodyarea .tborder {
           
            border: none;
            background-color: #FFFFFF;
            border-radius: 10px;
        }
        .catbg2 {
        	background: #A1BFD9 repeat-x;
        	border-top-right-radius: 10px;
        	border-top-left-radius: 10px;
					border-bottom: none !important;
        }
        .bordercolor {
            border-bottom-right-radius: 10px;
            border-bottom-left-radius: 10px;
        }
        .board-last-post {
        	font-size: .7rem;
          padding: 10px;
        }
        .windowbg, .windowbg2 {
          background-color: #fbfbfb;
        }
        .windowbg3 {
          background-color: #f2f2f2;
        }
        // .tborder:first-of-type {
        //     border-radius: 10px;
        // }

        @media (min-width: 768px) {
            body {
                transform: none;
            }
        }
        
    `);
       

    // Force to smaller screen width
    const emulateMobile = () => {
        const width = 420; // Target mobile width (e.g., iPhone size)
        const height = window.innerHeight;
        document.documentElement.style.width = `${width}px`;
        document.documentElement.style.overflowX = "hidden";
        document.body.style.width = `${width}px`;
        document.body.style.overflowX = "hidden";
    };
    emulateMobile(); 

    const adjustLayout = () => {
        if (window.innerWidth < 768) {
            document.body.style.padding = "10px";
        } else {
            document.body.style.padding = "0";
        }
    };
    window.addEventListener('resize', adjustLayout);
    adjustLayout(); 
    
    // NAVBAR
    const navbar = document.createElement('nav');
    navbar.className = 'navbar navbar-light bg-white';
    navbar.style.height = '35px';
    navbar.style.padding = '0 15px';
    navbar.style.borderBottom = '1px solid #ddd';

    navbar.innerHTML = `
        <div class="container-fluid d-flex align-items-center justify-content-end btt-navbar" style="height: 100%;">
            <!-- Left side placeholder -->
            <div class="navbar-brand d-none"></div>

            <!-- Right side icons -->
            <div class=" d-flex align-items-center">
                <!-- Message Icon -->
                <a href="https://bitcointalk.org/index.php?action=pm" class="text-dark me-3" title="Messages">
                    <i class="bi bi-chat-dots" style="color: #476C8E; font-size: 1.2rem;"></i>
                </a>

                <!-- Profile Dropdown -->
                <div class="dropdown">
                    <button class="btn btn-white dropdown-toggle d-flex align-items-center" 
                            type="button" id="profileDropdown" data-bs-toggle="dropdown" 
                            aria-expanded="false" style="padding: 0; border: none;">
                        <i class="bi bi-person" style="color: #476C8E; font-size: 1.5rem; margin-right: 5px;"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                        <h3>Profile Info</h3>
                        <li class="d-flex align-items-center px-3 py-2">
                            <img width="100" src="`+avatarSrc+`" class="me-2" alt="Avatar">
                            <div>
                                <strong id="username">`+username+`</strong>
                            </div>
                        </li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="https://bitcointalk.org/index.php?action=profile;u=`+uid+`;sa=showPosts">Posts</a></li>
                        <li><a class="dropdown-item" href="https://bitcointalk.org/index.php?action=profile;threads;u=`+uid+`;sa=showPosts">Topics</a></li>
                        <li><a class="dropdown-item" href="https://bitcointalk.org/index.php?action=drafts">Drafts</a></li>
                        <li><a class="dropdown-item text-danger" href="https://bitcointalk.org/index.php?action=logout;">Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    document.body.insertBefore(navbar, document.body.firstChild);

    // SMF HEADER
    
    const smfHeaderElement = document.getElementById('smfheader');
    if (smfHeaderElement) {
        smfHeaderElement.innerHTML = '';

        // Create a new <div> element with sample HTML content
        const smfHeaderDiv = document.createElement('div');
        smfHeaderDiv.innerHTML = `
            <div><h1 class="mt-2">Bitcoin Forum</h1></div>
            <div class="mb-2">
                <img src="https://bitcointalk.org/Themes/custom1/images/smflogo.gif" style="margin: 2px;" alt="">
            </div>
            
        `;
        // Append the new <div> to the #smfheader element
        smfHeaderElement.appendChild(smfHeaderDiv);
    } 
    const tables = document.querySelectorAll('table');
    //
    if (tables.length >= 2) {
        const secondTable = tables[1];
        const headerSecondTable = document.createElement('div');
        headerSecondTable.innerHTML = `
            <div id="news_area" class="news-area mt-1"></div>
            <div class="hr"></div>
            <ul class="header-recent-posts">
                <li><a href="https://bitcointalk.org/index.php?action=unread">Unread posts since last visit.</a></li>
                <li><a href="https://bitcointalk.org/index.php?action=unreadreplies">New replies to your posts.</a></li>
            </ul>
            <div class="hr"></div>
        `;
        secondTable.parentNode.replaceChild(headerSecondTable, secondTable);
    } 

    // const firstTborderElements = document.querySelectorAll('.tborder');
    // if (firstTborderElements.length > 0) {
    //     firstTborderElements.forEach(element => {
    //         element.classList.add('new-class-name');
    //     });
    // }

     // NEWS AREA
     const newsTargetElement = document.querySelector('#upshrinkHeader2 td[width="90%"].titlebg2');
     if (newsTargetElement) {
         // Get the full HTML content of the matched <td> element
         const newsHtmlContent = newsTargetElement.innerHTML;
         const newsArea = document.getElementById('news_area'); 
         if (newsArea) {
            // Create a new <div> element
            const newsAreaDiv = document.createElement('div');
            newsAreaDiv.innerHTML = newsHtmlContent;
            newsArea.appendChild(newsAreaDiv);
        }
     }

    // FORUM'S MENU

    // remove default menu header
    if (tables.length >= 4) {
        const fourthTable = tables[4];
        fourthTable.parentNode.removeChild(fourthTable);
    } 
    const upshrinkHeaderElement = document.getElementById('upshrinkHeader2');
    if (upshrinkHeaderElement) {
        upshrinkHeaderElement.innerHTML = '';

        const menuDiv = document.createElement('div');
        menuDiv.className = 'menu-container';

        const hamburgerButton = document.createElement('button');
        hamburgerButton.className = 'hamburger-btn btn btn-default mb-2 mt-1';
        hamburgerButton.innerHTML = '&#9776; Main Menu';  

        const dropdownMenu = document.createElement('div');
        dropdownMenu.className = 'dropdown-menu';
        dropdownMenu.style.display = 'none'; 

        dropdownMenu.innerHTML = `
            <h2>Main Menu</h2>
            <ul>
                <li><a href="https://bitcointalk.org/index.php"><i class="bi bi-house"></i> Home</a></li>
                <li><a href="https://bitcointalk.org/index.php?action=help"><i class="bi bi-info-circle"></i> Help</a></li>
                <li><a href="https://bitcointalk.org/index.php?action=search"><i class="bi bi-search"></i> Search</a></li>
                <li><a href="https://bitcointalk.org/index.php?action=profile"><i class="bi bi-person"></i> Profile</a></li>
                <li><a href="https://bitcointalk.org/index.php?action=mlist"><i class="bi bi-people"></i> Members</a></li>
                <li><a href="https://bitcointalk.org/more.php"><i class="bi bi-three-dots"></i> More</a></li>
                <li><a href="https://bitcointalk.org/index.php?action=logout"><i class="bi bi-box-arrow-right"></i> Logout</a></li>
            </ul>
            <button class="close-btn"><i class="bi bi-x-square"></i></button>
        `;

        menuDiv.appendChild(hamburgerButton);
        menuDiv.appendChild(dropdownMenu);
        upshrinkHeaderElement.appendChild(menuDiv);
        hamburgerButton.addEventListener('click', function() {
            const isVisible = dropdownMenu.style.display === 'block';
            dropdownMenu.style.display = isVisible ? 'none' : 'block';  // Toggle visibility
        });
        const closeButton = dropdownMenu.querySelector('.close-btn');
        closeButton.addEventListener('click', function() {
            dropdownMenu.style.display = 'none';  // Hide the dropdown menu when X is clicked
        });

        // Add styles (optional for appearance)
        const forumMenuStyle = document.createElement('style');
        forumMenuStyle.innerHTML = `
            /* Hamburger button styles */
            #upshrinkHeader2. hamburger-button {
                font-size: 1rem;
                font-weight: 600;
                background: none;
                border: none;
                cursor: pointer;
                padding: 10px;
                display: flex;
                flex-direction: column;
                gap: 5px;
            }

            #upshrinkHeader2 .hamburger-icon {
                width: 30px;
                height: 3px;
                border-radius: 5px;
            }

            /* Dropdown menu styles */
            #upshrinkHeader2 .dropdown-menu {
                display: none;
                // position: fixed;
                // top: 0;
                // left: 0;
                width: 90%;
                // height: 100%;
                background-color: #fff;
                color: #476C8E;
                // z-index: 999;
                border-radius: .2rem;
                padding: 20px;
            }
            #upshrinkHeader2 .hamburger-btn {
                font-weight: 600;
            }

            #upshrinkHeader2 .dropdown-menu {
                background-color: #fff;
                border-radius: 8px;
                padding: 20px;
            }

            #upshrinkHeader2 .dropdown-menu h2 {
                text-align: left;
                color: #476C8E;
                font-size: 1.5rem;
            }

            #upshrinkHeader2 .dropdown-menu ul {
                list-style-type: none;
                padding: 0;
                text-align: left;
            }

            #upshrinkHeader2 .dropdown-menu li {
                margin: 10px 0;
                list-style-type: none;
            }

            #upshrinkHeader2 .dropdown-menu a {
                color: #476C8E;
                text-decoration: none;
                font-size: 18px;
                transition: color 0.3s;
            }

            #upshrinkHeader2 .dropdown-menu a:hover {
                color: #e0e0ff;
            }
            #upshrinkHeader2 .dropdown-menu .close-btn {
                color: #476C8E;
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
                position: absolute;
                top: 5px;
                right: 5px;
            }
        `;
        document.head.appendChild(forumMenuStyle);
    } 

    // BODY AREA
    const navBodyAreaDiv = document.querySelector('#bodyarea .nav');
    navBodyAreaDiv.classList.add('btt-title-area');

    const tborderElements = document.querySelectorAll('#bodyarea .tborder');
    tborderElements.forEach((tborder) => {
        // Get the table inside each `tborder`
        const table = tborder.querySelector('table');

        if (table) {
            // Get all `tr` elements in the `tbody`
            const rows = table.querySelectorAll('tbody > tr');

            rows.forEach((row) => {
                const cells = row.querySelectorAll('td');
                let windowbg2Counter = 0;
								
                const windowbg = row.querySelectorAll('.windowbg')[1]; // Second windowbg
                if (windowbg) {
                    windowbg.remove();
                }
              
                cells.forEach((cell, index) => {
                    if (cell.classList.contains('windowbg')) {
                        // Change rowspan="1" of every windowbg
                        if (!cell.hasAttribute('rowspan') || cell.getAttribute('rowspan') !== '1') {
                            cell.setAttribute('rowspan', '1');
                        }
                        return;
                    }

                    if (cell.classList.contains('windowbg2')) {
                        windowbg2Counter++;

                        if (windowbg2Counter === 2) {
                            // This is the second `windowbg2` that we need to move

                            const smallTextElement = cell.querySelector('.smalltext');
                            if (smallTextElement) {
                                // Remove all <br> tags inside the second windowbg2 (moved content)
                                const brTags = smallTextElement.querySelectorAll('br');
                                brTags.forEach(br => br.remove());
                              	
	
                                // Create a new row to hold the smalltext
                                const newRow = document.createElement('tr');
                                const newCell = document.createElement('td');
                                newCell.classList.add('windowbg2'); // Use the same class
                                newCell.classList.add('board-last-post'); // Use the same class
                                newCell.colSpan = 3; // Span across 3 columns
                                newCell.innerHTML = smallTextElement.innerHTML;

                                // Insert the new row after the current row
                                row.after(newRow);
                                newRow.appendChild(newCell);
                            }

                            // Remove the second `windowbg2` cell
                            cell.remove();
                        }
                    }

                    if (index === 1 && cell.classList.contains('windowbg')) {
                        // If we encounter the second windowbg, remove it
                        if (cell.classList.contains('windowbg')) {
                            cell.remove();
                        }
                    }
                });
            });
        }
    });
  

})();