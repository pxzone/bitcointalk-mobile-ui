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
    const helloElement = document.getElementById('hellomember');

    if (uidMatch) {
        var uid = uidMatch[1]; // The first match group will contain the number
    } 
    if (helloElement) {
        let usernameTextContent = helloElement.innerHTML;
        usernameTextContent = usernameTextContent.replace(/^Hello\s*/, '');
        const usernameText = usernameTextContent.match(/<b>(.*?)<\/b>/);
        var username = usernameText[1];
    };
    

    if (!document.querySelector('meta[name="viewport"]')) {
        const viewportMeta = document.createElement('meta');
        viewportMeta.name = "viewport";
        viewportMeta.content = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
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
    const globalPageStylesheet = (css) => {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.textContent = css;
        document.head.appendChild(style);
    };

    globalPageStylesheet(`
        body {
            transform: scale(0.8);
            transform-origin: top left;
            width: 125vw;
            overflow-x: hidden;
            background: #e9eef2;
            font-size: 1.3rem;
            padding: 0px !important;
        }
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
            top: 1%;
            width: 100%;
            background-color: #fff;
            color: #6096C5;
            border-radius: .2rem;
            padding: 20px;
        }
        #upshrinkHeader2 .hamburger-btn {
            font-weight: 600;
            font-size: 1.4rem;
//             color: #6096C5;
        }

        #upshrinkHeader2 .dropdown-menu {
            background-color: #fff;
            border-radius: 10px;
            padding: 15px 15px;
            box-shadow: 1px 2px 23px 0px rgba(0,0,0,0.2);
            -webkit-box-shadow: 1px 2px 23px 0px rgba(0,0,0,0.2);
            -moz-box-shadow: 1px 2px 23px 0px rgba(0,0,0,0.2);
        }

        #upshrinkHeader2 .dropdown-menu h2 {
            text-align: left;
            color: #6096C5;
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
            color: #6096C5;
            text-decoration: none;
            font-size: 1.5rem;
            transition: color 0.3s;
        }

        #upshrinkHeader2 .dropdown-menu a:hover {
            color: #e0e0ff;
        }
        #upshrinkHeader2 .dropdown-menu .close-btn {
            color: #6096C5;
            background: none;
            border: none;
            font-size: 1.8rem;
            cursor: pointer;
            position: absolute;
            top: 10px;
            right: 10px;
        }
        #smfheader {
//          background: url(/Themes/custom1/images/catbg.jpg) #88A6C0 repeat-x;
          	background: rgb(59,122,177);
            background: -moz-linear-gradient(180deg, rgba(59,122,177,1) 0%, rgba(96,150,197,1) 100%);
            background: -webkit-linear-gradient(180deg, rgba(59,122,177,1) 0%, rgba(96,150,197,1) 100%);
            background: linear-gradient(180deg, rgba(59,122,177,1) 0%, rgba(96,150,197,1) 100%);

            color: #ffffff;
            padding-left: 10px;
            padding-right: 10px;
            
        }
        #smfheader h1 {
            font-size: 2.2rem;
            font-weight: 600;
            color: #fff;
        }
        .navbar ul h3 {
        	padding: 5px 15px;
  			font-size: 1.5rem;
        }
       .navbar .username {
        	padding: 5px 10px;
        }
        .btt-navbar {
            font-size: 1rem;
        }
        .btt-navbar .dropdown-menu {
            width: 290px;
            font-size: 1.3rem;
        }
        .news-area{
            padding: 10px;
            margin: 0;
        }
        .header-recent-posts {
            padding: 0px 10px 0px 10px;
            margin: 0;
            list-style-type: none;
            font-size: 1.3rem;
        }
        .header-recent-posts li {
            display: inline-block; /* Make list items inline */
            margin-right: 10px;
        }
        .btt-title-area {
            padding: 0px 10px 0px 10px;
            font-size: 1.2rem !important;
        }
        .btt-title-area a{
            font-size: 1.2rem !important;
            font-weight: 500;
        }
        .smalltext{
            font-size: 1rem;
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
        .board-last-post {
            font-size: .9rem !important;
            padding: 10px;
        }
        .bordercolor {
            border-bottom-right-radius: 10px;
            border-bottom-left-radius: 10px;
            background: #F6F6F6;
        }
        
        .dropdown-divider{
            border-top: 1px solid #e3e3e3;
            margin: 10px;
        }
        #bodyarea {
             padding: 0px 10px !important;
        }
        #bodyarea .tborder {
            border: none;
             background-color: #FFFFFF;
            border-radius: 10px;
        }
        #bodyarea .nav {
            font-size: 1.2rem;
        }
        .catbg2 {
            background: #6096C5 repeat-x;
            border-top-right-radius: 10px;
            border-top-left-radius: 10px;
            border-bottom: none !important;
        }
        .catbg2 a{
            font-size: 1.1rem;
        }
        .windowbg, .windowbg2 .windowbg3 {
            background-color: #f6f6f6;
            font-size: 1rem !important;
        }
        
        .windowbg3 {
            padding: 15px 10px;
            background-color: #f2f2f2;
        }
        .windowbg2 b a{
            font-size: 1.3rem;
        }
        .windowbg2 a{
            font-size: 1rem;
        }
        .vertical-table td{
            display: block;
            width: 100%;
        }
        .smf-footer-links span{
            font-size: .9rem;
        }
        .smf-footer-links{
            margin-top:20px;
        }
        .titlebg2 {
            border-radius: 10px;
        }
        .small, small {
          font-size: 1rem;
        }
        .vertical-table {
        	text-align: center;
        }
        .titlebg .middletext a {
        	font-size: 1rem;
        }
				.bi{
        	font-size: 1.7rem;
        }
        .main-menu-ul li a{
            font-weight: 500;
        }

    `);
       
    
    // NAVBAR
    const navbar = document.createElement('nav');
    navbar.className = 'navbar navbar-light bg-white';
    navbar.style.height = '40px';
    navbar.style.padding = '2px 15px';
    navbar.style.borderBottom = '1px solid #ddd';

    navbar.innerHTML = `
        <div class="container-fluid d-flex align-items-center justify-content-end btt-navbar" style="height: 100%;">
            <!-- Left side placeholder -->
            <div class="navbar-brand d-none"></div>

            <!-- Right side icons -->
            <div class=" d-flex align-items-center">
                <!-- Message Icon -->
                <a href="https://bitcointalk.org/index.php?action=pm" class="text-dark me-3" title="Messages">
                    <i class="bi bi-chat-dots" style="color: #6096C5; font-size: 1.9rem;"></i>
                </a>

                <!-- Profile Dropdown -->
                <div class="dropdown">
                    <button class="btn btn-white dropdown-toggle d-flex align-items-center" 
                            type="button" id="profileDropdown" data-bs-toggle="dropdown" 
                            aria-expanded="false" style="padding: 0; border: none;">
                        <i class="bi bi-person" style="color: #6096C5; font-size: 2rem; margin-right: 5px;"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                        <h3>Profile Info</h3>
                        <li class="d-flex align-items-center px-3 py-2">
                            <img width="120" src="`+avatarSrc+`" class="me-2" alt="Avatar">
                            <div class="username">
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
                <img src="https://bitcointalk.org/Themes/custom1/images/smflogo.gif" style="margin: 2px;" alt="smf forum logo" width="80%">
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
            <ul class="main-menu-ul">
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

      
    } 
		
		
    // FOOTER
    // manipulating footer links/images
    const tablesList = document.querySelectorAll("table");
    if (tablesList.length > 0) {
        const footerTable = tablesList[tablesList.length - 1];
          
        if(footerTable){
            footerTable.classList.add("vertical-table");
            footerTable.classList.add("text-center")

            const firstRow = footerTable.querySelector("tr");
            if (firstRow) {
                const tds = firstRow.querySelectorAll(":scope td");
                if (tds.length >= 3) {
                    if (tds[0]) tds[0].setAttribute("align", "center");
                    if (tds[1]) tds[1].setAttribute("align", "center");
                    if (tds[1]) tds[2].setAttribute("align", "center");
                    if (tds[1]) tds[1].classList.add("smf-footer-links");
                    
                    // Clone <td> elements
                    const firstTd = tds[0].cloneNode(true);
                    const secondTd = tds[1].cloneNode(true);
                    firstRow.replaceChild(secondTd, tds[0]);
                    firstRow.replaceChild(firstTd, tds[1]);
                } 
            }
        }
    }
    // HOME PAGE
    if (window.location.href === "https://bitcointalk.org" || window.location.href === "https://bitcointalk.org/index.php" || window.location.href === "https://bitcointalk.org/") {
       // BODY AREA
       console.log('Accessing homepage...')

       // Stylesheets        
       const homePageStylesheet = (css) => {
            const style = document.createElement('style');
            style.type = 'text/css';
            style.textContent = css;
            document.head.appendChild(style);
        };

        homePageStylesheet(`
            .windowbg2 {
                font-size: 1.1rem;
            }
            .tborder .catbg{
                background: #6096C5 repeat-x;
                border-top-right-radius: 10px;
                border-top-left-radius: 10px;
                border-bottom: none !important;
            }
            .windowbg2{
                font-size: 1rem;
            }
            .windowbg2 b{
                font-size: 1rem;
            }
            .windowbg2 b a {
                font-size: 1.3rem;
            }
            .windowbg2 span b a {
                font-size: 1rem;
            }
            .recent-posts-info-center td {
                padding: 10px;
              	font-size: 1rem;
            }
            .windowbg2 tr td b a{
                font-size: 1rem;
            }
            #upshrinkHeaderIC .windowbg2 tr td b a{
                font-size: 1rem;
            }
            #upshrinkHeaderIC td img {
            		width: 40px;
            }
            #upshrinkHeaderIC .middletext{
                font-size: 1rem;
            }
            
        
        `);

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
                                cell.setAttribute('rowspan', '2');
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
      
        const upshrinkHeaderIC = document.getElementById('upshrinkHeaderIC');
        if (upshrinkHeaderIC) {
            const tableBorderColor = upshrinkHeaderIC.querySelector('table');
            tableBorderColor.classList.add('table'); 
            tableBorderColor.classList.add('table-bordered'); 
						
						const table = upshrinkHeaderIC.querySelector('table');
            if (table) {
                const rows = table.querySelectorAll(':scope > tbody > tr');
                const firstTr = rows[0];
                if (firstTr) {
                    firstTr.classList.add('recent-posts-info-center');
                }

                const thirdTr = rows[2];
                if (thirdTr) {
                    thirdTr.classList.add('recent-posts-info-center');
                }

                const forthTr = rows[3];
                if (forthTr) {
                    const forthInnerTableWindowbg = forthTr.querySelector('td.windowbg');
                    if(forthInnerTableWindowbg){
                        forthInnerTableWindowbg.remove();
                    }
                }
            }  
          
          
            const secondTr = upshrinkHeaderIC.querySelector('table tbody tr:nth-child(2)');
            if (secondTr) {
                const innerTableWindowbg = secondTr.querySelector('td.windowbg');
                innerTableWindowbg.setAttribute("rowspan", "1");

                if(innerTableWindowbg){
                    innerTableWindowbg.remove();
                }

                const innerTable = secondTr.querySelector('td.windowbg2 table');
                innerTable.setAttribute("cellpadding", "4");
                if (innerTable) {
                    const innerRows = innerTable.querySelectorAll('tr');
                    innerRows.forEach(row => {
                        const middleTextTds = row.querySelectorAll('td.middletext');

                        if (middleTextTds.length === 2) {
                            middleTextTds[0].setAttribute("colspan", "2");
                            middleTextTds[0].innerHTML += middleTextTds[1].innerHTML;
                            middleTextTds[1].remove();
                        }
                    });
                } 
            } 
        } 
      
      	
      
    } // homepage end if
	
  
  	// BOARD PAGES
    var boardURL = "https://bitcointalk.org/index.php?board";
    if (window.location.href.includes(boardURL)) {
        console.log("Accessing board section...");

        // Stylesheets        
        const boardPageStylesheet = (css) => {
            const style = document.createElement('style');
            style.type = 'text/css';
            style.textContent = css;
            document.head.appendChild(style);
        };
    
        boardPageStylesheet(`
            .tborder .bordercolor .catbg{
                background: #6096C5 repeat-x;
                border-top-right-radius: 10px;
                border-top-left-radius: 10px;
                border-bottom: none !important;
                font-size: 1rem;
                padding: 15px 10px;
            }
            .titlebg2{
                padding-left: 10px !important;
                padding-right: 10px !important;
            }
            .titlebg2 small {
                font-size: 1rem;
            }
            .mirrortab_back a {
                font-size: 1rem;
            }
            .started-by{
                margin-top: 10px;
            }
            .newtxt{
                color: #0D5393;
                font-weight: bold;
                font-size: .8rem;
            }
            .windowbg3 b span a {
            	font-size: 1.2rem !important;
              font-weight: 500 !important;
            }
            .windowbg3 span a {
            	font-size: 1.2rem !important;
              font-weight: 500 !important;
            }
            .windowbg b span a {
            	font-size: 1.2rem !important;
              font-weight: 500 !important;
            }
            
            .windowbg2 b a{
                font-size: 1.3rem;
            }
            .windowbg2 a{
                font-size: 1rem;
            }
            .windowbg2{
                font-size: 1rem;
            }
            .board-last-post {
                font-size: .9rem !important;
                padding: 10px;
//                 border-top: 1px solid #E0E1E8;
            }
            .maintab_back{
                font-size: 1rem;
            }
            .middletext{
                font-size: 1rem;
            }
            .navPages{
                margin-top: -20px;
            }
            span.prevnext a:link {
                font-size: 1.3rem;
            }
            .bordercolor .windowbg img{
                width: 25px;
            }
            .bordercolor .windowbg2 img{
                width: 25px;
            }
            .bordercolor .windowbg3 img{
                width: 25px;
            }
            .windowbg2 {
                font-size: 1.1rem;
            }
            .bordercolor{
            		border-radius: 10px;
            }
           
            
        `);

      	const tableBorderColor = document.querySelectorAll('table.bordercolor');
      	
        if (tableBorderColor.length >= 1) {
            const threadList = tableBorderColor[tableBorderColor.length - 1];
						console.log('thread list');
            threadList.classList.add('table'); 
            threadList.classList.add('table-bordered'); 
            const tbody = threadList.querySelector('tbody');
            if (tbody) {
                const firstRow = tbody.querySelector('tr');
                if (firstRow) {
                    firstRow.remove();
                }
                const rows = tbody.querySelectorAll('tr');
                rows.forEach((row) => {
                  
                    const cells = row.querySelectorAll('td');
                  	const td4 = cells[3]; 
                    [1, 3, 4, 5, 6].forEach((index) => {
                        if (cells[index]) {
                            cells[index].remove();
                        }
                    });
                    const anchor = td4.querySelector("a");
                    const td2 = row.querySelector("td:nth-child(2)");
                    if (td2) {
                        const small = td2.querySelector("small");
                        if (small) {
                            const brElement = document.createElement("br");
                            const textNode = document.createElement("span");
                          	textNode.innerHTML = "Started by ";
                            textNode.classList.add('started-by'); 
                            small.before(brElement, textNode, anchor, ' ');
                        }
                    }
                });
            }
        }
      	
      	if(tableBorderColor.length >= 2){
          const topSubBoard = tableBorderColor[0];
      		const rows = topSubBoard.querySelectorAll("tbody > tr");
            rows.forEach((row) => {
                const windowbg = row.querySelectorAll(".windowbg");
                if(windowbg.length > 0){
                    windowbg[0].setAttribute("rowspan", "2");
                    if (windowbg[1]) {
                        windowbg[1].remove();
                    }
                }
                const windowbg2Cells = row.querySelectorAll(".windowbg2");
                if (windowbg2Cells.length > 1) {
                    const secondWindowbg2 = windowbg2Cells[1]; // Second .windowbg2 cell
                    const smallElement = secondWindowbg2.querySelector("small");
                    if (smallElement) {
                        const brTags = smallElement.querySelectorAll('br');
                        brTags.forEach(br => br.remove())
                        const newRow = document.createElement('tr');
                        const newCell = document.createElement('td');
                        newCell.classList.add('windowbg2'); // Use the same class
                        newCell.classList.add('board-last-post'); // Use the same class
                        newCell.classList.add('hr'); // Use the same class
                        newCell.colSpan = 2; 
                        newCell.innerHTML = smallElement.innerHTML;
                        row.after(newRow);
                        newRow.appendChild(newCell);
                    }
                    secondWindowbg2.remove();
                }
            });
        }

        const tables = document.querySelectorAll('table'); // Convert NodeList to Array
        console.log(tables)
      
        // removing user action int the lower part of the board
        if (tables.length > 0) {
            const userActionBottom = tables[tables.length - 4];
            if(userActionBottom){
              const tbody = userActionBottom.querySelector("tbody");
              const firstRow = tbody ? tbody.querySelector("tr") : null;
              if (firstRow) {
                  const tds = firstRow.querySelectorAll("td");
                  if (tds.length > 1) {
                      tds[1].remove();
                  } 
              }
            }
            
        }
      
        	// topic/post Legends
         if (tables.length > 0) {
           	const legendTable = tables[tables.length - 2];
            if(legendTable){
              const tbody = legendTable.querySelector("tbody");
              const firstRow = tbody ? tbody.querySelector("tr") : null;
              if (firstRow) {
                  const tds = firstRow.querySelectorAll("td");
                  if (tds.length > 2) {
                      tds[2].remove();
              		} 
            	}
        		}
         }
      
    } // board page end if
    

     // UNREAD POSTS
    var unreadUrl = "https://bitcointalk.org/index.php?action=unread";
    if (window.location.href.includes(unreadUrl)) {
        console.log('Accessing Unread posts...');
       
       // Stylesheets        
        const UnreadPageStylesheet = (css) => {
            const style = document.createElement('style');
            style.type = 'text/css';
            style.textContent = css;
            document.head.appendChild(style);
        };
    
        UnreadPageStylesheet(`
            .tborder .bordercolor .catbg{
                background: #6096C5 repeat-x;
                border-top-right-radius: 10px;
                border-top-left-radius: 10px;
                border-bottom: none !important;
                font-size: 1rem;
                padding: 15px 10px;
            }
            .newtxt{
                color: #0D5393;
                font-weight: bold;
                font-size: .8rem;
            }
            .windowbg a {
                font-size: 1.2rem !important;
                font-weight: 500 !important;
            }
            .smalltext {
              font-size: 1rem !important;
            }
            .smalltext a{
              font-size: 1rem !important;
            }
            .smalltext a:last-of-type {
                font-size: 1rem !important;
            }
            .started-by{
                font-size: 1.1rem !important;
            }
            .unread-post-author{
                font-size: 1.2rem !important
            }
            .middletext {
            	padding-top: 10px !important;
              padding-bottom: 10px;
            }
            .middletext a {
            	margin-bottom: 25px !important;
            }
            .middletext b {
            	font-size: 1.2rem;
              border: 1px solid #acacac ;
              border-radius: 5px;
              padding: 5px;
              background-color: #acacac ;
              color: #fff !important;
              margin-top: 10px;
            }
            .navPages{
            	font-size: 1.2rem;
                border: 1px solid #6096C5 ;
                border-radius: 5px;
                padding: 5px;
                background-color: #6096C5 ;
                color: #fff !important;
                line-height: 2.5rem;
            }
            .prevnext .navPages{
                font-size: 1.2rem !important;
                border: 1px solid #6096C5 ;
                border-radius: 5px;
                padding: 5px;
                background-color: #6096C5 ;
                color: #fff !important;
                margin-top: 3px;
            }
            .mirrortab_back a {
            	font-size: 1rem !important;
            }
            .maintab_back a {
            	font-size: 1rem !important;
            }
            .bordercolor {
                border-radius:10px;
                background: #F6F6F6;
            }
            .bordercolor .windowbg img{
                width: 25px;
            }
            .bordercolor .windowbg2 img{
                width: 25px;
            }
            .bordercolor .windowbg3 img{
                width: 25px;
            }
            .unread-post-author {
            	 font-size: 1rem !important;
            }
            .bullet {
            	padding-top: 7px;
            }
        `);
       	
        const mirrortabBackTd = document.querySelector('td.mirrortab_back a');
        if (mirrortabBackTd) {
            // Update the text content of the anchor tag
            mirrortabBackTd.textContent = "Mark as Read";
          	mirrortabBackTd.classList.add('btn');
          	mirrortabBackTd.classList.add('btn-light');
          	mirrortabBackTd.classList.add('btn-sm');
        }
      
      	const maintab_back = document.querySelector('td.maintab_back a');
        if (maintab_back) {
            maintab_back.textContent = "Mark as Read";
        }
        
        // pagination
        const middleTextTd = document.querySelector('td.middletext');
        if (middleTextTd) {
            middleTextTd.innerHTML = middleTextTd.innerHTML.replace(/\[\s*(<b>.*?<\/b>)\s*\]/, '$1');
            middleTextTd.innerHTML = middleTextTd.innerHTML.replace(/^Pages:\s*/, '')
        }
      
      	const navDiv = document.querySelector('table div.nav');
        if (navDiv) {
            navDiv.innerHTML = navDiv.innerHTML.replace(/&gt;/g, '<span class="bullet">•</span>');
        }
      
        const secondTable = document.querySelector('#bodyarea table:nth-of-type(2)');
        if (secondTable) {
            secondTable.classList.add('vertical-table');
            const secondTd = secondTable.querySelectorAll('td')[1]; // Get the second <td>
            if (secondTd) {
                secondTd.setAttribute('align', 'left');
            }
        }
       
      
       	const tables = document.querySelectorAll('table.bordercolor');
       	const tableBorderColor = document.querySelectorAll('table.bordercolor');
        if (tableBorderColor.length >= 1) {
            const threadList = tableBorderColor[tableBorderColor.length - 1];
            threadList.classList.add('table'); 
            threadList.classList.add('table-bordered'); 
            const tbody = threadList.querySelector('tbody');
            if (tbody) {
                const firstRow = tbody.querySelector('tr');
                if (firstRow) {
                    firstRow.remove();
                }
                const rows = tbody.querySelectorAll('tr');
                rows.forEach((row) => {
                  
                    const cells = row.querySelectorAll('td');
                  	const td4 = row.querySelector("td:nth-child(4)");
                    const anchor = td4.querySelector("a");
                  
                    [1, 3, 4, 5, 6].forEach((index) => {
                        if (cells[index]) {
                            cells[index].remove();
                        }
                    });
                    anchor.classList.add('unread-post-author'); 
                    const td2 = row.querySelector("td:nth-child(2)");
                    if (td2) {
                        const small = td2.querySelector(".smalltext");
                        if (small) {
                            const brElement = document.createElement("br");
                            const textNode = document.createElement("span");
                          	textNode.innerHTML = "Started by ";
                            textNode.classList.add('started-by'); 
                            small.after(brElement, textNode, anchor, ' ');
                        }
                    }
                });
            }
        }
     } // unread posts end if

    // Topic/user posts page 
    var unreadUrl = "https://bitcointalk.org/index.php?topic=";
    if (window.location.href.includes(unreadUrl)) {
        console.log('Accessing users posts...');
       
       // Stylesheets        
        const usersPostsPageStylesheet = (css) => {
            const style = document.createElement('style');
            style.type = 'text/css';
            style.textContent = css;
            document.head.appendChild(style);
        };
    
        usersPostsPageStylesheet(`
            .middletext {
            	padding-top: 10px !important;
              padding-bottom: 10px;
            }
            .middletext a {
            	margin-bottom: 25px !important;
            }
            .middletext b {
            	font-size: 1.2rem;
              border: 1px solid #acacac ;
              border-radius: 5px;
              padding: 5px;
              background-color: #acacac ;
              color: #fff !important;
              margin-top: 10px;
            }
            .navPages{
            	font-size: 1.2rem;
                border: 1px solid #6096C5;
                border-radius: 5px;
                padding: 5px;
                background-color: #6096C5;
                color: #fff !important;
                line-height: 2.5rem;
            }
            .prevnext .navPages{
                font-size: 1.2rem !important;
                border: 1px solid #6096C5;
                border-radius: 5px;
                padding: 5px;
                background-color: #6096C5;
                color: #fff !important;
                margin-top: 3px;
            }
            .mirrortab_back a {
            	font-size: 1rem !important;
            }
            .maintab_back a {
            	font-size: 1rem !important;
            }
             .bordercolor {
                border-radius:10px;
                background: #F6F6F6;
            }
            .catbg3 {
                background: #6096C5 repeat-x;
                border-top-right-radius: 10px;
                border-top-left-radius: 10px;
                border-bottom: none !important;
                width: 100%;
            }
            .catbg3 #top_subject {
                padding: 14px 20px;
            }
            tr div .post{
                 overflow-x: hidden; /* Prevent horizontal scrolling */
                word-wrap: break-word; /* Break long words to the next line */
                white-space: normal;
            }
            .bordercolor {
                width: 100%; /* Make the table responsive */
                table-layout: auto; /* Allow dynamic column width adjustment */
                border-collapse: collapse; 
            }
            .bordercolor td, th {
                word-wrap: break-word; /
                white-space: normal; /* Allow text wrapping */
                overflow: hidden;
                text-align: left; 
            }
             /* Post contents */
            .post {
                width: 120vw;
                overflow-x: hidden;
                word-wrap: break-word;
                white-space: normal;
                font-size: 1.05rem !important;
                font-weight: 400;
                border-radius: 20px;
                background: #fff;
                padding: 15px 15px 25px 15px;
                position: relative;
                box-shadow: 1px 2px 23px 0px rgba(0,0,0,0.05);
                -webkit-box-shadow: 1px 2px 23px 0px rgba(0,0,0,0.05);
                -moz-box-shadow: 1px 2px 23px 0px rgba(0,0,0,0.05);
            }
            .post .quote {
                font-size: .9rem !important;
                color: #000000;
                background-color: #f8f8f8;
                border: 1px solid #e4e4e4;
                padding: 5px;
                margin: 1px 3px 6px 6px;
                line-height: 1.4em;
                border-radius: 10px;
            }
            .post .quoteheader {
                font-size: .9rem !important;
            }
            .post .quoteheader a {
                font-size: .9rem;
            }
            /* Subject */
            tr.catbg3 td {
                background: #6096C5 repeat-x;
            }
            #top_subject {
            		font-size: 1.5rem;
  							padding: 15px !important;
            }
            .subject {
                font-size: 1.2rem !important;
                width: 120vw;
  							padding: 0px 10px 5px 10px;
            }
            /* Date */
            .subject .smalltext{
                font-size: .9rem !important;
            }
            /* Signature */
            .signature {
            		width: 120vw;
                height: 50vh;
                word-wrap: break-word;
                padding: 5px;
                font-size: .8rem;
                margin-bottom: 20px;
                overflow-x: auto; /* Enables horizontal scrolling */
                overflow-y: hidden; /* Hides vertical scrolling */
                white-space: nowrap;
            }
            .td_headerandpost td > div:nth-of-type(2) {
            		font-size: .9rem;
  							padding: 0px 10px 0px 10px
            }
            .td_headerandpost td > div:nth-of-type(3) {
            		font-size: 1rem;
                padding: 2px 10px 5px 10px;
            }
            
            @media (max-width: 480) {
    						
            }
            
            @media (max-width: 428) {
    						
            }
            @media (max-width: 375) {
    					
            }
            @media (max-width: 320) {
    						
            }
            sub {
            		line-height: 1.3;
            }
            .user-post-action {
                list-style-type: none;
                padding: 0;
                margin: 0;
                display: flex;
                box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.05);
            }

           	/* user action button quote/merit/report */
            .user-post-action .btn {
            		padding: 5px 10px;
                font-size: 14px;
                cursor: pointer;
                border: 1px solid #ccc;
                background-color: #fff;
                border-radius: 4px;
                color: #476C8E;
            }
            .user-post-wrapper {
            		margin: 10px 0px;
            }
            .user-post-wrapper .dropdown-menu {
                width: 100vw;
                background-color: #fff;
                border-radius: 10px;
                padding: 20px;
            }
            .user-post-wrapper .dropdown-toggle::after {
                display: none !important;
            }
            .post-username {
            		color: #476C8E;
            }
            .thread-post-date {
            		width: 120vw;
                font-size: .9rem;
            }
            .jumpto-div{
            		width: 110vw;
            }

          }
        `);
    
        // pagination
        const middleTextTd = document.querySelector('td.middletext');
        if (middleTextTd) {
            middleTextTd.innerHTML = middleTextTd.innerHTML.replace(/\[\s*(<b>.*?<\/b>)\s*\]/, '$1');
            middleTextTd.innerHTML = middleTextTd.innerHTML.replace(/^Pages:\s*/, '')
        }
      
      	const firstTable = document.querySelector('#bodyarea table:nth-of-type(1)');
        if (firstTable) {
            firstTable.classList.add('vertical-table');
            const secondTd = firstTable.querySelectorAll('td')[1]; // Get the second <td>
            if (secondTd) {
                secondTd.setAttribute('align', 'left');
            }
        }
				
      	const thirdTable = document.querySelector('#bodyarea table:nth-of-type(2)');
        if (thirdTable) {
            // Find the row(s) with the class .catbg3 inside the second table
            const catbg3Rows = thirdTable.querySelectorAll('.catbg3');
            catbg3Rows.forEach(row => {
                // Remove the first <td> inside the .catbg3 row
                const firstTd = row.querySelector('td:first-of-type');
                if (firstTd) firstTd.remove();
        
                // Remove the second <td> inside the .catbg3 row
                const secondTd = row.querySelector('td:first-of-type'); // After removing the first, this is the new first
                if (secondTd) secondTd.remove();
        
                // Get the data from the third <td>
                const thirdTd = row.querySelector('td:first-of-type'); // After two removals, this is the new first
                 if (thirdTd) {
                    const textContent = thirdTd.textContent.trim(); // Trim leading and trailing whitespace
                    const trimmedData = textContent.replace(/\(Read.*$/, '').trim(); // Trim the last word with "(Read"
                    const finalTrimmedData = trimmedData.substring(7);

                    const match = textContent.match(/\(Read\s+(\d+)/);
                    const readCount = match ? parseInt(match[1], 10) : null;
                    
                    const topSubject = document.getElementById('top_subject');
                    if (topSubject) {
                        topSubject.textContent = finalTrimmedData;
                    }

                }
            });
        }
      	
        document.querySelectorAll('.signature').forEach(signature => {
            const hrcolor = signature.parentNode.querySelector('.hrcolor');
            if (hrcolor) {
                hrcolor.remove(); // Remove the `.hrcolor` from its current position
                signature.insertAdjacentElement('afterend', hrcolor); // Move it after the `.signature`
            }
        });
 				
      
    const quickModForm = document.getElementById('quickModForm');
    // Check if form exists
    if (quickModForm) {
        // Get the first table and its rows
        const tableRows = quickModForm.querySelectorAll('table tbody > tr');

        tableRows.forEach(row => {
            // Get the td.msgcl1
            const msgCl1 = row.querySelector('td.msgcl1');
            if (!msgCl1) return;

            // Find the nested table inside .msgcl1
            const innerTable = msgCl1.querySelector('table tbody');
            if (!innerTable) return;

            // Get the .windowbg or .windowbg2 td
            const windowBgTd = innerTable.querySelector('.windowbg, .windowbg2');
            if (!windowBgTd) return;

            // Find the nested table inside this td
            const innerMostTable = windowBgTd.querySelector('table tbody');
            if (!innerMostTable) return;

            const innerRows = innerMostTable.querySelectorAll('tr');

            // Extract data from the first tr
            const firstRow = innerRows[0];
            if (firstRow) {
                const posterInfoTd = firstRow.querySelector('.poster_info');
                if (posterInfoTd) {
                    var usernameElement = posterInfoTd.querySelector('b a');
                    var spanElement = posterInfoTd.querySelector('span');
                  	var userOP = spanElement.outerText == '(OP)' ? spanElement.outerHTML : '';
                   	var userOnlineStatus = spanElement.outerText == ' Online' ? '<img src="https://bitcointalk.org/Themes/custom1/images/useron.gif" alt="Online" border="0" style="margin-top: 6px; margin-left: 2px;">' : '';
                  	
                  	const userHref = usernameElement.href;
                    const userHrefMatch = userHref.match(/u=(\d+)/);
                    var userId = userHrefMatch ? parseInt(userHrefMatch[1], 10) : null;
                  
                    const smallTextElement = posterInfoTd.querySelector('.smalltext');
                    if (smallTextElement) {
                        var smallTextContent = smallTextElement.innerHTML;

                        var position = smallTextContent.split('<br>')[0]?.trim();
                        const activityMatch = smallTextContent.split('<br>')[4]?.trim();
                        var activityCount = activityMatch ? activityMatch.replace('Activity:', '').trim() : '';

                        // Extract "meritCount" (after the 5th <br>)
                        const meritMatch = smallTextContent.split('<br>')[5]?.trim();
                        var meritCount = meritMatch ? meritMatch.replace('Merit:', '').trim() : '';

                        // Extract "personalText" (after the 8th <br>)
                        const personalTextMatch = smallTextContent.split('<br>')[8]?.trim();
                        var personalText = personalTextMatch || '';
                      	console.log(personalText)
                      	
                      
                      	if (smallTextElement) {
                            const avatarImg = smallTextElement.querySelector('img.avatar');
                          	var avatar = "";
			
                            if (avatarImg) {
                                const imgSrc = avatarImg.src;
                      					var avatar = imgSrc ? `<img src="${imgSrc}" class="avatar" alt="avatar">` : '';
                      					var avatarDropdown = imgSrc ? `<img width="120" src="${imgSrc}" class="avatar" alt="avatar">` : '';
                            } 
                        }

                    }
                  	posterInfoTd.remove();
                }
            }

            // Extract data from the second td.td_headerandpost
            const secondTd = firstRow.querySelector('.td_headerandpost');
            if (secondTd) {
                // Remove <img>
                const images = secondTd.querySelectorAll('img');
                images.forEach(img => img.remove());
              	const firstTd = secondTd.querySelector('td:first-child');

                // Get the anchor and extract the userPostId and postMsgId
                var anchorElement = secondTd.querySelector('a');
                var userPosturl = anchorElement ? anchorElement.href : '';
                var postMsgId = anchorElement ? anchorElement.href.split('#msg')[1] : '';
								
              	var meritReceived = secondTd.querySelector('div:last-child')?.innerHTML || '';
              	firstTd.remove();
            }

            // Extract data from the third td
            if (secondTd) {
            		const thirdTd = secondTd.querySelector('td:nth-of-type(2)');;
                var anchors = thirdTd.querySelectorAll('a');
                var quoteMsg = anchors[0] ? anchors[0].href : '';
                var meritPost = anchors[1] ? anchors[1].href : '';
                var msgNum = anchors[2].innerText.substr(1) - 1;
              	thirdTd.remove();
            }
          
          	const modifiedTDs = document.querySelectorAll('td[id*="modified_"]');
            modifiedTDs.forEach(td => {
              const nextTd = td.nextElementSibling;
              if (nextTd) {
                  const anchor = nextTd.querySelector('a');
                  nextTd.remove();
              }
            });
          
          	const thread_url = window.location.href;
            const topicData = thread_url.split('topic=');
            const topicId = topicData[1].split('.msg')

          
            if (secondTd) {
                const postDiv = secondTd.querySelector('.post');
                if (postDiv) {
                    const userPostWrapper = `
                    <div class="user-post-wrapper d-flex justify-content-between mb-3">
                        <div class="text-start">
                            <div class="dropdown">
                              <button class="btn btn-white dropdown-toggle d-flex align-items-center" type="button" id="userProfileDropdown" data-bs-toggle="dropdown" aria-expanded="false" style="padding: 0; border: none;">
                                   <span class="post-username fw-bolder">${usernameElement.innerText}</span> ${userOnlineStatus} ${userOP}
                              </button>
                              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userProfileDropdown">
                                  <li class="d-flex align-items-center">
                                      <div class="post-username text-start">
                                          <strong id="userpost_username"><a class="username fw-bolder" href="${usernameElement.href}"> ${usernameElement.innerText}</a> ${userOnlineStatus} ${userOP}
                                          </strong>
                                      </div>
                                  </li>
                                  <li>
                                  	<div class="">
                                    		<hr class="dropdown-divider">
                                      	${avatarDropdown}
                                        
                                    </div>
                                  </li>
                                  <li><hr class="dropdown-divider">Activity: ${activityCount}</li>
                                  <li><hr class="dropdown-divider">Merit: ${meritCount}</li>
                              </ul>
                          </div>
                            <div class="user-position">${position}</div>
                            <div class="useravatar mt-1">${avatar}</div>
                            
                        </div>
                        <div class="text-end">
                            <div id="user_post_action" class="uactionid_${postMsgId}">
                                <div class="user-post-action">
                                    <div class="btn-group">
                                        <a class="btn" href="${quoteMsg}">Quote</a>
                                        <a class="btn" href="${meritPost}">Merit</a>
                                        <a class="btn" href="https://bitcointalk.org/index.php?action=reporttm;topic=${topicId}.${msgNum};msg=${postMsgId}">Report</a>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="hr mb-3"></div>
                    `;

                    postDiv.innerHTML = userPostWrapper + postDiv.innerHTML; // Append the existing post data
                }
            }

            const secondRow = innerRows[1];
            if (secondRow) {
                const modifiedTds = secondRow.querySelectorAll('td[id*="modified_"]');
                modifiedTds.forEach(td => {
                    td.innerHTML = ''; // Clear the content
                });
            }
        });
    };
      
    const verticalTable = document.querySelector('table.vertical-table');
    if (verticalTable) {
        const tdWithNav = verticalTable.querySelector('td > div.nav');
        if (tdWithNav) {
            const anchors = tdWithNav.querySelectorAll('a');
            anchors.forEach((anchor, index) => {
                if (index < 2) {
                    anchor.classList.add('btn'); 
                    anchor.classList.add('btn-light'); 
                    anchor.classList.add('btn-sm'); 
                    anchor.classList.add('mt-1');
                    anchor.classList.add('me-1');
                }
            });
        }
    }
     
    const firstSubjectDiv = document.querySelector('div.subject');
    if (firstSubjectDiv) {
        const nextDiv = firstSubjectDiv.nextElementSibling;
        if (nextDiv) {
            nextDiv.classList.add('thread-post-date'); // Replace 'new-class' with your desired class name
        }
        firstSubjectDiv.remove();
    }
		
    const jumpto = document.querySelector('#jumpto');
    jumpto.classList.add('jumpto-div'); 
     

      
    } // Topic/user posts page end if
  
})();
