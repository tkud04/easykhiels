let devMode = true, currentCounter = 0
  
let BASE_URL = devMode ? 'index.html' : 'https://eazykhiels.com'

const confirmAction = (actionId,callback) => {
    const v = confirm('Are you sure? This action cannot be undone')
  
    if(v){
      typeof callback === 'function' && callback(actionId)
    }
  }

  const hideValidations = () => {
    $('.nsfdw-validation').hide()
  }

  const setTitle = (txt='') => {
    $('title').html(txt)
  }
  
  const initFirebase = () => {
    const firebaseConfig = {
      apiKey: "AIzaSyBTjH4UsCA92j8dQj-kNdm1BHtoCOeRdwg",
      authDomain: "eazykhiels.firebaseapp.com",
      projectId: "eazykhiels",
      storageBucket: "eazykhiels.appspot.com",
      messagingSenderId: "426924287228",
      appId: "1:426924287228:web:939f5dfde73b2eed6e2379",
      measurementId: "G-W4CJWX9BQ4"
    };
      
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

  const addBusiness = (
    data={
      name,
      xfEmail,
      xfAmount,
      xfOtherAmount,
      xfCause,
      xfCountry
    },
    successCallback,errorCallback) => {
    const db = getDB()
    data.date = new Date().toISOString()
    const dnum = `SAP${getSapNumber(999999)}`
    db.collection('donation-1-results').doc(dnum)
    .set({
        ...data,
        date: data.date
    })
    .then(() => {
       typeof successCallback === 'function' && successCallback()
    })
    .catch(err => {
        typeof errorCallback === 'function' && errorCallback(err)
    })
  }

  const getBusinesses = (successCallback,errorCallback,type='active') => {
    const db = getDB()
    let coll = null
  
    if(type === 'active'){
       coll =  db.collection('eazykhiel-businesses').where('status','==','active')
    }
    else if(type === 'all'){
      coll =  db.collection('eazykhiel-businesses')
    }
  
      coll?.get()
      .then((querySnapshot) => {
        typeof successCallback === 'function' && successCallback(querySnapshot)
      })
      .catch((err) => {
        console.log('error in getSenders: ',err)
        typeof errorCallback === 'function' && errorCallback(err)
      })
  }

  const updateSender = (data={
      xf:'',
      senderName:'',
      status:''
    }) => {
      const db = getDB()
      data.date = new Date().toISOString()

      const snum = data.xf
      db.collection('nsfdw-senders').doc(snum)
        .update({
           ...data,
           date: data.date
         })
         .then(() => {
          typeof successCallback === 'function' && successCallback()
        })
        .catch(err => {
          console.log('Failed to update sender: ',err)
          typeof errorCallback === 'function' && errorCallback(err)
        })
   }

   const updateConfig = (value,successCallback,errorCallback) => {
    const db = getDB()

    const snum = 'sms_count'
    db.collection('nsfdw-configs').doc(snum)
      .update({
         value,
         date: new Date().toISOString()
       })
       .then(() => {
        typeof successCallback === 'function' && successCallback()
      })
      .catch(err => {
        console.log('Failed to update config: ',err)
        typeof errorCallback === 'function' && errorCallback(err)
      })
 }

 const addXF = (
  data={
    xfName,
    xfEmail,
    xfAmount,
    xfOtherAmount,
    xfCause,
    xfCountry
  },
  successCallback,errorCallback) => {
  const db = getDB()
  data.date = new Date().toISOString()
  const dnum = `SAP${getSapNumber(999999)}`
  db.collection('donation-1-results').doc(dnum)
  .set({
      ...data,
      date: data.date
  })
  .then(() => {
     typeof successCallback === 'function' && successCallback()
  })
  .catch(err => {
      typeof errorCallback === 'function' && errorCallback(err)
  })
}

const getXF = (successCallback,errorCallback,type='all') => {
  const db = getDB()
  let coll = null

  if(type === 'active'){
     coll =  db.collection('donation-1-results').where('status','==','active')
  }
  else if(type === 'all'){
    coll =  db.collection('donation-1-results')
  }

    coll?.get()
    .then((querySnapshot) => {
      typeof successCallback === 'function' && successCallback(querySnapshot)
    })
    .catch((err) => {
      typeof errorCallback === 'function' && errorCallback(err)
    })
}


const removeXF = (id,successCallback,errorCallback) => {
  const db = getDB()
  const docRef = db.collection('donation-1-results').doc(id)

  docRef?.delete()
  .then(() => {
     typeof successCallback === 'function' && successCallback()
  })
  .catch((err) => {
      typeof errorCallback === 'function' && errorCallback(err)
  })
}

const hideXFValidations = () => {
  $('.xf-validation').hide()
  $('#xf-loading-div').hide()
  $('#xf-amount-selected').hide()
  $('#xf-amount-display:last').remove()
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
          <li><a href="${BASE_URL}" class="active">Home</a></li>
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
          <a href="${BASE_URL}" class="logo d-flex align-items-center">
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

  const renderLoading = () => {
    const ret = `
    
    `

    return ret
  }

  const renderServiceItem = ({
    id='#',color='cyan',
    icon='business-check',title='Eazykhiels International',
    buttonText='View',
    ctr=1
   }) => {
    const vu = `${id}.html`
    const ret = `
     <div class="col-lg-6" data-aos="fade-up" data-aos-delay="${ctr * 100}">
            <div class="service-item item-${color} position-relative">
              <i class="bi bi-${icon} icon"></i>
              <div>
                <h3>${title}</h3>
                <p>${description}</p>
                <a href="${vu}" class="read-more stretched-link">${buttonText} <i class="bi bi-arrow-right"></i></a>
              </div>
            </div>
          </div><!-- End Service Item -->
    `

    return ret
  }

  /********************** END OF COMPONENTS *****************************/