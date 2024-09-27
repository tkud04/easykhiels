const initElems = () => {
    const headerElem = renderHeader()
    $('#header').html(headerElem)

    const footerElem = renderHeader()
    $('#footer').html(footerElem)

   // const counterLoading = renderLoading({text: 'Fetching SMS count'})

    hideValidations()

 
   
}

$(() =>{
    initFirebase()
    initElems()
})