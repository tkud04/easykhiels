let devMode = true, currentCounter = 0
  
let BASE_URL = devMode ? '${BASE_URL}' : 'https://eazykhiels.com'

const confirmAction = (actionId,callback) => {
    const v = confirm('Are you sure? This action cannot be undone')
  
    if(v){
      typeof callback === 'function' && callback(actionId)
    }
  }

  const hideValidations = () => {
    $('.nsfdw-validation').hide()
  }
  
  const initFirebase = () => {
      const firebaseConfig = {
        apiKey: "AIzaSyBMNfl4WYs99xRt3strOCeaNAdCBHuk4aE",
        authDomain: "lashy-projects.firebaseapp.com",
        projectId: "lashy-projects",
        storageBucket: "lashy-projects.appspot.com",
        messagingSenderId: "1019548262418",
        appId: "1:1019548262418:web:59f6bd06122d39aeb3b8cb",
        measurementId: "G-VDEVYCMQ8Z"
        }
      
        // Initialize Firebase
        const app = firebase.initializeApp(firebaseConfig)
        
  }
  
  const getDB = () => {
      //const analytics = firebase.getAnalytics(app)
      let ret = firebase?.firestore()
       return ret
  }
  
  const digestDate = (standardizedDate) => {
      const dateTimeArr = standardizedDate.split('T')
      let ret = {dateArr:[],timeArr:[]}
    
      if(dateTimeArr.length === 2){  
        const dateArr = dateTimeArr[0].split('-')
        const timeArr = dateTimeArr[1].split(':')
        ret.dateArr = dateArr
        ret.timeArr = timeArr
      }
    
      return ret
      
  }
  
  const getSapNumber = (max=1) => {
    return Math.floor(Math.random() * max)
  }



  /********************** COMPONENTS *****************************/
  const renderHeader = () => {
    const ret = `
  <header id="header" class="header d-flex align-items-center fixed-top">
    <div class="container-fluid container-xl position-relative d-flex align-items-center">

      <a href="${BASE_URL}" class="logo d-flex align-items-center me-auto">
        <img src="assets/img/logo.png" alt="">
        <h1 class="sitename">QuickStart</h1>
      </a>

      <nav id="navmenu" class="navmenu">
        <ul>
          <li><a href="${BASE_URL}#hero" class="active">Home</a></li>
          <li><a href="${BASE_URL}#about">About</a></li>
          <li><a href="${BASE_URL}#features">Features</a></li>
          <li><a href="${BASE_URL}#services">Services</a></li>
          <li><a href="${BASE_URL}#pricing">Pricing</a></li>
          <li class="dropdown"><a href="#"><span>Dropdown</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
            <ul>
              <li><a href="#">Dropdown 1</a></li>
              <li class="dropdown"><a href="#"><span>Deep Dropdown</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
                <ul>
                  <li><a href="#">Deep Dropdown 1</a></li>
                  <li><a href="#">Deep Dropdown 2</a></li>
                  <li><a href="#">Deep Dropdown 3</a></li>
                  <li><a href="#">Deep Dropdown 4</a></li>
                  <li><a href="#">Deep Dropdown 5</a></li>
                </ul>
              </li>
              <li><a href="#">Dropdown 2</a></li>
              <li><a href="#">Dropdown 3</a></li>
              <li><a href="#">Dropdown 4</a></li>
            </ul>
          </li>
          <li><a href="${BASE_URL}#contact">Contact</a></li>
        </ul>
        <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
      </nav>

      <a class="btn-getstarted" href="${BASE_URL}#about">Get Started</a>

    </div>
  </header>
  `
  return ret
  }


  const renderFooter = () => {
    const ret = `
    <div class="container footer-top">
      <div class="row gy-4">
        <div class="col-lg-4 col-md-6 footer-about">
          <a href="index.html" class="logo d-flex align-items-center">
            <span class="sitename">QuickStart</span>
          </a>
          <div class="footer-contact pt-3">
            <p>A108 Adam Street</p>
            <p>New York, NY 535022</p>
            <p class="mt-3"><strong>Phone:</strong> <span>+1 5589 55488 55</span></p>
            <p><strong>Email:</strong> <span>info@example.com</span></p>
          </div>
          <div class="social-links d-flex mt-4">
            <a href=""><i class="bi bi-twitter-x"></i></a>
            <a href=""><i class="bi bi-facebook"></i></a>
            <a href=""><i class="bi bi-instagram"></i></a>
            <a href=""><i class="bi bi-linkedin"></i></a>
          </div>
        </div>

        <div class="col-lg-2 col-md-3 footer-links">
          <h4>Useful Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About us</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Terms of service</a></li>
            <li><a href="#">Privacy policy</a></li>
          </ul>
        </div>

        <div class="col-lg-2 col-md-3 footer-links">
          <h4>Our Services</h4>
          <ul>
            <li><a href="#">Web Design</a></li>
            <li><a href="#">Web Development</a></li>
            <li><a href="#">Product Management</a></li>
            <li><a href="#">Marketing</a></li>
            <li><a href="#">Graphic Design</a></li>
          </ul>
        </div>

        <div class="col-lg-4 col-md-12 footer-newsletter">
          <h4>Our Newsletter</h4>
          <p>Subscribe to our newsletter and receive the latest news about our products and services!</p>
          <form action="forms/newsletter.php" method="post" class="php-email-form">
            <div class="newsletter-form"><input type="email" name="email"><input type="submit" value="Subscribe"></div>
            <div class="loading">Loading</div>
            <div class="error-message"></div>
            <div class="sent-message">Your subscription request has been sent. Thank you!</div>
          </form>
        </div>

      </div>
    </div>

    <div class="container copyright text-center mt-4">
      <p>© <span>Copyright</span> <strong class="px-1 sitename">QuickStart</strong><span>All Rights Reserved</span></p>
      <div class="credits">
        <!-- All the links in the footer should remain intact. -->
        <!-- You can delete the links only if you've purchased the pro version. -->
        <!-- Licensing information: https://bootstrapmade.com/license/ -->
        <!-- Purchase the pro version with working PHP/AJAX contact form: [buy-url] -->
        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
      </div>
    </div>
    `

    return ret
  }

  /********************** END OF COMPONENTS *****************************/