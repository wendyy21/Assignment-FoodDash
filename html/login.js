// this function is used to change the navigation page href
// when user is logged in / not logged in
function changeNav(loggedin) {

    // set topnav and sidenav and clear contents
    topnav = document.querySelector("#topnav");
    topnav.innerHTML = '';
    sidenav = document.querySelector("#sidenav");
    sidenav.innerHTML = '';

    // if user logged in, set the nav to logged in nav
    if (loggedin) {
        topnav.innerHTML = (
            `<ul>
                <li><span style="font-size:40px;cursor:pointer" onclick="openNav()">&#9776;</span></li>
                <li><a href="/html/index.html" style="width: 375px; font-size: 40px; padding-top: 10px">FOOD DASH</a></li>
                <li style="float:right"><a href="/html/profiledetails.html"><i class=" fa fa-user"><br>Profile</i></a></li>
                <li style="float:right"><a href="/html/contactUs.html"><i class=" fa fa-phone"><br>Contact</i></a></li>
                <li style="float:right"><a href="/html/cart.html"><i class=" fa fa-shopping-cart"><br>Cart</i></a></li>
            </ul>`);
        sidenav.innerHTML = (
            `<div id="mySidenav" class="sidenav">
                <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
                <a class="active" href="/html/index.html"><i class="fa fa-home"></i> Home</a>
                <a href="/html/contactUs.html"><i class="fa fa-fw fa-phone"></i> Contact</a>
                <button class="dropdown-btn"><i class="fa fa-info"></i> &nbsp;More
                    <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-container">
                    <a href="/html/aboutUs.html"> <i class="fa fa-comment"></i> &nbsp;About Us</a>
                    <a href="/html/faq.html"><i class="fa fa-question"></i> &nbsp; FAQ</a>
                </div>
                <a id="btn-logout" onclick="logout()"><i class="fa fa-sign-out"></i> &nbsp; Log Out</a>
            </div>`);
    } 
    // if user not logged in, set the nav to logged out nav
    else {

        topnav.innerHTML = (
            `<ul>
                <li><span style="font-size:40px;cursor:pointer" onclick="openNav()">&#9776;</span></li>
                <li><a href="/html/index.html" style="width: 375px; font-size: 40px; padding-top: 10px">FOOD DASH</a> </li>
                <li style="float:right"><a href="/html/login.html"><i class=" fa fa-user"><br>Profile</i></a></li>
                <li style="float:right"><a href="/html/contactUs.html"><i class=" fa fa-phone"><br>Contact</i></a></li>
                <li style="float:right"><a href="/html/login.html"><i class=" fa fa-shopping-cart"><br>Cart</i></a></li>
            </ul>`);
        sidenav.innerHTML = (
            `<div id="mySidenav" class="sidenav">
                <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
                <a class="active" href="/html/index.html"><i class="fa fa-home"></i> Home</a>
                <a href="/html/contactUs.html"><i class="fa fa-fw fa-phone"></i> Contact</a>
                <button class="dropdown-btn"><i class="fa fa-info"></i> &nbsp;More
                    <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-container">
                    <a href="/html/aboutUs.html"> <i class="fa fa-comment"></i> &nbsp;About Us</a>
                    <a href="/html/faq.html"><i class="fa fa-question"></i> &nbsp; FAQ</a>
                </div>
                <a href="/html/login.html"><i class="fa fa-sign-in"></i> &nbsp; Login</a>
            </div>`);
    }




}

// this function is used to check if the user 
// is logged in or not and change the nav according
// to the login state
function checkLoggedIn() {
    // check if sessionStorage has email object
    if (sessionStorage.getItem("email")) {
        console.log(sessionStorage.getItem("email"));

        // if true, we call changeNav function with true parameter
        changeNav(true);
    }else{

        // if false, we call changeNav function with false parameter
        changeNav(false);
    }
}

// this function is used to set the lastpage visited 
function saveLastPage() {
    sessionStorage.setItem("lastpage", window.location.href);
}

// this function is used to log out a user
function logout() {
    
    // clear the sessionStorage to remove email object from sessionStorage
    sessionStorage.clear();

    // reload the page
    window.location.reload();
}

saveLastPage();
checkLoggedIn();